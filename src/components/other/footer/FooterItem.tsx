import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { Feather } from "@expo/vector-icons";
import { center } from "../../../utils/styling";
import { useThemeColors } from "../../../app/hooks";

type Position = "left" | "center" | "right";

type Props = {
  children: React.ReactNode;
  onPress?: Function;
  position: Position;
};

const FooterItem = ({ children, onPress = () => {}, position }: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate, isDark } =
    useThemeColors();

  const alignItems = useMemo(() => {
    if (position === "left") return "flex-start";
    if (position === "right") return "flex-end";
    return "center";
  }, [position]);

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[center, { flex: 1, width: "100%", alignItems }]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default FooterItem;

const styles = StyleSheet.create({});
