const createTakenCells = () => {
  const fakeCells = [];
  for (let i = 0; i <= 100; i++) {
    for (let j = 0; j <= 100; j++) {
      const cell = {
        attributes: [0, { value: i }, { value: j }],
        hasAttribute: "data-ship",
        classList: {
          contains: "marked",
        },
      };
      fakeCells.push(cell);
    }
  }
  return fakeCells;
};

const createEmptyCells = () => {
  const fakeCells = [];
  for (let i = 0; i <= 100; i++) {
    for (let j = 0; j <= 100; j++) {
      const cell = {
        attributes: [0, { value: i }, { value: j }],
        hasAttribute: null,
        classList: {
          contains: "marked",
        },
      };
      fakeCells.push(cell);
    }
  }
  return fakeCells;
};

const fakeCellsTaken = createTakenCells();
const fakeCellsEmpty = createEmptyCells();

function cellsAreEmptyMock(c1, c2, direction, length, cells) {
  if (direction === "horizontal") {
    for (let k = c2; k < c2 + length; k++) {
      for (let i = 0; i < cells.length; i++) {
        if (
          cells[i].attributes[1].value === c1 &&
          cells[i].attributes[2].value === k &&
          cells[i].hasAttribute === "data-ship"
        ) {
          return false;
        }
      }
    }
  } else {
    for (let k = c1; k < c1 + length; k++) {
      for (let i = 0; i < cells.length; i++) {
        if (
          cells[i].attributes[2].value === c2 &&
          cells[i].attributes[1].value === k &&
          cells[i].hasAttribute === "data-ship"
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

function unmarkCellsMock(cells) {
  for (let i = 0; i < cells.length; i++) {
    if (
      cells[i].classList.contains === "marked" &&
      !(cells[i].hasAttribute === "data-ship")
    ) {
      return true;
    }
  }
  return false;
}

describe("tests for cellsAreEmpty", () => {
  test("returns false if cells are taken horizontally", () => {
    expect(cellsAreEmptyMock(0, 1, "horizontal", 5, fakeCellsTaken)).toBe(
      false
    );
  });

  test("returns false if cells are taken vertically", () => {
    expect(cellsAreEmptyMock(0, 1, "vertical", 5, fakeCellsTaken)).toBe(false);
  });

  test("returns true if cells are empty horizontally", () => {
    expect(cellsAreEmptyMock(0, 1, "horizontal", 5, fakeCellsEmpty)).toBe(true);
  });

  test("returns true if cells are empty vertically", () => {
    expect(cellsAreEmptyMock(0, 1, "vertical", 5, fakeCellsEmpty)).toBe(true);
  });
});

describe("tests for unmarkCells", () => {
  test("returns true if there are cells that can get unmarked", () => {
    expect(unmarkCellsMock(fakeCellsEmpty)).toBe(true);
  });

  test("returns false if no cells can get unmarked", () => {
    expect(unmarkCellsMock(fakeCellsTaken)).toBe(false);
  });
});
