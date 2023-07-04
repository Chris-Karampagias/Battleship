/* eslint-disable no-undef */
import { Computer } from "../modules/player-ai";

const createFakeBoard = () => {
  const board = [];
  for (let i = 0; i < 10; i++) {
    board.push([]);
    for (let j = 0; j < 10; j++) {
      if (i === 9 && j === 9) {
        board[i].push([i + 1, j + 1, null, false]);
      }
      board[i].push([i + 1, j + 1, null, true]);
    }
  }
  return board;
};

let board;

beforeEach(() => {
  board = createFakeBoard();
});

test("actually makes a valid random choice", () => {
  const ai = Computer();
  ai.makeRandomChoice(board);
  expect(board[9][9][3]).toBe(true);
});
