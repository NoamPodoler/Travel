import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "../../../app/hooks";
import { row } from "../../../utils/styling";
import { hexToRgbA } from "../../../utils/fn";
import { TouchableOpacity } from "react-native-gesture-handler";
import { removeDestination } from "../../../features/SearchSlice";
import Animated, {
  FadeInDown,
  FadeOut,
  FadeOutDown,
  FadeOutUp,
} from "react-native-reanimated";

type Props = {
  readOnly?: boolean;
  inverted?: boolean;
};

const SelectedDestinationsRow = ({
  readOnly = false,
  inverted = false,
}: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const { selectedDestinations } = useAppSelector((state) => state.search);

  const dispatch = useAppDispatch();

  return (
    <View style={{ height: 100 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[
          styles.scroll,
          { backgroundColor: inverted ? invertedSecond : second },
        ]}
        contentContainerStyle={{ padding: 10 }}
      >
        {selectedDestinations.map((item, index) => (
          <Animated.View key={index.toString()} entering={FadeInDown}>
            <TouchableOpacity
              onPress={() => {
                if (!readOnly) dispatch(removeDestination(item));
              }}
              style={[
                styles.item,
                { backgroundColor: inverted ? main : invertedMain },
              ]}
              activeOpacity={readOnly ? 1 : 0.5}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: inverted ? invertedMain : main,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  color: hexToRgbA(inverted ? invertedMain : main, 0.5),
                }}
              >
                {item.country}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SelectedDestinationsRow;

const styles = StyleSheet.create({
  scroll: {
    borderRadius: 10,
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingHorizontal: 40,
    borderRadius: 10,
    marginRight: 4,
  },
});
