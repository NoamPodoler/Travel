import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import StringItem from "./StringItem";
import { BLUE, LIGHT_BLUE } from "../../../utils/colors";

export type StringListItemType = string | (string | string[])[];

export interface StringPropertiesInterface {
  delay?: number;
  fontSize?: number;
  color?: string | null;
  invertedColor?: boolean;
  translateValue?: number;
  horizontal?: boolean;
  deg?: number;
  invertedExit?: boolean;
  startDelay?: number;
  markerColor?: string;
  style?: StyleProp<ViewStyle>;
}

type Props = {
  list: StringListItemType[];
  load?: boolean;
  unload?: boolean;
  properties?: StringPropertiesInterface;
};

const String = ({
  list,
  load = true,
  unload,
  properties: {
    delay = 200,
    fontSize = 30,
    color = null,
    invertedColor = false,
    translateValue = 50,
    horizontal = false,
    deg = 6,
    invertedExit = true,
    startDelay = 0,
    markerColor = LIGHT_BLUE,
    style = null,
  } = {
    delay: 200,
    fontSize: 30,
    color: null,
    invertedColor: false,
    translateValue: 50,
    horizontal: false,
    deg: 6,
    invertedExit: true,
    startDelay: 0,
    markerColor: LIGHT_BLUE,
    style: null,
  },
}: Props) => {
  const properties = {
    delay: delay,
    fontSize,
    color,
    translateValue,
    horizontal,
    deg,
    invertedExit,
    startDelay,
    markerColor,
    style,
  };

  return (
    <View style={style}>
      {load &&
        list.map((item, index) => (
          <StringItem
            key={index.toString()}
            item={item}
            index={index}
            length={list.length}
            unload={unload}
            properties={properties}
          />
        ))}
    </View>
  );
};

export default String;

const styles = StyleSheet.create({});
