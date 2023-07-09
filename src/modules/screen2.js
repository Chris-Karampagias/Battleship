/* eslint-disable no-plusplus */
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
  screen2.className = "screen2";
  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Place your carrier!";
  const directionsContainer = document.createElement("div");
  directionsContainer.className = "directions-container";
  const vertically = document.createElement("div");
  vertically.className = "vertically";
  vertically.textContent = "Vertically";
  const horizontally = document.createElement("div");
  horizontally.className = "horizontally";
  horizontally.classList.add("chosen");
  horizontally.textContent = "Horizontally";
  directionsContainer.append(vertically, horizontally);
  const resetButton = document.createElement("div");
  const randomizeButton = document.createElement("div");
  resetButton.textContent = "Reset";
  randomizeButton.textContent = "Randomize";
  resetButton.className = "reset-button";
  randomizeButton.className = "randomize-button";
  const container = document.createElement("div");
  container.className = "grid-container";
  const grid = createGrid();
  container.append(resetButton, grid, randomizeButton);
  screen2.append(message, directionsContainer, container);
  body.append(screen2);
}

function eraseScreen2() {
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
  const [c1, c2] = start;
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

function colorCell(cell) {
  cell.classList.add("marked");
}

function markCell(cell, name) {
  cell.setAttribute("data-ship", name);
}

export {
  createScreen2,
  unmarkCells,
  manipulateCells,
  colorCell,
  markCell,
  eraseScreen2,
};
