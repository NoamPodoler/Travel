import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useOpenSectionRef,
  useThemeColors,
} from "../../../../app/hooks";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { center, row } from "../../../../utils/styling";
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import OpenSection from "../../../../components/common/openSection/OpenSection";
import { hexToRgbA } from "../../../../utils/fn";
import UnfocusedTripDestinations from "./extra/UnfocusedTripDestinations";
import FocusedTripDestinations from "./extra/FocusedTripDestinations";
import SelectedDestinations from "./extra/SelectedDestinations";
import ShownSection from "../../../../components/common/shownSection/ShownSection";
import { ANYWHERE, DESTINATIONS } from "../../../../utils/constans";
import { goAnywhere } from "../../../../features/SearchSlice";

type Props = { index: number; current: number; setFocus: Function };
const TripDestination = ({ index, current, setFocus }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const dispatch = useAppDispatch();

  const { selectedDestinations } = useAppSelector((state) => state.search);

  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocus, setSearchFocus] = useState(false);
  const searchLoad = useOpenSectionRef(isSearchFocus);

  const destinationsLoad = useOpenSectionRef(selectedDestinations.length > 0);

  const rStylePage = useAnimatedStyle(() => {
    const padding = interpolate(searchLoad.load.value, [0, 1], [10, 0]);
    return {
      padding,
    };
  });

  //

  const [searchDestinations, setSearchDestinations] = useState(DESTINATIONS);
  const timeout = React.useRef(null);

  const onChangeHandler = (value) => {
    clearTimeout(timeout.current);
    setSearchValue(value);
    timeout.current = setTimeout(() => {
      fetchDestinations(value);
    }, 1000);
  };

  const fetchDestinations = async (str: string) => {
    if (str !== "") setSearchDestinations([]);

    // Async Fetching Data
    setTimeout(() => {
      setSearchDestinations(DESTINATIONS);
    }, 1000);
  };

  return (
    <Animated.View style={[rStylePage, styles.page]}>
      <OpenSection load={searchLoad.unload}>
        <Text style={[styles.title, { color: invertedMain }]}>
          Where would you like to go?
        </Text>
      </OpenSection>

      <View
        style={[
          styles.search,
          {
            backgroundColor: second,
          },
        ]}
      >
        <TextInput
          placeholder="Search Destination"
          placeholderTextColor={hexToRgbA(invertedMain, 0.25)}
          onFocus={() => setSearchFocus(true)}
          onChangeText={(value) => onChangeHandler(value)}
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
      </View>

      {isSearchFocus && (
        <FocusedTripDestinations
          searchValue={searchValue}
          destinations={searchDestinations}
        />
      )}

      <ShownSection isShown={!isSearchFocus} style={{ flex: 1 }}>
        <UnfocusedTripDestinations />
      </ShownSection>
    </Animated.View>
  );
};

export default TripDestination;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  title: {
    fontSize: 28,
    margin: 10,
  },

  search: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    marginVertical: 10,
    marginHorizontal: 6,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  anywhere: {
    paddingVertical: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
});
