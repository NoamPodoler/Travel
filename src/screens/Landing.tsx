import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { SCREEN_WIDTH } from "../utils/constans";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MAIN, RootNavigatorParamList } from "../navigation/NavigationTypes";
import { useAppSelector, useOpenSection, useThemeColors } from "../app/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import OpenSection from "../components/common/openSection/OpenSection";
import FlexSection from "../components/common/flexSection/FlexSection";
import { PURPLE, WHITE } from "../utils/colors";
import { center } from "../utils/styling";

type Props = {};

const Landing = (props: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const { main, second, invertedMain, invertedSecond, isDark, alternate } =
    useThemeColors();

  const { destinations } = useAppSelector((state) => state.data);

  const [dataLoaded, setDataLoaded] = useState(false);
  const { load, unload } = useOpenSection(dataLoaded);

  useEffect(() => {
    if (destinations.length > 0) {
      setTimeout(() => setDataLoaded(true), 1000);
    }
  }, [destinations]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: main }]}>
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.title, { color: invertedMain }]}>
          Plan your trip and find the people to travel with!
        </Text>
        <OpenSection load={load}>
          <TouchableOpacity
            style={[center, styles.btn]}
            onPress={() => navigation.navigate(MAIN)}
          >
            <Text style={{ color: WHITE }}>Get Started</Text>
          </TouchableOpacity>
        </OpenSection>
      </View>

      <LottieView
        source={require("../../assets/lottie/car.json")}
        style={{ width: SCREEN_WIDTH - 40 }}
        autoPlay
        loop
      />
    </SafeAreaView>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },

  title: {
    fontSize: 22,
    textAlign: "center",
    marginHorizontal: 20,
  },

  btn: {
    backgroundColor: PURPLE,
    width: 200,
    paddingVertical: 20,
    borderRadius: 40,
    marginVertical: 20,
  },
});
