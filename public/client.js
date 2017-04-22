
let clicked = [];

function secondClick(first, second) {
  const gameId = document.getElementsByTagName("body")[0].getAttribute("data-game-id");
  document.location.href = `/game/${gameId}-${first[0]}-${first[1]}-${second[0]}-${second[1]}`;
}

function handleClick(row, column) {
  clicked.push([row, column]);
  if (clicked.length === 2) {
    secondClick(clicked[0], clicked[1]);
    clicked = [];
  }
}

exports.handleClick = handleClick;

/* exported handleClick */
