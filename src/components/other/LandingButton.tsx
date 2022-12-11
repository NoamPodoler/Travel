import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { BOTTOMTAB } from "../../navigation/NavigationTypes";
import Btn from "../common/Btn";
import Center from "../common/Center";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useThemeColors } from "../../app/hooks";

type Props = {
  onPress: Function;
  delay: number;
};

const LandingButton = ({ onPress, delay }: Props) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1));
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const { main, second, invertedMain, invertedSecond, isDark } =
    useThemeColors();

  return (
    <Animated.View style={[{ width: "80%" }, rStyle]}>
      <Btn onPress={() => onPress()}>
        <Center>
          <Text style={{ color: invertedMain }}>Get Started</Text>
        </Center>
      </Btn>
    </Animated.View>
  );
};

export default LandingButton;

const styles = StyleSheet.create({});
