/* eslint-disable no-unused-vars */
import "./styles/screen1.css";
import "./styles/screen2.css";
import "./styles/screen3.css";
import { Player, Computer } from "./modules/player-ai";
import { Gameboard } from "./modules/gameboard";
import { createScreen1, getName, eraseScreen1 } from "./modules/screen1";
import {
  createScreen2,
  unmarkCells,
  showPosition,
  colorCell,
  markCell,
  eraseScreen2,
  manipulateCells,
} from "./modules/screen2";

const body = document.querySelector("body");
let name, player, ai;
//Screen 1

createScreen1();
const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", (e) => {
  const playerName = getName();
  e.preventDefault();
  name = playerName;
  setTimeout(() => {
    eraseScreen1();
    player = Player(name);
    ai = Computer();
  }, 1300);
});

//Screen 2
const shipsInfo = [
  ["carrier", 5],
  ["battleship", 4],
  ["destroyer", 3],
  ["submarine", 3],
  ["patrolBoat", 2],
];
let currentShip;
let playerBoard, aiBoard;
//Create screen2 when screen1 gets deleted via mutation observer
const screen1Observer = new MutationObserver(() => {
  createScreen2();
  currentShip = shipsInfo.shift();
  playerBoard = Gameboard();
  aiBoard = Gameboard();
  const verticalOption = document.querySelector(".vertically");
  const horizontalOption = document.querySelector(".horizontally");

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

  const cells = Array.from(document.querySelectorAll(".cell"));
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", (e) => {
      if (e.target.hasAttribute("data-ship")) {
        return;
      }
      const coords = [
        Number(e.target.attributes[1].value),
        Number(e.target.attributes[2].value),
      ];
      unmarkCells(cells);
      manipulateCells(coords, cells, currentShip, colorCell);
    });

    cell.addEventListener("click", (e) => {
      if (e.target.hasAttribute("data-ship")) {
        return;
      }
      const coords = [
        Number(e.target.attributes[1].value),
        Number(e.target.attributes[2].value),
      ];
      manipulateCells(coords, cells, currentShip, markCell);
    });

    cell.addEventListener("mouseout", () => {
      unmarkCells(cells);
    });
  });
  screen1Observer.disconnect();
});
screen1Observer.observe(body, { attributes: true });
