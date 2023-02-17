import { Temporal } from "@js-temporal/polyfill";
import { createSlice, Reducer } from "@reduxjs/toolkit";
import { TODAY } from "../utils/constans";
import { DestinationInterface } from "../utils/interfaces";

interface State {
  selectedDestinations: DestinationInterface[];
  startingDate: Temporal.PlainDate | null;
  endingDate: Temporal.PlainDate | null;
}

const initialState: State = {
  selectedDestinations: [],
  startingDate: null,
  endingDate: null,
};

const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    modifySelectedDestination: (
      state: State,
      action: { payload: DestinationInterface }
    ) => {
      const isFoundIndex = state.selectedDestinations.findIndex(
        (item) => item.title === action.payload.title
      );

      // New Destination
      if (isFoundIndex === -1) state.selectedDestinations.push(action.payload);
      // Remove Existing Destination
      else
        state.selectedDestinations = state.selectedDestinations.filter(
          (item) => item.title !== action.payload.title
        );
    },

    addDestination: (
      state: State,
      action: { payload: DestinationInterface }
    ) => {
      state.selectedDestinations.push(action.payload);
    },

    removeDestination: (
      state: State,
      action: { payload: DestinationInterface }
    ) => {
      state.selectedDestinations = state.selectedDestinations.filter(
        (item) => item.title !== action.payload.title
      );
    },
    goAnywhere: (state: State, action: { payload: DestinationInterface }) => {
      state.selectedDestinations = [action.payload];
    },

    addDate: (state: State, action: { payload: Temporal.PlainDate }) => {
      // Selected date is in the past
      if (TODAY.until(action.payload).days < 0) return;

      // Starting date has not been selcted yet -> is equal to null
      if (state.startingDate === null) {
        state.startingDate = action.payload;
      }
      // Ending Date already have been selected -> values are being reset
      else if (state.endingDate !== null) {
        state.startingDate = action.payload;
        state.endingDate = null;
      }
      // New date is before the starting date and ending date has not been set yet
      else if (action.payload.until(state.startingDate).days > 0) {
        state.startingDate = action.payload;
      }
      // Ending date has not been selected yet and is not the same date as starting date
      else if (state.startingDate.until(action.payload).days !== 0) {
        state.endingDate = action.payload;
      }
    },

    setAnytime: (state: State) => {
      const start = TODAY;
      const end = TODAY.add({ years: 10 });
      if (
        state.startingDate === null ||
        state.endingDate === null ||
        state.startingDate.until(start).days !== 0 ||
        state.endingDate.until(end).days !== 0
      ) {
        state.startingDate = start;
        state.endingDate = end;
      }
    },

    resetData: (state: State) => {
      state.selectedDestinations = [];
    },

    resetDates: (state: State) => {
      state.startingDate = null;
      state.endingDate = null;
    },
  },
});

export const {
  modifySelectedDestination,
  addDestination,
  removeDestination,
  goAnywhere,
  addDate,
  setAnytime,
  resetData,
  resetDates,
} = SearchSlice.actions;
const reducer = SearchSlice.reducer as Reducer<State>;
export default reducer;
