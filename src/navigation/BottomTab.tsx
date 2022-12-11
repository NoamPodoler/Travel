import { StyleSheet, View } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import TabButton from "../components/other/TabButton";
import { useThemeColors } from "../app/hooks";
import { SCREEN_WIDTH } from "../utils/constans";
const BottomTab: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <SafeAreaView style={[styles.tab]}>
      {state.routes.map((item, index) => (
        <TabButton
          key={index.toString()}
          // @ts-ignore
          route={item}
          isFocus={state.index === index}
          index={index}
        />
      ))}
    </SafeAreaView>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  tab: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 30,
  },
});
