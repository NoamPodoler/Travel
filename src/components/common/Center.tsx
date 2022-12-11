import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Center = ({ children }: Props) => {
  return <View style={styles.container}>{children}</View>;
};

export default Center;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
