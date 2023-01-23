import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../../../../../app/hooks";
import {
  hexToRgbA,
  destinationsToString,
  dateFormat,
  intToDate,
} from "../../../../../utils/fn";
import { row } from "../../../../../utils/styling";
import { PlanInterface } from "../../../../../utils/interfaces";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  PLAN,
  RootNavigatorParamList,
} from "../../../../../navigation/NavigationTypes";
import { Temporal } from "@js-temporal/polyfill";
import CustomButton from "../../../../../components/common/customButton/CustomButton";
import { PURPLE } from "../../../../../utils/colors";

type Props = {
  item: PlanInterface;
  index: number;
};

const TripExploreTicketItem = ({ item, index }: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  return (
    <CustomButton
      onPress={() => navigation.navigate({ name: PLAN, params: item })}
    >
      <Animated.View
        style={[row, styles.item, { backgroundColor: second }]}
        entering={FadeInDown.delay((index + 1) * 50)}
      >
        <View style={{ flex: 1, padding: 10 }}>
          <Text
            style={[{ fontSize: 16, color: invertedMain, marginBottom: 10 }]}
          >
            {item.title}
          </Text>

          <View style={[row, { justifyContent: "flex-start" }]}>
            <Ionicons
              name="location-outline"
              size={14}
              color={invertedMain}
              style={styles.icon}
            />
            <Text
              style={[
                {
                  color: hexToRgbA(invertedMain, 0.5),
                  fontSize: 12,
                },
              ]}
            >
              {destinationsToString(item.destinations)}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              marginTop: 10,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{ color: hexToRgbA(invertedMain, 0.5), fontSize: 10 }}
            >{`From ${dateFormat(intToDate(item.startingDate))}`}</Text>
            <Text
              style={{ color: hexToRgbA(invertedMain, 0.5), fontSize: 10 }}
            >{`Until ${dateFormat(intToDate(item.endingDate))}`}</Text>
          </View>
        </View>
      </Animated.View>
    </CustomButton>
  );
};

export default TripExploreTicketItem;

const styles = StyleSheet.create({
  item: {
    marginVertical: 3,
    borderRadius: 10,
    padding: 10,
  },

  image: {
    height: 120,
    width: 160,
    justifyContent: "space-between",
    marginVertical: 3,
    borderRadius: 10,
    backgroundColor: PURPLE,
  },

  icon: { marginRight: 4 },
});
