import "./styles/screen1.css";
import "./styles/screen2.css";
import "./styles/screen3.css";
import { Player, Computer } from "./modules/player-ai";
import { Gameboard } from "./modules/gameboard";
import { createScreen1, getName, eraseScreen1 } from "./modules/screen1";
import { createScreen2, eraseScreen2 } from "./modules/screen2";

const body = document.querySelector("body");

const shipsInfo = {
  carrier: 5,
  battleship: 4,
  destroyer: 3,
  submarine: 3,
  patrolBoat: 2,
};
let name, player, ai, playerBoard, aiBoard;
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
