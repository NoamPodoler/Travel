import { useRef, useEffect, useState } from "react";
import {
  useWindowDimensions,
  Animated,
  View,
  StyleProp,
  ViewStyle,
  Keyboard,
} from "react-native";
import {
  AnimateStyle,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  SharedValue,
  useSharedValue,
  withTiming,
  Easing,
  useDerivedValue,
} from "react-native-reanimated";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setDarkStatusBar } from "../../features/SettingsSlice";
import {
  DARK_GREY,
  GREY,
  LIGHT,
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
    main: LIGHT,
    second: LIGHTER_GREY,
    invertedMain: DARK_GREY,
    invertedSecond: GREY,
    alternate: LIGHT_GREY,
    isDark: dark,
  };

  const darkMode = {
    main: DARK_GREY,
    second: GREY,
    invertedMain: LIGHT,
    invertedSecond: LIGHTER_GREY,
    alternate: LIGHT_GREY,
    isDark: dark,
  };

  return dark ? darkMode : lightMode;
};

export const useOpenSectionRef = (bool: boolean) => {
  const load = useDerivedValue(() => withTiming(bool ? 1 : 0), [bool]);
  const unload = useDerivedValue(() => withTiming(bool ? 0 : 1), [bool]);

  return { load, unload };
};
