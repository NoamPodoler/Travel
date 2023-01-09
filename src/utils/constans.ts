import { Temporal } from "@js-temporal/polyfill";
import { Dimensions } from "react-native";

export const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } =
  Dimensions.get("screen");

export const TODAY = Temporal.Now.plainDateISO();

// Trip Destination

export const ITEM_WIDTH = 200;
export const ITEM_HORIZONTAL_MARGIN = 10;

//

export const DESTINATIONS = [
  {
    city: "Bangkok",
    country: "Thailand",
    image: require("../../assets/images/destinations/Bangkok.jpeg"),
  },
  {
    city: "London",
    country: "United Kingdom",
    image: require("../../assets/images/destinations/London.jpeg"),
  },
  {
    city: "Paris",
    country: "France",
    image: require("../../assets/images/destinations/Paris.jpeg"),
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    image: require("../../assets/images/destinations/Dubai.jpeg"),
  },
  {
    city: "Singapore",
    country: "Singapore",
    image: require("../../assets/images/destinations/Singapore.jpeg"),
  },
  {
    city: "New-York",
    country: "United States",
    image: require("../../assets/images/destinations/New-York.jpeg"),
  },
  {
    city: "Istanbul",
    country: "Turkey",
    image: require("../../assets/images/destinations/Istanbul.jpeg"),
  },
  {
    city: "Antalya",
    country: "Turkey",
    image: require("../../assets/images/destinations/Antalya.jpeg"),
  },
  {
    city: "Kuala-Lumpur",
    country: "Malaysia",
    image: require("../../assets/images/destinations/Kuala-Lumpur.jpeg"),
  },
  {
    city: "Makkah",
    country: "Saudi Arabia",
    image: require("../../assets/images/destinations/Makkah.jpeg"),
  },
  {
    city: "Rome",
    country: "Italy",
    image: require("../../assets/images/destinations/Rome.jpeg"),
  },
  {
    city: "Hanoi",
    country: "Vietnam",
    image: require("../../assets/images/destinations/Hanoi.jpeg"),
  },
  {
    city: "Phuket",
    country: "Thailand",
    image: require("../../assets/images/destinations/Phuket.jpeg"),
  },
  {
    city: "Agra",
    country: "India",
    image: require("../../assets/images/destinations/Agra.jpeg"),
  },
  {
    city: "Shanghai",
    country: "China",
    image: require("../../assets/images/destinations/Bangkok.jpeg"),
  },
  {
    city: "Barcelona",
    country: "Spain",
    image: require("../../assets/images/destinations/Bangkok.jpeg"),
  },
  {
    city: "Amsterdam",
    country: "Netherlands",
    image: require("../../assets/images/destinations/Bangkok.jpeg"),
  },
  {
    city: "Siem Reap",
    country: "Cambodia",
    image: require("../../assets/images/destinations/Bangkok.jpeg"),
  },
  {
    city: "Lisbon",
    country: "Portugal",
    image: require("../../assets/images/destinations/Bangkok.jpeg"),
  },
  {
    city: "Venice",
    country: "Italy",
    image: require("../../assets/images/destinations/Bangkok.jpeg"),
  },
  {
    city: "Prague",
    country: "Czech Republic",
    image: require("../../assets/images/destinations/Bangkok.jpeg"),
  },
  {
    city: "Orlando",
    country: "United States",
    image: require("../../assets/images/destinations/Bangkok.jpeg"),
  },
  {
    city: "Florence",
    country: "Italy",
    image: require("../../assets/images/destinations/Bangkok.jpeg"),
  },
  {
    city: "Sydney",
    country: "Australia",
    image: require("../../assets/images/destinations/Bangkok.jpeg"),
  },
  {
    city: "Bali",
    country: "Indonesia",
    image: require("../../assets/images/destinations/Bangkok.jpeg"),
  },
  {
    city: "Miami",
    country: "USA",
    image: require("../../assets/images/destinations/Bangkok.jpeg"),
  },
];
