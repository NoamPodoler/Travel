import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../../app/hooks";

type Props = {
  onPress: Function;
  size?: number;
  iconSize?: number;
  backgroundColor?: string;
  chevronColor?: string;
  alternate?: boolean;
  style?: any;
};

const Chevron = ({
  onPress,
  size = 40,
  iconSize = 24,
  backgroundColor,
  chevronColor,
  alternate = false,
  style,
}: Props) => {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        styles.button,
        {
          height: size,
          width: size,
          borderRadius: size / 2,
        },
        backgroundColor ? { backgroundColor } : {},
        style,
      ]}
    >
      {!alternate ? (
        <Entypo
          name="chevron-left"
          size={iconSize}
          color={chevronColor ? chevronColor : colors.main}
        />
      ) : (
        <Ionicons
          name="return-down-back"
          size={iconSize}
          color={chevronColor ? chevronColor : colors.main}
        />
      )}
    </TouchableOpacity>
  );
};

export default Chevron;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
