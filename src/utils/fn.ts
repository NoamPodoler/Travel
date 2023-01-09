export const hexToRgbA = (hex, opacity) => {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join("")}`;
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(
      ","
    )},${opacity})`;
  }
  throw new Error("Bad Hex");
};

export const toLines = (
  str: string,
  numOfChars = 18,
  bool = false
): string[] => {
  let arr = [];
  let _str = str;
  while (_str.length > 0) {
    const line = getStringMaxChar(_str, numOfChars);
    arr.push(bool ? [[line.result]] : [line.result]);
    _str = line.remain;
  }

  return arr;
};

export const getStringMaxChar = (
  str: string,
  numOfChars: number
): { result: string; remain: string } => {
  const indexOfSpace = str.indexOf(" ");

  if (indexOfSpace > numOfChars) return { result: "", remain: str };
  else if (indexOfSpace == -1) {
    const isSmall = str.length <= numOfChars;
    return { result: isSmall ? str : "", remain: isSmall ? "" : str };
  } else {
    const word = str.slice(0, indexOfSpace);
    const nextCall = getStringMaxChar(
      str.slice(indexOfSpace + 1),
      numOfChars - indexOfSpace
    );

    return { result: `${word} ${nextCall.result}`, remain: nextCall.remain };
  }
};
