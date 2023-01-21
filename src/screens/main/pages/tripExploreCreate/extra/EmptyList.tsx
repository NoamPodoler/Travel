import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { center } from "../../../../../utils/styling";
import { useAppSelector, useThemeColors } from "../../../../../app/hooks";
import { dateFormat, destinationsToString } from "../../../../../utils/fn";
import { PURPLE, WHITE } from "../../../../../utils/colors";
import LottieView from "lottie-react-native";
import { SCREEN_WIDTH } from "../../../../../utils/constans";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type Props = {};

const EmptyList = (props: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );
  return (
    <Animated.View
      style={[styles.container]}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <Text style={[styles.title, { color: invertedMain }]}>
        No Existing Plans Were Found
      </Text>

      <Text
        style={[
          styles.subTitle,
          {
            color: WHITE,
            backgroundColor: PURPLE,
            padding: 20,
            margin: 10,
          },
        ]}
      >
        In {destinationsToString(selectedDestinations)}
      </Text>

      <LottieView
        source={require("../../../../../../assets/lottie/Cube.json")}
        style={{ width: SCREEN_WIDTH }}
        autoPlay
        loop
      />

      <Text style={[styles.subTitle, { color: invertedMain }]}>
        Perhaps Create One?
      </Text>
    </Animated.View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  title: {
    textAlign: "center",
    fontSize: 22,
  },

  subTitle: {
    textAlign: "center",
    fontSize: 16,
  },
});
