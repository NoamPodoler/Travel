import {
  StatusBar,
  StatusBarProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeNavigator from "../Screens/Welcome/Welcome";
import {
  CHATS,
  HOME,
  MAIN_NAVIGATOR,
  PRODUCT_LISTING,
  SELL,
  WELCOME,
} from "./NavigationTypes";
import Sell from "../Screens/Sell";
import Home from "../Screens/Home/Home";
import Chats from "../Screens/Chats";
import ProductListings from "../Screens/ProductListings";
import { useThemeColors } from "../../app/hooks";
import MainNavigator from "./MainNavigator";

type Props = {};

const Stack = createNativeStackNavigator();
const STATUS_BAR_STYLES = ["dark-content", "light-content"];

const RootNavigator = (props: Props) => {
  const colors = useThemeColors();
  const barStyle = colors.isDark ? STATUS_BAR_STYLES[1] : STATUS_BAR_STYLES[0];

  return (
    <View style={{ flex: 1 }}>
      {/*
 // @ts-ignore*/}
      <StatusBar barStyle={barStyle} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name={WELCOME} component={WelcomeNavigator} />
        <Stack.Screen name={MAIN_NAVIGATOR} component={MainNavigator} />
      </Stack.Navigator>
    </View>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
