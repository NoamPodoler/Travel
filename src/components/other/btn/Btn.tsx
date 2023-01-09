import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useThemeColors } from "../../../app/hooks";

type Props = {
  children: React.ReactNode;
  onPress: Function;
  style?: ViewStyle | ViewStyle[];
};

const Btn = ({ children, onPress, style = {} }: Props) => {
  const { main, second, invertedMain, invertedSecond, isDark } =
    useThemeColors();
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[styles.button, { backgroundColor: invertedMain }, style]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Btn;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 10,
    margin: 5,
  },
});
