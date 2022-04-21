import { ParsedLineType, parser } from "./parser";

import { calcByPriorityLevel, getLevels } from "./engine";

export const runner = (line: string): number => {
  const stack = parser(line);
  if (stack === null) {
    throw new TypeError("Unexpected string");
  }

  const levels = getLevels(stack);

  const result = levels.reduce<ParsedLineType>((acc, curr) => {
    return calcByPriorityLevel(acc, curr);
  }, stack);

  return result[0] as number;
};
