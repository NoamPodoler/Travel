import { Temporal } from "@js-temporal/polyfill";
import { TODAY } from "../constans";

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

//

export const dateFormat = (date: typeof TODAY) => {
  return `${getMonth(date.month)} ${getDay(date.day)}, ${date.year}`;
};

export const dateToInt = (date: Temporal.PlainDate) => {
  return Temporal.PlainDate.from({ year: 2000, month: 1, day: 1 }).until(date)
    .days;
};

export const intToDate = (int: number) => {
  return Temporal.PlainDate.from({ year: 2000, month: 1, day: 1 }).add({
    days: int,
  });
};

export const dateToMonthYear = (date: Temporal.PlainDate): string => {
  return date.toPlainYearMonth().toString();
};
