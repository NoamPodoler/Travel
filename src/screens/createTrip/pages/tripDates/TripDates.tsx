import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppSelector, useThemeColors } from "../../../../app/hooks";
import { Temporal } from "@js-temporal/polyfill";
import MonthView from "../../../../components/other/date/monthView/MonthView";
import DatesSelectedDestinations from "./extra/DatesSelectedDestinations";

type Props = { setFocus: Function };

const TripDates = ({ setFocus }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const { selectedDestinations } = useAppSelector((state) => state.search);

  return (
    <View style={styles.page}>
      <Text style={[styles.title, { color: invertedMain }]}>Select Dates</Text>

      {selectedDestinations.length > 1 && (
        <Text style={[styles.description, { color: invertedMain }]}>
          If you want to select specific dates for each destination, create for
          each a seperate 'Planner'.
        </Text>
      )}

      <DatesSelectedDestinations />
      <MonthView />
    </View>
  );
};

export default TripDates;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
  },

  description: {
    fontStyle: "italic",
    opacity: 0.5,
    margin: 10,
    marginBottom: 0,
  },
});
