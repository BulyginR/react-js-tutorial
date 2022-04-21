import { ParsedLineType } from "./parser";
import { OperatorType, UnaryOperationType } from "./mathOperators";

export const getLevels = (stack: ParsedLineType): number[] => {
  // TODO: считать уровни в функции calcByPriorityLevel
  const result: number[] = [];
  for (let key = 0; key < stack.length; key++) {
    const item = stack[key];
    if (typeof item !== "number" && result.indexOf(item.priority) < 0) {
      result.push(item.priority);
    }
  }
  if (result.length === 0) {
    throw new TypeError("Unexpected stack!");
  }

  return result.sort((a, b) => a - b);
};

export const calcByPriorityLevel = (
  stack: ParsedLineType,
  level: number
): ParsedLineType => {
  return stack.reduce<ParsedLineType>((result, nextItem) => {
    const prevItem = result[result.length - 2];
    const item = result[result.length - 1];

    if (
      nextItem &&
      typeof nextItem !== "number" &&
      nextItem.priority === level &&
      nextItem.operatorType === OperatorType.Unary
    ) {
      result = [
        ...result.slice(0, -1),
        (nextItem.function as UnaryOperationType)(item as number),
      ];
    } else if (item && typeof item !== "number" && item.priority === level) {
      result = [
        ...result.slice(0, -2),
        item.function(prevItem as number, nextItem as number),
      ];
    } else {
      if (
        nextItem &&
        typeof nextItem !== "number" &&
        nextItem.priority < level
      ) {
        throw new TypeError("Unexpected stack!");
      }
      if (item && typeof item !== "number" && item.priority < level) {
        throw new TypeError("Unexpected stack!");
      }
      result.push(nextItem);
    }
    return result;
  }, []);
};
