/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_screen1_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/screen1.css */ \"./src/styles/screen1.css\");\n/* harmony import */ var _styles_screen2_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/screen2.css */ \"./src/styles/screen2.css\");\n/* harmony import */ var _styles_screen3_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/screen3.css */ \"./src/styles/screen3.css\");\n/* harmony import */ var _modules_screen1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/screen1 */ \"./src/modules/screen1.js\");\n/* harmony import */ var _modules_screen2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/screen2 */ \"./src/modules/screen2.js\");\n/* harmony import */ var _modules_screen3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/screen3 */ \"./src/modules/screen3.js\");\n\n\n\n\n\n\nconst body = document.querySelector(\"body\");\nlet name;\n(0,_modules_screen1__WEBPACK_IMPORTED_MODULE_3__.createScreen1)();\nconst submitButton = document.querySelector(\".submit-button\");\nsubmitButton.addEventListener(\"click\", e => {\n  name = (0,_modules_screen1__WEBPACK_IMPORTED_MODULE_3__.getName)();\n  e.preventDefault();\n  setTimeout(() => {\n    (0,_modules_screen1__WEBPACK_IMPORTED_MODULE_3__.eraseScreen1)();\n  }, 800);\n});\nconst screen1Observer = new MutationObserver(() => {\n  console.log(name);\n  const [playerBoard, aiBoard] = (0,_modules_screen2__WEBPACK_IMPORTED_MODULE_4__.screen2Logic)(name);\n  const screen2Observer = new MutationObserver(() => {\n    console.log(name);\n    (0,_modules_screen3__WEBPACK_IMPORTED_MODULE_5__.screen3Logic)(playerBoard, aiBoard, name);\n    screen2Observer.disconnect();\n  });\n  screen2Observer.observe(body, {\n    attributes: true\n  });\n  screen1Observer.disconnect();\n});\nscreen1Observer.observe(body, {\n  attributes: true\n});\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gameboard: () => (/* binding */ Gameboard),\n/* harmony export */   placeShipRandomly: () => (/* binding */ placeShipRandomly)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/modules/ship.js\");\n/* eslint-disable no-plusplus */\n\nconst Gameboard = () => {\n  const ships = [];\n  const createBoard = () => {\n    const board = [];\n    for (let i = 0; i < 10; i++) {\n      board.push([]);\n      for (let j = 0; j < 10; j++) {\n        board[i].push([i + 1, j + 1, null, false]);\n      }\n    }\n    return board;\n  };\n  const board = createBoard();\n  const showBoard = () => board; //method to test if board displays the correct coordinates\n\n  const placeShip = ship => {\n    const rowStart = ship.start[0];\n    const rowEnd = ship.end[0];\n    const columnStart = ship.start[1];\n    //the ship is placed horizontally\n    if (rowStart === rowEnd) {\n      //first makes sure that a ship is not placed\n      //in any of those cells\n      for (let k = columnStart; k < columnStart + ship.length; k++) {\n        if (board[rowStart][k][2]) {\n          return false;\n        }\n      }\n      for (let k = columnStart; k < columnStart + ship.length; k++) {\n        board[rowStart][k][2] = ship;\n      }\n      ships.push(ship);\n    } else {\n      //the ship is placed vertically\n      for (let k = rowStart; k < rowStart + ship.length; k++) {\n        if (board[k][columnStart][2]) {\n          return false;\n        }\n      }\n      for (let k = rowStart; k < rowStart + ship.length; k++) {\n        board[k][columnStart][2] = ship;\n      }\n      ships.push(ship);\n    }\n    return true;\n  };\n  const receiveAttack = cell => {\n    const i = cell[0],\n      j = cell[1];\n    if (board[i][j][2]) {\n      //if there is a ship there\n      board[i][j][2].hit();\n      board[i][j][3] = true;\n      return true;\n    }\n    board[i][j][3] = true;\n    return false;\n  };\n  const allShipsSunk = () => {\n    return ships.every(ship => ship.isSunk());\n  };\n  const shipIsAdded = type => {\n    return ships.some(ship => ship.type === type);\n  };\n  const clear = () => {\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        if (board[i][j][2]) {\n          board[i][j][2] = null;\n        }\n      }\n    }\n    while (ships.length !== 0) {\n      ships.pop();\n    }\n  };\n  const markHitCells = cells => {\n    for (let i = 0; i < board.length; i++) {\n      for (let j = 0; j < board.length; j++) {\n        if (board[i][j][3] === true && !board[i][j][2]) {\n          for (let k = 0; k < cells.length; k++) {\n            if (Number(cells[k].attributes[1].value) == i && Number(cells[k].attributes[2].value) == j) {\n              cells[k].classList.add(\"miss\");\n              break;\n            }\n          }\n        } else if (board[i][j][3] === true && board[i][j][2]) {\n          for (let k = 0; k < cells.length; k++) {\n            if (Number(cells[k].attributes[1].value) == i && Number(cells[k].attributes[2].value) == j) {\n              cells[k].classList.add(\"hit\");\n              break;\n            }\n          }\n        }\n      }\n    }\n  };\n  return {\n    showBoard,\n    placeShip,\n    receiveAttack,\n    allShipsSunk,\n    shipIsAdded,\n    clear,\n    markHitCells\n  };\n};\nfunction placeShipRandomly(board, type, length) {\n  let ship, si, sj, ei, ej;\n  si = Math.floor(Math.random() * 10);\n  sj = Math.floor(Math.random() * 10);\n  if (si === sj) {\n    //ship is placed horizontally\n    ej = sj + length - 1;\n    ei = si;\n    ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(type, length, [si, sj], [ei, ej]);\n  } else {\n    //ship is placed vertically\n    ei = si + length - 1;\n    ej = sj;\n    ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(type, length, [si, sj], [ei, ej]);\n  }\n  while (ej >= 10 || ei >= 10 || !board.placeShip(ship)) {\n    si = Math.floor(Math.random() * 10);\n    sj = Math.floor(Math.random() * 10);\n    if (si === sj) {\n      ej = sj + length - 1;\n      ei = si;\n    } else {\n      ei = si + length - 1;\n      ej = sj;\n    }\n    ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(type, length, [si, sj], [ei, ej]);\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/modules/gameboard.js?");

