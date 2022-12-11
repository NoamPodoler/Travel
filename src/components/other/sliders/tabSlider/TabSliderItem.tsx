import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { TabSliderItemInterface } from "./TabSlider";
import { useThemeColors } from "../../../../app/hooks";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withDecay,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type Props = TabSliderItemInterface & {
  width: number;
  duration: number;
  isFocus: boolean;
  ascending: boolean;
};
const TabSliderItem = ({
  title,
  content,
  width,
  duration,
  isFocus,
  ascending,
}: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const MULTIPLIER = 1 / 3;
  const STAGE = MULTIPLIER * duration;

  const translate = useMemo(() => {
    return 8 * (ascending ? 1 : -1);
  }, [ascending]);

  const opacity = useDerivedValue(() => {
    if (isFocus)
      return withDelay(2 * STAGE, withTiming(1, { duration: STAGE }));
    return withTiming(0, { duration: STAGE });
  }, [isFocus]);

  const translateX = useDerivedValue(() => {
    if (isFocus)
      return withDelay(
        2 * STAGE,
        withSequence(
          // resets position
          withTiming(-translate, { duration: 0 }),
          // sets translate animation
          withTiming(0, { duration: STAGE })
        )
      );
    return withSequence(
      withTiming(translate, { duration: STAGE }),
      withTiming(-translate, { duration: 0 })
    );
  }, [isFocus]);

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.View style={[rStyle, styles.item, { width }]}>
      <Text style={[styles.title, { color: invertedMain }]}>{title}</Text>
      <Text style={[styles.content, { color: invertedMain }]}>{content}</Text>
    </Animated.View>
  );
};

export default TabSliderItem;

const styles = StyleSheet.create({
  item: {
    padding: 30,
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  content: {},
});
