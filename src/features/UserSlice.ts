import { createSlice, Reducer } from "@reduxjs/toolkit";
import { User as FirebaseUser } from "firebase/auth";

interface State {
  user: FirebaseUser | null;
  fullName: string | null;
  country: string | null;
}

const initialState: State = {
  user: null,
  fullName: null,
  country: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state: State,
      action: {
        payload: {
          user: FirebaseUser | null;
          fullName: string | null;
          country: string | null;
        };
      }
    ) => {
      state.user = action.payload.user;
      state.fullName = action.payload.fullName;
      state.country = action.payload.country;
    },
  },
});

export const { setUser } = UserSlice.actions;
const reducer = UserSlice.reducer as Reducer<State>;
export default reducer;