/***/ }),

/***/ "./src/modules/player-ai.js":
/*!**********************************!*\
  !*** ./src/modules/player-ai.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Computer: () => (/* binding */ Computer)\n/* harmony export */ });\nconst Computer = () => {\n  const makeRandomChoice = board => {\n    let i = Math.floor(Math.random() * 10),\n      j = Math.floor(Math.random() * 10);\n    while (board.showBoard()[i][j][3]) {\n      i = Math.floor(Math.random() * 10);\n      j = Math.floor(Math.random() * 10);\n    }\n    return [i, j];\n  };\n  return {\n    makeRandomChoice\n  };\n};\n\n\n//# sourceURL=webpack://battleship/./src/modules/player-ai.js?");

/***/ }),

/***/ "./src/modules/screen1.js":
/*!********************************!*\
  !*** ./src/modules/screen1.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createScreen1: () => (/* binding */ createScreen1),\n/* harmony export */   eraseScreen1: () => (/* binding */ eraseScreen1),\n/* harmony export */   getName: () => (/* binding */ getName)\n/* harmony export */ });\nfunction getName() {\n  const name = document.getElementById(\"name\");\n  return name.value;\n}\nfunction createScreen1() {\n  const screen1 = document.createElement(\"div\");\n  screen1.className = \"screen1\";\n  const logo = document.createElement(\"div\");\n  logo.className = \"logo\";\n  const form = document.createElement(\"form\");\n  const label = document.createElement(\"label\");\n  label.setAttribute(\"for\", \"name\");\n  const input = document.createElement(\"input\");\n  input.setAttribute(\"type\", \"text\");\n  input.setAttribute(\"id\", \"name\");\n  input.setAttribute(\"placeholder\", \"Enter your name...\");\n  input.setAttribute(\"name\", \"name\");\n  const submitButton = document.createElement(\"button\");\n  submitButton.setAttribute(\"type\", \"submit\");\n  submitButton.className = \"submit-button\";\n  submitButton.textContent = \"Start Game\";\n  label.append(input);\n  form.append(label, submitButton);\n  screen1.append(logo, form);\n  const body = document.querySelector(\"body\");\n  body.setAttribute(\"data-screen\", \"1\");\n  body.append(screen1);\n}\nfunction eraseScreen1() {\n  const screen1 = document.querySelector(\".screen1\");\n  const body = document.querySelector(\"body\");\n  body.setAttribute(\"data-screen\", \"2\");\n  screen1.remove();\n}\n\n\n//# sourceURL=webpack://battleship/./src/modules/screen1.js?");

/***/ }),

