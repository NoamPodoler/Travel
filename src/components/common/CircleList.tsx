import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Circle from "./Circle";

type Props = {
  list: any[];
  current: number;
};

const CircleList = ({ list, current }: Props) => {
  return (
    <View style={styles.list}>
      {list.map((_, index) => (
        <Circle
          key={index.toString()}
          index={index}
          isFocus={index === current}
        />
      ))}
    </View>
  );
};

export default CircleList;

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
  },
});
