import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import {
  useAppSelector,
  useOpenSectionRef,
  useSliderAscending,
  useThemeColors,
} from "../../app/hooks";
import Footer from "../../components/other/footer/Footer";
import {
  CREATE_TRIP,
  RootNavigatorParamList,
  SETTINGS,
} from "../../navigation/NavigationTypes";
import { SCREEN_WIDTH } from "../../utils/constans";
import { center } from "../../utils/styling";
import LottieView from "lottie-react-native";
import FooterItem from "../../components/other/footer/FooterItem";
import ScreenSlider from "../../components/common/slider/Slider";
import TripDestination from "./pages/tripDestination/TripDestination";
import TripDates from "./pages/tripDates/TripDates";
import SliderFooter from "../../components/common/slider/SliderFooter";

import OpenSection from "../../components/common/openSection/OpenSection";
import TripExploreCreate from "./pages/tripExplore&Create/TripExploreCreate";

type Props = {};

const CreateTrip = (props: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate, isDark } =
    useThemeColors();
  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const [current, setCurrent] = useState(0);
  const currentLoad = useOpenSectionRef(current === 2);
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
    <TripExploreCreate
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: main }}>
      <View style={styles.content}>
        <ScreenSlider
          list={pages}
          state={{ current, setCurrent }}
          style={{ flex: 1 }}
        />
      </View>

      <Footer
        left={
          <FooterItem
            onPress={() => {
              if (current === 0) navigation.goBack();
              else setCurrent((prev) => prev - 1);
            }}
            position="left"
          >
            <Ionicons name="return-down-back" size={22} color={invertedMain} />
          </FooterItem>
        }
        center={
          <FooterItem
            onPress={() => navigation.navigate(CREATE_TRIP)}
            position="center"
          >
            <SliderFooter
              list={pages}
              current={current}
              ascending={ascending}
            />
          </FooterItem>
        }
        right={
          current < pages.length - 1 &&
          (aIsValid || bIsValid) && (
            <FooterItem
              onPress={() => {
                setCurrent((prev) => prev + 1);
              }}
              position="right"
            >
              <Ionicons
                name="return-down-forward"
                size={22}
                color={invertedMain}
              />
            </FooterItem>
          )
        }
      />
    </SafeAreaView>
  );
};

export default CreateTrip;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
