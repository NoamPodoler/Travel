import {
  Dimensions,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  useSharedValue,
  withTiming,
  AnimateStyle,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withSpring,
  Easing,
  runOnJS,
  color,
} from "react-native-reanimated";
import New from "./Screens/New";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootNavigatorParamList } from "../../navigations/NavigationTypes";
import Nearby from "./Screens/Nearby";
import { useThemeColors } from "../../../app/hooks";
import { hexToRgbA } from "../../../utils/fn";
import SideBar from "../../common/SideBar";
import Button from "../../common/Button";

type Props = {};

interface Page {
  name: string;
  component: React.ReactNode;
}

const LOAD_DURATION = 1000;
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("screen");
const Home = (props: Props) => {
  const RootNavigation =
    useNavigation<NativeStackNavigationProp<RootNavigatorParamList>>();

  const [pages, setPages] = useState<Page[]>([
    { name: "New", component: <New /> },
    { name: "Nearby", component: <Nearby /> },
    { name: "Recommended", component: <></> },
  ]);
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    let nextPage = currentPage + 1;
    if (nextPage === pages.length) nextPage = 0;
    setCurrentPage(nextPage);
  };

  const prevPage = () => {
    let nextPage = currentPage - 1;
    if (nextPage === -1) nextPage = pages.length - 1;
    setCurrentPage(nextPage);
  };

  const [isSideBarOpen, setSideBar] = useState<boolean>(false);

  const colors = useThemeColors();

  return (
    <View style={[styles.page, { backgroundColor: colors.main }]}>
      {isSideBarOpen && <SideBar setShown={(bool) => setSideBar(bool)} />}
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Button
                onPress={() => {
                  setSideBar(true);
                }}
              >
                <Entypo name="menu" size={24} color="black" />
              </Button>

              <Text style={[styles.title, { color: colors.invertedSecond }]}>
                Explore
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: hexToRgbA(colors.second, 0.5) },
              ]}
            >
              <Text style={{ color: colors.invertedSecond }}>
                {pages[currentPage].name}
              </Text>
              <Entypo
                name="chevron-down"
                size={18}
                color={colors.isDark ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1 }}>{pages[currentPage].component}</View>
      </SafeAreaView>
      <View style={styles.footer}>
        <View style={styles.pagesCircles}>
          {pages.map((item, index) => {
            return (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => setCurrentPage(index)}
                style={[
                  styles.circle,
                  currentPage === index ? { opacity: 1 } : { opacity: 0.5 },
                  ,
                  {
                    backgroundColor: colors.invertedMain,
                  },
                ]}
              ></TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity onPress={() => nextPage()}>
          <Entypo
            name="chevron-right"
            size={28}
            color={colors.isDark ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: { height: SCREEN_HEIGHT, width: SCREEN_WIDTH, padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
    fontWeight: "300",
    marginHorizontal: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
    borderRadius: 20,
  },
  item: {
    height: 240,
    borderRadius: 20,
    backgroundColor: "white",
    marginVertical: 5,
  },

  footer: {
    flexDirection: "row",
    height: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },

  pagesCircles: {
    flexDirection: "row",
  },

  circle: {
    height: 14,
    width: 14,
    marginHorizontal: 3,
    borderRadius: 7,
  },
});
