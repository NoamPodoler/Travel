import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import DestinationItem from "../extra/DestinationItem";
import { DESTINATIONS } from "../../../../../utils/constans";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { modifySelectedDestination } from "../../../../../features/SearchSlice";
import SelectedDestinations from "./SelectedDestinations";

interface Props {}

const UnfocusedTripDestinations = ({}: Props) => {
  const dispatch = useAppDispatch();

  const { selectedDestinations } = useAppSelector((state) => state.search);

  return (
    <>
      <Animated.ScrollView
        style={[styles.scroll, { flex: 1 }]}
        entering={FadeIn}
        horizontal
        snapToInterval={240}
        scrollEventThrottle={16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
      >
        {DESTINATIONS.map((item, index) => (
          <DestinationItem
            key={index.toString()}
            item={item}
            selected={
              selectedDestinations.findIndex(
                (selected) => selected.city === item.city
              ) !== -1
            }
          />
        ))}
      </Animated.ScrollView>
      <SelectedDestinations />
    </>
  );
};

export default UnfocusedTripDestinations;

const styles = StyleSheet.create({
  scroll: {
    borderRadius: 20,
  },
});
