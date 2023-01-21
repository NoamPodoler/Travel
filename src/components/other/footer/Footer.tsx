import { SafeAreaView, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { SETTINGS } from "../../../navigation/NavigationTypes";
import {
  useAppSelector,
  useOpenSection,
  useThemeColors,
} from "../../../app/hooks";
import OpenSection from "../../common/openSection/OpenSection";

type Props = {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

const Footer = ({
  left = <></>,
  center = <></>,
  right = <></>,
  style = {},
}: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  return (
    <SafeAreaView style={[styles.navigation, style]}>
      <View style={[styles.btn, styles.left]}>{left}</View>
      <View style={[styles.btn, styles.center]}>{center}</View>
      <View style={[styles.btn, styles.right]}>{right}</View>
    </SafeAreaView>
  );
};

export default Footer;

const styles = StyleSheet.create({
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 30,
  },

  btn: {
    flex: 1,
    justifyContent: "center",
    height: 50,
    paddingTop: 20,
  },

  center: { alignItems: "center" },

  left: {
    alignItems: "flex-start",
  },
  right: {
    alignItems: "flex-end",
  },
});
