import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { ScreenSliderItemInterface } from "../../../../utils/interfaces";
import { useThemeColors } from "../../../../app/hooks";
import { SCREEN_WIDTH } from "../../../../utils/constans";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

type Props = ScreenSliderItemInterface & { isFocus: boolean };

const DELAY = 300;
const LOAD_DURATION = 600;
const ScreenSliderItem = ({ lottie, title, content, isFocus }: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();
  const lottieRef = useRef<LottieView>();

  useEffect(() => {
    if (isFocus) {
      setTimeout(() => lottieRef.current.play(), DELAY);
    } else {
      setTimeout(() => {
        lottieRef.current.reset();
        lottieRef.current.pause();
      }, DELAY);
    }
  }, [isFocus]);

  const load = useDerivedValue(() => {
    if (isFocus) return withTiming(1, { duration: LOAD_DURATION });
    return withTiming(0);
  }, [isFocus]);

  const rStyle = useAnimatedStyle(() => {
    const opacity = load.value;
    return {
      opacity,
    };
  });

  return (
    <Animated.View style={[rStyle, styles.page]}>
      <LottieView
        source={lottie}
        style={{ width: SCREEN_WIDTH - 100 }}
        ref={lottieRef}
      />
      <View style={styles.data}>
        <Text style={[styles.title, { color: invertedMain }]}>{title}</Text>
        <Text style={[styles.content, { color: invertedMain }]}>{content}</Text>
      </View>
    </Animated.View>
  );
};

export default ScreenSliderItem;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "space-around",
  },
  data: {
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    margin: 20,
  },
  content: {
    opacity: 0.5,
    fontStyle: "italic",
  },
});
