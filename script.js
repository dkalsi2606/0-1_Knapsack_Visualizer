const inputContainer = document.getElementById('inputs');

for (let i = 0; i < 5; i++) {
  inputContainer.innerHTML += `Item ${i + 1}: W <input type='number' id='w${i}' min='1' value='${i + 1}'> V <input type='number' id='v${i}' min='1' value='${(i + 1) * 2}'><br>`;
}

let dp = [];
let items = [];
let capacity = 0;
let iStep = 1;
let wStep = 1;
let playing = false;
let interval;

document.getElementById('buildBtn').addEventListener('click', () => {
  items = [];
  for (let i = 0; i < 5; i++) {
    const w = parseInt(document.getElementById(`w${i}`).value);
    const v = parseInt(document.getElementById(`v${i}`).value);
    if (!isNaN(w) && !isNaN(v) && w > 0 && v > 0) {
      items.push({ w, v });
    }
  }
  capacity = parseInt(document.getElementById('capacity').value);
  buildTable();
});

function buildTable() {
  dp = Array.from({ length: items.length + 1 }, () => Array(capacity + 1).fill(0));

  const table = document.getElementById('dpTable');
  table.innerHTML = '';

  const header = document.createElement('tr');
  header.innerHTML = '<th>i\\w</th>';
  for (let i = 0; i <= capacity; i++) {
    header.innerHTML += `<th>${i}</th>`;
  }
  table.appendChild(header);

  for (let i = 0; i <= items.length; i++) {
    const row = document.createElement('tr');
    row.innerHTML = `<th>${i}</th>`;
    for (let j = 0; j <= capacity; j++) {
      row.innerHTML += `<td>0</td>`;
    }
    table.appendChild(row);
  }

  iStep = 1;
  wStep = 1;
  document.getElementById('result').innerText = '';
}

function updateTable() {
  if (iStep > items.length) {
    clearInterval(interval);
    playing = false;
    showResult();
    return;
  }

  const table = document.getElementById('dpTable');
  const item = items[iStep - 1];
  const prevRow = dp[iStep - 1];

  if (wStep <= capacity) {
    if (item.w <= wStep) {
      const includeItem = prevRow[wStep - item.w] + item.v;
      const excludeItem = prevRow[wStep];
      dp[iStep][wStep] = Math.max(includeItem, excludeItem);
    } else {
      dp[iStep][wStep] = prevRow[wStep];
    }

    const cell = table.rows[iStep + 1].cells[wStep + 1];
    cell.innerText = dp[iStep][wStep];

    for (let r = 1; r < table.rows.length; r++) {
      for (let c = 1; c < table.rows[r].cells.length; c++) {
        table.rows[r].cells[c].classList.remove('active');
      }
    }

    cell.classList.add('active');
    wStep++;
  } else {
    iStep++;
    wStep = 1;
  }
}

function showResult() {
  let res = dp[items.length][capacity];
  let w = capacity;
  let chosen = [];

  for (let i = items.length; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      chosen.push(i);
      w -= items[i - 1].w;
    }
  }

  chosen.reverse();
  document.getElementById('result').innerText = `Maximum Value: ${res} | Items Used: ${chosen.join(', ')}`;
}

document.getElementById('nextBtn').addEventListener('click', updateTable);

document.getElementById('playBtn').addEventListener('click', () => {
  if (playing) {
    clearInterval(interval);
    playing = false;
  } else {
    playing = true;
    interval = setInterval(updateTable, 500);
  }
});
