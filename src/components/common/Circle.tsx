import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useThemeColors } from "../../app/hooks";

type Props = {
  index: number;
  isFocus: boolean;
  size?: number;
};

const Circle = ({ index, isFocus, size = 8 }: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  return (
    <View
      style={[
        styles.circle,
        {
          height: size,
          width: size,
          backgroundColor: isFocus ? invertedMain : alternate,
        },
      ]}
    ></View>
  );
};

export default Circle;

const styles = StyleSheet.create({
  circle: {
    borderRadius: 5,
    marginHorizontal: 2,
  },
});
