/* eslint-disable no-unused-vars */
import "./styles/screen1.css";
import "./styles/screen2.css";
import "./styles/screen3.css";
import { Player, Computer } from "./modules/player-ai";
import { Gameboard, placeShipRandomly } from "./modules/gameboard";
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
import { Ship } from "./modules/ship";

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
  }, 800);
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
  playerBoard = Gameboard();
  aiBoard = Gameboard();
  currentShip = shipsInfo.shift();
  const verticalOption = document.querySelector(".vertically");
  const horizontalOption = document.querySelector(".horizontally");
  const message = document.querySelector(".message");

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
      }
      currentShip = shipsInfo.shift();
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
  screen1Observer.disconnect();
});
screen1Observer.observe(body, { attributes: true });
