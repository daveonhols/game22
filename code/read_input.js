const fs = require("fs");

function readNum(numString) {
  const number = numString.split("T")[0];
  return Number(number);
}

function parseLine(line) {
  const parts = line.split(" ").reduce((total, curr) => (curr.length === 0 ? total : total.concat(curr)), []);
  [1, 2, 3].forEach((idx) => { parts[idx] = readNum(parts[idx]); });
  return parts;
}

function getNodes() {
  const nodes = fs.readFileSync("data/input.txt", "utf-8").split("\r\n").map(parseLine);
  let rows = 0;
  const grid = [];

  while (rows < nodes.length) {
    const row = [];
    for (let column = 0; column <= 28; column += 1) {
      const node = { size: nodes[rows][1], used: nodes[rows][2], row: grid.length, column, category: "normal" };

      if (node.size > 500) {
        node.category = "large";
      }
      if (node.used === 0) {
        node.category = "empty";
      }

      if (rows === 0 && column === 0) {
        node.category = "goal";
      }

      if (grid.length === 34 && column === 0) {
        node.category = "target";
      }

      row.push(node);
      rows += 1;
    }
    grid.push(row);
  }

  return grid;
}

exports.getNodes = getNodes;