/***/ "./src/modules/screen2.js":
/*!********************************!*\
  !*** ./src/modules/screen2.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   highlightCells: () => (/* binding */ highlightCells),\n/* harmony export */   screen2Logic: () => (/* binding */ screen2Logic)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/modules/gameboard.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/modules/ship.js\");\n/* harmony import */ var _screen3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./screen3 */ \"./src/modules/screen3.js\");\n/* eslint-disable no-plusplus */\n\n\n\nfunction createGrid() {\n  const grid = document.createElement(\"div\");\n  grid.className = \"grid\";\n  for (let i = 0; i < 10; i++) {\n    for (let j = 0; j < 10; j++) {\n      const cell = document.createElement(\"div\");\n      cell.className = \"cell\";\n      cell.setAttribute(\"data-row\", `${i}`);\n      cell.setAttribute(\"data-column\", `${j}`);\n      grid.append(cell);\n    }\n  }\n  return grid;\n}\nfunction createScreen2() {\n  const body = document.querySelector(\"body\");\n  const screen2 = document.createElement(\"div\");\n  const resetButton = document.createElement(\"div\");\n  const randomizeButton = document.createElement(\"div\");\n  const directionsContainer = document.createElement(\"div\");\n  const message = document.createElement(\"div\");\n  const vertically = document.createElement(\"div\");\n  const horizontally = document.createElement(\"div\");\n  const container = document.createElement(\"div\");\n  const grid = createGrid();\n  screen2.className = \"screen2\";\n  message.className = \"message\";\n  message.textContent = \"Place your carrier!\";\n  directionsContainer.className = \"directions-container\";\n  vertically.className = \"vertically\";\n  vertically.textContent = \"Vertically\";\n  horizontally.className = \"horizontally\";\n  horizontally.classList.add(\"chosen\");\n  horizontally.textContent = \"Horizontally\";\n  directionsContainer.append(vertically, horizontally);\n  resetButton.textContent = \"Reset\";\n  randomizeButton.textContent = \"Randomize\";\n  resetButton.className = \"reset-button\";\n  randomizeButton.className = \"randomize-button\";\n  container.className = \"grid-container\";\n  container.append(message, directionsContainer, grid);\n  screen2.append(resetButton, container, randomizeButton);\n  body.append(screen2);\n}\nfunction eraseScreen2() {\n  const body = document.querySelector(\"body\");\n  body.setAttribute(\"data-screen\", \"3\");\n  const screen2 = document.querySelector(\".screen2\");\n  screen2.remove();\n}\nfunction unmarkCells(cells) {\n  for (let i = 0; i < cells.length; i++) {\n    if (cells[i].classList.contains(\"marked\") && !cells[i].hasAttribute(\"data-ship\")) {\n      cells[i].classList.remove(\"marked\");\n    }\n  }\n}\nfunction manipulateCells(start, cells, ship, callback) {\n  const horizontalOption = document.querySelector(\".horizontally\");\n  let [c1, c2] = start;\n  if (horizontalOption.classList.contains(\"chosen\")) {\n    if (c2 + ship[1] > 10) {\n      return;\n    } else if (cellsAreEmpty(c1, c2, \"horizontal\", ship[1], cells)) {\n      for (let k = c2; k < c2 + ship[1]; k++) {\n        for (let i = 0; i < cells.length; i++) {\n          if (Number(cells[i].attributes[1].value) === c1 && Number(cells[i].attributes[2].value) === k) {\n            callback(cells[i], ship[0]);\n            break;\n          }\n        }\n      }\n      return [c1, c2 + ship[1] - 1];\n    }\n  } else {\n    if (c1 + ship[1] > 10) {\n      return;\n    } else if (cellsAreEmpty(c1, c2, \"vertical\", ship[1], cells)) {\n      for (let k = c1; k < c1 + ship[1]; k++) {\n        for (let i = 0; i < cells.length; i++) {\n          if (Number(cells[i].attributes[2].value) === c2 && Number(cells[i].attributes[1].value) === k) {\n            callback(cells[i], ship[0]);\n            break;\n          }\n        }\n      }\n      return [c1 + ship[1] - 1, c2];\n    }\n  }\n}\nfunction cellsAreEmpty(c1, c2, direction, length, cells) {\n  if (direction === \"horizontal\") {\n    for (let k = c2; k < c2 + length; k++) {\n      for (let i = 0; i < cells.length; i++) {\n        if (Number(cells[i].attributes[1].value) === c1 && Number(cells[i].attributes[2].value) === k && cells[i].hasAttribute(\"data-ship\")) {\n          return false;\n        }\n      }\n    }\n  } else {\n    for (let k = c1; k < c1 + length; k++) {\n      for (let i = 0; i < cells.length; i++) {\n        if (Number(cells[i].attributes[2].value) === c2 && Number(cells[i].attributes[1].value) === k && cells[i].hasAttribute(\"data-ship\")) {\n          return false;\n        }\n      }\n    }\n  }\n  return true;\n}\nfunction randomize(playerBoard, aiBoard, ships, cells) {\n  const copy = ships.slice();\n  let currentShip;\n  while (copy.length !== 0) {\n    currentShip = copy.shift();\n    (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.placeShipRandomly)(playerBoard, currentShip[0], currentShip[1]);\n    (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.placeShipRandomly)(aiBoard, currentShip[0], currentShip[1]);\n  }\n  highlightCells(cells, playerBoard);\n}\nfunction highlightCells(cells, board) {\n  for (let i = 0; i < board.showBoard().length; i++) {\n    for (let j = 0; j < board.showBoard().length; j++) {\n      if (board.showBoard()[i][j][2]) {\n        for (let k = 0; k < cells.length; k++) {\n          if (Number(cells[k].attributes[1].value) === i && Number(cells[k].attributes[2].value) === j) {\n            //the cell's data-row and data-column properties match the indexes of the specified board position\n            colorCell(cells[k]);\n            break;\n          }\n        }\n      }\n    }\n  }\n}\nfunction clearGrid(cells) {\n  for (let i = 0; i < cells.length; i++) {\n    if (cells[i].hasAttribute(\"data-ship\")) {\n      cells[i].removeAttribute(\"data-ship\");\n    }\n    if (cells[i].classList.contains(\"marked\")) {\n      cells[i].classList.remove(\"marked\");\n    }\n  }\n}\nfunction colorCell(cell) {\n  cell.classList.add(\"marked\");\n}\nfunction markCell(cell, name) {\n  cell.setAttribute(\"data-ship\", name);\n}\nfunction screen2Logic(name) {\n  let currentShip;\n  const shipsInfo = [[\"carrier\", 5], [\"battleship\", 4], [\"destroyer\", 3], [\"submarine\", 3], [\"patrolBoat\", 2]];\n  createScreen2();\n  const playerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();\n  const aiBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();\n  const verticalOption = document.querySelector(\".vertically\");\n  const horizontalOption = document.querySelector(\".horizontally\");\n  const message = document.querySelector(\".message\");\n  const resetButton = document.querySelector(\".reset-button\");\n  const randomizeButton = document.querySelector(\".randomize-button\");\n  verticalOption.addEventListener(\"click\", e => {\n    if (e.target.classList.contains(\"chosen\")) {\n      return;\n    }\n    horizontalOption.classList.toggle(\"chosen\");\n    e.target.classList.toggle(\"chosen\");\n  });\n  horizontalOption.addEventListener(\"click\", e => {\n    if (e.target.classList.contains(\"chosen\")) {\n      return;\n    }\n    verticalOption.classList.toggle(\"chosen\");\n    e.target.classList.toggle(\"chosen\");\n  });\n  randomizeButton.addEventListener(\"click\", () => {\n    randomize(playerBoard, aiBoard, shipsInfo, cells);\n    verticalOption.classList.add(\"no-pointer-events\");\n    horizontalOption.classList.add(\"no-pointer-events\");\n    resetButton.classList.add(\"no-pointer-events\");\n    cells.forEach(cell => cell.classList.add(\"no-pointer-events\"));\n    message.textContent = \"Get Ready!\";\n    randomizeButton.classList.add(\"no-pointer-events\");\n    setTimeout(() => {\n      eraseScreen2();\n      (0,_screen3__WEBPACK_IMPORTED_MODULE_2__.createScreen3)(playerBoard, name);\n    }, 1500);\n  });\n  resetButton.addEventListener(\"click\", () => {\n    playerBoard.clear();\n    aiBoard.clear();\n    clearGrid(cells);\n    currentShip = undefined;\n    message.textContent = \"Place your carrier!\";\n    if (randomizeButton.classList.contains(\"no-pointer-events\")) {\n      randomizeButton.classList.remove(\"no-pointer-events\");\n    }\n  });\n  const cells = Array.from(document.querySelectorAll(\".cell\"));\n  cells.forEach(cell => {\n    cell.addEventListener(\"mouseover\", e => {\n      currentShip = shipsInfo.find(ship => !playerBoard.shipIsAdded(ship[0]));\n      if (e.target.hasAttribute(\"data-ship\")) {\n        return;\n      }\n      const start = [Number(e.target.attributes[1].value), Number(e.target.attributes[2].value)];\n      unmarkCells(cells);\n      manipulateCells(start, cells, currentShip, colorCell);\n    });\n    cell.addEventListener(\"click\", e => {\n      if (currentShip === undefined) {\n        currentShip = shipsInfo.find(ship => !playerBoard.shipIsAdded(ship[0]));\n      }\n      if (e.target.hasAttribute(\"data-ship\")) {\n        return;\n      }\n      randomizeButton.classList.add(\"no-pointer-events\");\n      const start = [Number(e.target.attributes[1].value), Number(e.target.attributes[2].value)];\n      const end = manipulateCells(start, cells, currentShip, markCell);\n      (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.placeShipRandomly)(aiBoard, currentShip[0], currentShip[1]);\n      const ship = (0,_ship__WEBPACK_IMPORTED_MODULE_1__.Ship)(currentShip[0], currentShip[1], start, end);\n      playerBoard.placeShip(ship);\n      if (currentShip[0] === \"patrolBoat\") {\n        verticalOption.classList.add(\"no-pointer-events\");\n        horizontalOption.classList.add(\"no-pointer-events\");\n        cells.forEach(cell => cell.classList.add(\"no-pointer-events\"));\n        resetButton.classList.add(\"no-pointer-events\");\n        message.textContent = \"Get ready!\";\n        setTimeout(() => {\n          eraseScreen2();\n          (0,_screen3__WEBPACK_IMPORTED_MODULE_2__.createScreen3)(playerBoard, name);\n        }, 1500);\n        return;\n      }\n      currentShip = shipsInfo.find(ship => !playerBoard.shipIsAdded(ship[0]));\n      if (currentShip[0] === \"patrolBoat\") {\n        message.textContent = \"Place your patrol boat!\";\n      } else {\n        message.textContent = \"Place your \" + currentShip[0] + \"!\";\n      }\n    });\n    cell.addEventListener(\"mouseout\", () => {\n      unmarkCells(cells);\n    });\n  });\n  return [playerBoard, aiBoard];\n}\n\n\n//# sourceURL=webpack://battleship/./src/modules/screen2.js?");

