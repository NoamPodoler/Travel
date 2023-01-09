import React, { useState } from "react";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { useThemeColors } from "../../../../../app/hooks";
import { BLACK, BLUE, PURPLE, WHITE } from "../../../../../utils/colors";
import {
  DESTINATIONS,
  ITEM_HORIZONTAL_MARGIN,
  ITEM_WIDTH,
} from "../../../../../utils/constans";
import { Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRgbA } from "../../../../../utils/fn";
import Animated, {
  interpolate,
  interpolateColor,
  interpolateColors,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  item: typeof DESTINATIONS[0];
  index: number;
  handleAddDestination: Function;
  selected: boolean;
}

const DestinationItem = ({
  item,
  index,
  handleAddDestination,
  selected,
}: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const load = useDerivedValue(() => withTiming(selected ? 1 : 0), [selected]);

  const rStyleItem = useAnimatedStyle(() => {
    const paddingVertical = interpolate(load.value, [0, 1], [20, 0]);
    return {
      paddingVertical,
    };
  });

  const rStyleTitle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      load.value,
      [0, 1],
      [main, invertedMain]
    );

    const color = interpolateColor(load.value, [0, 1], [invertedMain, main]);
    return {
      backgroundColor,
      color,
    };
  });

  return (
    <Animated.View style={rStyleItem}>
      <TouchableOpacity
        onPress={() => handleAddDestination(DESTINATIONS[index])}
        style={[
          styles.destination,
          {
            backgroundColor: selected ? invertedMain : main,
            width: ITEM_WIDTH,
            marginRight: ITEM_HORIZONTAL_MARGIN,
          },
        ]}
      >
        <Image source={item.image} style={styles.background} />

        <Animated.Text style={[rStyleTitle, styles.title]}>
          {item.city}
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default DestinationItem;

const styles = StyleSheet.create({
  destination: {
    flex: 1,
    borderRadius: 20,
    marginBottom: 10,
    overflow: "hidden",
  },

  title: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    padding: 20,
  },

  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});
