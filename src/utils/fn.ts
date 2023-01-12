import { DESTINATIONS, TODAY } from "./constans";

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

export const getMonth = (month: number) => {
  if (month === 1) return "Janurary";
  if (month === 2) return "Feburary";
  if (month === 3) return "March";
  if (month === 4) return "April";
  if (month === 5) return "May";
  if (month === 6) return "June";
  if (month === 7) return "July";
  if (month === 8) return "August";
  if (month === 9) return "September";
  if (month === 10) return "October";
  if (month === 11) return "November";
  if (month === 12) return "December";
  return "";
};

export const getDay = (day: number) => {
  if (day < 0 || day > 31) return;
  else if (day === 1 || day === 21 || day === 31) return `${day}st`;
  else if (day === 2 || day === 22) return `${day}nd`;
  else if (day === 3 || day === 23) return `${day}rd`;
  return `${day}th`;
};

export const destinationsToString = (list: typeof DESTINATIONS) => {
  return list.map(
    (item, index) =>
      `${item.city}${
        index < list.length - 2
          ? ", "
          : index !== list.length - 1
          ? " and "
          : ""
      }`
  );
};

export const dateFormat = (date: typeof TODAY) => {
  return `${getMonth(date.month)} ${getDay(date.day)}, ${date.year}`;
};

export const getRandomNumber = (n1: number, n2: number) => {
  return Math.round(Math.random() * (n2 - n1)) + n1 + 1;
};
