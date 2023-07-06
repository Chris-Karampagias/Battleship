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
    const i = ship.start[1];
    //the ship is placed horizontally
    if (rowStart === rowEnd) {
      //first makes sure that a ship is not placed
      //in any of those cells
      for (let k = i; k < ship.length; k++) {
        if (board[rowStart][k][2]) {
          return false;
        }
      }
      for (let k = i; k < ship.length; k++) {
        board[rowStart][k][2] = ship;
      }
      ships.push(ship);
    } else {
      //the ship is placed vertically
      for (let k = rowStart; k < ship.length; k++) {
        if (board[k][i][2]) {
          return false;
        }
      }

      for (let k = rowStart; k < ship.length; k++) {
        board[k][i][2] = ship;
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
    }
    board[i][j][3] = true;
  };

  const allShipsSunk = () => {
    return ships.every((ship) => ship.isSunk());
  };

  return { showBoard, placeShip, receiveAttack, allShipsSunk };
};

export { Gameboard };