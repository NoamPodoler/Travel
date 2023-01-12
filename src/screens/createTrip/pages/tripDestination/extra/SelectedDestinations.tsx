import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  useAppDispatch,
  useAppSelector,
  useOpenSectionRef,
  useThemeColors,
} from "../../../../../app/hooks";
import OpenSection from "../../../../../components/common/openSection/OpenSection";
import { resetDestinations } from "../../../../../features/SearchSlice";
import { DESTINATIONS } from "../../../../../utils/constans";
import { hexToRgbA } from "../../../../../utils/fn";
import { row } from "../../../../../utils/styling";
import SelectedDestinationsRow from "../../../extra/SelectedDestinationsRow";

interface Props {}

const SelectedDestinations = ({}: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const dispatch = useAppDispatch();
  const { selectedDestinations } = useAppSelector((state) => state.search);
  const isSelected = selectedDestinations.length !== 0;
  const { load, unload } = useOpenSectionRef(isSelected);

  return (
    <View style={{ overflow: "hidden" }}>
      <OpenSection load={load}>
        <SelectedDestinationsRow />
      </OpenSection>
    </View>
  );
};

export default SelectedDestinations;

const styles = StyleSheet.create({});
