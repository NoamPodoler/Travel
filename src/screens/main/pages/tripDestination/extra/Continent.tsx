import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo } from "react";
import { useAppSelector, useThemeColors } from "../../../../../app/hooks";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { getContinentList, withCustomTiming } from "../../../../../utils/fn";
import { DestinationInterface } from "../../../../../utils/interfaces";

type Props = {
  item: string;
  data: DestinationInterface[];
  setData: Function;
};

const Continent = ({ item, data, setData }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const { continents, destinations } = useAppSelector((state) => state.data);

  const continentData = useMemo(
    () => getContinentList(item, continents),
    [continents, item]
  );

  const isFocus = useMemo(() => data === continentData, [data, continentData]);

  const load = useDerivedValue(
    () => withCustomTiming(isFocus ? 1 : 0),
    [isFocus]
  );

  const rStyleItem = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      load.value,
      [0, 1],
      [second, invertedSecond]
    );
    return {
      backgroundColor,
    };
  });

  const rStyleText = useAnimatedStyle(() => {
    const color = interpolateColor(load.value, [0, 1], [invertedMain, main]);
    return {
      color,
    };
  });

  const handleSetData = () => {
    if (isFocus) {
      setData(destinations);
    } else {
      setData(continentData);
    }
  };

  return (
    <TouchableOpacity onPress={handleSetData} activeOpacity={1}>
      <Animated.View
        style={[
          rStyleItem,
          {
            padding: 20,
            marginHorizontal: 4,
            backgroundColor: second,
            borderRadius: 10,
          },
        ]}
      >
        <Animated.Text style={rStyleText}>{item}</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Continent;

const styles = StyleSheet.create({});
