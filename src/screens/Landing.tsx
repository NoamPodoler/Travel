import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { SCREEN_WIDTH } from "../utils/constans";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MAIN, RootNavigatorParamList } from "../navigation/NavigationTypes";
import { useThemeColors } from "../app/hooks";

type Props = {};

const Landing = (props: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const { main, second, invertedMain, invertedSecond, isDark, alternate } =
    useThemeColors();

  return (
    <View style={{ flex: 1, backgroundColor: main }}>
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/lottie/Check.json")}
          style={{ width: SCREEN_WIDTH - 100 }}
          autoPlay
          loop={false}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: second, borderColor: alternate },
          ]}
          onPress={() => navigation.navigate(MAIN)}
        >
          <Text style={{ color: invertedMain }}>Get Started</Text>
        </TouchableOpacity>
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

  button: {
    paddingHorizontal: 80,
    paddingVertical: 20,
    borderRadius: 10,
  },
});
