import { Temporal } from "@js-temporal/polyfill";
import { createSlice, Reducer } from "@reduxjs/toolkit";
import { DESTINATIONS, TODAY } from "../utils/constans";

const TEMPORAL_NULL = Temporal.PlainDate.from({ year: 2020, month: 1, day: 1 });

interface State {
  selectedDestinations: typeof DESTINATIONS;
  startingDate: Temporal.PlainDate;
  endingDate: Temporal.PlainDate;
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
      action: { payload: typeof DESTINATIONS[0] }
    ) => {
      const isFoundIndex = state.selectedDestinations.findIndex(
        (item) => item.city === action.payload.city
      );

      // New Destination
      if (isFoundIndex === -1) state.selectedDestinations.push(action.payload);
      // Remove Existing Destination
      else
        state.selectedDestinations = state.selectedDestinations.filter(
          (item) => item.city !== action.payload.city
        );
    },

    addDate: (state: State, action: { payload: Temporal.PlainDate }) => {
      // Selected date is in the past
      if (TODAY.until(action.payload).days < 0) return;

      if (state.startingDate === null) state.startingDate = action.payload;
      else if (state.endingDate !== null) {
        state.startingDate = action.payload;
        state.endingDate = null;
      } else if (action.payload.until(state.startingDate).days > 0)
        state.startingDate = action.payload;
      else state.endingDate = action.payload;
    },
  },
});

export const { modifySelectedDestination, addDate } = SearchSlice.actions;
const reducer = SearchSlice.reducer as Reducer<State>;
export default reducer;
