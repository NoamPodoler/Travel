import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { row } from "../../../utils/styling";

type Props = {
  children: React.ReactNode;
};

const Footer = ({ children }: Props) => {
  return (
    <View
      style={[
        row,
        {
          paddingHorizontal: 10,
          height: 40,
          paddingTop: 10,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});
