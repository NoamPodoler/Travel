import React from "react";
import { Image, View } from "react-native";
import { useAppDispatch, useThemeColors } from "../../../../../app/hooks";
import { PURPLE } from "../../../../../utils/colors";
import { Text, StyleSheet } from "react-native";
import { withCustomTiming } from "../../../../../utils/fn";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { addDestination } from "../../../../../features/SearchSlice";
import { DestinationInterface } from "../../../../../utils/interfaces";
import CustomButton from "../../../../../components/common/customButton/CustomButton";
interface Props {
  item: DestinationInterface;
  selected: boolean;
}

const DestinationItem = ({ item, selected }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const dispatch = useAppDispatch();

  const focus = useDerivedValue(
    () => withCustomTiming(selected ? 1 : 0, 600),
    [selected]
  );

  const rStyleItem = useAnimatedStyle(() => {
    const width = interpolate(focus.value, [0, 1], [240, 0], Extrapolate.CLAMP);
    const paddingHorizontal = interpolate(
      focus.value,
      [0, 1],
      [4, 0],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      focus.value,
      [0, 0.75],
      [1, 0],
      Extrapolate.CLAMP
    );

    return {
      width,
      paddingHorizontal,
      opacity,
    };
  });
  return (
    <Animated.View style={[rStyleItem]}>
      <CustomButton
        onPress={() => {
          if (!selected) dispatch(addDestination(item));
        }}
        style={styles.destination}
        containerStyle={{ flex: 1 }}
        scaleSize={0.975}
      >
        <Image
          // source={require("../../../../../../assets/images/destinations/Paris.jpg")}
          style={styles.background}
        />

        <View style={[styles.title, { backgroundColor: second }]}>
          <Text
            style={[{ color: invertedMain, height: 20, overflow: "hidden" }]}
          >
            {item.title}
          </Text>
        </View>
      </CustomButton>
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
