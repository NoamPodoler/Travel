import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../../../../../app/hooks";
import {
  hexToRgbA,
  destinationsToString,
  dateFormat,
} from "../../../../../utils/fn";
import { row } from "../../../../../utils/styling";
import { TripTicketItemIteface } from "../../../../../utils/interfaces";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
  item: TripTicketItemIteface;
  index: number;
};

const TripExploreTicketItem = ({ item, index }) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  return (
    <Animated.View
      style={[row, styles.item, { backgroundColor: second }]}
      entering={FadeInDown.delay((index + 1) * 50)}
    >
      <Image source={item.destinations[0].image} style={styles.image} />

      <View
        style={[{ flex: 1, height: "100%", paddingLeft: 20, paddingTop: 10 }]}
      >
        <Text style={[{ color: invertedMain }, styles.block]}>
          {item.title}
        </Text>

        <View style={[row, { justifyContent: "flex-start" }]}>
          <Ionicons
            name="location-outline"
            size={14}
            color={invertedMain}
            style={styles.icon}
          />
          <Text style={[{ color: hexToRgbA(invertedMain, 0.5), fontSize: 12 }]}>
            {destinationsToString(item.destinations)}
          </Text>
        </View>

        <View style={[row, { justifyContent: "flex-start" }]}>
          <Ionicons
            name="person-outline"
            size={14}
            style={styles.icon}
            color={invertedMain}
          />
          <Text style={[{ color: hexToRgbA(invertedMain, 0.5), fontSize: 12 }]}>
            {`${item.people} People`}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{ color: hexToRgbA(invertedMain, 0.5), fontSize: 10 }}
          >{`From ${dateFormat(item.startingDate)}`}</Text>
          <Text
            style={{ color: hexToRgbA(invertedMain, 0.5), fontSize: 10 }}
          >{`Until ${dateFormat(item.endingDate)}`}</Text>
        </View>
      </View>
    </Animated.View>
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
  },

  icon: { marginRight: 4 },

  block: {
    marginBottom: 8,
  },
});
