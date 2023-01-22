import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { switchDarkMode } from "../../../features/SettingsSlice";
import { useThemeColors } from "../../../app/hooks";
import { PURPLE } from "../../../utils/colors";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import CustomButton from "../customButton/CustomButton";

type Props = {
  status: boolean;
  onPress: Function;
  height?: number;
  width?: number;
  padding?: number;
};

const Switch = ({
  status,
  onPress,
  height = 30,
  width = 54,
  padding = 3,
}: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate, isDark } =
    useThemeColors();

  const distance = width - height;

  const _translateX = useDerivedValue(() => {
    if (status) return withTiming(distance);
    else return withTiming(0);
  }, [status]);

  const rStyleCircle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: _translateX.value }],
    };
  });

  return (
    <CustomButton
      style={[
        styles.switch,
        {
          backgroundColor: second,
          height,
          width,
          borderRadius: height / 2,
          paddingHorizontal: padding,
        },
      ]}
      onPress={() => onPress(status)}
    >
      <Animated.View
        style={[
          rStyleCircle,
          styles.circle,
          {
            height: height - padding * 2,
            width: height - padding * 2,
            borderRadius: (height - padding * 2) / 2,
          },
        ]}
      />
    </CustomButton>
  );
};

export default Switch;

const styles = StyleSheet.create({
  switch: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    backgroundColor: PURPLE,
  },
});
