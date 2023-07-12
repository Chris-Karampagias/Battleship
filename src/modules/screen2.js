/* eslint-disable no-plusplus */
import { Gameboard, placeShipRandomly } from "./gameboard";
import { Ship } from "./ship";
import { createScreen3 } from "./screen3";

function createGrid() {
  const grid = document.createElement("div");
  grid.className = "grid";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.setAttribute("data-row", `${i}`);
      cell.setAttribute("data-column", `${j}`);
      grid.append(cell);
    }
  }
  return grid;
}

function createScreen2() {
  const body = document.querySelector("body");
  const screen2 = document.createElement("div");
  const resetButton = document.createElement("div");
  const randomizeButton = document.createElement("div");
  const directionsContainer = document.createElement("div");
  const message = document.createElement("div");
  const vertically = document.createElement("div");
  const horizontally = document.createElement("div");
  const container = document.createElement("div");
  const grid = createGrid();
  screen2.className = "screen2";
  message.className = "message";
  message.textContent = "Place your carrier!";
  directionsContainer.className = "directions-container";
  vertically.className = "vertically";
  vertically.textContent = "Vertically";
  horizontally.className = "horizontally";
  horizontally.classList.add("chosen");
  horizontally.textContent = "Horizontally";
  directionsContainer.append(vertically, horizontally);
  resetButton.textContent = "Reset";
  randomizeButton.textContent = "Randomize";
  resetButton.className = "reset-button";
  randomizeButton.className = "randomize-button";
  container.className = "grid-container";
  container.append(message, directionsContainer, grid);
  screen2.append(resetButton, container, randomizeButton);
  body.append(screen2);
}

function eraseScreen2() {
  const body = document.querySelector("body");
  body.setAttribute("data-screen", "3");
  const screen2 = document.querySelector(".screen2");
  screen2.remove();
}

function unmarkCells(cells) {
  for (let i = 0; i < cells.length; i++) {
    if (
      cells[i].classList.contains("marked") &&
      !cells[i].hasAttribute("data-ship")
    ) {
      cells[i].classList.remove("marked");
    }
  }
}

function manipulateCells(start, cells, ship, callback) {
  const horizontalOption = document.querySelector(".horizontally");
  let [c1, c2] = start;
  if (horizontalOption.classList.contains("chosen")) {
    if (c2 + ship[1] > 10) {
      return;
    } else if (cellsAreEmpty(c1, c2, "horizontal", ship[1], cells)) {
      for (let k = c2; k < c2 + ship[1]; k++) {
        for (let i = 0; i < cells.length; i++) {
          if (
            Number(cells[i].attributes[1].value) === c1 &&
            Number(cells[i].attributes[2].value) === k
          ) {
            callback(cells[i], ship[0]);
            break;
          }
        }
      }
      return [c1, c2 + ship[1] - 1];
    }
  } else {
    if (c1 + ship[1] > 10) {
      return;
    } else if (cellsAreEmpty(c1, c2, "vertical", ship[1], cells)) {
      for (let k = c1; k < c1 + ship[1]; k++) {
        for (let i = 0; i < cells.length; i++) {
          if (
            Number(cells[i].attributes[2].value) === c2 &&
            Number(cells[i].attributes[1].value) === k
          ) {
            callback(cells[i], ship[0]);
            break;
          }
        }
      }
      return [c1 + ship[1] - 1, c2];
    }
  }
}

function cellsAreEmpty(c1, c2, direction, length, cells) {
  if (direction === "horizontal") {
    for (let k = c2; k < c2 + length; k++) {
      for (let i = 0; i < cells.length; i++) {
        if (
          Number(cells[i].attributes[1].value) === c1 &&
          Number(cells[i].attributes[2].value) === k &&
          cells[i].hasAttribute("data-ship")
        ) {
          return false;
        }
      }
    }
  } else {
    for (let k = c1; k < c1 + length; k++) {
      for (let i = 0; i < cells.length; i++) {
        if (
          Number(cells[i].attributes[2].value) === c2 &&
          Number(cells[i].attributes[1].value) === k &&
          cells[i].hasAttribute("data-ship")
        ) {
          return false;
        }
      }
    }
  }

  return true;
}

function randomize(playerBoard, aiBoard, ships, cells) {
  const copy = ships.slice();
  let currentShip;
  while (copy.length !== 0) {
    currentShip = copy.shift();
    placeShipRandomly(playerBoard, currentShip[0], currentShip[1]);
    placeShipRandomly(aiBoard, currentShip[0], currentShip[1]);
  }
  highlightCells(cells, playerBoard);
}

