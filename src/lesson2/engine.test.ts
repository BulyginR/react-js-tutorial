import { getLevels, calcByPriorityLevel } from "./engine";
import { mathOperators } from "./mathOperators";
describe("getLevels simple cases", () => {
  it("[5, *, 3, +, 10, *, 3, **, +, 3, !]", () => {
    expect(
      getLevels([
        5,
        mathOperators["*"],
        3,
        mathOperators["+"],
        10,
        mathOperators["*"],
        3,
        mathOperators["**"],
        mathOperators["+"],
        3,
        mathOperators["!"],
      ])
    ).toEqual([1, 2, 3]);
  });
});

describe("getLevels invalid cases", () => {
  it("[5, 3]", () => {
    expect(() => getLevels([5, 3])).toThrow(TypeError("Unexpected stack!"));
  });
});

describe("calcByPriorityLevel simple cases", () => {
  it("[1, *, 32]", () => {
    expect(calcByPriorityLevel([1, mathOperators["*"], 32], 2)).toEqual([32]);
  });

  it("[32, /, 32]", () => {
    expect(calcByPriorityLevel([32, mathOperators["/"], 32], 2)).toEqual([1]);
  });

  it("[4, **]", () => {
    expect(calcByPriorityLevel([4, mathOperators["**"]], 1)).toEqual([16]);
  });

  it("[4, ^, 3]", () => {
    expect(calcByPriorityLevel([4, mathOperators["^"], 3], 1)).toEqual([64]);
  });

  it("[5, !]", () => {
    expect(calcByPriorityLevel([5, mathOperators["!"]], 1)).toEqual([120]);
  });

  it("[32, + 32]", () => {
    expect(calcByPriorityLevel([32, mathOperators["+"], 32], 2)).toEqual([
      32,
      mathOperators["+"],
      32,
    ]);
  });
});

describe("mixed levels cases", () => {
  it("[5, *, 3, +, 10, *, 3, **, +, 3, !]", () => {
    expect(
      calcByPriorityLevel(
        [
          5,
          mathOperators["*"],
          3,
          mathOperators["+"],
          10,
          mathOperators["*"],
          3,
          mathOperators["**"],
          mathOperators["+"],
          3,
          mathOperators["!"],
        ],
        1
      )
    ).toEqual([
      5,
      mathOperators["*"],
      3,
      mathOperators["+"],
      10,
      mathOperators["*"],
      9,
      mathOperators["+"],
      6,
    ]);
  });
});

describe("calcByPriorityLevel invalid cases", () => {
  it("[32, /, 32, +, 5]", () => {
    expect(() =>
      calcByPriorityLevel(
        [32, mathOperators["/"], 32, mathOperators["+"], 5],
        3
      )
    ).toThrow(TypeError("Unexpected stack!"));
  });
});
