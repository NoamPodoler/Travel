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
import { CHATS, HOME, PRODUCT_LISTING, SELL, WELCOME } from "./NavigationTypes";
import Sell from "../Screens/Sell";
import Home from "../Screens/Home/Home";
import Chats from "../Screens/Chats";
import ProductListings from "../Screens/ProductListings";
import { useThemeColors } from "../../app/hooks";

type Props = {};

const Stack = createNativeStackNavigator();
const STATUS_BAR_STYLES = ["dark-content", "light-content"];

const MainNavigator = (props: Props) => {
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
        }}
      >
        <Stack.Screen name={HOME} component={Home} />
        <Stack.Screen name={SELL} component={Sell} />
        <Stack.Screen name={CHATS} component={Chats} />
        <Stack.Screen name={PRODUCT_LISTING} component={ProductListings} />
      </Stack.Navigator>
    </View>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
