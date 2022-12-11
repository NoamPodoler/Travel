import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  color,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useThemeColors } from "../../../app/hooks";
import { StringPropertiesInterface } from "./String";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../utils/constans";

type Props = {
  value: string | string[];
  isString: boolean;
  index: number;
  length: number;
  properties: StringPropertiesInterface;
};

const LOAD_VALUES = [0, 1];
const StringItemWord = ({
  value,
  isString,
  index,
  length,
  properties,
}: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const load = useSharedValue(0);

  const startingDelay = 100 + length * properties.delay + properties.startDelay;

  useEffect(() => {
    load.value = withDelay(
      startingDelay + index * properties.delay,
      withTiming(1, { duration: properties.delay * 2 })
    );
  }, []);

  const rStyleMarker = useAnimatedStyle(() => {
    const width = interpolate(load.value, LOAD_VALUES, [0, 100])
      .toString()
      .concat("%");

    return {
      width,
    };
  });

  const clr = properties.color
    ? properties.color
    : properties.invertedColor
    ? invertedMain
    : main;
  const rStyleText = useAnimatedStyle(() => {
    const color = !isString
      ? interpolateColor(load.value, [0.75, 1], [clr, "white"])
      : clr;
    return {
      color,
    };
  });

  return (
    <View>
      {!isString && (
        <Animated.View
          style={[
            styles.marker,
            rStyleMarker,
            { backgroundColor: properties.markerColor },
          ]}
        />
      )}
      <Animated.Text
        style={[
          rStyleText,
          {
            fontSize: properties.fontSize,
          },
        ]}
      >
        {isString ? value : value[0]}
      </Animated.Text>
    </View>
  );
};

export default StringItemWord;

const styles = StyleSheet.create({
  marker: {
    position: "absolute",
    height: "100%",
  },
});
