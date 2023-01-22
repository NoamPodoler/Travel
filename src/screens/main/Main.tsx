import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import {
  createPopupRef,
  useAppSelector,
  useOpenSection,
  useSliderAscending,
  useThemeColors,
} from "../../app/hooks";
import Footer from "../../components/other/footer/Footer";
import {
  RootNavigatorParamList,
  SETTINGS,
} from "../../navigation/NavigationTypes";
import { SCREEN_WIDTH } from "../../utils/constans";
import { center } from "../../utils/styling";
import LottieView from "lottie-react-native";
import ScreenSlider from "../../components/common/slider/Slider";
import TripDestination from "./pages/tripDestination/TripDestination";
import TripDates from "./pages/tripDates/TripDates";
import SliderFooter from "../../components/common/slider/SliderFooter";

import OpenSection from "../../components/common/openSection/OpenSection";
import TripExploreCreate from "./pages/tripExploreCreate/PlanExploreAndCreate";
import Popup from "../../components/common/popup/Popup";
import PlanExploreAndCreate from "./pages/tripExploreCreate/PlanExploreAndCreate";
import CustomButton from "../../components/common/customButton/CustomButton";

type Props = {};

const Main = (props: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate, isDark } =
    useThemeColors();
  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const popupRef = createPopupRef(false);

  const [current, setCurrent] = useState(0);
  const currentLoad = useOpenSection(current === 2);
  const ascending = useSliderAscending(current);

  const pages = [
    <TripDestination
      index={0}
      current={current}
      setFocus={(index) => setCurrent(index)}
    />,
    <TripDates
      index={1}
      current={current}
      setFocus={(index) => setCurrent(index)}
    />,
    <PlanExploreAndCreate
      index={2}
      current={current}
      setFocus={(index) => setCurrent(index)}
    />,
  ];

  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );

  // Boolean values represnting if the use is allowed to continue to the next page
  const aIsValid = current === 0 && selectedDestinations.length > 0;
  const bIsValid =
    current === 1 && startingDate !== null && endingDate !== null;

  //

  return (
    <View style={{ flex: 1, backgroundColor: main }}>
      <View style={styles.content}>
        <ScreenSlider list={pages} current={current} style={{ flex: 1 }} />
      </View>

      <Footer
        left={
          <LeftFooter current={current} setCurrent={(i) => setCurrent(i)} />
        }
        center={
          <SliderFooter list={pages} current={current} ascending={ascending} />
        }
        right={
          <RightFooter
            current={current}
            setCurrent={(i) => setCurrent(i)}
            pages={pages}
          />
        }
      />

      <Popup refrence={popupRef} />
    </View>
  );
};

const LeftFooter = ({ current, setCurrent }) => {
  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  if (current === 0)
    return (
      <CustomButton
        style={{ flex: 1, width: "100%", alignItems: "flex-start" }}
        onPress={() => navigation.navigate(SETTINGS)}
      >
        <AntDesign name="barschart" size={22} color={invertedMain} />
      </CustomButton>
    );

  return (
    <CustomButton
      style={{ flex: 1, width: "100%", alignItems: "flex-start" }}
      onPress={() => setCurrent((prev) => prev - 1)}
    >
      <Ionicons name="return-down-back" size={22} color={invertedMain} />
    </CustomButton>
  );
};

const RightFooter = ({ current, setCurrent, pages }) => {
  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );

  const isValid =
    (current === 0 && selectedDestinations.length !== 0) ||
    (current === 1 && startingDate !== null && endingDate !== null);

  if (current === pages.length - 1)
    return (
      <CustomButton
        style={{ flex: 1, width: "100%", alignItems: "flex-end" }}
        onPress={() => {}}
      >
        <AntDesign name="barschart" size={22} color={invertedMain} />
      </CustomButton>
    );

  return (
    <CustomButton
      style={{
        flex: 1,
        width: "100%",
        alignItems: "flex-end",
        opacity: isValid ? 1 : 0.3,
      }}
      onPress={() => {
        if (isValid) setCurrent((prev) => prev + 1);
      }}
    >
      <Ionicons name="return-down-forward" size={22} color={invertedMain} />
    </CustomButton>
  );
};

export default Main;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
