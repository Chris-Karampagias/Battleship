import { highlightCells } from "./screen2";
import { Computer } from "./player-ai";

function createScreen3(playerBoard, name) {
  const body = document.querySelector("body");
  const screen3 = document.createElement("div");
  screen3.className = "screen3";
  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container";
  const message = document.createElement("div");
  message.className = "message-screen3";
  message.textContent = `Awaiting for orders ${name}`;
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

function screen3Logic(playerBoard, aiBoard, name) {
  const ai = Computer();
  const message = document.querySelector(".message-screen3");
  const playerCells = Array.from(document.querySelectorAll(".player-cell"));
  const aiCells = Array.from(document.querySelectorAll(".ai-cell"));
  aiCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      const coords = [
        Number(e.target.attributes[2].value),
        Number(e.target.attributes[1].value),
      ];
      aiCells.forEach((cell) => {
        cell.classList.add("no-pointer-events");
      });
      if (aiBoard.receiveAttack(coords)) {
        e.target.classList.add("hit");
        e.target.classList.add("no-pointer-events");
        setTimeout(() => {
          message.textContent = "It's a hit!";
        }, 200);
        if (aiBoard.allShipsSunk()) {
          setTimeout(() => {
            message.textContent = `You win ${name}!`;
          }, 700);
          return;
        }
      } else {
        e.target.classList.add("miss");
        e.target.classList.add("no-pointer-events");
        setTimeout(() => {
          message.textContent = "It's a miss!";
        }, 200);
      }
      setTimeout(() => {
        message.textContent = "It's enemy's turn!";
        setTimeout(() => {
          const coords = ai.makeRandomChoice(playerBoard);
          if (playerBoard.receiveAttack(coords)) {
            setTimeout(() => {
              message.textContent = "It's a hit!";
            }, 200);
            if (playerBoard.allShipsSunk()) {
              setTimeout(() => {
                message.textContent = "You lose!";
              }, 1000);
              return;
            }
          } else {
            setTimeout(() => {
              message.textContent = "It's a miss!";
            }, 200);
          }
          playerBoard.markHitCells(playerCells);
          setTimeout(() => {
            message.textContent = "It's your turn!";
            aiCells.forEach((cell) => {
              if (
                !cell.classList.contains("hit") &&
                !cell.classList.contains("miss")
              ) {
                cell.classList.remove("no-pointer-events");
              }
            });
          }, 1300);
        }, 1300);
      }, 1500);
    });
  });
}

export { screen3Logic, createScreen3 };
