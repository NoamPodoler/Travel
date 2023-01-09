import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useThemeColors } from "../../../app/hooks";
import { BLUE } from "../../../utils/colors";

type Props = {
  isFocus: boolean;
  ascending: boolean;
  duration?: number;
  color?: string;
};

const SliderLine = ({
  isFocus,
  ascending,
  duration = 400,
  color = BLUE,
}: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const opacity = useDerivedValue(() => {
    if (!isFocus) return withTiming(0, { duration: duration });
    return 1;
  }, [isFocus]);

  const width = useDerivedValue(() => {
    if (isFocus) return withTiming(100, { duration });

    return withDelay(duration, withTiming(0, { duration: 0 }));
  }, [isFocus]);

  const rStyle = useAnimatedStyle(() => {
    return {
      width: width.value.toString().concat("%"),
      opacity: opacity.value,
    };
  });

  return (
    <View
      style={[
        styles.line,
        {
          backgroundColor: alternate,
          flexDirection: ascending ? "row" : "row-reverse",
        },
      ]}
    >
      <Animated.View
        style={[rStyle, { backgroundColor: color }]}
      ></Animated.View>
    </View>
  );
};

export default SliderLine;

const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 3,
    borderRadius: 10,
    marginHorizontal: 5,
    overflow: "hidden",
  },
});
