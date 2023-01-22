import { StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { SCREEN_WIDTH } from "../../../../../utils/constans";
import Animated, {
  FadeInDown,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "../../../../../app/hooks";
import { row } from "../../../../../utils/styling";
import { withCustomTiming } from "../../../../../utils/fn";
import { modifySelectedDestination } from "../../../../../features/SearchSlice";
import { PURPLE } from "../../../../../utils/colors";
import { DestinationInterface } from "../../../../../utils/interfaces";
import CustomButton from "../../../../../components/common/customButton/CustomButton";

type Props = {
  item: DestinationInterface;
  index: number;
};

const SearchDestinatonItem = ({ item, index }: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const dispatch = useAppDispatch();

  const { selectedDestinations } = useAppSelector((state) => state.search);

  const isSelected = useMemo(
    () => selectedDestinations.findIndex((i) => i.title === item.title) !== -1,
    [item, selectedDestinations]
  );

  const isSelectedLoad = useDerivedValue(
    () => withCustomTiming(isSelected ? 1 : 0),
    [isSelected]
  );

  const rStyleItem = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      isSelectedLoad.value,
      [0, 1],
      [second, invertedSecond]
    );
    const padding = interpolate(isSelectedLoad.value, [0, 1], [0, 10]);

    return {
      backgroundColor,
      padding,
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

  const rStyleLine = useAnimatedStyle(() => {
    const width = interpolate(isSelectedLoad.value, [0, 1], [0, SCREEN_WIDTH]);
    return {
      width,
    };
  });

  return (
    <CustomButton
      onPress={() => {
        dispatch(modifySelectedDestination(item));
      }}
      style={{ overflow: "hidden" }}
    >
      <Animated.View
        entering={FadeInDown.delay((index + 1) * 50)}
        style={[rStyleItem, row, styles.item]}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <Animated.Text style={[rStyleText, { fontSize: 16 }]}>
            {item.title}
          </Animated.Text>
          <Animated.Text style={[rStyleText, { opacity: 0.5 }]}>
            {item.country}
          </Animated.Text>
        </View>
        <Animated.View style={[styles.line, rStyleLine]} />
      </Animated.View>
    </CustomButton>
  );
};

export default SearchDestinatonItem;

const styles = StyleSheet.create({
  item: {
    // justifyContent: "flex-start",
    marginVertical: 3,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    height: 80,
    width: 140,
    borderRadius: 10,
  },

  line: {
    position: "absolute",
    bottom: 0,
    height: 4,
    backgroundColor: PURPLE,
  },
});
