import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useThemeColors, useAppSelector } from "../../../../../app/hooks";
import { PURPLE, WHITE } from "../../../../../utils/colors";
import { center, row } from "../../../../../utils/styling";
import { hexToRgbA } from "../../../../../utils/fn";

type Props = {};

const TripTicketForm = (props: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );

  return (
    <View style={[styles.container, { backgroundColor: second }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: invertedMain }]}>Description</Text>
        <View style={row}>
          <TextInput
            style={[styles.input, { color: hexToRgbA(invertedMain, 0.75) }]}
            placeholder="Describe the purpose of your trip, what are you looking to do and what do you look in a partner."
            placeholderTextColor={hexToRgbA(invertedMain, 0.25)}
            multiline={true}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={[center, styles.button]}>
          <Text style={styles.buttonTitle}>Create Ticket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TripTicketForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 20,
  },

  title: {
    fontSize: 20,
  },

  input: {
    flex: 1,
    padding: 10,
    marginTop: 10,
  },

  footer: {
    flexDirection: "row",
  },

  button: {
    flex: 1,
    backgroundColor: PURPLE,
    paddingVertical: 22,
    borderRadius: 40,
  },

  buttonTitle: {
    color: WHITE,
  },
});
