import { Easing, withTiming } from "react-native-reanimated";
import { TODAY } from "./constans";
import { User as FirebaseUser } from "firebase/auth";
import {
  DestinationInterface,
  PlanInterface,
  WorldInterface,
} from "./interfaces";
import { Temporal } from "@js-temporal/polyfill";

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

export const destinationsToString = (list: DestinationInterface[]) => {
  return list.map(
    (item, index) =>
      `${item.title}${
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

export const withCustomTiming = (i: number, duration = 600) => {
  "worklet";
  return withTiming(i, {
    easing: Easing.bezier(0.33, 1, 0.68, 1),
    duration,
  });
};

//

export const isUserValid = ({
  user,
  fullName,
  country,
}: {
  user: FirebaseUser;
  fullName: string;
  country: string;
}) => {
  if (user === null) return false;
  if (fullName === null) return false;
  if (country === null) return false;

  return true;
};

export const isEmailValid = (email: string) => {
  const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const isValid = expression.test(email);
  return { error: isValid ? "" : "Email is Invalid", isValid: isValid };
};

export const isPasswordValid = (pwd: string) => {
  if (pwd.length < 5)
    return { isValid: false, error: "Password must be at least 5 characters" };
  if (pwd.length > 15)
    return { isValid: false, error: "Password must be under 15 characters" };

  return { isValid: true, error: "" };
};

export const isFullNameValid = (name: string) => {
  if (name.length < 5)
    return { isValid: false, error: "Name must be at least 5 characters" };
  if (name.length > 25)
    return { isValid: false, error: "Name must be under 25 characters" };

  return { isValid: true, error: "" };
};

export const isPasswordsMatching = (pwd1: string, pwd2: string) => {
  return {
    isValid: pwd1 === pwd2 && isPasswordValid(pwd1).isValid,
    error:
      pwd1 === pwd2
        ? isPasswordValid(pwd1).isValid
          ? ""
          : "Password is not Valid"
        : "Passwords are not matching",
  };
};

export const getContinentList = (continent: string, list: WorldInterface) => {
  if (continent === "Africa") return list.africa;
  if (continent === "Asia") return list.asia;
  if (continent === "Europe") return list.europe;
  if (continent === "Oceania") return list.oceania;
  if (continent === "South America") return list.southAmerica;
  if (continent === "North America") return list.northAmerica;
};

export const getAlternativeDestinationsFromSelectedDestinations = (
  selectedDestinations,
  continents
): DestinationInterface[] => {
  return selectedDestinations
    .reduce((acc, item) => {
      if (acc.findIndex((i) => i.continent == item.continent) === -1)
        acc.push({
          continent: item.continent,
          list: getContinentList(item.continent, continents).filter(
            (item) => selectedDestinations.indexOf(item) === -1
          ),
        });
      return acc;
    }, [])
    .map((item) => item.list)
    .flat();
};

//

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

export const dateToPriorMonthYear = (date: Temporal.PlainDate): string[] => {
  return [dateToMonthYear(date.add({ months: -1 })), dateToMonthYear(date)];
};

//

export const isPlanValid = (plan: PlanInterface) => {
  if (plan.title?.length === 0) return false;
  if (plan.destinations?.length === 0) return false;
  if (plan.creator === null) return false;
  if (plan.startingDate === null || plan.endingDate === null) return false;

  return true;
};
