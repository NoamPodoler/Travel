import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  LoginNavigatorParamList,
  RootNavigatorParamList,
  SELL,
} from "../../../navigations/NavigationTypes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  FadeOutRight,
  FadeOutUp,
} from "react-native-reanimated";
import { Sell, SellsList } from "../../../../utils/SellsList";
import { useThemeColors } from "../../../../app/hooks";
import { hexToRgbA } from "../../../../utils/fn";

type Props = {};
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("screen");

const Nearby = ({}: Props) => {
  const LoginNavigation =
    useNavigation<BottomTabNavigationProp<LoginNavigatorParamList>>();
  const RootNavigation =
    useNavigation<NativeStackNavigationProp<RootNavigatorParamList>>();

  const [sellsList, setSellsList] = useState<Sell[]>(SellsList);

  const colors = useThemeColors();

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[{ flex: 1 }]}
        entering={FadeIn.delay(100)}
        exiting={FadeOut}
      >
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {sellsList.map((item, index) => {
            return (
              <Animated.View
                key={index.toString()}
                entering={FadeInDown.delay(100 * index)}
                exiting={FadeOutUp.delay(100 * index)}
              >
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => RootNavigation.navigate(SELL, item)}
                  style={[
                    styles.item,
                    { backgroundColor: hexToRgbA(colors.second, 0.5) },
                  ]}
                >
                  <Text style={[styles.title, { color: colors.invertedMain }]}>
                    {item.title}
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text
                      style={[styles.price, { color: colors.invertedMain }]}
                    >
                      {item.price}$
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default Nearby;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "white",
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
    borderRadius: 20,
  },
  item: {
    justifyContent: "space-between",
    height: 240,
    borderRadius: 20,
    padding: 20,
    marginVertical: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "300",
  },

  priceContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  price: {
    fontSize: 20,
  },
});
