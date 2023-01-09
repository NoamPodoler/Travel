import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  Store,
  Reducer,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import SearchSlice from "../features/SearchSlice";
import SettingsSlice from "../features/SettingsSlice";
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: { settings: SettingsSlice, search: SearchSlice },
  middleware: customizedMiddleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
