import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BOTTOMTAB, LANDING } from "./NavigationTypes";
import Landing from "../screens/Landing";
import BottomTabNavigator from "./BottomTabNavigator";
import { useThemeColors } from "../app/hooks";
import { StatusBar, View } from "react-native";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isDark } = useThemeColors();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        barStyle={isDark ? "light-content" : "dark-content"}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureDirection: "vertical",
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name={LANDING} component={Landing} />
        <Stack.Screen name={BOTTOMTAB} component={BottomTabNavigator} />
      </Stack.Navigator>
    </View>
  );
};

export default RootNavigator;
