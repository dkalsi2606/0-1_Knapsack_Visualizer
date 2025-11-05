const inputContainer = document.getElementById('inputs');
for (let i = 0; i < 5; i++) {
  inputContainer.innerHTML += `
    Item ${i + 1}: 
    W <input type='number' id='w${i}' min='1' value='${i + 1}'> 
    V <input type='number' id='v${i}' min='1' value='${(i + 1) * 2}'> 
    Include <input type='checkbox' id='chk${i}' checked><br>`;
}

let dp = [], items = [], capacity = 0, iStep = 1, wStep = 1, playing = false, interval;

document.getElementById('buildBtn').addEventListener('click', () => {
  items = [];
  for (let i = 0; i < 5; i++) {
    const w = parseInt(document.getElementById(`w${i}`).value);
    const v = parseInt(document.getElementById(`v${i}`).value);
    const included = document.getElementById(`chk${i}`).checked;
    if (included && !isNaN(w) && !isNaN(v) && w > 0 && v > 0) {
      items.push({ w, v, originalIndex: i + 1 });
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
  header.innerHTML = '<th>i\\w</th>' + Array.from({ length: capacity + 1 }, (_, i) => `<th>${i}</th>`).join('');
  table.appendChild(header);

  for (let i = 0; i <= items.length; i++) {
    const row = document.createElement('tr');
    row.innerHTML = `<th>${i}</th>` + Array.from({ length: capacity + 1 }, () => `<td>0</td>`).join('');
    table.appendChild(row);
  }

  iStep = 1;
  wStep = 1;
  document.getElementById('result').innerText = '';
  document.getElementById('reason').innerText = '';
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
  const reason = document.getElementById('reason');

  if (wStep <= capacity) {
    if (item.w <= wStep) {
      const includeVal = prevRow[wStep - item.w] + item.v;
      const excludeVal = prevRow[wStep];
      dp[iStep][wStep] = Math.max(includeVal, excludeVal);
      if (includeVal > excludeVal) {
        reason.innerText = `Included item ${item.originalIndex} (w=${item.w}, v=${item.v}) because ${includeVal} > ${excludeVal}`;
      } else {
        reason.innerText = `Excluded item ${item.originalIndex} (w=${item.w}, v=${item.v}) because ${includeVal} ≤ ${excludeVal}`;
      }
    } else {
      dp[iStep][wStep] = prevRow[wStep];
      reason.innerText = `Skipped item ${item.originalIndex} (w=${item.w}) — too heavy for capacity ${wStep}`;
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
      chosen.push(items[i - 1].originalIndex);
      w -= items[i - 1].w;
    }
  }

  chosen.reverse();
  document.getElementById('result').innerText =
    `Maximum Value: ${res} | Items Used: ${chosen.length > 0 ? chosen.join(', ') : 'None'}`;
}

document.getElementById('nextBtn').addEventListener('click', updateTable);
document.getElementById('playBtn').addEventListener('click', () => {
  if (playing) {
    clearInterval(interval);
    playing = false;
  } else {
    playing = true;
    interval = setInterval(updateTable, 600);
  }
});
