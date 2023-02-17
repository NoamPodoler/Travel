import React, { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  MAIN,
  LANDING,
  SETTINGS,
  SIGNINUP,
  PROFILE,
  PLAN,
  CHAT,
  CHATS,
  PROFILE_SETTINGS,
} from "../NavigationTypes";
import Landing from "./screens/landing/Landing";
import { useAppSelector } from "../../app/hooks";
import { StatusBar, View } from "react-native";
import Settings from "./screens/settings/Settings";
import SignInUp from "./screens/signInUp/SignInUp";
import Plan from "./screens/plan/Plan";
import Main from "../main/Main";
import Profile from "./screens/profile/Profile";
import Chat from "./screens/chat/Chat";
import Chats from "./screens/chats/Chats";
import ProfileSettings from "./screens/profileSettings/ProfileSettings";

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
          // gestureEnabled: false,
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
        <Stack.Screen name={CHAT} component={Chat} />
        <Stack.Screen name={CHATS} component={Chats} />
        <Stack.Screen name={SETTINGS} component={Settings} />
        <Stack.Screen name={PROFILE_SETTINGS} component={ProfileSettings} />
      </Stack.Navigator>
    </View>
  );
};

export default RootNavigator;
