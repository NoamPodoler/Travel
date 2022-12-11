import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { useThemeColors } from "../../app/hooks";

type Props = {
  onPress: Function;
  children?: React.ReactNode;
  style?: ViewStyle;
};

const Btn = ({ onPress, children, style }: Props) => {
  const { main, second, invertedMain, invertedSecond, isDark } =
    useThemeColors();

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[styles.button, { backgroundColor: second }, style]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Btn;

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderRadius: 20,
  },
});
