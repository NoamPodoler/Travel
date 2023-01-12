import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { DESTINATIONS } from "../../../../../utils/constans";
import Animated, {
  FadeInDown,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "../../../../../app/hooks";
import { row } from "../../../../../utils/styling";
import { hexToRgbA } from "../../../../../utils/fn";
import {
  addDestination,
  modifySelectedDestination,
} from "../../../../../features/SearchSlice";

type Props = {
  item: typeof DESTINATIONS[0];
  index: number;
};

const SearchDestinatonItem = ({ item, index }: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const dispatch = useAppDispatch();

  const { selectedDestinations } = useAppSelector((state) => state.search);

  const isSelected = useMemo(
    () => selectedDestinations.findIndex((i) => i.city === item.city) !== -1,
    [selectedDestinations]
  );

  const isSelectedLoad = useDerivedValue(
    () => withTiming(isSelected ? 1 : 0),
    [isSelected]
  );

  const rStyleItem = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      isSelectedLoad.value,
      [0, 1],
      [second, invertedSecond]
    );
    return {
      backgroundColor,
    };
  });

  const rStyleText = useAnimatedStyle(() => {
    const color = interpolateColor(
      isSelectedLoad.value,
      [0, 1],
      [invertedMain, main]
    );
    return {
      color,
    };
  });

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(modifySelectedDestination(item));
      }}
    >
      <Animated.View
        entering={FadeInDown.delay((index + 1) * 50)}
        style={[rStyleItem, row, styles.item]}
      >
        <Image source={item.image} style={styles.image} />

        <View style={{ flex: 1, padding: 20 }}>
          <Animated.Text style={[rStyleText, { fontSize: 20 }]}>
            {item.city}
          </Animated.Text>
          <Animated.Text style={[rStyleText, { opacity: 0.5 }]}>
            {item.country}
          </Animated.Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SearchDestinatonItem;

const styles = StyleSheet.create({
  item: {
    justifyContent: "space-between",
    marginVertical: 3,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    height: 80,
    width: 140,
    borderRadius: 10,
  },
});
