import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { SCREEN_WIDTH } from "../utils/constans";
import Btn from "../components/common/Btn";
import Center from "../components/common/Center";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  BOTTOMTAB,
  RootNavigatorParamList,
} from "../navigation/NavigationTypes";
import LandingButton from "../components/other/LandingButton";
import { useThemeColors } from "../app/hooks";

type Props = {};

const Landing = (props: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const { main, second, invertedMain, invertedSecond, isDark } =
    useThemeColors();

  return (
    <View style={{ flex: 1, backgroundColor: main }}>
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/Lottie/Check.json")}
          style={{ width: SCREEN_WIDTH - 100 }}
          autoPlay
          loop={false}
        />
      </View>

      <View style={styles.footer}>
        <LandingButton
          onPress={() => navigation.navigate(BOTTOMTAB)}
          delay={2000}
        />
      </View>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
});
