import { createSlice, Reducer } from "@reduxjs/toolkit";
import { getLocales, getCalendars } from "expo-localization";

interface State {
  dark: boolean;
  darkStatusBar: boolean;
  isStatusBarShown: boolean | null;
  isFooterShown: boolean;
  location: any;
}

const initialState: State = {
  dark: true,
  darkStatusBar: false,
  isStatusBarShown: true,
  isFooterShown: true,
  location: getLocales(),
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

    setDarkStatusBar: (state: State, action: { payload: boolean }) => {
      state.darkStatusBar = action.payload;
    },

    resetStatusBar: (state: State, action: { payload: boolean }) => {
      state.darkStatusBar = !state.dark;
    },

    setStatusBarShown: (state: State, action: { payload: boolean }) => {
      state.isStatusBarShown = action.payload;
    },

    setFooter: (state: State, action: { payload: boolean }) => {
      state.isFooterShown = action.payload;
    },
  },
});

export const {
  setDarkMode,
  switchDarkMode,
  setDarkStatusBar,
  resetStatusBar,
  setStatusBarShown,
  setFooter,
} = SettingsSlice.actions;
const reducer = SettingsSlice.reducer as Reducer<State>;
export default reducer;
