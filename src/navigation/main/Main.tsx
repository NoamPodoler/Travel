import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useMemo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  useAppSelector,
  useSliderAscending,
  useThemeColors,
} from "../../app/hooks";
import {
  MainNavigatorParamList,
  MAIN_DATES,
  MAIN_DESTINATIONS,
  MAIN_EXPLORE,
  RootNavigatorParamList,
  SETTINGS,
  SIGNINUP,
} from "../NavigationTypes";
import SliderFooter from "../../components/common/slider/SliderFooter";

import CustomButton from "../../components/common/customButton/CustomButton";
import { useNotifications } from "../../components/other/notifications/Notifications";
import MainNavigator from "./MainNavigator";
import { MainCurrentContext } from "../../utils/context";
import { SafeAreaView } from "react-native-safe-area-context";
import { center, row } from "../../utils/styling";
import { destinationsToString } from "../../utils/fn/destinations";
import { usePopupBar } from "../../components/other/popupBar/PopupBar";
import Navbar from "../../components/other/popupBar/tabs/profileHeader/ProfileHeader";
import Footer from "../../components/common/footer/Footer";
import { hexToRgbA } from "../../utils/fn/style";

type Props = {};

const Main = (props: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate, isDark } =
    useThemeColors();
  const [current, setCurrent] = useState(0);
  const ascending = useSliderAscending(current);

  // useFocusEffect(React.useCallback(() => setCurrent(0), []));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: main }}>
      <MainCurrentContext.Provider value={{ current, setCurrent }}>
        <Header />
        <MainNavigator />
      </MainCurrentContext.Provider>

      <Footer>
        <View style={[center, { flex: 1 }]}>
          <LeftFooter current={current} setCurrent={(i) => setCurrent(i)} />
        </View>

        <View style={[center, { flex: 3 }]}>
          <View style={[center, { paddingHorizontal: 40 }]}>
            <SliderFooter
              list={Array(3).fill(0)}
              current={current}
              ascending={ascending}
            />
          </View>
        </View>

        <View style={[center, { flex: 1 }]}>
          <RightFooter current={current} setCurrent={(i) => setCurrent(i)} />
        </View>
      </Footer>
    </SafeAreaView>
  );
};

const LeftFooter = ({ current, setCurrent }) => {
  const rootNavigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();
  const mainNavigation =
    useNavigation<StackNavigationProp<MainNavigatorParamList>>();
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const handlePrev = () => {
    if (current === 0) rootNavigation.navigate(SETTINGS);
    else {
      // setCurrent((prev) => prev - 1);
      mainNavigation.navigate(current === 1 ? MAIN_DESTINATIONS : MAIN_DATES);
    }
  };

  return (
    <CustomButton style={[center, { flex: 1 }]} onPress={handlePrev}>
      {current === 0 ? (
        <AntDesign name="areachart" size={20} color={invertedMain} />
      ) : (
        <Ionicons name="return-down-back" size={22} color={invertedMain} />
      )}
    </CustomButton>
  );
};

const RightFooter = ({ current, setCurrent }) => {
  const rootNavigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const notification = useNotifications();
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );

  const isValid =
    (current === 0 && selectedDestinations.length !== 0) ||
    (current === 1 && startingDate !== null && endingDate !== null);

  const mainNavigation =
    useNavigation<StackNavigationProp<MainNavigatorParamList>>();

  const handleNext = () => {
    if (isValid) {
      if (current === 0) mainNavigation.navigate(MAIN_DATES);
      else if (current === 1) mainNavigation.navigate(MAIN_EXPLORE);
    }
  };

  return (
    <CustomButton style={[center, { flex: 1 }]} onPress={handleNext}>
      <Ionicons
        name="return-down-forward"
        size={22}
        color={hexToRgbA(invertedMain, isValid ? 1 : 0.5)}
      />
    </CustomButton>
  );
};

const Header = () => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const rootNavigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();
  const { current } = useContext(MainCurrentContext);
  const { selectedDestinations } = useAppSelector((state) => state.search);
  const user = useAppSelector((state) => state.user);
  const popupBar = usePopupBar();

  const title = useMemo(() => {
    if (current === 0) return "Select Destinations";
    else if (current === 1) return "Select Dates";
    else if (current === 2) {
      if (selectedDestinations.length > 2)
        return `${destinationsToString(
          [...selectedDestinations].splice(0, 2)
        )} & More`;
      else return destinationsToString(selectedDestinations);
    }
  }, [current, selectedDestinations]);

  const handleMenuPress = () => {
    if (user.firebaseUser === null) rootNavigation.navigate(SIGNINUP);
    else popupBar.push(<Navbar />, true, 210);
  };

  return (
    <View style={styles.header}>
      <View>
        <Text style={[styles.subTitle, { color: invertedMain }]}>
          Plan A Trip
        </Text>
        <Text style={[styles.title, { color: invertedMain }]}>{title}</Text>
      </View>

      <CustomButton
        onPress={handleMenuPress}
        style={[
          center,
          { padding: 10, backgroundColor: invertedMain, borderRadius: 50 },
        ]}
      >
        {user.firebaseUser === null ? (
          <AntDesign name="login" size={18} color={main} />
        ) : (
          <Ionicons name="ios-menu-outline" size={20} color={main} />
        )}
      </CustomButton>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 26,
  },
  subTitle: {
    opacity: 0.5,
    fontStyle: "italic",
  },

  line: {
    height: 4,
    borderRadius: 20,
    marginRight: 5,
    overflow: "hidden",
    marginTop: 10,
  },
});
