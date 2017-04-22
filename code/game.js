const fs = require("fs");

const reader = require("./read_input.js");

function getWriteDataPromise(path, data) {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(path);
    writeStream.on("finish", () => {
      resolve(data);
    });
    writeStream.on("error", (err) => {
      reject(err);
    });
    writeStream.write(JSON.stringify(data));
    writeStream.end();
  });
}

function processMove(grid, arow, acol, brow, bcol) {
  const src = grid.grid[arow][acol];
  const dest = grid.grid[brow][bcol];
  const distance = Math.abs(arow - brow) + Math.abs(acol - bcol);

  const newGrid = grid;

  if (!(distance === 1)) {
    newGrid.status = "Cannot swap non-adjacent blocks";
    return newGrid;
  }

  if (!(src.used < (dest.size) && dest.used === 0)) {
    newGrid.status = "Cannot swap, free space not available";
    return newGrid;
  }

  newGrid.status = "Swapped";

  const prevCategory = dest.category;
  const prevUsed = dest.used;

  dest.used = src.used;
  src.used = prevUsed;
  newGrid.moves += 1;

  if (dest.category !== "goal" && src.category !== "goal") {
    dest.category = src.category;
    src.category = prevCategory;
  } else {
    newGrid.status = "Swapped, but goal is constant.";
  }

  if (src.category === "target" && dest.category === "goal") {
    newGrid.status = "Congratulations, you won!";
  }

  return grid;
}

function getInitFilePromise(gameId, path) {
  return getWriteDataPromise(path, { grid: reader.getNodes(), gameId, status: "First Write", moves: 0 });
}

function getDoNothingPromise() {
  return new Promise(res => res());
}

function readGrid(gameId) {
  const data = fs.readFileSync(`data/${gameId}.state`);
  return JSON.parse(data);
}

function getWriteGridPromise(grid) {
  const path = `data/${grid.gameId}.state`;
  return getWriteDataPromise(path, grid);
}

function handleMove(res, gameid, arow, acol, brow, bcol) {
  const path = `data/${gameid}.state`;

  const doFirst = fs.existsSync(path) ? getDoNothingPromise() : getInitFilePromise(gameid, path);

  doFirst
    .then(() => {
      const grid = readGrid(gameid);
      return processMove(grid, arow, acol, brow, bcol);
    })
    .then(grid => getWriteGridPromise(grid))
    .then((grid) => {
      res.render("index.html", grid);
    })
    .catch((err) => {
      console.log(`handleMove failed with error: ${err.stack}`);
      res.status(500).send("Server Error");
    });
}

exports.handleMove = handleMove;
exports.readGrid = readGrid;
exports.processMove = processMove;
