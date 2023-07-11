/* eslint-disable no-unused-vars */
import "./styles/screen1.css";
import "./styles/screen2.css";
import "./styles/screen3.css";
import { Player, Computer } from "./modules/player-ai";
import { Gameboard } from "./modules/gameboard";
import { createScreen1, getName, eraseScreen1 } from "./modules/screen1";
import { screen2Logic } from "./modules/screen2";
import { Ship } from "./modules/ship";

const body = document.querySelector("body");
let name, player, ai, screen2, playerCells, aiCells, messageScreen3;
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
  screen2Logic(playerBoard, aiBoard, shipsInfo, currentShip);
  screen2 = document.querySelector(".screen2");
  const screen2Observer = new MutationObserver(() => {
    console.log("hello");
  });
  screen2Observer.observe(body, { attributes: true });
  screen1Observer.disconnect();
});
screen1Observer.observe(body, { attributes: true });
