import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  title: string;
  isFocus: boolean;
  index: number;
  setFocus: Function;
};

const ANIMATION_SETTINGS = { duration: 100 };

const SearchPrefrencesTabTitle = ({
  title,
  isFocus,
  index,
  setFocus,
}: Props) => {
  const load = useDerivedValue(
    () =>
      isFocus
        ? withTiming(1, ANIMATION_SETTINGS)
        : withTiming(0, ANIMATION_SETTINGS),
    [isFocus]
  );

  const rStyle = useAnimatedStyle(() => {
    const opacity = interpolate(load.value, [0, 1], [0.5, 1]);
    const scale = interpolate(load.value, [0, 1], [1, 1.2]);
    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <TouchableOpacity style={styles.button} onPress={() => setFocus()}>
      <Animated.Text style={rStyle}>{title}</Animated.Text>
    </TouchableOpacity>
  );
};

export default SearchPrefrencesTabTitle;

const styles = StyleSheet.create({
  button: { paddingHorizontal: 30 },
});
