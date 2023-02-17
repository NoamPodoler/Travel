import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { PopupTabContext } from "../../../utils/context";
import {
  CUSTOM_DURATION,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../../utils/constans";
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
} from "react-native-reanimated";
import { withCustomTiming } from "../../../utils/fn/style";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useThemeColors } from "../../../app/hooks";

type Props = {
  children: React.ReactNode;
};

const PopupBar = ({ children }: Props) => {
  // Constants

  // State
  const [content, setContent] = useState<React.ReactNode | null>();
  const [isShown, setShown] = useState(false);
  const [isInverted, setInverted] = useState(false);
  const [height, setHeight] = useState(SCREEN_HEIGHT * 0.8);

  // Shared Values
  const load = useSharedValue(0);
  const prevLoad = useSharedValue(0);

  const rStyleContainer = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      load.value,
      [0, 1],
      ["rgba(0,0,0,0)", "rgba(0,0,0,0.85)"]
    );
    return {
      backgroundColor,
    };
  });

  const gestureHandler = Gesture.Pan()
    .onStart((event) => {})
    .onUpdate((event) => {
      const newLoad =
        prevLoad.value - ((isInverted ? -1 : 1) * event.translationY) / height;

      if (newLoad > 1) load.value = 1;
      else load.value = newLoad;
    })
    .onEnd((event) => {
      load.value = withCustomTiming(1);
      prevLoad.value = withCustomTiming(1);
    });

  //

  const push = (
    content: React.ReactNode,
    inverted = false,
    _height = SCREEN_HEIGHT * 0.8
  ) => {
    if (inverted !== isInverted) setInverted(inverted);
    if (height !== _height) setHeight(_height);
    setContent(content);
    setShown(true);
    load.value = withDelay(200, withCustomTiming(1));
    prevLoad.value = withDelay(200, withCustomTiming(1));
  };

  const dismiss = () => {
    load.value = withCustomTiming(0);
    prevLoad.value = withCustomTiming(0);

    setTimeout(() => {
      setShown(false);
      setContent(<></>);
    }, CUSTOM_DURATION + 50);
  };
  return (
    <PopupTabContext.Provider value={{ push, dismiss }}>
      {children}

      {isShown && (
        <GestureDetector gesture={gestureHandler}>
          <Animated.View style={[styles.container, rStyleContainer]}>
            <TouchableOpacity onPress={dismiss} style={{ flex: 1 }} />
            <Tab
              content={content}
              load={load}
              height={height}
              isInverted={isInverted}
            />
          </Animated.View>
        </GestureDetector>
      )}
    </PopupTabContext.Provider>
  );
};

interface TabProps {
  content: React.ReactNode;
  load: SharedValue<number>;
  height: number;
  isInverted: boolean;
}

const Tab = ({ content, load, height, isInverted }: TabProps) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const rStyleTab = useAnimatedStyle(() => {
    const translateY = interpolate(
      load.value,
      [0, 1],
      [(isInverted ? -1 : 1) * height, 0]
    );
    return {
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.tab,
        {
          height,
          backgroundColor: second,
          top: isInverted ? 0 : SCREEN_HEIGHT - height,
        },
        rStyleTab,
      ]}
    >
      {content}
    </Animated.View>
  );
};

export default PopupBar;

export const usePopupBar = () => {
  const { push, dismiss } = useContext(PopupTabContext);
  return { push, dismiss };
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },

  //

  tab: {
    position: "absolute",
    left: 0,
    padding: 0,
    width: SCREEN_WIDTH,
    overflow: "hidden",
    borderRadius: 10,
  },
});
