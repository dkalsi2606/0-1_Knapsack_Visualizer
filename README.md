# 0/1 Knapsack Visualizer

This project visualizes the 0/1 Knapsack problem using the Dynamic Programming approach. It allows users to input item weights and values, select a knapsack capacity, and watch the algorithm fill the DP table step by step to determine the optimal value and items chosen.

## Live Visualizer
You can access the hosted visualizer here:  
[https://dkalsi2606.github.io/0-1_Knapsack_Visualizer/](https://dkalsi2606.github.io/0-1_Knapsack_Visualizer/)

## Overview
The 0/1 Knapsack problem is a classic optimization problem that asks:  
Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is maximized.

This visualizer demonstrates how dynamic programming builds a table of subproblem solutions to compute the final result.

## Features
- Input up to five items with their weights and values  
- Specify the knapsack capacity  
- Step through each iteration manually or automatically using "Next Step" and "Play"  
- View the dynamic programming table update in real time  
- Display the maximum value and the selected items at the end

## Files
- **index.html** – Structure and layout of the webpage  
- **style.css** – Visual styling and layout adjustments  
- **script.js** – Logic for dynamic programming and step-by-step visualization  

## How It Works
1. The DP table is initialized with zeros.  
2. For each item and each capacity, the algorithm decides whether to include or exclude the item based on the maximum value achievable.  
3. The visualizer highlights each cell as it is updated, showing the decision process.  
4. After filling the table, the chosen items and maximum value are displayed.

## Technologies Used
- HTML  
- CSS  
- JavaScript  

## Author
Created by Ominous Wind (GitHub username: dkalsi2606)
