import React, { useMemo, useState } from "react";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "../../../../../app/hooks";
import { BLACK, BLUE, PURPLE, WHITE } from "../../../../../utils/colors";
import { DESTINATIONS } from "../../../../../utils/constans";
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
import {
  addDestination,
  modifySelectedDestination,
} from "../../../../../features/SearchSlice";

interface Props {
  item: typeof DESTINATIONS[0];
  selected: boolean;
}

const DestinationItem = ({ item, selected }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const dispatch = useAppDispatch();

  const { selectedDestinations } = useAppSelector((state) => state.search);

  const focus = useDerivedValue(() => withTiming(selected ? 1 : 0), [selected]);

  const rStyleItem = useAnimatedStyle(() => {
    const width = interpolate(focus.value, [0, 1], [240, 0]);
    const paddingHorizontal = interpolate(focus.value, [0, 1], [4, 0]);
    const opacity = interpolate(focus.value, [0, 0.6], [1, 0]);
    return {
      width,
      paddingHorizontal,
      opacity,
    };
  });

  return (
    <Animated.View style={[rStyleItem]}>
      <TouchableOpacity
        onPress={() => {
          if (!selected) dispatch(addDestination(item));
        }}
        style={[styles.destination]}
        activeOpacity={1}
      >
        <Image source={item.image} style={styles.background} />

        <Text
          style={[
            styles.title,
            { backgroundColor: second, color: invertedMain },
          ]}
        >
          {item.city}
        </Text>
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
