import React, { useEffect, useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  MAIN,
  LANDING,
  SETTINGS,
  SIGNINUP,
  PROFILE,
  PLAN,
} from "./NavigationTypes";
import Landing from "../screens/Landing";
import { useAppSelector, useThemeColors } from "../app/hooks";
import { StatusBar, View } from "react-native";
import Settings from "../screens/Settings";
import SignInUp from "../screens/signInUp/SignInUp";
import Profile from "../screens/Profile";
import Plan from "../screens/Plan";
import Main from "../screens/main/Main";

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
          gestureDirection: "vertical",
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name={LANDING} component={Landing} />
        <Stack.Screen name={MAIN} component={Main} />
        <Stack.Screen
          name={SIGNINUP}
          component={SignInUp}
          initialParams={{ startWithPopup: false }}
        />
        <Stack.Screen name={PLAN} component={Plan} />
        <Stack.Screen name={PROFILE} component={Profile} />
        <Stack.Screen name={SETTINGS} component={Settings} />
      </Stack.Navigator>
    </View>
  );
};

export default RootNavigator;
