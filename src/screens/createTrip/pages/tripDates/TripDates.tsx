import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppSelector, useThemeColors } from "../../../../app/hooks";
import { Temporal } from "@js-temporal/polyfill";
import SelectedDestinationsRow from "../../extra/SelectedDestinationsRow";
import DatesTable from "./extra/DatesTable";
import DatesSummary from "./extra/DatesSummary";

type Props = { index: number; current: number; setFocus: Function };
const TripDates = ({ index, current, setFocus }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );

  const isSelected = startingDate !== null && endingDate !== null;

  return (
    <View style={styles.page}>
      <Text style={[styles.title, { color: invertedMain }]}>Select Dates</Text>

      {selectedDestinations.length > 1 && (
        <Text style={[styles.description, { color: invertedMain }]}>
          If you want to select specific dates for each destination, create for
          each a seperate 'Planner'.
        </Text>
      )}

      <View style={{ marginVertical: 10 }}>
        <SelectedDestinationsRow readOnly={true} />
      </View>
      <DatesTable />
      {isSelected && <DatesSummary />}
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
    marginBottom: 10,
  },

  description: {
    fontStyle: "italic",
    opacity: 0.5,
    margin: 10,
    marginBottom: 0,
  },
});
