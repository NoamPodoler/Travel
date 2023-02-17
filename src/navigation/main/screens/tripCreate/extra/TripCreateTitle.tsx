import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useAppSelector, useThemeColors } from "../../../../../app/hooks";
import { hexToRgbA } from "../../../../../utils/fn/style";
import { row } from "../../../../../utils/styling";
import { getMonth, getDay } from "../../../../../utils/fn/dates";
import { destinationsToString } from "../../../../../utils/fn/destinations";
import { RED } from "../../../../../utils/colors";

type Props = {
  title: string;
  setTitle: Function;
  error: string | null;
};

const TripCreateTitle = ({ title, setTitle, error }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={[styles.title, { color: invertedMain }]}>Step 1</Text>

      <Text
        style={{
          color: hexToRgbA(invertedMain, 0.5),
          textAlign: "center",
          paddingVertical: 20,
        }}
      >
        Explain The Purpose Of The Trip
      </Text>

      <Text style={{ color: RED, textAlign: "center" }}>{error}</Text>

      <TextInput
        placeholder="Enter The Plan Title"
        style={[
          styles.input,
          {
            backgroundColor: main,
            color: invertedMain,
            borderColor: error !== null ? RED : hexToRgbA(RED, 0),
          },
        ]}
        placeholderTextColor={hexToRgbA(invertedMain, 0.5)}
        // value={title}
        onChangeText={(str) => setTitle(str)}
      />

      <View style={styles.footer}>
        <Text
          style={{
            color: hexToRgbA(invertedMain, 0.75),
            textAlign: "center",
            fontSize: 18,
            paddingVertical: 20,
          }}
        >
          {destinationsToString(selectedDestinations)}
        </Text>
        <Text
          style={{
            color: hexToRgbA(invertedMain, 0.25),
            textAlign: "center",
            paddingVertical: 10,
          }}
        >
          From
        </Text>
        <Text
          style={[
            styles.dateTitle,
            { color: invertedMain, marginBottom: 10, textAlign: "center" },
          ]}
        >
          {`${getMonth(startingDate?.month)} ${getDay(startingDate?.day)}, ${
            startingDate?.year
          }`}
        </Text>

        <Text
          style={{
            color: hexToRgbA(invertedMain, 0.25),
            textAlign: "center",
            paddingVertical: 10,
          }}
        >
          Until
        </Text>
        <Text
          style={[
            styles.dateTitle,
            { color: invertedMain, textAlign: "center" },
          ]}
        >
          {`${getMonth(endingDate?.month)} ${getDay(endingDate?.day)}, ${
            endingDate?.year
          }`}
        </Text>
      </View>
    </View>
  );
};

export default TripCreateTitle;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
  },

  input: {
    // flex: 1,
    padding: 30,
    margin: 10,
    textAlign: "center",
    fontSize: 18,
    borderRadius: 10,
    borderWidth: 1,
  },

  dateTitle: {
    fontSize: 20,
    opacity: 0.75,
  },

  footer: {
    paddingVertical: 40,
  },
});
