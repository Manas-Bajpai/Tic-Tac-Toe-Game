let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let turnO = true; // playerO, playerX
let count = 0; // To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      if (turnO) {
        // playerO
        box.innerText = "O";
        box.classList.add("playerO");
        box.classList.remove("playerX");
      } else {
        // playerX
        box.innerText = "X";
        box.classList.add("playerX");
        box.classList.remove("playerO");
      }
      box.disabled = true;
      turnO = !turnO;
      count++;

      let isWinner = checkWinner();

      if (count === 9 && !isWinner) {
        gameDraw();
      }
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("playerO", "playerX", "winning");
  });
};

const showWinner = (winner, winningPattern) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  winningPattern.forEach((index) => {
    boxes[index].classList.add("winning");
  });
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Va = boxes[pattern[0]].innerText;
    let pos2Va = boxes[pattern[1]].innerText;
    let pos3Va = boxes[pattern[2]].innerText;

    if (pos1Va != "" && pos2Va != "" && pos3Va != "") {
      if (pos1Va === pos2Va && pos2Va === pos3Va) {
        showWinner(pos1Va, pattern);
        return true;
      }
    }
  }
  return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
