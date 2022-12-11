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
import {
  BLACK,
  GREY,
  LIGHTER_GREY,
  LIGHT_GREY,
  WHITE,
} from "../../utils/colors";
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

export const useThemeColors = () => {
  const { dark } = useAppSelector((state) => state.settings);
  const lightMode = {
    main: WHITE,
    second: LIGHTER_GREY,
    invertedMain: BLACK,
    invertedSecond: GREY,
    alternate: LIGHT_GREY,
    isDark: dark,
  };

  const darkMode = {
    main: BLACK,
    second: GREY,
    invertedMain: WHITE,
    invertedSecond: LIGHTER_GREY,
    alternate: LIGHT_GREY,
    isDark: dark,
  };

  return dark ? darkMode : lightMode;
};
