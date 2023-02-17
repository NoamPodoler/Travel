import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useThemeColors } from "../../../app/hooks";

type Props = {};

const DotLoader = (props: Props) => {
  const { main } = useThemeColors();
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
      entering={FadeIn}
      exiting={FadeOut}
      style={{ flex: 1, padding: 20, backgroundColor: main }}
    >
      <LottieView
        source={require("../../../../assets/lottie/dotLoader.json")}
        style={{ flex: 1 }}
        ref={lottieRef}
        loop
      />
    </Animated.View>
  );
};

export default DotLoader;

const styles = StyleSheet.create({});
