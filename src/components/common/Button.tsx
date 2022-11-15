import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useThemeColors } from "../../app/hooks";

type Props = {
  children?: React.ReactNode;
  onPress: Function;
  padding?: number;
  backgroundColor?: string;
  borderRadius?: number;
  width?: number;
  height?: number;
  style?: any;
};

const Button = ({
  children = <></>,
  onPress,
  padding = 10,
  backgroundColor,
  borderRadius = 100,
  width = 0,
  height = 0,
  style,
}: Props) => {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        styles.button,
        { padding, borderRadius },
        height ? { height } : {},
        width ? { width } : {},
        backgroundColor ? { backgroundColor } : {},
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
