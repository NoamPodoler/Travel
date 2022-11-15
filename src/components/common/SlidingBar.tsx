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

type Props = {
  children?: React.ReactNode;
  height?: number;
  bottom?: boolean;
  button?: boolean;
  scrollLength?: number;
  setShown: Function;
};

const SlidingBar = ({
  children = <></>,
  height = (2 * SCREEN_HEIGHT) / 3,
  bottom = false,
  button = false,
  scrollLength = 200,
  setShown,
}: Props) => {
  const isTabOpen = useSharedValue<number>(0);

  const timing = { duration: 400 };

  useEffect(() => {
    isTabOpen.value = withTiming(1, timing);
  }, []);

  const handleCloseTab = () => {
    isTabOpen.value = withTiming(0, timing);

    setTimeout(() => {
      setShown(false);
    }, timing.duration);
  };

  const INPUT_RANGE = [0, 1];

  const rStyleContainer = useAnimatedStyle(() => {
    // const opacity = isBarOpen.value;
    const backgroundColor = interpolateColor(isTabOpen.value, INPUT_RANGE, [
      "rgba(0,0,0,0)",
      "rgba(0,0,0,0.9)",
    ]);
    return {
      backgroundColor,
    };
  });

  const tabHeight = useSharedValue<number>(height);
  const prevTabHeight = useSharedValue<number>(height);

  const OUTPUT_RANGE = bottom ? [1.25 * height, 0] : [-1.25 * height, 0];
  const rStyleTab = useAnimatedStyle(() => {
    const translateY = interpolate(isTabOpen.value, INPUT_RANGE, OUTPUT_RANGE);
    const height = tabHeight.value;
    return {
      height,
      transform: [{ translateY }],
    };
  });

  const gestureHandler = Gesture.Pan()
    .onStart((event) => {})
    .onUpdate((event) => {
      if (event.translationY * (bottom ? 1 : -1) >= scrollLength) {
        runOnJS(handleCloseTab)();
      }

      tabHeight.value =
        prevTabHeight.value - event.translationY * 0.5 * (bottom ? 1 : -1);
    })
    .onEnd((event) => {
      tabHeight.value = withTiming(height);
      prevTabHeight.value = withTiming(height);
    });

  const colors = useThemeColors();

  return (
    <Animated.View
      style={[
        rStyleContainer,
        styles.container,
        bottom
          ? { flexDirection: "column-reverse" }
          : { flexDirection: "column" },
      ]}
    >
      <GestureDetector gesture={gestureHandler}>
        <Animated.View
          style={[
            rStyleTab,
            styles.tab,
            { backgroundColor: colors.main, height },
            bottom ? { bottom: 0 } : { top: 0 },
          ]}
        >
          {children}
        </Animated.View>
      </GestureDetector>
      <TouchableOpacity
        onPress={() => handleCloseTab()}
        style={[
          styles.buttonContainer,
          bottom
            ? { justifyContent: "flex-start" }
            : { justifyContent: "flex-end" },
        ]}
      >
        {button && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.main }]}
            onPress={() => handleCloseTab()}
          >
            <Feather name="x" size={20} color={colors.invertedMain} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SlidingBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "rgba(0,0,0,0.9)",
    zIndex: 2,
  },
  tab: {
    width: SCREEN_WIDTH,
    borderRadius: 20,
    overflow: "hidden",
  },

  header: {
    flexDirection: "row",
    marginHorizontal: 20,
  },

  buttonContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 60,
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});
