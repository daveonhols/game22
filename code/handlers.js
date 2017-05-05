const crypto = require("crypto");

const reader = require("./read_input.js");
const game = require("./game.js");

function rootHandler(req, res) {
  console.log("incoming...");
  const id = crypto.randomBytes(5).toString("hex");
  res.render(
    "index.html",
    { approot: "", grid: reader.getNodes(), gameId: id, status: "Click to start playing", moves: 0 });
}

function gameMoveHandler(req, res) {
  const params = req.params;
  game.handleMove(res, params.gameid, params.arow, params.acol, params.brow, params.bcol);
}

function gameReloadHandler(req, res) {
  const reloaded = game.readGrid(req.params.gameid);
  res.render("index.html", reloaded);
}

exports.rootHandler = rootHandler;
exports.gameMoveHandler = gameMoveHandler;
exports.gameReloadHandler = gameReloadHandler;