function highlightCells(cells, board) {
  for (let i = 0; i < board.showBoard().length; i++) {
    for (let j = 0; j < board.showBoard().length; j++) {
      if (board.showBoard()[i][j][2]) {
        for (let k = 0; k < cells.length; k++) {
          if (
            Number(cells[k].attributes[1].value) === i &&
            Number(cells[k].attributes[2].value) === j
          ) {
            //the cell's data-row and data-column properties match the indexes of the specified board position
            colorCell(cells[k]);
            break;
          }
        }
      }
    }
  }
}

function clearGrid(cells) {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].hasAttribute("data-ship")) {
      cells[i].removeAttribute("data-ship");
    }
    if (cells[i].classList.contains("marked")) {
      cells[i].classList.remove("marked");
    }
  }
}

function colorCell(cell) {
  cell.classList.add("marked");
}

function markCell(cell, name) {
  cell.setAttribute("data-ship", name);
}

function screen2Logic(name) {
  let currentShip;
  const shipsInfo = [
    ["carrier", 5],
    ["battleship", 4],
    ["destroyer", 3],
    ["submarine", 3],
    ["patrolBoat", 2],
  ];
  createScreen2();
  const playerBoard = Gameboard();
  const aiBoard = Gameboard();
  const verticalOption = document.querySelector(".vertically");
  const horizontalOption = document.querySelector(".horizontally");
  const message = document.querySelector(".message");
  const resetButton = document.querySelector(".reset-button");
  const randomizeButton = document.querySelector(".randomize-button");

  verticalOption.addEventListener("click", (e) => {
    if (e.target.classList.contains("chosen")) {
      return;
    }
    horizontalOption.classList.toggle("chosen");
    e.target.classList.toggle("chosen");
  });

  horizontalOption.addEventListener("click", (e) => {
    if (e.target.classList.contains("chosen")) {
      return;
    }
    verticalOption.classList.toggle("chosen");
    e.target.classList.toggle("chosen");
  });

  randomizeButton.addEventListener("click", () => {
    randomize(playerBoard, aiBoard, shipsInfo, cells);
    verticalOption.classList.add("no-pointer-events");
    horizontalOption.classList.add("no-pointer-events");
    resetButton.classList.add("no-pointer-events");
    cells.forEach((cell) => cell.classList.add("no-pointer-events"));
    message.textContent = "Get Ready!";
    randomizeButton.classList.add("no-pointer-events");
    setTimeout(() => {
      eraseScreen2();
      createScreen3(playerBoard, name);
    }, 1500);
  });

  resetButton.addEventListener("click", () => {
    playerBoard.clear();
    aiBoard.clear();
    clearGrid(cells);
    currentShip = undefined;
    message.textContent = "Place your carrier!";
    if (randomizeButton.classList.contains("no-pointer-events")) {
      randomizeButton.classList.remove("no-pointer-events");
    }
  });

  const cells = Array.from(document.querySelectorAll(".cell"));
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", (e) => {
      currentShip = shipsInfo.find((ship) => !playerBoard.shipIsAdded(ship[0]));
      if (e.target.hasAttribute("data-ship")) {
        return;
      }
      const start = [
        Number(e.target.attributes[1].value),
        Number(e.target.attributes[2].value),
      ];
      unmarkCells(cells);
      manipulateCells(start, cells, currentShip, colorCell);
    });

    cell.addEventListener("click", (e) => {
      if (currentShip === undefined) {
        currentShip = shipsInfo.find(
          (ship) => !playerBoard.shipIsAdded(ship[0])
        );
      }
      if (e.target.hasAttribute("data-ship")) {
        return;
      }
      randomizeButton.classList.add("no-pointer-events");
      const start = [
        Number(e.target.attributes[1].value),
        Number(e.target.attributes[2].value),
      ];
      const end = manipulateCells(start, cells, currentShip, markCell);
      placeShipRandomly(aiBoard, currentShip[0], currentShip[1]);
      const ship = Ship(currentShip[0], currentShip[1], start, end);
      playerBoard.placeShip(ship);
      if (currentShip[0] === "patrolBoat") {
        verticalOption.classList.add("no-pointer-events");
        horizontalOption.classList.add("no-pointer-events");
        cells.forEach((cell) => cell.classList.add("no-pointer-events"));
        resetButton.classList.add("no-pointer-events");
        message.textContent = "Get ready!";
        setTimeout(() => {
          eraseScreen2();
          createScreen3(playerBoard, name);
        }, 1500);
        return;
      }
      currentShip = shipsInfo.find((ship) => !playerBoard.shipIsAdded(ship[0]));
      if (currentShip[0] === "patrolBoat") {
        message.textContent = "Place your patrol boat!";
      } else {
        message.textContent = "Place your " + currentShip[0] + "!";
      }
    });

    cell.addEventListener("mouseout", () => {
      unmarkCells(cells);
    });
  });
  return [playerBoard, aiBoard];
}

export { screen2Logic, highlightCells };
