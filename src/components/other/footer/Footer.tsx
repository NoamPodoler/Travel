import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { SETTINGS } from "../../../navigation/NavigationTypes";
import { useThemeColors } from "../../../app/hooks";

type Props = {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
};

const Footer = ({ left, center, right }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  return (
    <View style={styles.navigation}>
      <View style={[styles.button, styles.left]}>{left}</View>
      <View style={[styles.button, styles.center]}>{center}</View>
      <View style={[styles.button, styles.right]}>{right}</View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 30,
    paddingTop: 20,
  },

  button: {
    flex: 1,
    justifyContent: "center",
    height: 40,
  },

  center: { alignItems: "center" },

  left: {
    alignItems: "flex-start",
  },
  right: {
    alignItems: "flex-end",
  },
});
