import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  LANDING,
  MAIN_DATES,
  MAIN_DESTINATIONS,
  MAIN_EXPLORE,
} from "../NavigationTypes";
import { useAppSelector, useThemeColors } from "../../app/hooks";
import PlanExploreAndCreate from "./screens/tripExploreCreate/PlanExploreAndCreate";
import { View } from "react-native";
import TripDestination from "./screens/tripDestination/TripDestination";
import TripDates from "./screens/tripDates/TripDates";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={MAIN_DESTINATIONS} component={TripDestination} />
      <Stack.Screen name={MAIN_DATES} component={TripDates} />
      <Stack.Screen name={MAIN_EXPLORE} component={PlanExploreAndCreate} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
