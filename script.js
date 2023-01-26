let board;
let r;
let score = 0;
const rows = 4;
const columns = 4;
window.onload = function () {
  setGame();
};
function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (r = 0; r < rows; r++) {
    for (c = 0; c < columns; c++) {
      let tile = document.createElement("div"); //created a div and set class name
      tile.id = r.toString() + "-" + c.toString();
      let nums = board[r][c];
      updatetile(tile, nums);
      document.querySelector(".board").append(tile); //appending tiles into the board
    }
  }
  setTwo();
  setTwo();
}
function updatetile(tile, nums) {
  // updating tiles with nums and changing class names
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");
  if (nums > 0) {
    tile.innerText = nums;
    tile.classList.add("x" + nums.toString());
  }
}
// adding functionality to keypress
document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
    setTwo();
    winner();
  } else if (e.code == "ArrowRight") {
    slideRight();
    setTwo();
    winner();
  } else if (e.code == "ArrowUp") {
    slideUp();
    setTwo();
    winner();
  } else if (e.code == "ArrowDown") {
    slideDown();
    setTwo();
    winner();
  }
  document.querySelector(".score").innerText = score;
});
// remove zeroes
function removeZero(row) {
  return row.filter((num) => num != 0);
}
//slide
function slide(row) {
  row = removeZero(row);
  //merge
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] = row[i] * 2;
      row[i + 1] = 0;
      score += row[i];
    }
  }
  row = removeZero(row);
  //adding zeroes
  while (row.length < columns) {
    row.push(0);
  }
  return row;
}
// slideLeft
function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);

    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let nums = board[r][c];
      updatetile(tile, nums);
    }
  }
}
function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let nums = board[r][c];
      updatetile(tile, nums);
    }
  }
}
function transpose(board) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < i; j++) {
      let temp = board[i][j];
      board[i][j] = board[j][i];
      board[j][i] = temp;
    }
  }
  return board;
}
function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let nums = board[r][c];
      updatetile(tile, nums);
    }
  }
}
function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let nums = board[r][c];
      updatetile(tile, nums);
    }
  }
}
function tileNotFound() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }
  return false;
}
function setTwo() {
  if (!tileNotFound()) {
    return;
  }
  found = false;
  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = 2;
      tile.classList.add("x2");
      found = true;
    }
  }
}
function winner() {
  for (r = 0; r < rows; r++) {
    for (c = 0; c < columns; c++) {
      let nums = board[r][c];
      if (nums > 2048) {
        document.querySelector(".container").style.backgroundImage =
          " url('https://thumbs.dreamstime.com/b/winner-chicken-dinner-funny-saying-vector-clip-art-illustration-cartoon-style-text-drawing-146743461.jpg')";
        document.querySelector(".container").style.backgroundPosition =
          "center";
        document.querySelector(".container").style.backgroundSize = "contain";
        document.querySelector(".container").style.backgroundRepeat =
          "no-repeat";
        document.querySelector(".board").classList.add("hidden");
        let finalScore = score.toString();
        document.querySelector(".hh").value = 100;
        console.log(finalScore);
      }
    }
  }
}
