import { ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import Section, {
  useSection,
} from "../../../components/common/section/Section";
import { CONTINENTS } from "../../../utils/constans";
import Continent from "./Continent";
import { DestinationInterface } from "../../../utils/interfaces";
import { useAppSelector } from "../../../app/hooks";

type Props = {
  searchValue?: string;
  data: DestinationInterface[];
  setData: Function;
  style?: ViewStyle;
};

const ContinentsBar = ({
  searchValue = "",
  data,
  setData,
  style = {},
}: Props) => {
  const { load, unload } = useSection(searchValue.length === 0);
  const { dark } = useAppSelector((state) => state.settings);
  const { continents, destinations } = useAppSelector((state) => state.data);

  const [currentDark, setCurrentDark] = useState(dark);

  useEffect(() => {
    if (dark !== currentDark) {
      setCurrentDark(dark);
      setData(destinations);
    }
  }, [dark]);

  return (
    <Section load={load}>
      <ScrollView
        style={[
          {
            borderRadius: 10,
            paddingVertical: 10,
          },
          style,
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
    </Section>
  );
};

export default ContinentsBar;

const styles = StyleSheet.create({});
