import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { withCustomTiming } from "../../../utils/fn";

type Props = {
  children: React.ReactNode;
  isShown: boolean;
  style?: ViewStyle | ViewStyle[];
};

const ShownSection = ({ children, isShown, style = {} }: Props) => {
  const load = useDerivedValue(() => {
    return withCustomTiming(isShown ? 1 : 0);
  }, [isShown]);

  const [_isShown, setShown] = useState(isShown);

  useEffect(() => {
    if (isShown)
      setTimeout(() => {
        return setShown(true);
      }, 200);
    else
      setTimeout(() => {
        return setShown(false);
      }, 200);
  }, [isShown]);

  const rStyle = useAnimatedStyle(() => {
    const opacity = load.value;
    return {
      opacity,
    };
  });

  return (
    <Animated.View
      style={[rStyle, { display: isShown ? "flex" : "none" }, style]}
    >
      {children}
    </Animated.View>
  );
};

export default ShownSection;

const styles = StyleSheet.create({});
