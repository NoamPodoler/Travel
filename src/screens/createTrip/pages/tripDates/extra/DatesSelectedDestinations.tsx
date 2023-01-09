import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector, useThemeColors } from "../../../../../app/hooks";
import { row } from "../../../../../utils/styling";
import { hexToRgbA } from "../../../../../utils/fn";

type Props = {};

const DatesSelectedDestinations = (props: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const { selectedDestinations } = useAppSelector((state) => state.search);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.scroll, { backgroundColor: second }]}
      >
        {selectedDestinations.map((item, index) => (
          <View
            key={index.toString()}
            style={[styles.item, { backgroundColor: invertedMain }]}
          >
            <Text style={{ color: main }}>{item.city}</Text>
            <Text style={{ color: hexToRgbA(main, 0.5) }}>{item.country}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DatesSelectedDestinations;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  scroll: {
    padding: 10,
    borderRadius: 10,
  },

  item: {
    height: "100%",
    padding: 20,
    paddingRight: 60,
    borderRadius: 10,
    marginRight: 4,
  },
});
