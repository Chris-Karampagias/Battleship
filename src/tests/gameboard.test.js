/* eslint-disable no-undef */
import { Ship } from "../modules/ship";
import { Gameboard } from "../modules/gameboard";

function placeShipRandomlyMock(si, sj, length) {
  let ei, ej;

  if (si === sj) {
    //ship is placed horizontally
    ej = sj + length - 1;
    ei = si;
  } else {
    //ship is placed vertically
    ei = si + length - 1;
    ej = sj;
  }
  while (ej > 9 || ei > 9) {
    si = Math.floor(Math.random() * 10);
    sj = Math.floor(Math.random() * 10);
    if (si === sj) {
      ej = sj + length - 1;
      ei = si;
    } else {
      ei = si + length - 1;
      ej = sj;
    }
  }
  return [
    [si, sj],
    [ei, ej],
  ];
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
      for (let k = i; k < i + ship.length; k++) {
        if (board[rowStart][k][2]) {
          return false;
        }
      }
      for (let k = i; k < i + ship.length; k++) {
        board[rowStart][k][2] = ship;
      }
      ships.push(ship);
    } else {
      //the ship is placed vertically
      for (let k = rowStart; k < rowStart + ship.length; k++) {
        if (board[k][i][2]) {
          return false;
        }
      }

      for (let k = rowStart; k < rowStart + ship.length; k++) {
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

test("checks if the board coordinates are correct", () => {
  expect(board.showBoard()[0][0]).toEqual([1, 1, null, false]);
  expect(board.showBoard()[1][1]).toEqual([2, 2, null, false]);
  expect(board.showBoard()[9][9]).toEqual([10, 10, null, false]);
});

describe("tests for placeShip", () => {
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

  test("works for any pair of acceptable coordinates", () => {
    const ship = Ship("battleship", 4, [4, 5], [7, 5]);
    board.placeShip(ship);
    expect(board.showBoard()[4][5][2]).toEqual(ship);
    expect(board.showBoard()[5][5][2]).toEqual(ship);
    expect(board.showBoard()[6][5][2]).toEqual(ship);
    expect(board.showBoard()[7][5][2]).toEqual(ship);
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
  test("returns valid coordinates", () => {
    const coords = placeShipRandomlyMock(1, 1, 5);
    const [start, finish] = coords;
    expect(finish[0]).toBeLessThan(9);
    expect(finish[1]).toBeLessThan(9);
  });

  test("returns valid coordinates", () => {
    const coords = placeShipRandomlyMock(1, 2, 5);
    const [start, finish] = coords;
    expect(finish[0]).toBeLessThan(9);
    expect(finish[1]).toBeLessThan(9);
  });
});
