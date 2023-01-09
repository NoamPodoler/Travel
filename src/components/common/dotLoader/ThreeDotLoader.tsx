import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useThemeColors } from "../../../app/hooks";
import DotLoader from "./DotLoader";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type Props = {
  size?: number;
  invertedColor?: boolean;
};

const ThreeDotLoader = ({ size = 10, invertedColor = false }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  return (
    <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <DotLoader
            key={index.toString()}
            index={index}
            size={size}
            invertedColor={invertedColor}
          />
        ))}
    </Animated.View>
  );
};

export default ThreeDotLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
