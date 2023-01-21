import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  Store,
  Reducer,
  getDefaultMiddleware,
  createStore,
  applyMiddleware,
} from "@reduxjs/toolkit";
import SearchSlice from "../features/SearchSlice";
import SettingsSlice from "../features/SettingsSlice";
import UserSlice from "../features/UserSlice";
import DataSlice from "../features/DataSlice";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: {
    settings: SettingsSlice,
    search: SearchSlice,
    user: UserSlice,
    data: DataSlice,
  },
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
