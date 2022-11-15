import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Animated, { color, SharedValue } from "react-native-reanimated";
import LottieView from "lottie-react-native";
import LoginNavigator from "../../../navigations/LoginNavigator";
import { useRStyleNavigation, useThemeColors } from "../../../../app/hooks";

type Props = {
  page: number;
  currentPage: SharedValue<number>;
  scrollY: SharedValue<number>;
  functions: {
    nextPage: Function;
    prevPage: Function;
    setPage: Function;
    // rStyle: Function;
  };
};

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("screen");
const Landing = ({
  page,
  currentPage,
  scrollY,
  functions: { nextPage, prevPage, setPage },
}: Props) => {
  const colors = useThemeColors();
  const rStyle = useRStyleNavigation({ page, currentPage, scrollY });

  return (
    <View
      style={[
        {
          height: SCREEN_HEIGHT,
          width: SCREEN_WIDTH,
        },
      ]}
    >
      {/* Header */}
      <Animated.View style={styles.header}>
        <Animated.View
          style={[
            rStyle(0),
            {
              position: "absolute",
              width: SCREEN_WIDTH,
              overflow: "hidden",
            },
          ]}
        >
          {colors.isDark ? (
            <LottieView
              source={require("../../../../../assets/Lottie/AbstractLinesWhite.json")}
              style={{
                width: SCREEN_WIDTH,
                opacity: 0.35,
                marginLeft: 20,
                marginTop: 10,
              }}
              loop
              autoPlay
            />
          ) : (
            <LottieView
              source={require("../../../../../assets/Lottie/AbstractLinesBlack.json")}
              style={{
                width: SCREEN_WIDTH,
                opacity: 0.35,
                marginLeft: 20,
                marginTop: 10,
              }}
              loop
              autoPlay
            />
          )}
        </Animated.View>

        <View style={{ marginTop: 30 }}>
          <Animated.Text
            style={[rStyle(2), styles.title, { color: colors.invertedMain }]}
          >
            Create Better
          </Animated.Text>
          <Animated.Text
            style={[rStyle(4), styles.title, { color: colors.invertedMain }]}
          >
            Together
          </Animated.Text>
        </View>

        <Animated.Text
          style={[rStyle(6), styles.subTitle, { color: colors.invertedMain }]}
        >
          Join our Community!
        </Animated.Text>
      </Animated.View>

      <Animated.View style={[rStyle(2), styles.formContainer]}>
        <LoginNavigator />
      </Animated.View>
    </View>
  );
};
export default Landing;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 44,
    marginLeft: 30,
  },

  subTitle: {
    fontSize: 20,
    marginLeft: 30,
    marginTop: 10,
    opacity: 0.5,
  },

  formContainer: {
    height: 580,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
