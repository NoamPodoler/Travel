import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ProfileIdContext } from "../../../utils/context";
import { useThemeColors } from "../../../app/hooks";

type Props = {};

const ProfileHome = (props: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const { user } = useContext(ProfileIdContext);

  return <View style={{ flex: 1, backgroundColor: main }}></View>;
};

export default ProfileHome;

const styles = StyleSheet.create({});
