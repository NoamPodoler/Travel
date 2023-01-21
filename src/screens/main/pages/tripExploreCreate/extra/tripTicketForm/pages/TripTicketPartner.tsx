import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAppSelector, useThemeColors } from "../../../../../../../app/hooks";
import { center, row } from "../../../../../../../utils/styling";
import { dateToInt, hexToRgbA, intToDate } from "../../../../../../../utils/fn";
import { Entypo } from "@expo/vector-icons";
import { PURPLE, WHITE } from "../../../../../../../utils/colors";
import {
  GendersType,
  GENDER_OPTIONS,
  LanguagesType,
  PlanInterface,
} from "../../../../../../../utils/interfaces";
import { addPlan } from "../../../../../../../../firebase";
import CreatePlan from "../../CreatePlanHandler";
import CreatePlanHandler from "../../CreatePlanHandler";
import SingleOption from "../../../../../../../components/common/singleOption/SingleOption";

type Props = {
  setCurrent: Function;
  state: {
    title: string;
    description: string;
    partnerDescription: string;
    languages: LanguagesType[];
    gender: GendersType;
  };
  setPartnerDescription: Function;
  setGender: Function;
};

const TripTicketPartner = ({
  setCurrent,
  state,
  setPartnerDescription,
  setGender,
}: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );
  const user = useAppSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: invertedMain }]}>
        Who Are you looking to travel with?
      </Text>
      <Text
        style={[
          styles.subTitle,
          {
            color: hexToRgbA(invertedMain, 0.5),
          },
        ]}
      >
        Enter a brief description of what you are looking for in a traveling
        partner
      </Text>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: main,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: hexToRgbA(invertedMain, 0.75),
            },
          ]}
          placeholder="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi,
            quo!"
          placeholderTextColor={hexToRgbA(invertedMain, 0.25)}
          multiline={true}
          value={state.partnerDescription}
          onChangeText={(value) => setPartnerDescription(value)}
        />
      </View>
      <SingleOption
        options={GENDER_OPTIONS}
        current={GENDER_OPTIONS.indexOf(state.gender)}
        setCurrent={(i) => setGender(GENDER_OPTIONS[i])}
      />
      <CreatePlanHandler state={state} />
    </View>
  );
};

export default TripTicketPartner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 12,
    marginBottom: 20,
    marginTop: 10,
  },
  inputContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  input: {},
});
