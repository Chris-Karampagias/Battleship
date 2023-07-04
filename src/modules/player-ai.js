const Player = (name) => {
  let turn = false;

  const isTurn = () => turn;

  const changeTurnStatus = () => {
    if (turn) {
      turn = false;
    } else {
      turn = true;
    }
  };

  return { name, isTurn, changeTurnStatus };
};

const Computer = () => {
  const makeRandomChoice = (board) => {
    let i = Math.floor(Math.random() * 10),
      j = Math.floor(Math.random() * 10);
    while (board[i][j][3]) {
      i = Math.floor(Math.random() * 10);
      j = Math.floor(Math.random() * 10);
    }
    board[i][j][3] = true;
  };
  return { makeRandomChoice };
};

export { Player, Computer };
