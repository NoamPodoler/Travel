import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { PlanInterface } from "../../../../../utils/interfaces";
import EmptyList from "./EmptyList";
import PlanListItem from "./PlanListItem";
import { useAppSelector, useThemeColors } from "../../../../../app/hooks";
import { row } from "../../../../../utils/styling";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import DotLoader from "../../../../../components/common/loaders/DotLoader";
import { dateFormat } from "../../../../../utils/fn/dates";

type Props = {
  mainList: PlanInterface[] | null;
  alternateList: PlanInterface[] | null;
};

const PlanList = ({ mainList, alternateList }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );
  const isAnyTime = startingDate.until(endingDate).days > 2000;

  if (mainList === null && alternateList === null) return <DotLoader />;
  if (mainList?.length === 0 && alternateList?.length === 0)
    return <EmptyList />;
  else
    return (
      <View style={styles.content}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={[{ justifyContent: "space-between", padding: 10 }]}>
            {/* <Text
              style={{
                color: invertedMain,
                fontSize: 16,
                textAlign: "center",
                flex: 1,
              }}
            >
              {destinationsToString(selectedDestinations)}
            </Text> */}

            {isAnyTime ? (
              <Text
                style={{
                  color: invertedMain,
                  textAlign: "center",
                  padding: 10,
                }}
              >
                Any Time
              </Text>
            ) : (
              <View
                style={[row, { justifyContent: "space-between", padding: 10 }]}
              >
                <Text style={{ color: invertedMain }}>
                  {dateFormat(startingDate)}
                </Text>
                <Text style={{ color: invertedMain }}>-</Text>
                <Text style={{ color: invertedMain }}>
                  {dateFormat(endingDate)}
                </Text>
              </View>
            )}
          </View>

          {mainList.map((item, index) => (
            <PlanListItem key={index.toString()} item={item} index={index} />
          ))}

          {alternateList?.length > 0 && (
            <Animated.Text
              entering={FadeIn}
              exiting={FadeOut}
              style={[styles.title, { color: invertedMain }]}
            >
              Other Plans Nearby
            </Animated.Text>
          )}

          {alternateList?.map((item, index) => (
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
  },

  title: {
    fontSize: 16,
    paddingVertical: 10,
    marginHorizontal: 20,
    textAlign: "center",
  },
});
