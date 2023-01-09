import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  useAppSelector,
  useOpenSectionRef,
  useThemeColors,
} from "../../../../../app/hooks";
import OpenSection from "../../../../../components/common/openSection/OpenSection";
import { DESTINATIONS } from "../../../../../utils/constans";
import { row } from "../../../../../utils/styling";

interface Props {}

const SelectedDestinations = ({}: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const { selectedDestinations } = useAppSelector((state) => state.search);
  const isSelected = selectedDestinations.length !== 0;
  const { load, unload } = useOpenSectionRef(isSelected);

  return (
    <View>
      <Text style={[styles.title, { color: invertedMain }]}>
        Choose your destination
      </Text>

      <View style={{ overflow: "hidden" }}>
        <OpenSection load={load}>
          <View style={{ backgroundColor: second, borderRadius: 10 }}>
            <View
              style={[row, { justifyContent: "space-between", margin: 20 }]}
            >
              <Text style={[styles.destinationsTitle, { color: invertedMain }]}>
                Selected Destinations
              </Text>

              <Text
                style={[{ color: invertedMain }]}
              >{`Total ${selectedDestinations.length}`}</Text>
            </View>
          </View>
        </OpenSection>
      </View>
    </View>
  );
};

export default SelectedDestinations;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 10,
  },

  destinationsTitle: {
    fontSize: 20,
  },
});
