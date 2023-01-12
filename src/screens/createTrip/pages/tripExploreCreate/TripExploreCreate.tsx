import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useAppSelector,
  useOpenSectionRef,
  useThemeColors,
} from "../../../../app/hooks";
import { center, row, shadow } from "../../../../utils/styling";
import SelectedDates from "../../extra/SelectedDates";
import { ScrollView } from "react-native-gesture-handler";
import {
  destinationsToString,
  getDay,
  getMonth,
  getRandomNumber,
  hexToRgbA,
} from "../../../../utils/fn";
import { AntDesign, EvilIcons, Ionicons } from "@expo/vector-icons";
import { WHITE, PURPLE } from "../../../../utils/colors";
import { DESTINATIONS, SCREEN_WIDTH } from "../../../../utils/constans";
import OpenSection from "../../../../components/common/openSection/OpenSection";
import FlexSection from "../../../../components/common/flexSection/FlexSection";
import TripExploreTicketItem from "./extra/TripExploreTicketItem";
import { TripTicketItemIteface } from "../../../../utils/interfaces";
import ThreeDotLoader from "../../../../components/common/dotLoader/ThreeDotLoader";
import TripTicketTab from "./extra/TripTicketTab";
import TripTicketForm from "./extra/TripTicketForm";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

type Props = { index: number; current: number; setFocus: Function };

const TripExploreCreate = ({ index, current, setFocus }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );

  const [exploreList, setExploreList] = useState<TripTicketItemIteface[]>([]);

  useEffect(() => {
    if (
      startingDate !== null &&
      endingDate !== null &&
      selectedDestinations.length > 0
    )
      fetchData();
  }, [startingDate, endingDate, selectedDestinations]);

  const fetchData = () => {
    setExploreList([]);
    setTimeout(
      () =>
        setExploreList(
          Array(10)
            .fill(0)
            .map((item, index) => {
              const randomDestinationIndex = getRandomNumber(
                0,
                DESTINATIONS.length - 3
              );

              return {
                title: "Ticket Title",
                name: "Creator's Name",
                destinations: DESTINATIONS.slice(
                  randomDestinationIndex,
                  randomDestinationIndex + 3
                ),
                people: Math.round(Math.random() * 3 + 2),
                startingDate: startingDate,
                endingDate: endingDate,
              };
            })
        ),
      3000
    );
  };

  const [createTicketShown, setCreateTicketShown] = useState(false);
  const createTicketLoad = useOpenSectionRef(createTicketShown);

  const isShown = startingDate !== null && endingDate !== null;
  return (
    isShown && (
      <View style={styles.page}>
        <OpenSection
          load={createTicketLoad.load}
          containerStyle={{
            marginHorizontal: 10,
            borderRadius: 10,
            zIndex: 10,
          }}
        >
          <TripTicketTab
            setCreateTicketShown={(bool) => setCreateTicketShown(bool)}
          />
        </OpenSection>

        {exploreList.length > 0 && (
          <Animated.View entering={FadeInUp}>
            <OpenSection
              load={createTicketLoad.unload}
              containerStyle={{ marginHorizontal: 10, borderRadius: 10 }}
            >
              <TouchableOpacity
                style={[center, styles.btn, { backgroundColor: invertedMain }]}
                onPress={() => setCreateTicketShown(true)}
                activeOpacity={1}
              >
                <Text style={{ color: main }}>Create a new Ticket</Text>
              </TouchableOpacity>
            </OpenSection>
          </Animated.View>
        )}

        <FlexSection load={createTicketLoad.unload}>
          {exploreList.length > 0 ? (
            <ScrollView
              style={styles.content}
              showsVerticalScrollIndicator={false}
            >
              {exploreList.map((item, index) => (
                <TripExploreTicketItem
                  key={index.toString()}
                  item={item}
                  index={index}
                />
              ))}
            </ScrollView>
          ) : (
            <ThreeDotLoader />
          )}
        </FlexSection>

        <FlexSection load={createTicketLoad.load}>
          <TripTicketForm />
        </FlexSection>
      </View>
    )
  );
};

export default TripExploreCreate;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  content: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 10,
    marginTop: 10,
  },

  btn: {
    padding: 20,
    borderRadius: 10,
  },

  btnText: {},

  container: {
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
