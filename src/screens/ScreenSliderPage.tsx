import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenSlider from "../components/other/sliders/screenSlider/ScreenSlider";
import { ScreenSliderItemInterface } from "../utils/interfaces";
import { useThemeColors } from "../app/hooks";

type Props = {};

const ScreenSliderPage = (props: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const [lottieRefs, _] = useState([
    require("../../assets/Lottie/walking.json"),
    require("../../assets/Lottie/DocumentCheck.json"),
    require("../../assets/Lottie/mustache.json"),
    require("../../assets/Lottie/walking.json"),
    require("../../assets/Lottie/DocumentCheck.json"),
    require("../../assets/Lottie/mustache.json"),
  ]);
  const [list, setList] = useState<ScreenSliderItemInterface[]>(
    Array(lottieRefs.length)
      .fill(0)
      .map((_, index) => ({
        lottie: lottieRefs[index],
        title: `Title ${index}`,
        content: `content of page number ${index}`,
      }))
  );

  return (
    <View style={[{ flex: 1, backgroundColor: main }]}>
      <ScreenSlider list={list} />
    </View>
  );
};

export default ScreenSliderPage;

const styles = StyleSheet.create({});
