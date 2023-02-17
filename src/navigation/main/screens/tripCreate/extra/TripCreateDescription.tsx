import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useAppSelector, useThemeColors } from "../../../../../app/hooks";
import { hexToRgbA } from "../../../../../utils/fn/style";
import { row } from "../../../../../utils/styling";
import { getMonth, getDay } from "../../../../../utils/fn/dates";
import { destinationsToString } from "../../../../../utils/fn/destinations";
import { RED } from "../../../../../utils/colors";

type Props = {
  setDescription: Function;
  error: string | null;
};

const TripCreateDescription = ({ setDescription, error }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={[styles.title, { color: invertedMain }]}>Step 2</Text>

      <Text
        style={{
          color: hexToRgbA(invertedMain, 0.5),
          textAlign: "center",
          paddingVertical: 20,
        }}
      >
        Briefly Explain The Goal Of The Trip
      </Text>

      <Text style={{ color: RED, textAlign: "center", marginBottom: 10 }}>
        {error}
      </Text>

      <View
        style={{
          flex: 1,
          backgroundColor: main,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: error !== null ? RED : hexToRgbA(RED, 0),
        }}
      >
        <TextInput
          placeholder="Enter a Description Of The Trip"
          style={[styles.input, { color: invertedMain }]}
          placeholderTextColor={hexToRgbA(invertedMain, 0.5)}
          multiline
          onChangeText={(text) => setDescription(text)}
        />
      </View>
    </View>
  );
};

export default TripCreateDescription;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
  },

  input: {
    flex: 1,
    padding: 20,
    margin: 20,
    textAlign: "center",
    borderRadius: 10,
  },

  dateTitle: {
    fontSize: 20,
    opacity: 0.75,
  },

  footer: {
    paddingVertical: 40,
  },
});
