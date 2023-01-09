import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useThemeColors } from "../../../app/hooks";
import Animated, {
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type Props = {
  index: number;
  size: number;
  invertedColor: boolean;
};

const ANIMATION_SETTINGS = { duration: 400 };

const DotLoader = ({ index, size, invertedColor }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const _translateY = useSharedValue(-5);

  useEffect(() => {
    _translateY.value = withDelay(
      (index * ANIMATION_SETTINGS.duration) / 3,
      withRepeat(withTiming(5, ANIMATION_SETTINGS), -1, true)
    );
  }, []);

  const rStyleDot = useAnimatedStyle(() => {
    const translateY = _translateY.value;
    return {
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View
      style={[
        rStyleDot,
        styles.dot,
        {
          height: size,
          width: size,
          borderRadius: size / 2,
          backgroundColor: invertedColor ? main : invertedMain,
        },
      ]}
    />
  );
};

export default DotLoader;

const styles = StyleSheet.create({
  dot: {
    marginHorizontal: 4,
  },
});
