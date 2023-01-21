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

export default function App() {
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

  // const writeData = async () => {
  //   try {
  //     await setDoc(doc(db, "destinations/Amsterdam", "2023"), {
  //       destinations: destinations,
  //     });
  //     console.log("success");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (destinations.length > 0) writeData();
  // }, [destinations]);

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};
