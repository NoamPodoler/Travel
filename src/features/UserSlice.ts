import { createSlice, Reducer } from "@reduxjs/toolkit";
import { User as FirebaseUser, User } from "firebase/auth";
import { UserType } from "../utils/interfaces";

interface State {
  firebaseUser: FirebaseUser | null;
  additionalData: UserType | null;
}

const initialState: State = {
  firebaseUser: null,
  additionalData: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state: State,
      action: {
        payload: {
          firebaseUser: FirebaseUser | null;
          additionalData: UserType;
        };
      }
    ) => {
      state.firebaseUser = action.payload.firebaseUser;
      state.additionalData = action.payload.additionalData;
    },

    disconnect: (state: State) => {
      state.additionalData = null;
      state.firebaseUser = null;
    },
  },
});

export const { setUser, disconnect } = UserSlice.actions;
const reducer = UserSlice.reducer as Reducer<State>;
export default reducer;
