import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  FadeIn,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withCustomTiming,
} from "react-native-reanimated";
import { SCREEN_HEIGHT } from "../../../utils/constans";

type Props = {
  children: React.ReactNode;
  load: SharedValue<number>;
  style?: ViewStyle | ViewStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  properties?: {
    opacity?: boolean;
  };
};

const OpenSection = ({
  children,
  load,
  style = {},
  containerStyle = {},
  properties: { opacity = true } = {
    opacity: true,
  },
}: Props) => {
  const [height, setHeight] = useState(0);

  const rStyle = useAnimatedStyle(() => {
    const _opacity = interpolate(load.value, [0, 1], [0, 1]);
    const marginTop = interpolate(load.value, [0, 1], [-height, 0]);
    const paddingBottom = interpolate(load.value, [0, 1], [-height, 0]);

    return {
      opacity: opacity ? _opacity : 1,
      marginTop,
      paddingBottom,
    };
  });

  return (
    <View style={[{ overflow: "hidden" }, containerStyle]}>
      <Animated.View
        style={[rStyle, styles.section]}
        onLayout={(event) => setHeight(event.nativeEvent.layout.height)}
      >
        <View style={style}>{children}</View>
      </Animated.View>
    </View>
  );
};

export default OpenSection;

const styles = StyleSheet.create({
  section: {
    overflow: "hidden",
  },
});
