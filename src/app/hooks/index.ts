import React, { useContext, useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { useDerivedValue } from "react-native-reanimated";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  DARK_GREY,
  GREY,
  LIGHT,
  LIGHTER_GREY,
  LIGHT_GREY,
} from "../../utils/colors";
import { NotificationsContext } from "../../utils/context";
import { withCustomTiming } from "../../utils/fn/style";
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

// Theme colors (dark / light)

export const useThemeColors = () => {
  const { dark } = useAppSelector((state) => state.settings);
  const lightMode = {
    main: LIGHTER_GREY,
    second: LIGHT,
    invertedMain: DARK_GREY,
    invertedSecond: GREY,
    alternate: LIGHT_GREY,
    isDark: dark,
  };

  const darkMode = {
    main: DARK_GREY,
    second: GREY,
    invertedMain: LIGHTER_GREY,
    invertedSecond: LIGHT,
    alternate: LIGHT_GREY,
    isDark: dark,
  };

  return dark ? darkMode : lightMode;
};

// Slider Page - Get Ascending Value
export const useSliderAscending = (current) => {
  const [ascending, setAscending] = useState<boolean>(false);
  const [prev, setPrev] = useState(current);

  useEffect(() => {
    if (current > prev) setAscending(true);
    else setAscending(false);

    setPrev(current);
  }, [current]);

  return ascending;
};

//

export const useSliderNavigation = (length: number) => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < length - 1) setCurrent((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (current < 0) setCurrent((prev) => prev - 1);
  };

  return {
    current,
    setCurrent: (index) => setCurrent(index),
    handleNext,
    handlePrev,
  };
};

export const createPopupRef = (bool: boolean) => {
  const [isShown, setShown] = useState(bool);

  return {
    isShown,
    setShown: (bool) => setShown(bool),
  };
};

export const createBottomMenu = (bool: boolean) => {
  const [isShown, setShown] = useState(bool);

  return {
    isShown,
    setShown: (bool) => setShown(bool),
  };
};
