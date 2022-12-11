import { StyleSheet, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  LISTSLIDER,
  SCREENSLIDER,
  SETTINGS,
  TABSLIDER,
} from "./NavigationTypes";
import BottomTab from "./BottomTab";
import { useThemeColors } from "../app/hooks";
import TabSliderPage from "../screens/TabSliderPage";
import ScreenSliderPage from "../screens/ScreenSliderPage";
import Settings from "../screens/Settings";
import ListSliderPage from "../screens/ListSliderPage";

type Props = {};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (props: Props) => {
  const { main, second, invertedMain, invertedSecond, isDark } =
    useThemeColors();

  return (
    <View style={{ flex: 1, backgroundColor: main }}>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={({ state, descriptors, navigation }) => (
          <BottomTab
            state={state}
            descriptors={descriptors}
            navigation={navigation}
            insets={undefined}
          />
        )}
      >
        <Tab.Screen name={TABSLIDER} component={TabSliderPage} />
        <Tab.Screen name={SCREENSLIDER} component={ScreenSliderPage} />
        <Tab.Screen name={LISTSLIDER} component={ListSliderPage} />
        <Tab.Screen name={SETTINGS} component={Settings} />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
