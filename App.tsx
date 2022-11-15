import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Provider } from "react-redux";

import { store } from "./src/app/store";
import * as Font from "expo-font";

import Navigator from "./src/components/Screens/Welcome/Welcome";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/components/navigations/RootNavigator";
import { I18nManager, StatusBar } from "react-native";

export default function App() {
  const customFonts = {
    "Lexend-Bold": require("./assets/fonts/Lexend-Bold.ttf"),
    "Lexend-ExtraBold": require("./assets/fonts/Lexend-ExtraBold.ttf"),
    "Lexend-Light": require("./assets/fonts/Lexend-Light.ttf"),
    "Lexend-Medium": require("./assets/fonts/Lexend-Medium.ttf"),
    "Lexend-Regular": require("./assets/fonts/Lexend-Regular.ttf"),
    "Lexend-SemiBold": require("./assets/fonts/Lexend-SemiBold.ttf"),
    "Lexend-Thin": require("./assets/fonts/Lexend-Thin.ttf"),
    "Alef-Regular": require("./assets/fonts/Alef-Regular.ttf"),
    "Alef-Bold": require("./assets/fonts/Alef-Bold.ttf"),
  };

  const loadFonts = async () => {
    await Font.loadAsync(customFonts);
  };
  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
