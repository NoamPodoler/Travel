import { Temporal } from "@js-temporal/polyfill";
import { Dimensions } from "react-native";
export const CUSTOM_DURATION = 500;

export const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } =
  Dimensions.get("screen");

export const TODAY = Temporal.Now.plainDateISO();

export const CONTINENTS = [
  "Europe",
  "Asia",
  "South America",
  "North America",
  "Oceania",
  "Africa",
];
