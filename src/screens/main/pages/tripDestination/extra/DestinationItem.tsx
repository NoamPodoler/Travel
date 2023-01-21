import React, { useMemo, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "../../../../../app/hooks";
import { BLACK, BLUE, PURPLE, WHITE } from "../../../../../utils/colors";
import { Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRgbA, withCustomTiming } from "../../../../../utils/fn";
import Animated, {
  interpolate,
  interpolateColor,
  interpolateColors,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import {
  addDestination,
  modifySelectedDestination,
} from "../../../../../features/SearchSlice";
import { DestinationInterface } from "../../../../../utils/interfaces";
import ExpoFastImage from "expo-fast-image";
interface Props {
  item: DestinationInterface;
  selected: boolean;
}

const DestinationItem = ({ item, selected }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const dispatch = useAppDispatch();

  const focus = useDerivedValue(
    () => withCustomTiming(selected ? 1 : 0),
    [selected]
  );

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
        <Image
          // source={require("../../../../../../assets/images/destinations/Paris.jpg")}
          style={styles.background}
        />

        <Text
          style={[
            styles.title,
            { backgroundColor: second, color: invertedMain },
          ]}
        >
          {item.title}
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
    backgroundColor: PURPLE,
  },
});
