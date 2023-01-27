const GameBoard = (() => {
  // eslint-disable-next-line no-unused-vars
  let board = ["X", "O", "X", "O", "O", "O", "X", "X", "X"];

  const getField = (index) => {
    return board[index];
  };

  const setField = (index, value) => {
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

// eslint-disable-next-line no-unused-vars
const DisplayController = (() => {
  // const player1 = Player("X");
  // const player2 = Player("O");

  document.querySelectorAll(".fr").forEach((data) => {
    data.textContent = GameBoard.getField(data.cellIndex);
  });

  document.querySelectorAll(".sr").forEach((data) => {
    data.textContent = GameBoard.getField(data.cellIndex + 3);
  });

  document.querySelectorAll(".tr").forEach((data) => {
    data.textContent = GameBoard.getField(data.cellIndex + 6);
  });
  //create players
  //allow them to do stuff
  //show stuff
  // return stuff
})();
