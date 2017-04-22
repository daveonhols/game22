"use strict";

const expect = require("chai").expect;
const deepequal = require('deep-equal');
const sleep = require("system-sleep")

const game = require("../code/game.js");

it("application, player moved, new game", function() {
  const testId = "__test_a1b2c3d4";
  game.handleMove({ render: () => {} }, testId, 0, 0, 1, 1);
  sleep(900);
  const grid = game.readGrid(testId);
  expect(grid.moves).to.equal(0);
});

it("application, player moved twice", function() {
  const testId = "__test_z9x8y7q6";

  game.handleMove({ render: () => {} }, testId, 0, 0, 1, 1);
  sleep(900);
  let grid = game.readGrid(testId);
  expect(grid.moves).to.equal(0);

  game.handleMove({ render: () => {} }, testId, 1, 1, 2, 2);
  sleep(900);
  grid = game.readGrid(testId);
  expect(grid.moves).to.equal(0);

});

it("application, player moved, should throw", function() {
  const testId = "__test_a99b88c77dd";

  let errorCode = 0;

  new Promise((resolve, reject) => {

    // I know that handleMove calls req.status when it fails, so we can hook into that for an on error promise
    const mockHandler = {
      render: (x, y) => { throw new Error("Dummy Test Failure") },
      status: (x) => { reject(x); return  { send: () => {} }; }
    };
    game.handleMove( mockHandler, testId, 0, 0, 1, 1);

  })
  .then(() => { expect(true).to.equal(false) }) // should not happen, fail if it does
  .catch((x) => { expect(x).to.equal(500); } );


})