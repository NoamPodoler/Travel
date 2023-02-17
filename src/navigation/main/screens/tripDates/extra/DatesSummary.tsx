import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useThemeColors, useAppSelector } from "../../../../../app/hooks";
import { center } from "../../../../../utils/styling";
import { hexToRgbA } from "../../../../../utils/fn/style";
import { dateFormat } from "../../../../../utils/fn/dates";

type Props = {};

const DatesSummary = (props: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );

  const tripLength = startingDate.until(endingDate).days + 1;
  return (
    <View style={center}>
      <Text
        style={[{ color: hexToRgbA(invertedMain, 0.5), fontSize: 12 }]}
      >{`From ${dateFormat(startingDate)}, to ${dateFormat(
        endingDate
      )}; `}</Text>
      <Text
        style={[{ color: hexToRgbA(invertedMain, 0.5), fontSize: 12 }]}
      >{`${tripLength} Days In Total`}</Text>
    </View>
  );
};

export default DatesSummary;

const styles = StyleSheet.create({});
