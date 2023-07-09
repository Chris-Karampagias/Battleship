/* eslint-disable no-undef */
import { Ship } from "../modules/ship";
import { Gameboard } from "../modules/gameboard";

function placeShipRandomlyMock(board, type, length) {
  const key = Math.floor(Math.random() * 2);
  let counter = 0;
  let ship, si, sj, ei, ej;
  if (key === 0) {
    //place ship horizontally
    si = Math.floor(Math.random() * 10);
    sj = Math.floor(Math.random() * 10);
    ej = sj + length;
    ei = si;
    ship = Ship(type, length, [si, sj], [ei, ej]);
    while (ej > 9 || !board.placeShip(ship)) {
      si = Math.floor(Math.random() * 10);
      sj = Math.floor(Math.random() * 10);
      ej = sj + length;
      ei = si;
      ship = Ship(type, length, [si, sj], [ei, ej]);
      counter++;
      if (counter === 100) return false;
    }
  } else {
    //place ship vertically
    si = Math.floor(Math.random() * 10);
    sj = Math.floor(Math.random() * 10);
    ej = sj;
    ei = si + length;
    ship = Ship(type, length, [si, sj], [ei, ej]);
    while (ei > 9 || !board.placeShip(ship)) {
      si = Math.floor(Math.random() * 10);
      sj = Math.floor(Math.random() * 10);
      ej = sj;
      ei = si + length;
      ship = Ship(type, length, [si, sj], [ei, ej]);
      counter++;
      if (counter === 100) return false;
    }
  }
  return true;
}

const fakeGameboard = () => {
  const ships = [];
  const createBoard = () => {
    const board = [];
    for (let i = 0; i < 10; i++) {
      board.push([]);
      for (let j = 0; j < 10; j++) {
        board[i].push([i + 1, j + 1, true, false]);
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

let board, fakeBoard;
beforeEach(() => {
  board = Gameboard();
  fakeBoard = fakeGameboard();
});

const car = {
  type: "carrier",
  timesHit: 0,
  length: 5,
  start: [0, 0],
  end: [4, 0],
  hit() {
    car.timesHit += 1;
  },
};

const carrierHoriz = Ship("carrier", 5, [0, 0], [0, 4]);
const carrierVert = Ship("carrier", 5, [0, 0], [4, 0]);

describe("tests for placeShip", () => {
  test("checks if the board coordinates are correct", () => {
    expect(board.showBoard()[0][0]).toEqual([1, 1, null, false]);
    expect(board.showBoard()[1][1]).toEqual([2, 2, null, false]);
    expect(board.showBoard()[9][9]).toEqual([10, 10, null, false]);
  });

  test("checks if a ship is placed correctly horizontaly", () => {
    board.placeShip(carrierHoriz);
    expect(board.showBoard()[0][0][2]).toEqual(carrierHoriz);
    expect(board.showBoard()[0][1][2]).toEqual(carrierHoriz);
    expect(board.showBoard()[0][2][2]).toEqual(carrierHoriz);
    expect(board.showBoard()[0][3][2]).toEqual(carrierHoriz);
    expect(board.showBoard()[0][4][2]).toEqual(carrierHoriz);
  });

  test("checks if a ship is placed correctly vertically", () => {
    board.placeShip(carrierVert);
    expect(board.showBoard()[0][0][2]).toEqual(carrierVert);
    expect(board.showBoard()[1][0][2]).toEqual(carrierVert);
    expect(board.showBoard()[2][0][2]).toEqual(carrierVert);
    expect(board.showBoard()[3][0][2]).toEqual(carrierVert);
    expect(board.showBoard()[4][0][2]).toEqual(carrierVert);
  });

  test("returns false if a ship is already placed in the specified coordinates", () => {
    const cruiser = Ship("cruiser", 3, [0, 0], [0, 2]);
    board.placeShip(carrierHoriz);
    expect(board.placeShip(cruiser)).toBe(false);
  });

  test("returns false if a ship is already placed in ONE of the specified coordinates and doesn't place it", () => {
    const carrier1 = Ship("carrier", 5, [0, 1], [4, 1]);
    const carrier2 = Ship("carrier", 5, [1, 0], [1, 4]);
    board.placeShip(carrier1);
    expect(board.placeShip(carrier2)).toBe(false);
    expect(board.showBoard()[1][0][2]).toBe(null);
  });
});

describe("tests for receiveAttack", () => {
  test("checks if a filled position that's hit is marked on the board and if timesHit is called", () => {
    board.placeShip(car);
    board.receiveAttack([0, 0]);

    expect(car.timesHit).toBe(1);
    expect(board.showBoard()[0][0][3]).toEqual(true);
  });

  test("checks if an empty position that's hit is marked on the board", () => {
    board.receiveAttack([5, 5]);
    expect(board.showBoard()[5][5][3]).toEqual(true);
  });
});

describe("tests for placeShipRandomly", () => {
  test("doesn't place ship if there is no room", () => {
    expect(placeShipRandomlyMock(fakeBoard, "carrier", 5)).toBe(false);
  });
  test("places ship if there is room", () => {
    expect(placeShipRandomlyMock(board, "carrier", 5)).toBe(true);
  });
});
