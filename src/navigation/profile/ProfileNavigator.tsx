import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  LANDING,
  MAIN_DATES,
  MAIN_DESTINATIONS,
  MAIN_EXPLORE,
  PROFILE_HOME,
  PROFILE_PLANS,
} from "../NavigationTypes";
import { useAppSelector, useThemeColors } from "../../app/hooks";
import PlanExploreAndCreate from "../main/screens/tripExploreCreate/PlanExploreAndCreate";
import { View } from "react-native";
import ProfilePlans from "./screens/ProfilePlans";
import ProfileHome from "./screens/ProfileHome";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={PROFILE_HOME} component={ProfileHome} />
      <Stack.Screen name={PROFILE_PLANS} component={ProfilePlans} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
