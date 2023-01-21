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

export type MonthIntType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface PlanCreator {
  name: string;
  id: string;
}

export interface PlanInterface {
  title: string;
  destinations: DestinationInterface[];
  startingDate: number;
  endingDate: number;
  departureMonthYear: string;
  creator: PlanCreator;
  description: string;
  languages: LanguagesType[];
  gender: GendersType;
  uid: string;
}

//
