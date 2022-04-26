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

export const getOperatorTypeAndFunctionFromFunction = (
  func: UnaryOperationType | ScalarOperationType
): Pick<MathOperatorType, "operatorType" | "function"> => {
  let operatorType: OperatorType;
  switch (func.length) {
    case 1:
      operatorType = OperatorType.Unary;
      break;
    case 2:
      operatorType = OperatorType.Binary;
      break;
    default:
      throw new TypeError("Unexpected arguments count!");
  }
  return {
    operatorType,
    function: func,
  };
};

export const mathOperators: { [key: string]: MathOperatorType } = {
  "*": {
    title: "*",
    ...getOperatorTypeAndFunctionFromFunction(mul),
    priority: 2,
  },
  "/": {
    title: "/",
    ...getOperatorTypeAndFunctionFromFunction(div),
    priority: 2,
  },
  "+": {
    title: "+",
    ...getOperatorTypeAndFunctionFromFunction(add),
    priority: 3,
  },
  "-": {
    title: "-",
    ...getOperatorTypeAndFunctionFromFunction(minus),
    priority: 3,
  },
  "^": {
    title: "^",
    ...getOperatorTypeAndFunctionFromFunction(exp),
    priority: 1,
  },
  "**": {
    title: "**",
    ...getOperatorTypeAndFunctionFromFunction(square),
    priority: 1,
  },
  "!": {
    title: "!",
    ...getOperatorTypeAndFunctionFromFunction(factorial),
    priority: 1,
  },
};
