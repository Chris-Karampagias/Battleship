/* eslint-disable no-undef */
import { Gameboard, Ship } from "../modules/app-logic";

test("checks if the board coordinates are correct", () => {
  const board = Gameboard();
  expect(board.showBoard()[0][0]).toEqual([1, 1, null, false]);
  expect(board.showBoard()[1][1]).toEqual([2, 2, null, false]);
  expect(board.showBoard()[9][9]).toEqual([10, 10, null, false]);
});

test("checks if a cell is empty", () => {
  const board = Gameboard();
  expect(board.showBoard()[0][0][2]).toEqual(null);
});

test.only("checks if a ship is placed correctly horizontaly", () => {
  const carrier = Ship("carrier", 5, [0, 0], [0, 4]);
  const board = Gameboard();
  board.placeShip(carrier);
  expect(board.showBoard()[0][0][2]).toEqual(carrier);
  expect(board.showBoard()[0][1][2]).toEqual(carrier);
  expect(board.showBoard()[0][2][2]).toEqual(carrier);
  expect(board.showBoard()[0][3][2]).toEqual(carrier);
  expect(board.showBoard()[0][4][2]).toEqual(carrier);
});

test("checks if a ship is placed correctly vertically", () => {
  const carrier = Ship("carrier", 5, [0, 0], [4, 0]);
  const board = Gameboard();
  board.placeShip(carrier);
  expect(board.showBoard()[0][0][2]).toEqual(carrier);
  expect(board.showBoard()[1][0][2]).toEqual(carrier);
  expect(board.showBoard()[2][0][2]).toEqual(carrier);
  expect(board.showBoard()[3][0][2]).toEqual(carrier);
  expect(board.showBoard()[4][0][2]).toEqual(carrier);
});
