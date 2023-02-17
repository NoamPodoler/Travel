import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { center } from "../../../../../utils/styling";
import { useAppSelector, useThemeColors } from "../../../../../app/hooks";
import { PURPLE, WHITE } from "../../../../../utils/colors";
import LottieView from "lottie-react-native";
import { SCREEN_WIDTH } from "../../../../../utils/constans";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { destinationsToString } from "../../../../../utils/fn/destinations";

type Props = {};

const EmptyList = (props: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );

  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    if (lottieRef.current) {
      setTimeout(() => {
        lottieRef.current?.reset();
        lottieRef.current?.play();
      }, 100);
    }
  }, [lottieRef.current]);

  return (
    <Animated.View
      style={[styles.container]}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <Text style={[styles.title, { color: invertedMain }]}>
        Couldn't Found Plans
      </Text>

      <LottieView
        source={require("../../../../../../assets/lottie/walking.json")}
        style={{ width: SCREEN_WIDTH }}
        ref={lottieRef}
        loop
      />

      <View
        style={{
          backgroundColor: PURPLE,
          padding: 20,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <Text
          style={[
            styles.subTitle,
            {
              color: WHITE,
            },
          ]}
        >
          In {destinationsToString(selectedDestinations)}
        </Text>
      </View>
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
