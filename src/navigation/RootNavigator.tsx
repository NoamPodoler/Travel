import React, { useEffect, useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MAIN, LANDING, SETTINGS, CREATE_TRIP } from "./NavigationTypes";
import Landing from "../screens/Landing";
import { useAppSelector, useThemeColors } from "../app/hooks";
import { StatusBar, View } from "react-native";
import Main from "../screens/Main";
import Settings from "../screens/Settings";
import SearchMap from "../screens/SearchTab/SearchMap";
import CreateTrip from "../screens/createTrip/CreateTrip";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { darkStatusBar, isStatusBarShown } = useAppSelector(
    (state) => state.settings
  );

  const statusBar = useMemo(() => {
    if (darkStatusBar === null) return;
    return darkStatusBar ? "dark-content" : "light-content";
  }, [darkStatusBar]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        barStyle={statusBar}
        hidden={!isStatusBarShown}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // gestureDirection: "vertical",
          // gestureEnabled: false,
        }}
      >
        <Stack.Screen name={MAIN} component={Main} />
        <Stack.Screen name={CREATE_TRIP} component={CreateTrip} />
        <Stack.Screen name={SETTINGS} component={Settings} />
        <Stack.Screen name={LANDING} component={Landing} />
      </Stack.Navigator>
    </View>
  );
};

export default RootNavigator;
