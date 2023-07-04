/* eslint-disable no-undef */
import { Ship } from "../modules/ship";
import { Gameboard } from "../modules/gameboard";

let board;

beforeEach(() => {
  board = Gameboard();
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

test("returns false if a ship is already placed in ONE of the specified coordinates", () => {
  board.placeShip(carrierHoriz);
  expect(board.placeShip(carrierVert)).toBe(false);
});

test("checks if a filled position that's hit is marked on the board and if timesHit is updated", () => {
  board.placeShip(car);
  board.receiveAttack([0, 0]);

  expect(car.timesHit).toBe(1);
  expect(board.showBoard()[0][0][3]).toEqual(true);
});

test("checks if an empty position that's hit is marked on the board", () => {
  board.receiveAttack([5, 5]);
  expect(board.showBoard()[5][5][3]).toEqual(true);
});
