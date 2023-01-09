import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import { SCREEN_WIDTH } from "../../utils/constans";
import { PURPLE } from "../../utils/colors";
import { row } from "../../utils/styling";
import SearchPrefrencesTabTitle from "./SearchPrefrencesTabTitle";

type Props = {
  tabList: { title: string; reactNode: React.ReactNode }[];
  current: number;
  setCurrent: Function;
};

const SearchPrefrencesTabs = ({ tabList, current, setCurrent }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titles}>
        {tabList.map((item, index) => (
          <SearchPrefrencesTabTitle
            key={index.toString()}
            title={item.title}
            isFocus={current === index}
            index={index}
            setFocus={() => setCurrent(index)}
          />
        ))}
      </View>
      {tabList[current].reactNode}
    </View>
  );
};

export default SearchPrefrencesTabs;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },

  titles: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
});
