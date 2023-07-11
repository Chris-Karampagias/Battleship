import { highlightCells } from "./screen2";

function createScreen3(playerBoard) {
  const body = document.querySelector("body");
  const screen3 = document.createElement("div");
  screen3.className = "screen3";
  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container";
  const message = document.createElement("div");
  message.className = "message-screen3";
  message.textContent = "Hello";
  messageContainer.append(message);
  const boards = document.createElement("div");
  boards.className = "boards";
  const playerContainer = document.createElement("div");
  playerContainer.className = "player-container";
  const playerWaters = document.createElement("div");
  playerWaters.className = "player-waters";
  playerWaters.textContent = "Friendly waters";
  const playerGrid = createPlayerGrid();
  playerContainer.append(playerWaters, playerGrid);
  const aiContainer = document.createElement("div");
  aiContainer.className = "ai-container";
  const aiWaters = document.createElement("div");
  aiWaters.className = "ai-waters";
  aiWaters.textContent = "Enemy waters";
  const aiGrid = createAiGrid();
  aiContainer.append(aiWaters, aiGrid);
  boards.append(playerContainer, aiContainer);
  screen3.append(messageContainer, boards);
  body.append(screen3);
  const playerCells = Array.from(document.querySelectorAll(".player-cell"));
  highlightCells(playerCells, playerBoard);
}

function createPlayerGrid() {
  const grid = document.createElement("div");
  grid.className = "player-grid";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.className = "player-cell";
      cell.setAttribute("data-row", `${i}`);
      cell.setAttribute("data-column", `${j}`);
      grid.append(cell);
    }
  }
  return grid;
}

function createAiGrid() {
  const grid = document.createElement("div");
  grid.className = "ai-grid";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.className = "ai-cell";
      cell.setAttribute("data-row", `${i}`);
      cell.setAttribute("data-column", `${j}`);
      grid.append(cell);
    }
  }
  return grid;
}

export { createScreen3 };
