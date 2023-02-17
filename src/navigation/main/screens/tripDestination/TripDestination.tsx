import { Keyboard, StyleSheet, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import { useAppSelector, useThemeColors } from "../../../../app/hooks";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Section, {
  useSection,
} from "../../../../components/common/section/Section";
import UnfocusedTripDestinations from "./extra/UnfocusedTripDestinations";
import FocusedTripDestinations from "./extra/FocusedTripDestinations";
import { DestinationInterface } from "../../../../utils/interfaces";
import CustomButton from "../../../../components/common/customButton/CustomButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootNavigatorParamList } from "../../../../navigation/NavigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import { hexToRgbA } from "../../../../utils/fn/style";
import { MainCurrentContext } from "../../../../utils/context";

type Props = {};
const TripDestination = ({}: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const { destinations } = useAppSelector((state) => state.data);
  const { selectedDestinations } = useAppSelector((state) => state.search);
  const { firebaseUser } = useAppSelector((state) => state.user);

  // state
  const [data, setData] = useState<DestinationInterface[]>(destinations);

  const [isSearchFound, setFound] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocus, setSearchFocus] = useState(false);

  // Load Values
  const searchLoad = useSection(isSearchFocus);
  const selectedDestinationLoad = useSection(selectedDestinations.length > 0);

  // const [loading, setLoading] = useState(false);
  const timeout = React.useRef(null);
  const onChangeHandler = (value) => {
    // Clearing previous timeout fn
    clearTimeout(timeout.current);

    // Pushing back the create Destination Tab
    setFound(true);

    // Timeout Fn
    timeout.current = setTimeout(() => {
      // Updates state value
      setSearchValue(value);

      const newData = fetchDestinations(value);
      if (newData.length !== 0 || value.length === 0) setData([]);

      setTimeout(() => {
        if (newData.length === 0) setFound(false);
        else setData(newData);
      }, 400);
    }, 1000);
  };

  const fetchDestinations = (str: string) => {
    return destinations.filter(
      (item) =>
        item.title.toUpperCase().includes(str.toUpperCase()) ||
        item.country.toUpperCase().includes(str.toUpperCase()) ||
        item.continent.toUpperCase().includes(str.toUpperCase())
    );
  };

  const { setCurrent } = useContext(MainCurrentContext);

  useFocusEffect(
    React.useCallback(() => {
      setCurrent(0);
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: main }}>
      <Animated.View style={[styles.page]}>
        <Section flex load={searchLoad.unload}>
          <UnfocusedTripDestinations />
        </Section>

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
              <CustomButton
                onPress={() => {
                  setSearchFocus(false);
                  Keyboard.dismiss();
                }}
                style={{ paddingVertical: 20 }}
              >
                <Ionicons
                  name="md-return-up-back"
                  size={24}
                  color={invertedMain}
                />
              </CustomButton>
            </Animated.View>
          )}
        </View>

        <Section flex load={searchLoad.load}>
          <FocusedTripDestinations
            searchValue={searchValue}
            data={data}
            setData={(newData) => setData(newData)}
            isSearchFound={isSearchFound}
          />
        </Section>
      </Animated.View>
    </View>
  );
};

export default TripDestination;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 10,
  },

  search: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    paddingRight: 20,
    borderRadius: 10,
  },

  anywhere: {
    paddingVertical: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
});
