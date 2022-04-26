import { runner } from "./runner";

describe.each([
  ["1 * 32", 32],
  ["2 * 32", 64],
  ["2 + 32", 34],
  ["4 **", 16],
  ["3 ^ 5", 243],
  ["5 !", 120],
  ["(5 + 2) * (4 - 1)", 21],
  ["(5 + 4) * ((7 - 5) * 2)", 36],
  ["2 + ((5 * 4) + ((7 - 5) * 2))", 26],
])("Runner(%s) simple cases", (line, expected) => {
  test(`returns ${expected}`, () => {
    expect(runner(line)).toEqual(expected);
  });
});

describe.each([
  ["2 * 2 * 3", 12],
  ["2 * 2 + 3", 7],
  ["2 + 2 * 3", 8],
])("Runner(%s) tripled/mixed cases", (line, expected) => {
  test(`returns ${expected}`, () => {
    expect(runner(line)).toEqual(expected);
  });
});

describe.each([
  ["20 + 1 * 10 - 5 * 3", 15],
  ["20 - 10 * 10 / 5 - 3", -3],
  ["20 - 10 * 10 / 5 - 3 + 2 ^ 3", 5],
  ["(20 - 10) * 10 / (5 - 3 + 2) ^ 3", 100 / 64],
])("Runner(%s) long cases", (line, expected) => {
  test(`returns ${expected}`, () => {
    expect(runner(line)).toEqual(expected);
  });
});
