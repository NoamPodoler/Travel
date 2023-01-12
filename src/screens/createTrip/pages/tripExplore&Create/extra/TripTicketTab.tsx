import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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

type Props = {
  setCreateTicketShown: Function;
};

const TripTicketTab = ({ setCreateTicketShown }: Props) => {
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
        />
        <TouchableOpacity onPress={() => setCreateTicketShown(false)}>
          <AntDesign
            name="close"
            size={20}
            color={main}
            style={{ padding: 10 }}
          />
        </TouchableOpacity>
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
        {`${getMonth(startingDate.month)} ${getDay(startingDate.day)}, ${
          startingDate.year
        }`}
      </Text>

      <Text style={{ color: hexToRgbA(main, 0.25) }}>Until</Text>
      <Text style={[styles.dateTitle, { color: main }]}>
        {`${getMonth(endingDate.month)} ${getDay(endingDate.day)}, ${
          endingDate.year
        }`}
      </Text>
    </View>
  );
};

export default TripTicketTab;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },

  dateTitle: {
    fontSize: 20,
    opacity: 0.75,
  },
});
