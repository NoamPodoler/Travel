import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/constants";
import { useThemeColors } from "../../app/hooks";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { hexToRgbA } from "../../utils/fn";
import { black } from "../../utils/colors";

type Props = {
  children?: React.ReactNode;
  width?: number;
  right?: boolean;
  scrollLength?: number;
  setShown: Function;
};

const SlidingBar = ({
  children = <></>,
  width = (3 * SCREEN_WIDTH) / 4,
  right = false,
  scrollLength = 150,
  setShown,
}: Props) => {
  const isBarOpen = useSharedValue<number>(0);

  const timing = { duration: 300 };

  useEffect(() => {
    isBarOpen.value = withTiming(1, timing);
  }, []);

  const handleCloseTab = () => {
    isBarOpen.value = withTiming(0, timing);

    setTimeout(() => {
      setShown(false);
    }, timing.duration);
  };

  const INPUT_RANGE = [0, 1];

  const rStyleContainer = useAnimatedStyle(() => {
    // const opacity = isBarOpen.value;
    const backgroundColor = interpolateColor(isBarOpen.value, INPUT_RANGE, [
      "rgba(0,0,0,0)",
      "rgba(0,0,0,0.9)",
    ]);
    return {
      backgroundColor,
    };
  });

  const barWidth = useSharedValue<number>(width);
  const prevBarWidth = useSharedValue<number>(width);

  const OUTPUT_RANGE = right ? [width, 0] : [-width, 0];
  const rStyleBar = useAnimatedStyle(() => {
    const translateX = interpolate(isBarOpen.value, INPUT_RANGE, OUTPUT_RANGE);
    const width = barWidth.value;
    return {
      width,
      transform: [{ translateX }],
    };
  });

  const gestureHandler = Gesture.Pan()
    .onStart((event) => {})
    .onUpdate((event) => {
      if (event.translationX * (right ? 1 : -1) >= scrollLength) {
        runOnJS(handleCloseTab)();
      }

      barWidth.value =
        prevBarWidth.value - event.translationX * 0.25 * (right ? 1 : -1);
    })
    .onEnd((event) => {
      barWidth.value = withTiming(width);
      prevBarWidth.value = withTiming(width);
    });

  const colors = useThemeColors();

  return (
    <Animated.View
      style={[
        rStyleContainer,
        styles.container,
        right
          ? { flexDirection: "column-reverse" }
          : { flexDirection: "column" },
      ]}
    >
      <GestureDetector gesture={gestureHandler}>
        <View>
          <TouchableOpacity
            onPress={() => handleCloseTab()}
            style={{
              position: "absolute",

              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
            }}
          ></TouchableOpacity>

          <Animated.View
            style={[
              rStyleBar,
              styles.tab,
              { backgroundColor: colors.main, width },
              right ? { left: SCREEN_WIDTH - width } : { left: 0 },
            ]}
          >
            <View style={[styles.content, { width }]}>{children}</View>
          </Animated.View>
        </View>
      </GestureDetector>
    </Animated.View>
  );
};

export default SlidingBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    left: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "rgba(0,0,0,0.9)",
    zIndex: 2,
  },
  tab: {
    height: SCREEN_HEIGHT,
    overflow: "hidden",
  },

  header: {
    flexDirection: "row",
    marginHorizontal: 20,
  },

  content: {
    height: SCREEN_HEIGHT,
  },
});
