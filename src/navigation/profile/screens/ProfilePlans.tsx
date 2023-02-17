import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useThemeColors } from "../../../app/hooks";
import { ProfileIdContext } from "../../../utils/context";

type Props = {};

const ProfilePlans = (props: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const { user } = useContext(ProfileIdContext);

  return (
    <View style={{ flex: 1, backgroundColor: main }}>
      <Text>ProfileHome</Text>
    </View>
  );
};

export default ProfilePlans;

const styles = StyleSheet.create({});
