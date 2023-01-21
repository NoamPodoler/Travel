import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import DestinationItem from "./DestinationItem";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { modifySelectedDestination } from "../../../../../features/SearchSlice";
import SelectedDestinationsRow from "../../../extra/SelectedDestinationsRow";
import SelectedDestinations from "./SelectedDestinations";

interface Props {}

const UnfocusedTripDestinations = ({}: Props) => {
  const dispatch = useAppDispatch();

  const { selectedDestinations } = useAppSelector((state) => state.search);
  const { destinations } = useAppSelector((state) => state.data);

  return (
    <>
      <SelectedDestinations />
      <Animated.ScrollView
        style={[styles.scroll, { flex: 1 }]}
        entering={FadeIn}
        horizontal
        snapToInterval={240}
        scrollEventThrottle={16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
      >
        {destinations.map((item, index) => (
          <DestinationItem
            key={index.toString()}
            item={item}
            selected={
              selectedDestinations.findIndex(
                (selected) => selected.title === item.title
              ) !== -1
            }
          />
        ))}
      </Animated.ScrollView>
    </>
  );
};

export default UnfocusedTripDestinations;

const styles = StyleSheet.create({
  scroll: {
    borderRadius: 20,
  },
});
