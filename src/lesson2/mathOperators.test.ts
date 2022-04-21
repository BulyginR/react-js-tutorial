import { mul, div, add, minus, exp, square, factorial } from "./mathOperators";

describe("mathOperators test cases", () => {
  it("mul 1 * 2 to equal 2", () => {
    expect(mul(1, 2)).toBe(2);
  });

  it("mul 2 * 2 to equal 4", () => {
    expect(mul(2, 2)).toBe(4);
  });

  it("div 2 / 2 to equal 1", () => {
    expect(div(2, 2)).toBe(1);
  });

  it("div 4 / 2 to equal 2", () => {
    expect(div(4, 2)).toBe(2);
  });

  it("add 4 + 2 to equal 6", () => {
    expect(add(4, 2)).toBe(6);
  });

  it("minus 4 - 2 to equal 2", () => {
    expect(minus(4, 2)).toBe(2);
  });

  it("exp 6 ** to equal 36", () => {
    expect(square(6)).toBe(36);
  });

  it("exp 3 ^ 3 to equal 27", () => {
    expect(exp(3, 3)).toBe(27);
  });

  it("exp 5! to equal 120", () => {
    expect(factorial(5)).toBe(120);
  });
});
