import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import * as Haptics from "expo-haptics";
import { ImpactFeedbackStyle } from "expo-haptics";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { withCustomTiming } from "../../../utils/fn";

type Props = {
  children: React.ReactNode;
  onPress: Function;
  behavior?: ImpactFeedbackStyle | "";
  style?: ViewStyle | ViewStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  scaleSize?: number;
  animated?: boolean;
};

const CustomButton = ({
  children,
  onPress,
  behavior = Haptics.ImpactFeedbackStyle.Light,
  style = {},
  containerStyle = {},
  scaleSize = 0.9,
  animated = true,
}: Props) => {
  const load = useSharedValue(0);

  const handlePressIn = () => {
    load.value = withRepeat(withTiming(1, { duration: 120 }), 2, true);
  };

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(load.value, [0, 1], [1, scaleSize]);
    return {
      transform: [{ scale }],
    };
  });

  if (!animated)
    return (
      <TouchableOpacity
        onPress={() => {
          onPress();
          if (behavior !== "") Haptics.impactAsync(behavior);
        }}
        style={style}
        activeOpacity={1}
      >
        <>{children}</>
      </TouchableOpacity>
    );

  return (
    <Animated.View style={[containerStyle, rStyle]}>
      <TouchableOpacity
        onPress={() => {
          onPress();
          if (behavior !== "") Haptics.impactAsync(behavior);
        }}
        onPressIn={handlePressIn}
        style={style}
        activeOpacity={1}
      >
        <>{children}</>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
