import "./styles/screen1.css";
import "./styles/screen2.css";
import "./styles/screen3.css";
import { createScreen1, eraseScreen1, getName } from "./modules/screen1";
import { screen2Logic } from "./modules/screen2";
import { screen3Logic } from "./modules/screen3";

const body = document.querySelector("body");
let name;
createScreen1();
const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", (e) => {
  name = getName();
  e.preventDefault();
  setTimeout(() => {
    eraseScreen1();
  }, 800);
});
const screen1Observer = new MutationObserver(() => {
  console.log(name);
  const [playerBoard, aiBoard] = screen2Logic(name);
  const screen2Observer = new MutationObserver(() => {
    console.log(name);
    screen3Logic(playerBoard, aiBoard, name);
    screen2Observer.disconnect();
  });
  screen2Observer.observe(body, { attributes: true });
  screen1Observer.disconnect();
});
screen1Observer.observe(body, { attributes: true });
