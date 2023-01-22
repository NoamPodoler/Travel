import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  hexToRgbA,
  destinationsToString,
  getMonth,
  getDay,
} from "../../../../../utils/fn";
import { row } from "../../../../../utils/styling";
import { useAppSelector, useThemeColors } from "../../../../../app/hooks";
import CustomButton from "../../../../../components/common/customButton/CustomButton";

type Props = {
  title: string;
  setTitle: Function;
  setCreateTicketShown: Function;
};

const CreatePlanHeader = ({ title, setTitle, setCreateTicketShown }: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );

  return (
    <View
      style={{
        backgroundColor: invertedMain,
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
      }}
    >
      <View style={[row, { justifyContent: "space-between" }]}>
        <TextInput
          style={[styles.title, { color: main }]}
          placeholder="Ticket's Name"
          placeholderTextColor={hexToRgbA(main, 0.75)}
          value={title}
          onChangeText={(value) => setTitle(value)}
        />
        <CustomButton onPress={() => setCreateTicketShown(false)}>
          <AntDesign
            name="close"
            size={20}
            color={main}
            style={{ padding: 10 }}
          />
        </CustomButton>
      </View>

      <Text
        style={{
          color: hexToRgbA(main, 0.5),
          marginTop: 6,
          marginBottom: 20,
        }}
      >
        {destinationsToString(selectedDestinations)}
      </Text>

      <Text style={{ color: hexToRgbA(main, 0.25) }}>From</Text>
      <Text style={[styles.dateTitle, { color: main, marginBottom: 10 }]}>
        {`${getMonth(startingDate?.month)} ${getDay(startingDate?.day)}, ${
          startingDate?.year
        }`}
      </Text>

      <Text style={{ color: hexToRgbA(main, 0.25) }}>Until</Text>
      <Text style={[styles.dateTitle, { color: main }]}>
        {`${getMonth(endingDate?.month)} ${getDay(endingDate?.day)}, ${
          endingDate?.year
        }`}
      </Text>
    </View>
  );
};

export default CreatePlanHeader;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },

  dateTitle: {
    fontSize: 20,
    opacity: 0.75,
  },
});
