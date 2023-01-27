const GameBoard = (() => {
  let board = ["X", "", "O", "", "", "X", "", "O", ""];

  const getField = (index) => {
    return this.board[index];
  };

  const setField = (index, value) => {
    this.board[index] = value;
  };

  return { board, getField, setField };
})();

const Player = (sign) => {
  this.sign = sign;

  const getSign = () => {
    return this.sign;
  };

  return { getSign };
};

// eslint-disable-next-line no-unused-vars
const DisplayController = (() => {
  //create players
  //allow them to do stuff
  //show stuff
  // return stuff
})();
