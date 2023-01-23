import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { PlanInterface } from "../../../../../utils/interfaces";
import ThreeDotLoader from "../../../../../components/common/dotLoader/ThreeDotLoader";
import EmptyList from "./EmptyList";
import PlanListItem from "./PlanListItem";
import { useThemeColors } from "../../../../../app/hooks";
import { center } from "../../../../../utils/styling";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type Props = {
  planList: PlanInterface[];
  alternateList: PlanInterface[];
  isEmpty: boolean;
};

const PlanList = ({ planList, alternateList, isEmpty }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  if (isEmpty) return <EmptyList />;
  if (planList.length === 0 && alternateList.length === 0)
    return <ThreeDotLoader />;
  else
    return (
      <View style={styles.content}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {planList.map((item, index) => (
            <PlanListItem key={index.toString()} item={item} index={index} />
          ))}

          {alternateList.length > 0 && (
            <Animated.Text
              entering={FadeIn}
              exiting={FadeOut}
              style={[styles.title, { color: invertedMain }]}
            >
              Other Plans Nearby
            </Animated.Text>
          )}

          {alternateList.map((item, index) => (
            <PlanListItem key={index.toString()} item={item} index={index} />
          ))}
        </ScrollView>
      </View>
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

  title: {
    fontSize: 16,
    paddingVertical: 10,
    marginHorizontal: 20,
    textAlign: "center",
  },
});
