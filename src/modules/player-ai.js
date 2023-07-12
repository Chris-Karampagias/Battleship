const Computer = () => {
  const makeRandomChoice = (board) => {
    let i = Math.floor(Math.random() * 10),
      j = Math.floor(Math.random() * 10);
    while (board.showBoard()[i][j][3]) {
      i = Math.floor(Math.random() * 10);
      j = Math.floor(Math.random() * 10);
    }
    return [i, j];
  };
  return { makeRandomChoice };
};

export { Computer };
