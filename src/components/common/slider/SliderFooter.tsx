import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SliderLine from "./SliderLine";
import { SCREEN_WIDTH } from "../../../utils/constans";
import { row } from "../../../utils/styling";
import { PURPLE } from "../../../utils/colors";

type Props = {
  list: React.ReactNode[];
  current: number;
  ascending?: boolean;
  color?: string;
};

const SliderFooter = ({
  list,
  current,
  ascending = true,
  color = PURPLE,
}: Props) => {
  return (
    <View style={row}>
      {list.map((_, index) => (
        <SliderLine
          key={index.toString()}
          isFocus={current === index}
          ascending={ascending}
          color={color}
        />
      ))}
    </View>
  );
};

export default SliderFooter;

const styles = StyleSheet.create({});
