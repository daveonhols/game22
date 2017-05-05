
let clicked = [];

function secondClick(first, second) {
  const gameId = document.getElementsByTagName("body")[0].getAttribute("data-game-id");
  document.location.href = `../game/${gameId}-${first[0]}-${first[1]}-${second[0]}-${second[1]}`;
}

function handleClick(row, column) {
  clicked.push([row, column]);
  if (clicked.length === 2) {
    secondClick(clicked[0], clicked[1]);
    clicked = [];
  }
}

console.log(`handle click is: ${typeof handleClick}`);

$(document).ready(() => {
  $(".normal").html("<i class=\"material-icons md-18 md-dark nopad\">stop</i>");
  $(".large").html("<i class=\"material-icons md-18 md-dark\">indeterminate_check_box</i>");
  $(".target").html("<i class=\"material-icons md-18 md-dark\">star</i>");
  $(".goal_full").html("<i class=\"material-icons md-18 md-dark\">radio_button_checked</i>");
  $(".goal_empty").html("<i class=\"material-icons md-18 md-dark\">radio_button_unchecked</i>");
  $(".empty").html("<i class=\"material-icons md-18 md-dark\">check_box_outline_blank</i>");
});