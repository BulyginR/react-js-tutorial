export type ParsedParenthesesType = {
  level: number;
  start: number;
  end?: number;
};

export const parenthesesParser = (line: string): ParsedParenthesesType[] => {
  const result: ParsedParenthesesType[] = [];
  let level = 0;
  for (let key = 0; key < line.length; key++) {
    if (line[key] === "(") {
      level++;
      result.push({ level, start: key } as ParsedParenthesesType);
    } else if (line[key] === ")") {
      if (result.length === 0 || level === 0) {
        throw new TypeError("Unexpected parentheses!");
      }
      level--;
      for (let prevKey = result.length - 1; prevKey >= 0; prevKey--) {
        if (!result[prevKey].end) {
          result[prevKey].end = key;
          break;
        }
      }
    }
  }
  if (level !== 0) {
    throw new TypeError("Unexpected parentheses!");
  }
  return result;
};
