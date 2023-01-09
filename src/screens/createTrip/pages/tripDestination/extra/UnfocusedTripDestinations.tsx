import React from "react";
import { StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import DestinationItem from "../extra/DestinationItem";
import {
  ITEM_WIDTH,
  ITEM_HORIZONTAL_MARGIN,
  DESTINATIONS,
} from "../../../../../utils/constans";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { modifySelectedDestination } from "../../../../../features/SearchSlice";

interface Props {}

const UnfocusedTripDestinations = ({}: Props) => {
  const dispatch = useAppDispatch();

  const { selectedDestinations } = useAppSelector((state) => state.search);

  return (
    <Animated.ScrollView
      entering={FadeIn}
      exiting={FadeOut}
      horizontal
      style={styles.scroll}
      scrollEventThrottle={16}
      snapToInterval={ITEM_WIDTH + ITEM_HORIZONTAL_MARGIN}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
    >
      {DESTINATIONS.map((item, index) => (
        <DestinationItem
          key={index.toString()}
          item={item}
          index={index}
          handleAddDestination={() => dispatch(modifySelectedDestination(item))}
          selected={
            selectedDestinations.findIndex(
              (selected) => selected.city === item.city
            ) !== -1
          }
        />
      ))}
    </Animated.ScrollView>
  );
};

export default UnfocusedTripDestinations;

const styles = StyleSheet.create({
  scroll: {
    marginHorizontal: 10,
    borderRadius: 20,
  },
});
