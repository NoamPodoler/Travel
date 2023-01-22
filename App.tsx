import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "./src/app/hooks";
import { fetchDestinations } from "./src/features/DataSlice";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { uuidv4 } from "@firebase/util";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  ]);

  return (
    <Provider store={store}>
      <Application />
    </Provider>
  );
}

const Application = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDestinations());
  }, []);

  const { destinations } = useAppSelector((state) => state.data);

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};
