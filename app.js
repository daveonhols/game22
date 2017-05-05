const express = require("express");
const mustacheExpress = require("mustache-express");
const path = require("path");

const handlers = require("./code/handlers.js");

const app = express();

app.engine("html", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.get("/", (req, res) => res.redirect("/play/"));
app.get("/play/", handlers.rootHandler);
app.get("/game/:gameid-:arow-:acol-:brow-:bcol", handlers.gameMoveHandler);
app.get("/game/:gameid", handlers.gameReloadHandler);

app.listen(3000, "0.0.0.0", () => console.log("Starting up..."));

