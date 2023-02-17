import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  Extrapolate,
  FadeIn,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../utils/constans";
import { withCustomTiming } from "../../../utils/fn/style";

type Props = {
  children: React.ReactNode;
  load: SharedValue<number>;
  style?: ViewStyle | ViewStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  properties?: {
    opacity?: boolean;
  };
  flex?: boolean;
};

const Section = ({
  children,
  load,
  style = {},
  containerStyle = {},
  properties: { opacity = true } = {
    opacity: true,
  },
  flex = false,
}: Props) => {
  const [height, setHeight] = useState(0);

  const rStyle = useAnimatedStyle(() => {
    const _opacity = interpolate(load.value, [0, 1], [0, 1], Extrapolate.CLAMP);

    const marginTop = interpolate(
      load.value,
      [0, 1],
      [-height, 0],
      Extrapolate.CLAMP
    );
    const paddingBottom = interpolate(
      load.value,
      [0, 1],
      [-height, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity ? _opacity : 1,
      marginTop,
      paddingBottom,
    };
  });

  const rStyleFlex = useAnimatedStyle(() => {
    const flex = load.value;
    const _opacity = interpolate(load.value, [0, 1], [0, 1], Extrapolate.CLAMP);
    return {
      flex,
      opacity: opacity ? _opacity : 1,
    };
  });

  if (flex)
    return (
      <Animated.View style={[rStyleFlex, { overflow: "hidden" }]}>
        <View style={[style, { flex: 1 }]}>{children}</View>
      </Animated.View>
    );

  return (
    <View
      style={[{ overflow: "hidden" }, containerStyle]}
      onLayout={(event) => {
        if (height === 0 && event.nativeEvent.layout.height > 0)
          setHeight(event.nativeEvent.layout.height);
      }}
    >
      <Animated.View style={[rStyle, styles.section]}>
        <View style={style}>{children}</View>
      </Animated.View>
    </View>
  );
};

// Open Section - Get Animated Value of (0 -> 1) from state {boolean}
export const useSection = (bool: boolean) => {
  const load = useDerivedValue(() => withCustomTiming(bool ? 1 : 0), [bool]);
  const unload = useDerivedValue(() => withCustomTiming(bool ? 0 : 1), [bool]);

  return { load, unload };
};

export default Section;

const styles = StyleSheet.create({
  section: {
    overflow: "hidden",
  },
});
