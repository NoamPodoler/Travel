import { createSlice, Reducer, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { DestinationInterface, WorldInterface } from "../utils/interfaces";

interface State {
  destinations: DestinationInterface[];
  continents: WorldInterface;
}

const initialState: State = {
  destinations: [],
  continents: {
    africa: [],
    asia: [],
    europe: [],
    oceania: [],
    southAmerica: [],
    northAmerica: [],
  },
};

export const fetchDestinations = createAsyncThunk(
  "data/fetchDestinations",
  async () => {
    try {
      const docRef = doc(db, "data", "initialData");
      const docSnap = await getDoc(docRef);
      const destinations = docSnap.data().destinations;
      return destinations;
    } catch (error) {
      console.log(error);
    }

    return [];
  }
);

const DataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDestinations.pending, (state) => {});
    builder.addCase(
      fetchDestinations.fulfilled,
      (state, action: { payload: any[] }) => {
        state.destinations = action.payload;
        //
        let continents = {
          africa: [],
          asia: [],
          europe: [],
          oceania: [],
          southAmerica: [],
          northAmerica: [],
        };

        // sorting destinations in continents array
        action.payload.forEach((item) => {
          if (item.continent === "Africa") continents.africa.push(item);
          if (item.continent === "Asia") continents.asia.push(item);
          if (item.continent === "Europe") continents.europe.push(item);
          if (item.continent === "Oceania") continents.oceania.push(item);
          if (item.continent === "South America")
            continents.southAmerica.push(item);
          if (item.continent === "North America")
            continents.northAmerica.push(item);
        });

        state.continents = continents;
      }
    );
    builder.addCase(fetchDestinations.rejected, (state, action) => {});
  },
});

export const {} = DataSlice.actions;
const reducer = DataSlice.reducer as Reducer<State>;
export default reducer;
