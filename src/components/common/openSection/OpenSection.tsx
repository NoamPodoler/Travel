import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  FadeIn,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SCREEN_HEIGHT } from "../../../utils/constans";

type Props = {
  children: React.ReactNode;
  // isShown: boolean;
  load: SharedValue<number>;
  style?: ViewStyle | ViewStyle[];
};

const OpenSection = ({ children, load, style = {} }: Props) => {
  const [height, setHeight] = useState(0);
  // const isOpen = useSharedValue(0);

  // useEffect(() => {
  //   if (isShown) isOpen.value = withTiming(1);
  //   else isOpen.value = withTiming(0);
  // }, [isShown]);

  const rStyle = useAnimatedStyle(() => {
    const opacity = interpolate(load.value, [0, 1], [0, 1]);
    const marginTop = interpolate(load.value, [0, 1], [-height, 0]);
    const paddingBottom = interpolate(load.value, [0, 1], [-height, 0]);

    return {
      opacity,
      marginTop,
      paddingBottom,
    };
  });

  return (
    <Animated.View
      style={[rStyle, styles.section, style]}
      onLayout={(event) => setHeight(event.nativeEvent.layout.height)}
    >
      {children}
    </Animated.View>
  );
};

export default OpenSection;

const styles = StyleSheet.create({
  section: {
    overflow: "hidden",
  },
});
