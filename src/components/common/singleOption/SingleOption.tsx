import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { useThemeColors } from "../../../app/hooks";
import { withCustomTiming } from "../../../utils/fn";
import { row, center } from "../../../utils/styling";

type Props = {
  options: string[];
  current: number;
  setCurrent: Function;
};

const SingleOption = ({ options, current, setCurrent }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  return (
    <View style={[row, { justifyContent: "center", marginTop: 10 }]}>
      {options.map((item, index) => (
        <Option
          key={index.toString()}
          index={index}
          item={item}
          isFocus={current === index}
          setCurrent={(index) => setCurrent(index)}
        />
      ))}
    </View>
  );
};

const Option = ({
  index,
  item,
  isFocus,
  setCurrent,
}: {
  index: number;
  item: string;
  isFocus: boolean;
  setCurrent: Function;
}) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const load = useDerivedValue(
    () => withCustomTiming(isFocus ? 1 : 0),
    [isFocus]
  );

  const rStyleOption = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      load.value,
      [0, 1],
      [main, invertedMain]
    );
    return { backgroundColor };
  });
  const rStyleText = useAnimatedStyle(() => {
    const color = interpolateColor(load.value, [0, 1], [invertedMain, main]);
    return {
      color,
    };
  });
  return (
    <TouchableOpacity
      style={{ flex: 1, height: 40 }}
      onPress={() => setCurrent(index)}
    >
      <Animated.View style={[rStyleOption, center, styles.btn]}>
        <Animated.Text style={[rStyleText, { fontSize: 12 }]}>
          {item}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SingleOption;

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 4,
  },
});
