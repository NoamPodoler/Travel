import {
  SafeAreaView,
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
  useOpenSection,
  useThemeColors,
} from "../../../../app/hooks";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import OpenSection from "../../../../components/common/openSection/OpenSection";
import { hexToRgbA } from "../../../../utils/fn";
import UnfocusedTripDestinations from "./extra/UnfocusedTripDestinations";
import FocusedTripDestinations from "./extra/FocusedTripDestinations";
import ContinentsBar from "./extra/ContinentsBar";
import FlexSection from "../../../../components/common/flexSection/FlexSection";
import { DestinationInterface } from "../../../../utils/interfaces";

type Props = { index: number; current: number; setFocus: Function };
const TripDestination = ({ index, current, setFocus }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const dispatch = useAppDispatch();

  const { destinations } = useAppSelector((state) => state.data);

  // state
  const [data, setData] = useState<DestinationInterface[]>(destinations);
  const [isSearchFound, setFound] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocus, setSearchFocus] = useState(false);

  // Load Values
  const searchLoad = useOpenSection(isSearchFocus);
  const timeout = React.useRef(null);

  const onChangeHandler = (value) => {
    setSearchValue(value);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      const newData = fetchDestinations(value);

      if (newData.length === 0) {
        setFound(false);
        if (data.length === destinations.length) setData(destinations);
        else setDataWithDelay(destinations);
      } else if (newData.length === destinations.length) {
        setFound(true);
        setDataWithDelay(destinations);
      } else {
        setFound(true);
        setDataWithDelay(newData);
      }
    }, 1000);
  };

  const setDataWithDelay = (data: DestinationInterface[]) => {
    setData([]);
    setTimeout(() => setData(data), 100);
  };

  const fetchDestinations = (str: string) => {
    return destinations.filter((item) => item.title.includes(str));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View style={[styles.page]}>
        {/* Title */}
        <OpenSection load={searchLoad.unload}>
          <Text style={[styles.title, { color: invertedMain }]}>
            Where would you like to go?
          </Text>
          <Text style={[styles.subTitle, { color: invertedMain }]}>
            Plan your trip and find people to travel with!
          </Text>
        </OpenSection>

        <FlexSection load={searchLoad.unload}>
          <UnfocusedTripDestinations />
        </FlexSection>

        {/* Search Bar */}
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
              color: invertedMain,
              marginHorizontal: 20,
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

        <FlexSection load={searchLoad.load}>
          <FocusedTripDestinations
            searchValue={searchValue}
            data={data}
            setData={(newData) => setDataWithDelay(newData)}
            isSearchFound={isSearchFound}
          />
        </FlexSection>
      </Animated.View>
    </SafeAreaView>
  );
};

export default TripDestination;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 24,
    margin: 20,
    marginBottom: 0,
  },

  subTitle: {
    fontSize: 16,
    opacity: 0.5,
    margin: 20,
    marginTop: 4,
  },

  search: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    marginBottom: 10,
    paddingRight: 20,
    borderRadius: 10,
  },

  anywhere: {
    paddingVertical: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
});
