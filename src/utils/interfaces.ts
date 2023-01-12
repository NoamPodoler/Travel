import { DESTINATIONS, TODAY } from "./constans";

export interface TripTicketItemIteface {
  title: string;
  name: string;
  people: number;
  destinations: typeof DESTINATIONS;
  startingDate: typeof TODAY;
  endingDate: typeof TODAY;
}
