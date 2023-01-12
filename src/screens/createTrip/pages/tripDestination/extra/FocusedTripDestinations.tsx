import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import React from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useAppSelector, useThemeColors } from "../../../../../app/hooks";
import ThreeDotLoader from "../../../../../components/common/dotLoader/ThreeDotLoader";
import { DESTINATIONS } from "../../../../../utils/constans";
import SearchDestinatonItem from "./SearchDestinatonItem";

type Props = {
  searchValue: string;
  destinations: typeof DESTINATIONS;
};

const FocusedTripDestinations = ({ searchValue, destinations }: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const { selectedDestinations } = useAppSelector((state) => state.search);

  return (
    <Animated.View entering={FadeIn} style={{ flex: 1 }}>
      {destinations.length === 0 && searchValue.length > 0 ? (
        <ThreeDotLoader />
      ) : (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ borderRadius: 10, marginHorizontal: 10 }}
          >
            {destinations.map((item, index) => (
              <SearchDestinatonItem
                key={index.toString()}
                item={item}
                index={index}
              />
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default FocusedTripDestinations;

const styles = StyleSheet.create({});
