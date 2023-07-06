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
  message.textContent = "Place your carrier";
  const directionsContainer = document.createElement("div");
  directionsContainer.className = "directions-container";
  const vertically = document.createElement("div");
  vertically.className = "vertically";
  vertically.textContent = "Vertically";
  const horizontally = document.createElement("div");
  horizontally.className = "horizontally";
  horizontally.textContent = "Horizontally";
  directionsContainer.append(vertically, horizontally);
  const grid = createGrid();
  screen2.append(message, directionsContainer, grid);
  body.append(screen2);
}

function eraseScreen2() {
  const screen2 = document.querySelector(".screen2");
  screen2.remove();
}

export { createScreen2, eraseScreen2 };
