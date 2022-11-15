import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  AnimateStyle,
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useThemeColors } from "../../../app/hooks";
import Landing from "./Screens/Landing";
import Login from "./Screens/Login";

type Props = {};

export const LOAD_DURATION = 1000;
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("screen");
const Welcome = ({}: Props) => {
  const [pageIndex, setPageIndex] = useState(0);
  const numOfPages = 2;
  const currentPage = useSharedValue(0);
  const scrollY = useSharedValue<number>(0);

  const withTimingSettings = {
    duration: LOAD_DURATION,
    easing: Easing.bezier(0.42, 0, 0.58, 1),
  };

  useEffect(() => {
    setPageIndex(1);
  }, []);

  useEffect(() => {
    currentPage.value = withTiming(pageIndex, withTimingSettings);
  }, [pageIndex]);

  //

  const setPage = (index: number) => {
    if (index <= numOfPages) setPageIndex(index);
  };

  const nextPage = () => {
    if (pageIndex < numOfPages) setPageIndex((prev) => prev + 1);
  };

  const prevPage = () => {
    if (pageIndex > 0) setPageIndex((prev) => prev - 1);
  };

  const gestureHandler = Gesture.Pan()
    .onStart((event) => {})
    .onChange((event) => {
      scrollY.value = event.translationY;
    })
    .onEnd((event) => {
      scrollY.value = withSpring(0);
    });

  const functions = {
    nextPage: () => nextPage(),
    prevPage: () => prevPage(),
    setPage: (index) => setPage(index),
  };

  const colors = useThemeColors();

  return (
    <View style={{ flex: 1, backgroundColor: colors.main }}>
      <GestureDetector gesture={gestureHandler}>
        <View
          style={{
            flexDirection: "row-reverse",
            flex: 1,
          }}
        >
          <Landing
            page={1}
            currentPage={currentPage}
            scrollY={scrollY}
            functions={functions}
          />

          <Login
            page={2}
            currentPage={currentPage}
            scrollY={scrollY}
            functions={functions}
          />
        </View>
      </GestureDetector>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
