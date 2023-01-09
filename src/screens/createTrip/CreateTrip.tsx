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
import { useAppSelector, useThemeColors } from "../../app/hooks";
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
import TripTags from "./pages/TripTags";

type Props = {};

const CreateTrip = (props: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate, isDark } =
    useThemeColors();
  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const [current, setCurrent] = useState(0);
  const [pages, _] = useState<React.ReactNode[]>([
    <TripDestination setFocus={(index) => setCurrent(index)} />,
    <TripDates setFocus={(index) => setCurrent(index)} />,
    <TripTags setFocus={(index) => setCurrent(index)} />,
  ]);

  const { selectedDestinations } = useAppSelector((state) => state.search);

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
            <Text style={{ color: invertedMain, fontStyle: "italic" }}>
              Plan a Trip
            </Text>
          </FooterItem>
        }
        right={
          selectedDestinations.length > 0 && (
            <FooterItem
              onPress={() => {
                if (current < pages.length - 1) setCurrent((prev) => prev + 1);
              }}
              position="right"
            >
              {current < pages.length - 1 && (
                <Ionicons
                  name="return-down-forward"
                  size={22}
                  color={invertedMain}
                />
              )}
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
