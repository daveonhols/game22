"use strict";

const expect = require("chai").expect;
const deepequal = require('deep-equal');

const reader = require("../code/read_input.js");

it("simple reader test", function() {
  expect(reader.getNodes()[0][0].category).to.equal("goal_full");
});