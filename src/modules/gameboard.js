/* eslint-disable no-plusplus */
import { Ship } from "./ship";

const Gameboard = () => {
  const ships = [];
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
    const columnStart = ship.start[1];
    //the ship is placed horizontally
    if (rowStart === rowEnd) {
      //first makes sure that a ship is not placed
      //in any of those cells
      for (let k = columnStart; k < columnStart + ship.length; k++) {
        if (board[rowStart][k][2]) {
          return false;
        }
      }
      for (let k = columnStart; k < columnStart + ship.length; k++) {
        board[rowStart][k][2] = ship;
      }
      ships.push(ship);
    } else {
      //the ship is placed vertically
      for (let k = rowStart; k < rowStart + ship.length; k++) {
        if (board[k][columnStart][2]) {
          return false;
        }
      }

      for (let k = rowStart; k < rowStart + ship.length; k++) {
        board[k][columnStart][2] = ship;
      }
      ships.push(ship);
    }
    return true;
  };

  const receiveAttack = (cell) => {
    const i = cell[0],
      j = cell[1];
    if (board[i][j][2]) {
      //if there is a ship there
      board[i][j][2].hit();
      board[i][j][3] = true;
      return true;
    }
    board[i][j][3] = true;
    return false;
  };

  const allShipsSunk = () => {
    return ships.every((ship) => ship.isSunk());
  };

  const shipIsAdded = (type) => {
    return ships.some((ship) => ship.type === type);
  };

  const clear = () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j][2]) {
          board[i][j][2] = null;
        }
      }
    }
    while (ships.length !== 0) {
      ships.pop();
    }
  };
  const markHitCells = (cells) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j][3] === true && !board[i][j][2]) {
          for (let k = 0; k < cells.length; k++) {
            if (
              Number(cells[k].attributes[1].value) == i &&
              Number(cells[k].attributes[2].value) == j
            ) {
              cells[k].classList.add("miss");
              break;
            }
          }
        } else if (board[i][j][3] === true && board[i][j][2]) {
          for (let k = 0; k < cells.length; k++) {
            if (
              Number(cells[k].attributes[1].value) == i &&
              Number(cells[k].attributes[2].value) == j
            ) {
              cells[k].classList.add("hit");
              break;
            }
          }
        }
      }
    }
  };

  return {
    showBoard,
    placeShip,
    receiveAttack,
    allShipsSunk,
    shipIsAdded,
    clear,
    markHitCells,
  };
};

function placeShipRandomly(board, type, length) {
  let ship, si, sj, ei, ej;
  si = Math.floor(Math.random() * 10);
  sj = Math.floor(Math.random() * 10);
  if (si === sj) {
    //ship is placed horizontally
    ej = sj + length - 1;
    ei = si;
    ship = Ship(type, length, [si, sj], [ei, ej]);
  } else {
    //ship is placed vertically
    ei = si + length - 1;
    ej = sj;
    ship = Ship(type, length, [si, sj], [ei, ej]);
  }
  while (ej >= 10 || ei >= 10 || !board.placeShip(ship)) {
    si = Math.floor(Math.random() * 10);
    sj = Math.floor(Math.random() * 10);
    if (si === sj) {
      ej = sj + length - 1;
      ei = si;
    } else {
      ei = si + length - 1;
      ej = sj;
    }
    ship = Ship(type, length, [si, sj], [ei, ej]);
  }
}

export { Gameboard, placeShipRandomly };
