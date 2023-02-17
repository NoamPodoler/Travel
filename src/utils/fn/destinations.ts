import { DestinationInterface } from "../interfaces";

export const destinationsToString = (list: DestinationInterface[]) => {
  return list?.map(
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

export const stringToDestination = (
  str: string
): DestinationInterface | null => {
  const index1 = str.indexOf("/");
  const index2 = str.substring(index1).indexOf("/");
  const index3 = str.substring(index2).indexOf("/");

  if (
    index1 === -1 ||
    index2 === -1 ||
    index3 === -1 ||
    index1 === index2 ||
    index1 == index3 ||
    index2 === index3
  )
    return null;

  return {
    title: str.substring(0, index1),
    country: str.substring(index1 + 1, index2),
    continent: str.substring(index2 + 1, index3),
  };
};

export const getDestinationsByCountries = (
  selectedDestinations: DestinationInterface[],
  destinations: DestinationInterface[]
) => {
  const countries = selectedDestinations.reduce((prev, item) => {
    if (prev.indexOf(item.country) === -1) return [...prev, item.country];
    else return prev;
  }, []);

  const relevantDestinations = destinations.reduce((prev, item) => {
    if (
      countries.indexOf(item.country) !== -1 &&
      selectedDestinations.indexOf(item) === -1
    )
      return [...prev, item];

    return prev;
  }, []);

  return relevantDestinations;
};