/***/ }),

/***/ "./src/modules/screen3.js":
/*!********************************!*\
  !*** ./src/modules/screen3.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createScreen3: () => (/* binding */ createScreen3),\n/* harmony export */   screen3Logic: () => (/* binding */ screen3Logic)\n/* harmony export */ });\n/* harmony import */ var _screen2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./screen2 */ \"./src/modules/screen2.js\");\n/* harmony import */ var _player_ai__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player-ai */ \"./src/modules/player-ai.js\");\n\n\nfunction createScreen3(playerBoard, name) {\n  const body = document.querySelector(\"body\");\n  const screen3 = document.createElement(\"div\");\n  screen3.className = \"screen3\";\n  const messageContainer = document.createElement(\"div\");\n  messageContainer.className = \"message-container\";\n  const message = document.createElement(\"div\");\n  message.className = \"message-screen3\";\n  console.log(name);\n  message.textContent = `Awaiting for orders ${name}`;\n  messageContainer.append(message);\n  const boards = document.createElement(\"div\");\n  boards.className = \"boards\";\n  const playerContainer = document.createElement(\"div\");\n  playerContainer.className = \"player-container\";\n  const playerWaters = document.createElement(\"div\");\n  playerWaters.className = \"player-waters\";\n  playerWaters.textContent = \"Friendly waters\";\n  const playerGrid = createPlayerGrid();\n  playerContainer.append(playerWaters, playerGrid);\n  const aiContainer = document.createElement(\"div\");\n  aiContainer.className = \"ai-container\";\n  const aiWaters = document.createElement(\"div\");\n  aiWaters.className = \"ai-waters\";\n  aiWaters.textContent = \"Enemy waters\";\n  const aiGrid = createAiGrid();\n  aiContainer.append(aiWaters, aiGrid);\n  boards.append(playerContainer, aiContainer);\n  screen3.append(messageContainer, boards);\n  body.append(screen3);\n  const playerCells = Array.from(document.querySelectorAll(\".player-cell\"));\n  (0,_screen2__WEBPACK_IMPORTED_MODULE_0__.highlightCells)(playerCells, playerBoard);\n}\nfunction createPlayerGrid() {\n  const grid = document.createElement(\"div\");\n  grid.className = \"player-grid\";\n  for (let i = 0; i < 10; i++) {\n    for (let j = 0; j < 10; j++) {\n      const cell = document.createElement(\"div\");\n      cell.className = \"player-cell\";\n      cell.setAttribute(\"data-row\", `${i}`);\n      cell.setAttribute(\"data-column\", `${j}`);\n      grid.append(cell);\n    }\n  }\n  return grid;\n}\nfunction createAiGrid() {\n  const grid = document.createElement(\"div\");\n  grid.className = \"ai-grid\";\n  for (let i = 0; i < 10; i++) {\n    for (let j = 0; j < 10; j++) {\n      const cell = document.createElement(\"div\");\n      cell.className = \"ai-cell\";\n      cell.setAttribute(\"data-row\", `${i}`);\n      cell.setAttribute(\"data-column\", `${j}`);\n      grid.append(cell);\n    }\n  }\n  return grid;\n}\nfunction screen3Logic(playerBoard, aiBoard, name) {\n  const ai = (0,_player_ai__WEBPACK_IMPORTED_MODULE_1__.Computer)();\n  const message = document.querySelector(\".message-screen3\");\n  const playerCells = Array.from(document.querySelectorAll(\".player-cell\"));\n  const aiCells = Array.from(document.querySelectorAll(\".ai-cell\"));\n  aiCells.forEach(cell => {\n    cell.addEventListener(\"click\", e => {\n      const coords = [Number(e.target.attributes[2].value), Number(e.target.attributes[1].value)];\n      aiCells.forEach(cell => {\n        cell.classList.add(\"no-pointer-events\");\n      });\n      if (aiBoard.receiveAttack(coords)) {\n        e.target.classList.add(\"hit\");\n        e.target.classList.add(\"no-pointer-events\");\n        setTimeout(() => {\n          message.textContent = \"It's a hit!\";\n        }, 200);\n        if (aiBoard.allShipsSunk()) {\n          setTimeout(name => {\n            message.textContent = `You win ${name}!`;\n          }, 700);\n          return;\n        }\n      } else {\n        e.target.classList.add(\"miss\");\n        e.target.classList.add(\"no-pointer-events\");\n        setTimeout(() => {\n          message.textContent = \"It's a miss!\";\n        }, 200);\n      }\n      setTimeout(() => {\n        message.textContent = \"It's enemy's turn!\";\n        setTimeout(() => {\n          const coords = ai.makeRandomChoice(playerBoard);\n          if (playerBoard.receiveAttack(coords)) {\n            setTimeout(() => {\n              message.textContent = \"It's a hit!\";\n            }, 200);\n            if (playerBoard.allShipsSunk()) {\n              setTimeout(() => {\n                message.textContent = \"You lose!\";\n              }, 1000);\n              return;\n            }\n          } else {\n            setTimeout(() => {\n              message.textContent = \"It's a miss!\";\n            }, 200);\n          }\n          playerBoard.markHitCells(playerCells);\n          setTimeout(() => {\n            message.textContent = \"It's your turn!\";\n            aiCells.forEach(cell => {\n              if (!cell.classList.contains(\"hit\") && !cell.classList.contains(\"miss\")) {\n                cell.classList.remove(\"no-pointer-events\");\n              }\n            });\n          }, 1300);\n        }, 1300);\n      }, 1500);\n    });\n  });\n}\n\n\n//# sourceURL=webpack://battleship/./src/modules/screen3.js?");

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\n/* eslint-disable no-plusplus */\nconst Ship = (type, length, start, end) => {\n  let timesHit = 0;\n  const hit = () => {\n    timesHit += 1;\n  };\n  const isSunk = () => {\n    if (length === timesHit) {\n      return true;\n    }\n    return false;\n  };\n  return {\n    type,\n    length,\n    start,\n    end,\n    hit,\n    isSunk\n  };\n};\n\n\n//# sourceURL=webpack://battleship/./src/modules/ship.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/screen1.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/screen1.css ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../images/battleship-logo.svg */ \"./src/images/battleship-logo.svg\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `body,\nhtml {\n  border: 0;\n  padding: 0;\n  margin: 0;\n  height: 100%;\n  overflow: hidden;\n}\n\n.screen1 {\n  font-size: 48px;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  align-items: space-between;\n  background-color: black;\n  justify-items: center;\n}\n\n.logo {\n  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-position: center;\n  height: 400px;\n  width: 100%;\n  transform: scale(2);\n  animation: 1.5s ease-in 0.1s 1;\n  animation-name: logo;\n}\n\nform {\n  height: 50%;\n  align-self: center;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 3rem;\n  animation: 1.8s linear 0.1s;\n  animation-name: form;\n}\n\n#name,\n.submit-button {\n  background-color: grey;\n  color: white;\n  font-size: 2rem;\n  font-family: inherit;\n  border-radius: 10px;\n  outline: none;\n}\n\n#name {\n  padding: 0.5rem;\n}\n\n::placeholder {\n  color: rgba(255, 255, 255, 0.643);\n}\n\n.submit-button {\n  width: fit-content;\n  align-self: center;\n  padding: 0.2rem 1rem;\n  cursor: pointer;\n  transition: all 0.2s ease-in;\n}\n\n.submit-button:hover {\n  transform: scale(1.1);\n}\n\n@keyframes logo {\n  from {\n    transform: scale(0);\n  }\n  to {\n    transform: scale(2);\n  }\n}\n\n@keyframes form {\n  from {\n    transform: scale(0);\n  }\n  to {\n    transform: scale(1);\n  }\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleship/./src/styles/screen1.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/screen2.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/screen2.css ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.screen2 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 48px;\n  background-color: rgb(8, 113, 198);\n  height: 100%;\n}\n\n.message {\n  color: white;\n  margin-top: 1rem;\n  border: 2px solid white;\n  border-radius: 10px;\n  padding: 0.5rem 1rem;\n}\n\n.directions-container {\n  font-size: 2rem;\n  display: flex;\n  gap: 1.5rem;\n  color: white;\n}\n\n.vertically,\n.horizontally {\n  cursor: pointer;\n  transition: all 0.2s ease-in;\n}\n\n.chosen {\n  padding-bottom: 0.2rem;\n  border-bottom: 2px solid white;\n}\n\n.grid {\n  aspect-ratio: 1/1;\n  background-color: white;\n  height: 100%;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.cell {\n  border: 1px solid rgb(8, 113, 198);\n  padding: 1rem;\n  cursor: pointer;\n}\n\n.no-pointer-events {\n  pointer-events: none;\n}\n\n.reset-button,\n.randomize-button,\n.grid-container {\n  transform: scale(1);\n  animation: 1.3s ease-in 1;\n  animation-name: screen2;\n}\n\n.reset-button,\n.randomize-button {\n  color: white;\n  cursor: pointer;\n  width: 15%;\n  text-align: center;\n  transition: all 0.2s ease-in;\n}\n\n.reset-button:hover,\n.randomize-button:hover {\n  transform: scale(1.1);\n}\n\n.grid-container {\n  display: flex;\n  flex-direction: column;\n  gap: 3rem;\n  height: 100%;\n  width: 60%;\n  margin-bottom: 1rem;\n  align-items: center;\n  justify-content: center;\n}\n\n.marked {\n  background-color: grey;\n}\n\n@keyframes screen2 {\n  from {\n    transform: scale(0);\n  }\n  to {\n    transform: scale(1);\n  }\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleship/./src/styles/screen2.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/screen3.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/screen3.css ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../images/x-symbol.svg */ \"./src/images/x-symbol.svg\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.screen3 {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  font-size: 48px;\n  background-color: rgb(8, 113, 198);\n  color: white;\n}\n\n.message-container {\n  height: 13%;\n  width: 100%;\n}\n\n.message-screen3 {\n  font-size: 3rem;\n  width: 100%;\n  text-align: center;\n  padding-top: 1rem;\n}\n\n.boards {\n  display: flex;\n  justify-content: space-between;\n  gap: 2rem;\n  height: 87%;\n  padding: 0 1rem;\n  margin-bottom: 1rem;\n}\n\n.player-container,\n.ai-container {\n  height: 100%;\n  width: 50%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.hit {\n  background-color: red;\n}\n\n.miss {\n  background: url(${___CSS_LOADER_URL_REPLACEMENT_0___});\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-origin: content-box;\n}\n\n.player-grid,\n.ai-grid {\n  aspect-ratio: 1/1;\n  background-color: white;\n  height: 100%;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.player-waters,\n.ai-waters {\n  font-size: 2rem;\n  border: 2px solid white;\n  border-radius: 10px;\n  padding: 0.2rem 0.2rem;\n}\n\n.player-cell,\n.ai-cell {\n  border: 1px solid rgb(8, 113, 198);\n  padding: 1rem;\n}\n\n.ai-cell {\n  cursor: pointer;\n}\n\n.message-container,\n.player-container,\n.ai-container {\n  transform: scale(1);\n  animation: 1.3s ease-in 1;\n  animation-name: screen3;\n}\n\n@keyframes screen3 {\n  from {\n    transform: scale(0);\n  }\n  to {\n    transform: scale(1);\n  }\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleship/./src/styles/screen3.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n  if (!url) {\n    return url;\n  }\n  url = String(url.__esModule ? url.default : url);\n\n  // If url is already wrapped in quotes, remove them\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n  if (options.hash) {\n    url += options.hash;\n  }\n\n  // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n  return url;\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/styles/screen1.css":
/*!********************************!*\
  !*** ./src/styles/screen1.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_screen1_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./screen1.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/screen1.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_screen1_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_screen1_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_screen1_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_screen1_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleship/./src/styles/screen1.css?");

/***/ }),

/***/ "./src/styles/screen2.css":
/*!********************************!*\
  !*** ./src/styles/screen2.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_screen2_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./screen2.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/screen2.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_screen2_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_screen2_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_screen2_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_screen2_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleship/./src/styles/screen2.css?");

/***/ }),

/***/ "./src/styles/screen3.css":
/*!********************************!*\
  !*** ./src/styles/screen3.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_screen3_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./screen3.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/screen3.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_screen3_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_screen3_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_screen3_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_screen3_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleship/./src/styles/screen3.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/images/battleship-logo.svg":
/*!****************************************!*\
  !*** ./src/images/battleship-logo.svg ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"images/battleship-logo.svg\";\n\n//# sourceURL=webpack://battleship/./src/images/battleship-logo.svg?");

/***/ }),

/***/ "./src/images/x-symbol.svg":
/*!*********************************!*\
  !*** ./src/images/x-symbol.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"images/x-symbol.svg\";\n\n//# sourceURL=webpack://battleship/./src/images/x-symbol.svg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;