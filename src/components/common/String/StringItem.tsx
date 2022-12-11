import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useThemeColors } from "../../../app/hooks";
import { StringListItemType, StringPropertiesInterface } from "./String";
import StringItemWord from "./StringItemWord";

type Props = {
  item: StringListItemType;
  index: number;
  length: number;
  unload: boolean;
  properties: StringPropertiesInterface;
};

// Constants
const LOAD_VALUES = [-1, 0, 1];

const StringItem = ({ item, index, length, unload, properties }: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const isString = useMemo(() => {
    return typeof item === "string";
  }, [item]);

  const loadDuration = 100 + (index + 1) * properties.delay;
  const unloadDuration = 100 + (length - index + 1) * properties.delay;

  // [preLoad, load, unload] = [-1, 0, 1]
  const load = useSharedValue<number>(-1);

  useEffect(() => {
    load.value = withDelay(
      properties.startDelay,
      withTiming(0, { duration: loadDuration })
    );
  }, []);

  useEffect(() => {
    if (unload)
      load.value = withTiming(1, {
        duration: properties.invertedExit ? unloadDuration : loadDuration,
      });
  }, [unload]);

  const rStyleText = useAnimatedStyle(() => {
    const translate = interpolate(load.value, LOAD_VALUES, [
      properties.translateValue,
      0,
      -properties.translateValue,
    ]);

    const rotate = interpolate(load.value, LOAD_VALUES, [
      properties.deg,
      0,
      -properties.deg,
    ]);
    const opacity = interpolate(load.value, LOAD_VALUES, [0, 1, 0]);

    const transform = properties.horizontal
      ? [{ translateX: translate }]
      : [
          { translateY: translate },
          { rotateZ: rotate.toString().concat("deg") },
        ];

    return {
      transform,
      opacity,
    };
  });

  return (
    <View style={styles.container}>
      {isString ? (
        <Animated.Text
          style={[
            rStyleText,
            {
              color: properties.color
                ? properties.color
                : properties.invertedColor
                ? invertedMain
                : main,
              fontSize: properties.fontSize,
            },
          ]}
        >
          {item}
        </Animated.Text>
      ) : (
        <Animated.View style={[rStyleText, styles.line]}>
          {
            // @ts-ignore
            item!.map((item1, i) => (
              <StringItemWord
                key={i.toString()}
                value={item1}
                isString={typeof item1 === "string"}
                index={index}
                length={length}
                properties={properties}
              />
            ))
          }
        </Animated.View>
      )}
    </View>
  );
};

export default StringItem;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    padding: 2,
  },

  line: {
    flexDirection: "row",
  },
});
