import { StyleSheet, View, Text, ScrollView } from "react-native";
import React from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useAppSelector, useThemeColors } from "../../../../../app/hooks";
import SearchDestinatonItem from "./SearchDestinatonItem";
import { center } from "../../../../../utils/styling";
import { useSection } from "../../../../../components/common/section/Section";
import { DestinationInterface } from "../../../../../utils/interfaces";
import ContinentsBar from "../../../extra/ContinentsBar";
import CreateDestination from "./CreateDestination";
import DotLoader from "../../../../../components/common/loaders/DotLoader";
import Section from "../../../../../components/common/section/Section";

type Props = {
  data: DestinationInterface[];
  setData: Function;
  searchValue: string;
  isSearchFound: boolean;
  // loading: boolean;
};

const FocusedTripDestinations = ({
  data,
  setData,
  searchValue,
  isSearchFound,
}: // loading,
Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const { selectedDestinations } = useAppSelector((state) => state.search);
  const isSearchFoundLoad = useSection(isSearchFound);

  return (
    <Animated.View entering={FadeIn} style={{ flex: 1 }}>
      {data.length === 0 ? (
        <DotLoader />
      ) : (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <ContinentsBar
            searchValue={searchValue}
            data={data}
            setData={(data) => setData(data)}
            style={{ paddingBottom: 0 }}
          />

          <Section load={isSearchFoundLoad.unload}>
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

            <CreateDestination searchValue={searchValue} />
          </Section>

          <ScrollView
            style={{ borderRadius: 10, marginTop: 10 }}
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
