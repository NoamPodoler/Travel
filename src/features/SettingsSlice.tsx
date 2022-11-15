import { createSlice, Reducer } from "@reduxjs/toolkit";

interface Account {
  username: string;
  email: string;
}

interface State {
  dark: boolean;
  account: Account | null;
}

const initialState: State = {
  dark: false,
  account: null,
};

const SettingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDarkMode: (state: State, action: { payload: boolean }) => {
      state.dark = action.payload;
    },

    switchDarkMode: (state: State) => {
      state.dark = !state.dark;
    },

    setAccount: (state: State, action: { payload: Account }) => {
      state.account = action.payload;
    },
  },
});

export const { setDarkMode, switchDarkMode, setAccount } =
  SettingsSlice.actions;
const reducer = SettingsSlice.reducer as Reducer<State>;
export default reducer;
