import { createSlice, Reducer } from "@reduxjs/toolkit";

interface Account {
  username: string;
  email: string;
}

interface State {
  dark: boolean;
  darkStatusBar: boolean;
  isStatusBarShown: boolean | null;
  account: Account | null;
}

const initialState: State = {
  dark: false,
  darkStatusBar: true,
  isStatusBarShown: true,
  account: null,
};

const SettingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDarkMode: (state: State, action: { payload: boolean }) => {
      state.dark = action.payload;
      state.darkStatusBar = !state.dark;
    },

    switchDarkMode: (state: State) => {
      state.dark = !state.dark;
      state.darkStatusBar = !state.dark;
    },

    setAccount: (state: State, action: { payload: Account }) => {
      state.account = action.payload;
    },

    setDarkStatusBar: (state: State, action: { payload: boolean }) => {
      state.darkStatusBar = action.payload;
    },

    resetStatusBar: (state: State, action: { payload: boolean }) => {
      state.darkStatusBar = !state.dark;
    },

    setStatusBarShown: (state: State, action: { payload: boolean }) => {
      state.isStatusBarShown = action.payload;
    },
  },
});

export const {
  setDarkMode,
  switchDarkMode,
  setAccount,
  setDarkStatusBar,
  resetStatusBar,
  setStatusBarShown,
} = SettingsSlice.actions;
const reducer = SettingsSlice.reducer as Reducer<State>;
export default reducer;
