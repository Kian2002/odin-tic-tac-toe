const GameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getAllFields = () => {
    return board;
  };

  const getField = (index) => {
    return board[index];
  };

  const setField = (index, value) => {
    if (board[index] != "") return GameController.setRound();
    board[index] = value;
  };

  const clearBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getField, setField, clearBoard, getAllFields };
})();

const Player = (sign) => {
  let playerSign = sign;

  const getSign = () => {
    return playerSign;
  };

  return { getSign };
};

const GameController = (() => {
  const player1 = Player("X");
  const player2 = Player("O");
  let round = 1;
  let gameActive = true;

  const playround = (e) => {
    if (!gameActive) return;
    GameBoard.setField(e.target.id, getCurrentPlayerSign());
    winningLogic();

    if (round >= 9) {
      DisplayController.revealModal("The game was a tie!");
      restartGame();
    }
    round++;
    DisplayController.updateScreen();
  };

  const getCurrentPlayerSign = () => {
    return round % 2 === 1 ? player1.getSign() : player2.getSign();
  };

  const setRound = () => {
    round--;
  };

  const restartGame = () => {
    round = 0;
    GameBoard.clearBoard();
    gameActive = true;
    DisplayController.updateScreen();
  };

  const winningLogic = () => {
    const winningArr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const arr1 = GameBoard.getAllFields();

    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningArr[i];
      let a = arr1[winCondition[0]];
      let b = arr1[winCondition[1]];
      let c = arr1[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      gameActive = false;
      DisplayController.revealModal(`The Winner is: ${getCurrentPlayerSign()}`);
      return;
    }
  };

  return { playround, setRound, winningLogic, restartGame };
})();

const DisplayController = (() => {
  const updateScreen = () => {
    document.querySelectorAll(".fr").forEach((data) => {
      data.textContent = GameBoard.getField(data.cellIndex);
    });

    document.querySelectorAll(".sr").forEach((data) => {
      data.textContent = GameBoard.getField(data.cellIndex + 3);
    });

    document.querySelectorAll(".tr").forEach((data) => {
      data.textContent = GameBoard.getField(data.cellIndex + 6);
    });
  };

  document.querySelectorAll("td").forEach((data) => {
    data.onclick = GameController.playround;
  });

  const revealModal = (text) => {
    const hiddenModal = document.querySelectorAll(".hidden");
    hiddenModal.forEach((el) => {
      el.classList.add("modal");
    });
    hiddenModal.forEach((el) => {
      el.addEventListener("click", () => {
        el.classList.remove("modal");
      });
    });

    document.getElementById("modal-text").textContent = text;

    GameController.restartGame();
  };

  return { updateScreen, revealModal };
})();
