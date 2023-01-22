import { ScrollView, StyleSheet, Text, CustomButton, View } from "react-native";
import React from "react";
import OpenSection from "../../../../../components/common/openSection/OpenSection";
import { useOpenSection, useThemeColors } from "../../../../../app/hooks";
import { CONTINENTS } from "../../../../../utils/constans";
import Continent from "./Continent";
import { DestinationInterface } from "../../../../../utils/interfaces";

type Props = {
  searchValue: string;
  data: DestinationInterface[];
  setData: Function;
};

const ContinentsBar = ({ searchValue, data, setData }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const { load, unload } = useOpenSection(searchValue.length === 0);

  return (
    <OpenSection load={load}>
      <ScrollView
        style={[
          {
            marginBottom: 10,
            borderRadius: 10,
          },
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {CONTINENTS.map((item, index) => (
          <Continent
            key={index.toString()}
            item={item}
            data={data}
            setData={setData}
          />
        ))}
      </ScrollView>
    </OpenSection>
  );
};

export default ContinentsBar;

const styles = StyleSheet.create({});
