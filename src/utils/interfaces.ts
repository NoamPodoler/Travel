import { Timestamp } from "firebase/firestore";
import { CONTINENTS } from "./constans";

export const GENDER_OPTIONS = ["Men", "Any", "Female"];
export const LANGUAGE_OPTIONS = [
  "English",
  "French",
  "Spanish",
  "German",
  "Hebrew",
  "Dutch",
  "Arabic",
  "Other",
];

export type GendersType = typeof GENDER_OPTIONS[number];
export type LanguagesType = typeof LANGUAGE_OPTIONS[number];

export type ContinentType = typeof CONTINENTS[number];

export interface DestinationInterface {
  continent: string;
  country: string;
  title: string;
}

export interface WorldInterface {
  africa: DestinationInterface[];
  asia: DestinationInterface[];
  europe: DestinationInterface[];
  oceania: DestinationInterface[];
  southAmerica: DestinationInterface[];
  northAmerica: DestinationInterface[];
}

//

//

// export type MonthIntType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type PlanType = "Travel" | "";
export type BudgetType = "Cheap" | "Expensive" | "Normal";

export interface PlanCreator {
  name: string;
  id: string;
}

export interface PlanInterface {
  title: string;
  destinations: DestinationInterface[] | string[];
  startingDate: number;
  endingDate: number;
  departureMonthYear: string;
  origin: string; //
  global: boolean; //
  description: string;
  languages: LanguagesType[];
  gender: GendersType;
  type: PlanType[]; //
  budget: BudgetType; //
  creatorName: string;
  creatorUid: string;
  uid: string;
}

//

export interface UserDataInterface {
  name: string;
  email: string;
  password: string;
  country: string;
}

export type UserType = {
  uid: string;
  name: string;
  country: string;
};

export type MessageType = {
  value: string;
  from: UserType;
  time: Timestamp;
  id: string;
  refrence?: MessageType;
};
