import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  Extrapolate,
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
  translate: SharedValue<number>;
  style?: ViewStyle | ViewStyle[];
};

const ClosingSection = ({ children, translate, style = {} }: Props) => {
  const [height, setHeight] = useState(0);

  const rStyle = useAnimatedStyle(() => {
    const marginTop = translate.value;
    const paddingBottom = translate.value;
    const scale = interpolate(
      translate.value,
      [0, 100],
      [1, 0.8],
      Extrapolate.CLAMP
    );

    return {
      marginTop,
      paddingBottom,
      transform: [{ scale }],
    };
  });

  return (
    <View style={{ overflow: "hidden" }}>
      <Animated.View
        style={[rStyle, styles.section, style]}
        onLayout={(event) => setHeight(event.nativeEvent.layout.height)}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default ClosingSection;

const styles = StyleSheet.create({
  section: {
    overflow: "hidden",
  },
});
