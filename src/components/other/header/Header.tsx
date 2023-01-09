import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../../../app/hooks";
import { SCREEN_WIDTH } from "../../../utils/constans";

type Props = {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
};

const Header = ({ left = <></>, center = <></>, right = <></> }: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate, isDark } =
    useThemeColors();

  return (
    <View style={[styles.header, { backgroundColor: main }]}>
      <View style={[styles.item, { alignItems: "flex-start" }]}>{left}</View>
      <View style={[styles.item, { alignItems: "center" }]}>{center}</View>
      <View style={[styles.item, { alignItems: "flex-end" }]}>{right}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH,
    paddingHorizontal: 30,
    paddingTop: 10,
    backgroundColor: "red",
  },

  item: { flex: 1 },
});
