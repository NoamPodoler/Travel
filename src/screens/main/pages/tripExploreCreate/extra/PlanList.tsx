import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { PlanInterface } from "../../../../../utils/interfaces";
import ThreeDotLoader from "../../../../../components/common/dotLoader/ThreeDotLoader";
import EmptyList from "./EmptyList";
import PlanListItem from "./PlanListItem";

type Props = {
  list: PlanInterface[];
  isEmpty: boolean;
};

const PlanList = ({ list, isEmpty }: Props) => {
  return list.length > 0 ? (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {list.map((item, index) => (
        <PlanListItem key={index.toString()} item={item} index={index} />
      ))}
    </ScrollView>
  ) : isEmpty ? (
    <EmptyList />
  ) : (
    <ThreeDotLoader />
  );
};

export default PlanList;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 10,
    marginTop: 10,
  },
});
