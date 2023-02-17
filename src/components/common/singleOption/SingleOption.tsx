import { StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { useThemeColors } from "../../../app/hooks";
import { row, center } from "../../../utils/styling";
import CustomButton from "../customButton/CustomButton";
import { withCustomTiming } from "../../../utils/fn/style";

type Props = {
  options: string[];
  current: string;
  setCurrent: Function;
  style?: ViewStyle;
};

const SingleOption = ({ options, current, setCurrent, style = {} }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  return (
    <View style={[row, { justifyContent: "center" }, style]}>
      {options.map((item, index) => (
        <Option
          key={index.toString()}
          index={index}
          item={item}
          isFocus={options.indexOf(current) === index}
          setCurrent={() => setCurrent(item)}
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
    <CustomButton style={{ height: 40 }} onPress={() => setCurrent(index)}>
      <Animated.View style={[rStyleOption, center, styles.btn]}>
        <Animated.Text style={[rStyleText, { fontSize: 12 }]}>
          {item}
        </Animated.Text>
      </Animated.View>
    </CustomButton>
  );
};

export default SingleOption;

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 4,
    paddingHorizontal: 20,
  },
});
