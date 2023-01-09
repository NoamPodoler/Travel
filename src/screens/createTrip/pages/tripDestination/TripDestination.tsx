import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useOpenSectionRef,
  useThemeColors,
} from "../../../../app/hooks";
import Btn from "../../../../components/other/btn/Btn";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { row } from "../../../../utils/styling";
import {
  DESTINATIONS,
  ITEM_HORIZONTAL_MARGIN,
  ITEM_WIDTH,
} from "../../../../utils/constans";
import Slider from "../../../../components/common/slider/Slider";
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { BLUE, PURPLE, WHITE } from "../../../../utils/colors";
import OpenSection from "../../../../components/common/openSection/OpenSection";
import { hexToRgbA } from "../../../../utils/fn";
import Destinations from "./extra/SelectedDestinations";
import UnfocusedTripDestinations from "./extra/UnfocusedTripDestinations";
import FocusedTripDestinations from "./extra/FocusedTripDestinations";

type Props = { setFocus: Function };

const TripDestination = ({ setFocus }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  // const [selectedDestinations, setSelectedDestinations] = useState<
  //   typeof DESTINATIONS
  // >([]);

  const dispatch = useAppDispatch();

  const { selectedDestinations } = useAppSelector((state) => state.search);

  const [searchValue, setSearchValue] = useState("");

  //

  // const isSearchFocus = useSharedValue(0);
  // const isSearchUnfocus = useDerivedValue(
  //   () => 1 - isSearchFocus.value,
  //   [isSearchFocus]
  // );

  const [isSearchFocus, setSearchFocus] = useState(false);
  const { load, unload } = useOpenSectionRef(isSearchFocus);

  // const _isSearchFocus = useDerivedValue(() => {
  //   if (isSearchFocus) return withTiming(1);
  //   else return withTiming(0);
  // }, [isSearchFocus]);

  const rStylePage = useAnimatedStyle(() => {
    const padding = interpolate(load.value, [0, 1], [20, 0]);
    return {
      padding,
    };
  });

  const rStyleSection = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      load.value,
      [0, 1],
      [second, main]
    );
    return {
      backgroundColor,
    };
  });

  const rStyleSearchBar = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      load.value,
      [0, 1],
      [main, second]
    );
    return {
      backgroundColor,
    };
  });

  return (
    <Animated.View style={[rStylePage, styles.page]}>
      <OpenSection load={unload}>
        <View style={{ marginBottom: 10 }}>
          <Destinations />
        </View>
      </OpenSection>

      <Animated.View style={[styles.destinationSection, rStyleSection]}>
        <OpenSection load={unload}>
          <View
            style={[
              row,
              { justifyContent: "space-between", margin: 20, marginBottom: 0 },
            ]}
          >
            <Text style={[styles.destinationsTitle, { color: invertedMain }]}>
              Where would you like to go?
            </Text>

            <TouchableOpacity style={{ padding: 10 }}>
              <Entypo name="globe" size={18} color={invertedMain} />
            </TouchableOpacity>
          </View>
        </OpenSection>

        <Animated.View style={[styles.search, rStyleSearchBar]}>
          <TextInput
            placeholder="Search Destination"
            placeholderTextColor={hexToRgbA(invertedMain, 0.25)}
            onFocus={() => setSearchFocus(true)}
            onChangeText={setSearchValue}
            style={{
              flex: 1,
              height: "100%",
              marginRight: 40,
              color: invertedMain,
            }}
          />
          {isSearchFocus && (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <TouchableOpacity
                onPress={() => setSearchFocus(false)}
                style={{ paddingVertical: 20 }}
              >
                <Ionicons
                  name="md-return-up-back"
                  size={24}
                  color={invertedMain}
                />
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>
        {isSearchFocus ? (
          <FocusedTripDestinations searchValue={searchValue} />
        ) : (
          <UnfocusedTripDestinations />
        )}
      </Animated.View>
    </Animated.View>
  );
};

export default TripDestination;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  destinationSection: {
    flex: 1,
    borderRadius: 10,
  },

  destinationsTitle: {
    fontSize: 20,
  },

  search: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    margin: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  selectedTitle: {
    margin: 20,
    marginBottom: 10,
    fontSize: 20,
  },

  //

  selectedItem: {
    flex: 1,
    width: 160,
    margin: 10,
    marginHorizontal: 4,
    borderRadius: 10,
  },
});
