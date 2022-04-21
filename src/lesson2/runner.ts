import { ParsedLineType, parser } from "./parser";

import { calcByPriorityLevel, getLevels } from "./engine";
import { parenthesesParser, ParsedParenthesesType } from "./parenthesesParser";

const calcParenthesesLess = (line: string): number => {
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

type ParenthesesItemOffsetType = {
  item: ParsedParenthesesType;
  offsetStart: number;
  offsetEnd: number;
};

type ResultWithOffsets = {
  value: string;
  offsets: ParenthesesItemOffsetType[];
};

export const runner = (line: string): number => {
  const parentheses = parenthesesParser(line);

  if (parentheses.length === 0) {
    return calcParenthesesLess(line);
  }

  // Сортируем по убыванию
  const parenthesesLevelSorted = parentheses.sort((a, b) => b.level - a.level);

  const result = parenthesesLevelSorted.reduce<ResultWithOffsets>(
    (acc, curr) => {
      if (!curr.end) {
        throw new TypeError("Not closed parentheses!");
      }

      const accValue = acc.value;
      const accOffsets = acc.offsets;

      const startWithinOffset = curr.start - accOffsets[0].offsetStart;
      const endWithinOffset = curr.end - accOffsets[0].offsetEnd;
      const calcPartLine = accValue.substring(
        startWithinOffset + 1,
        endWithinOffset
      );
      const calcPart = calcParenthesesLess(calcPartLine).toString();

      const resultValue = `${accValue.substring(
        0,
        startWithinOffset
      )}${calcPart}${accValue.substring(endWithinOffset + 1)}`;
      const resultOffsets: ParenthesesItemOffsetType[] = acc.offsets.reduce<
        ParenthesesItemOffsetType[]
      >((offsetAcc, offsetCurr, offsetIndex) => {
        if (offsetIndex === 0) {
          return [];
        }

        if (!curr.end || !offsetCurr.item.end) {
          // TODO: понять почему Typescript повторно требует проверку curr.end
          throw new TypeError("Not closed parentheses!");
        }
        offsetAcc.push({
          item: offsetCurr.item,
          offsetStart:
            offsetCurr.offsetStart +
            (offsetCurr.item.start > curr.end
              ? calcPartLine.length + 2 - calcPart.length
              : 0),
          offsetEnd:
            offsetCurr.offsetEnd +
            (offsetCurr.item.end > curr.end
              ? calcPartLine.length + 2 - calcPart.length
              : 0),
        });
        return offsetAcc;
      }, []);
      return { value: resultValue, offsets: resultOffsets };
    },
    {
      value: line,
      offsets: parenthesesLevelSorted.map((item) => {
        return {
          item: item,
          offsetStart: 0,
          offsetEnd: 0,
        } as ParenthesesItemOffsetType;
      }),
    }
  );

  return calcParenthesesLess(result.value);
};
