/* eslint-disable no-plusplus */
const Ship = (type, length, start, end) => {
  let timesHit = 0;
  const hit = () => {
    timesHit += 1;
  };

  const isSunk = () => {
    if (length === timesHit) {
      return true;
    }
    return false;
  };

  return { type, length, start, end, hit, isSunk };
};

const Gameboard = () => {
  const createBoard = () => {
    const board = [];
    for (let i = 0; i < 10; i++) {
      board.push([]);
      for (let j = 0; j < 10; j++) {
        board[i].push([i + 1, j + 1, null, false]);
      }
    }
    return board;
  };
  const board = createBoard();

  const showBoard = () => board; //method to test if board displays the correct coordinates

  const placeShip = (ship) => {
    const rowStart = ship.start[0];
    const rowEnd = ship.end[0];
    const i = ship.start[1];
    if (rowStart === rowEnd) {
      //the ship is placed horizontally
      for (let k = i; k < ship.length; k++) {
        board[rowStart][k][2] = ship;
      }
    } else {
      //the ship is placed vertically
      for (let k = rowStart; k < ship.length; k++) {
        board[k][i][2] = ship.type;
      }
    }
  };

  return { showBoard, placeShip };
};

export { Gameboard, Ship };
