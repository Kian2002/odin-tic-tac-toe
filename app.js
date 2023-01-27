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

  return { getField, setField };
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
    console.log(e.target.id);
    GameBoard.setField(e.target.id, getCurrentPlayerSign());
    round++;
    DisplayController.updateScreen();
  };

  const getCurrentPlayerSign = () => {
    return round % 2 === 1 ? player1.getSign() : player2.getSign();
  };

  const setRound = () => {
    round--;
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
