import React from "react";
import { View, StyleSheet } from "react-native";
import {
  useAppDispatch,
  useAppSelector,
  useOpenSection,
  useThemeColors,
} from "../../../../../app/hooks";
import OpenSection from "../../../../../components/common/openSection/OpenSection";
import SelectedDestinationsRow from "../../../extra/SelectedDestinationsRow";

interface Props {}

const SelectedDestinations = ({}: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const dispatch = useAppDispatch();
  const { selectedDestinations } = useAppSelector((state) => state.search);
  const isSelected = selectedDestinations.length !== 0;
  const { load, unload } = useOpenSection(isSelected);

  return (
    <View style={{ overflow: "hidden" }}>
      <OpenSection load={load}>
        <View style={{ marginBottom: 10, marginTop: 0 }}>
          <SelectedDestinationsRow />
        </View>
      </OpenSection>
    </View>
  );
};

export default SelectedDestinations;

const styles = StyleSheet.create({});
