import {
  DestinationInterface,
  PlanInterface,
  WorldInterface,
} from "./interfaces";
import { Temporal } from "@js-temporal/polyfill";

export const getRandomNumber = (n1: number, n2: number) => {
  return Math.round(Math.random() * (n2 - n1)) + n1 + 1;
};

//

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
  if (selectedDestinations.length === 0) return [];

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

export const _stringify = (obj: Object) => {
  return JSON.stringify(obj, Object.keys(obj).sort());
};

//

//

//

// export const getDestinationsByContinent = (
//   selectedDestinations: DestinationInterface[],
//   destinations: DestinationInterface[]
// ) => {
//   const continents = selectedDestinations.reduce((prev, item) => {
//     if (prev.indexOf(item.continent) === -1) return [...prev, item.continent];
//     else return prev;
//   }, []);

//   return destinations.filter(
//     (item) => continents.indexOf(item.continent) !== -1
//   );
// };
