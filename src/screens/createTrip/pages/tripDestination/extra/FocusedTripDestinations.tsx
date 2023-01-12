import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  FadeIn,
  FadeOut,
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
import { AntDesign, Entypo } from "@expo/vector-icons";
import ThreeDotLoader from "../../../../../components/common/dotLoader/ThreeDotLoader";
import { DESTINATIONS } from "../../../../../utils/constans";
import SelectedDestinations from "./SelectedDestinations";
import SelectedDestinationsRow from "../../../extra/SelectedDestinationsRow";

type Props = {
  searchValue: string;
};

const FocusedTripDestinations = ({ searchValue }: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const { selectedDestinations } = useAppSelector((state) => state.search);

  return (
    <Animated.View entering={FadeIn} style={{ flex: 1 }}>
      {searchValue.length > 0 ? (
        <ThreeDotLoader />
      ) : (
        selectedDestinations.length > 0 && (
          <SelectedDestinationsRow readOnly={true} />
        )
      )}
    </Animated.View>
  );
};

export default FocusedTripDestinations;

const styles = StyleSheet.create({});
