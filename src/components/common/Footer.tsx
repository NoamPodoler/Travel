import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { CHATS } from "../navigations/NavigationTypes";
import Chevron from "./Chevron";
import { SCREEN_WIDTH } from "../../utils/constants";

type Props = {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  margin?: number;
};

const Footer = ({
  left = <></>,
  center = <></>,
  right = <></>,
  margin = 30,
}: Props) => {
  return (
    <View style={[styles.footer, { marginHorizontal: margin }]}>
      <View style={{ flex: 1, alignItems: "flex-start" }}>{left}</View>
      <View style={{ flex: 1, alignItems: "center" }}>{center}</View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>{right}</View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
