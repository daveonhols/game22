"use strict";

const expect = require("chai").expect;
const deepequal = require('deep-equal');

const game = require("../code/game.js");

function getDummyGrid() {

  const grid = {
    grid: [
      [{ size: 100, used:0, category: "goal" }, { size: 100, used:0, category: "normal" }, { size: 100, used:90, category: "normal" }],
      [{ size: 100, used:90, category: "normal" }, { size: 500, used:490, category: "large" }, { size: 100, used:0, category: "empty" }],
      [{ size: 100, used:90, category: "target" }, { size: 500, used:490, category: "large" }, { size: 100, used:90, category: "normal" }]],
    gameId: "1a2b3c4d",
    status: "test grid",
    moves: 0
  };

  return grid;

}

it("move and win", function() {

  let grid = getDummyGrid();

  grid = game.processMove(grid, 1, 0, 0, 0);
  grid = game.processMove(grid, 2, 0, 1, 0);
  grid = game.processMove(grid, 0, 0, 0, 1);
  grid = game.processMove(grid, 1, 0, 0, 0);

  expect(grid.status).to.equal("Congratulations, you won!");
  expect(grid.moves).to.equal(4);

});

it("move logic, non adjacent, diagonal", function() {
  expect(game.processMove(getDummyGrid(), 0, 0, 1, 1).status).to.equal("Cannot swap non-adjacent blocks");
  expect(deepequal(game.processMove(getDummyGrid(), 0, 0, 1, 1).grid, getDummyGrid().grid)).to.equal(true);
});

it("move logic, non adjacent", function() {
  expect(game.processMove(getDummyGrid(), 0, 0, 2, 0).status).to.equal("Cannot swap non-adjacent blocks");
  expect(deepequal(game.processMove(getDummyGrid(), 0, 0, 1, 1).grid, getDummyGrid().grid)).to.equal(true);
});

it("move logic, empty to large", function() {
  expect(game.processMove(getDummyGrid(), 1, 2, 1, 1).status).to.equal("Cannot swap, free space not available");
  expect(deepequal(game.processMove(getDummyGrid(), 1, 2, 1, 1).grid, getDummyGrid().grid)).to.equal(true);
});

it("move logic, large to empty", function() {
  expect(game.processMove(getDummyGrid(), 1, 1, 1, 2).status).to.equal("Cannot swap, free space not available");
  expect(deepequal(game.processMove(getDummyGrid(), 1, 1, 1, 2).grid, getDummyGrid().grid)).to.equal(true);
});

it("move logic, move empty up", function() {
  expect(game.processMove(getDummyGrid(), 0, 2, 1, 2).status).to.equal("Swapped");
  expect(deepequal(game.processMove(getDummyGrid(), 0, 2, 1, 2).grid, getDummyGrid().grid)).to.equal(false);
  expect(deepequal(game.processMove(getDummyGrid(), 0, 2, 1, 2).grid[0][2], getDummyGrid().grid[1][2])).to.equal(true);
  expect(deepequal(game.processMove(getDummyGrid(), 0, 2, 1, 2).grid[1][2], getDummyGrid().grid[0][2])).to.equal(true);
  expect(deepequal(game.processMove(getDummyGrid(), 0, 2, 1, 2).moves, 1)).to.equal(true);
});

it("move logic, move goal", function() {
  expect(game.processMove(getDummyGrid(), 0, 1, 0, 0).status).to.equal("Swapped, but goal is constant.");
  expect(game.processMove(getDummyGrid(), 0, 1, 0, 0).grid[0][0].category).to.equal("goal");
  expect(game.processMove(getDummyGrid(), 0, 1, 0, 0).grid[1][0].category).to.equal("normal");
});

