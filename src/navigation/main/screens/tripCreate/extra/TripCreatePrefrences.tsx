import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useAppSelector, useThemeColors } from "../../../../../app/hooks";
import { hexToRgbA } from "../../../../../utils/fn/style";
import { row } from "../../../../../utils/styling";
import { getMonth, getDay } from "../../../../../utils/fn/dates";
import { destinationsToString } from "../../../../../utils/fn/destinations";
import SingleOption from "../../../../../components/common/singleOption/SingleOption";
import { GendersType, GENDER_OPTIONS } from "../../../../../utils/interfaces";

type Props = {
  gender: GendersType;
  setGender: Function;
  global: boolean;
  setGlobal: Function;
};

const TripCreatePrefrences = ({
  gender,
  setGender,
  global,
  setGlobal,
}: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={[styles.title, { color: invertedMain }]}>Step 3</Text>

      <Text
        style={{
          color: hexToRgbA(invertedMain, 0.5),
          textAlign: "center",
          paddingVertical: 20,
        }}
      >
        Set Your Trip Plan Prefrences
      </Text>

      <Text style={[styles.subTitle, { color: invertedMain }]}>Global</Text>
      <SingleOption
        options={["Global", "Non-Global"]}
        current={global ? "Global" : "Non-Global"}
        setCurrent={(str) => setGlobal(str)}
        style={{ paddingVertical: 20 }}
      />

      <Text style={[styles.subTitle, { color: invertedMain }]}>
        Preffered Gender
      </Text>
      <SingleOption
        options={GENDER_OPTIONS}
        current={gender}
        setCurrent={(str) => setGender(str)}
        style={{ paddingVertical: 20 }}
      />
    </View>
  );
};

export default TripCreatePrefrences;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
  },

  subTitle: {
    textAlign: "center",
    paddingTop: 20,
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
