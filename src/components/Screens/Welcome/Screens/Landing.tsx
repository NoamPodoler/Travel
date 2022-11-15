import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import Animated, { SharedValue } from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import {
  useAppDispatch,
  useRStyleNavigation,
  useThemeColors,
} from "../../../../app/hooks";
import { switchDarkMode } from "../../../../features/SettingsSlice";
import Popup from "../../../common/Popup";

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
  const rStyle = useRStyleNavigation({ page, currentPage, scrollY });

  const dispatch = useAppDispatch();
  const colors = useThemeColors();
  return (
    <SafeAreaView
      style={[
        {
          height: SCREEN_HEIGHT,
          width: SCREEN_WIDTH,
        },
      ]}
    >
      {/* Content */}
      <View style={styles.content}>
        {/* Title */}
        <View>
          <View style={styles.titleContainer}>
            <Animated.Text
              style={[
                rStyle(2),
                styles.title,
                { color: colors.invertedSecond },
              ]}
            >
              Lorem ipsum
            </Animated.Text>
          </View>
          <View style={styles.titleContainer}>
            <Animated.Text
              style={[
                rStyle(3),
                styles.title,
                { color: colors.invertedSecond },
              ]}
            >
              amet consectetur
            </Animated.Text>
          </View>
          <View style={styles.titleContainer}>
            <Animated.Text
              style={[
                rStyle(4),
                styles.title,
                { color: colors.invertedSecond },
              ]}
            >
              adipisicing elit!
            </Animated.Text>
          </View>
        </View>

        <Animated.View
          style={[
            rStyle(0),
            { flex: 1, justifyContent: "center", alignItems: "center" },
          ]}
        >
          <LottieView
            source={require("../../../../../assets/Lottie/Abstract.json")}
            style={{ width: SCREEN_WIDTH - 10 }}
            loop
            autoPlay
          />
        </Animated.View>

        <Animated.View style={[rStyle(4)]}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.invertedMain }]}
            onPress={() => nextPage()}
          >
            <Text style={{ color: colors.main }}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Landing;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },

  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "600",
  },

  button: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 22,
    marginVertical: 4,
    borderRadius: 12,
  },
});
