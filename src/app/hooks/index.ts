import { useRef, useEffect } from "react";
import {
  useWindowDimensions,
  Animated,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  AnimateStyle,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  SharedValue,
} from "react-native-reanimated";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { black, darkGrey, grey, lightGrey, white } from "../../utils/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/constants";
import { Product, ProductForSale } from "../interfaces";
import { RootState, AppDispatch } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useViewportUnits = () => {
  const { width, height } = useWindowDimensions();

  const vh = height / 100;
  const vw = width / 100;

  return { vh, vw };
};

export const useRStyleNavigation = (params: {
  page: number;
  currentPage: SharedValue<number>;
  scrollY: SharedValue<number>;
}) => {
  return (index: number): AnimateStyle<StyleProp<ViewStyle>> => {
    const rStyle = useAnimatedStyle(() => {
      const inputRange = [params.page - 1, params.page, params.page + 1];
      const lengthX = SCREEN_WIDTH;
      const margin = index * 50;

      const translateX =
        interpolate(
          params.currentPage.value,
          inputRange,
          [-(lengthX + margin), 0, lengthX + margin],
          Extrapolate.CLAMP
        ) +
        (params.page - 1) * SCREEN_WIDTH;

      const translateY = interpolate(
        params.scrollY.value,
        [-SCREEN_HEIGHT, SCREEN_HEIGHT],
        [
          (params.scrollY.value - 2 * margin) / 14,
          (params.scrollY.value + 2 * margin) / 14,
        ]
      );

      return {
        transform: [{ translateX }, { translateY }],
      };
    });

    return rStyle;
  };
};

export const useThemeColors = () => {
  const { dark } = useAppSelector((state) => state.settings);
  const lightMode = {
    main: lightGrey,
    second: white,
    invertedMain: darkGrey,
    invertedSecond: black,
    isDark: dark,
  };

  const darkMode = {
    main: darkGrey,
    second: black,
    invertedMain: lightGrey,
    invertedSecond: white,
    isDark: dark,
  };

  return dark ? darkMode : lightMode;
};

export const useRStyleScrollY: Function = (scrollY: SharedValue<number>) => {
  return (index: number) =>
    useAnimatedStyle(() => {
      const translateY = interpolate(
        scrollY.value,
        [-SCREEN_HEIGHT, SCREEN_HEIGHT],
        [(scrollY.value - 100 * index) / 14, (scrollY.value + 100 * index) / 14]
      );
      return {
        transform: [{ translateY }],
      };
    });
};
