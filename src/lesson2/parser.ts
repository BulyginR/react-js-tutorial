import { isNumber } from "./helpers";
import { mathOperators, MathOperatorType, OperatorType } from "./mathOperators";

export type ParsedLineType = Array<number | MathOperatorType>;

export const parser = (line: string): ParsedLineType | null => {
  const stack = line.split(" ");

  return stack.reduce<ParsedLineType>((result, item, key) => {
    const prevItem = result[key - 1];

    const isValidNumberPush =
      isNumber(item) &&
      (!prevItem ||
        (typeof prevItem !== "number" &&
          prevItem.operatorType === OperatorType.Binary));

    if (isValidNumberPush) {
      result.push(Number(item));
      return result;
    }

    const operator = mathOperators?.[item];

    // Проверяем что оператор есть и перед ним - число / унарный оператор
    if (
      !operator ||
      (typeof prevItem !== "number" &&
        prevItem.operatorType !== OperatorType.Unary)
    ) {
      throw new TypeError("Unexpected string");
    }

    // Проверяем что есть следующий элемент для бинарного
    if (
      operator.operatorType === OperatorType.Binary &&
      stack.length === key + 1
    ) {
      throw new TypeError("Unexpected string");
    }

    result.push(operator);
    return result;
  }, []);
};
