const GameBoard = (() => {
  // eslint-disable-next-line no-unused-vars
  let board = ["", "", "", "", "", "", "", "", ""];

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

  return { getField, setField, clearBoard };
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

  const playround = (e) => {
    GameBoard.setField(e.target.id, getCurrentPlayerSign());
    if (round >= 9) {
      const hiddenModal = document.querySelectorAll(".hidden");
      hiddenModal.forEach((el) => {
        el.classList.add("modal");
      });
      hiddenModal.forEach((el) => {
        el.addEventListener("click", () => {
          el.classList.remove("modal");
        });
      });
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
    DisplayController.updateScreen();
  };

  return { playround, setRound };
})();

// eslint-disable-next-line no-unused-vars
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

  return { updateScreen };
})();
