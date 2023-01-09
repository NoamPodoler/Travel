import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useThemeColors } from "../../../app/hooks";
import Btn from "../../../components/other/btn/Btn";
import { Ionicons } from "@expo/vector-icons";
import { row } from "../../../utils/styling";

type Props = { setFocus: Function };

const TripTags = ({ setFocus }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  return (
    <View style={styles.page}>
      <Text style={[styles.title, { color: invertedMain }]}>
        What kind of trip are you plannig?
      </Text>
    </View>
  );
};

export default TripTags;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
  },
});
