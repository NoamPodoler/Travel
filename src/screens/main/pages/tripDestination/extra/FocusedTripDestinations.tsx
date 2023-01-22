import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import Animated, { FadeIn, FadeOut, FadeOutUp } from "react-native-reanimated";
import {
  useAppSelector,
  useOpenSection,
  useThemeColors,
} from "../../../../../app/hooks";
import ThreeDotLoader from "../../../../../components/common/dotLoader/ThreeDotLoader";
import SearchDestinatonItem from "./SearchDestinatonItem";
import { center, row } from "../../../../../utils/styling";
import OpenSection from "../../../../../components/common/openSection/OpenSection";
import { DestinationInterface } from "../../../../../utils/interfaces";
import ContinentsBar from "./ContinentsBar";

type Props = {
  data: DestinationInterface[];
  setData: Function;
  searchValue: string;
  isSearchFound: boolean;
};

const FocusedTripDestinations = ({
  data,
  setData,
  searchValue,
  isSearchFound,
}: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const { selectedDestinations } = useAppSelector((state) => state.search);
  const isSearchFoundLoad = useOpenSection(isSearchFound);
  return (
    <Animated.View entering={FadeIn} style={{ flex: 1 }}>
      {data.length === 0 && searchValue.length > 0 ? (
        <ThreeDotLoader />
      ) : (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <ContinentsBar
            searchValue={searchValue}
            data={data}
            setData={(data) => setData(data)}
          />

          <OpenSection load={isSearchFoundLoad.unload}>
            <View style={center}>
              <Text
                style={{
                  color: invertedMain,
                  paddingTop: 10,
                  paddingBottom: 20,
                  opacity: 0.5,
                }}
              >{`Could Not Fonud A Matching Destinations`}</Text>
            </View>
          </OpenSection>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ borderRadius: 10 }}
            contentContainerStyle={{ paddingBottom: 80 }}
          >
            {data.map((item, index) => (
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
