import { StyleSheet, Text, View, LayoutAnimation } from "react-native";
import React, { useEffect } from "react";
import { useThemeColors } from "../../app/hooks";
import Animated, {
  Easing,
  Extrapolate,
  FadeInDown,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/constants";

type Props = {
  children?: React.ReactNode;
};

const Popup = ({ children }: Props) => {
  const colors = useThemeColors();

  const X = useSharedValue(0);
  const prevX = useSharedValue(0);
  const Y = useSharedValue(0);
  const prevY = useSharedValue(0);

  const MAX_X = 100;
  const MAX_Y = 100;
  const dragGesture = Gesture.Pan()
    .onStart((event) => {})
    .onChange((event) => {
      X.value = prevX.value + event.translationX;
      Y.value = prevY.value + event.translationY;
    })
    .onEnd((event) => {
      X.value = withTiming(0);
      prevX.value = withTiming(0);
      Y.value = withTiming(0);
      prevY.value = withTiming(0);
    });

  const isOpen = useSharedValue<number>(0);
  const tapGesture = Gesture.Tap().onStart((event) => {
    if (isOpen.value === 0) {
      // Open Popup
      isOpen.value = withTiming(1);
    } else {
      // Close Popup
      isOpen.value = withTiming(0);
    }
  });

  const composed = Gesture.Race(dragGesture, tapGesture);

  //

  const POPUP_HEIGHT = 60;
  const rStyle = useAnimatedStyle(() => {
    const translateX = X.value;
    const translateY = Y.value;
    const height = interpolate(
      isOpen.value,
      [0, 1],
      [POPUP_HEIGHT, POPUP_HEIGHT * 3],
      Extrapolate.CLAMP
    );
    return {
      height,
      transform: [{ translateX }, { translateY }],
    };
  });

  return (
    <View style={styles.popupContainer}>
      <GestureDetector gesture={composed}>
        <Animated.View
          style={[rStyle, styles.popup, { backgroundColor: colors.main }]}
          entering={FadeInDown}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default Popup;

const styles = StyleSheet.create({
  popupContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 80,
    height: SCREEN_HEIGHT / 2,
    width: "100%",
    alignItems: "center",
    zIndex: 4,
    // backgroundColor: "black",
  },

  popup: {
    padding: 20,
    alignItems: "center",
    width: "80%",
    // height: 60,
    borderRadius: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
