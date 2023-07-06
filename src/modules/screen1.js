function getName() {
  const name = document.getElementById("name");
  return name.value;
}

function createScreen1() {
  const screen1 = document.createElement("div");
  screen1.className = "screen1";
  const logo = document.createElement("div");
  logo.className = "logo";
  const form = document.createElement("form");
  const label = document.createElement("label");
  label.setAttribute("for", "name");
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "name");
  input.setAttribute("placeholder", "Enter your name...");
  input.setAttribute("name", "name");
  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.className = "submit-button";
  submitButton.textContent = "Start Game";
  label.append(input);
  form.append(label, submitButton);
  screen1.append(logo, form);
  const body = document.querySelector("body");
  body.setAttribute("data-screen", "1");
  body.append(screen1);
}

function eraseScreen1() {
  const screen1 = document.querySelector(".screen1");
  const body = document.querySelector("body");
  body.setAttribute("data-screen", "2");
  screen1.remove();
}

export { createScreen1, getName, eraseScreen1 };
