export type ScalarOperationType = (first: number, second: number) => number;
export type UnaryOperationType = (first: number) => number;
export enum OperatorType {
  Unary,
  Binary,
}
export type MathOperatorType = {
  title?: string;
  operatorType: OperatorType;
  function: ScalarOperationType | UnaryOperationType;
  priority: number;
};

export const exp: ScalarOperationType = (
  first: number,
  second: number
): number => Math.pow(first, second);

export const factorial: UnaryOperationType = (first: number): number => {
  return first !== 1 ? first * factorial(first - 1) : 1;
};

export const square: UnaryOperationType = (first: number): number => {
  return exp(first, 2);
};

export const mul: ScalarOperationType = (
  first: number,
  second: number
): number => first * second;

export const div: ScalarOperationType = (
  first: number,
  second: number
): number => first / second;

export const add: ScalarOperationType = (
  first: number,
  second: number
): number => first + second;

export const minus: ScalarOperationType = (
  first: number,
  second: number
): number => first - second;

export const mathOperators: { [key: string]: MathOperatorType } = {
  "*": {
    title: "*",
    operatorType: OperatorType.Binary,
    function: mul,
    priority: 2,
  },
  "/": {
    title: "/",
    operatorType: OperatorType.Binary,
    function: div,
    priority: 2,
  },
  "+": {
    title: "+",
    operatorType: OperatorType.Binary,
    function: add,
    priority: 3,
  },
  "-": {
    title: "-",
    operatorType: OperatorType.Binary,
    function: minus,
    priority: 3,
  },
  "^": {
    title: "^",
    operatorType: OperatorType.Binary,
    function: exp,
    priority: 1,
  },
  "**": {
    title: "**",
    operatorType: OperatorType.Unary,
    function: square,
    priority: 1,
  },
  "!": {
    title: "!",
    operatorType: OperatorType.Unary,
    function: factorial,
    priority: 1,
  },
};
