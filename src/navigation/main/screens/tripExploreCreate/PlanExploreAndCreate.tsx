import { StyleSheet, Text, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useAppSelector, useThemeColors } from "../../../../app/hooks";
import { center } from "../../../../utils/styling";
import { PlanInterface } from "../../../../utils/interfaces";
import Animated, { FadeInUp } from "react-native-reanimated";
import { fetchPlans } from "../../../../../firebase";
import PlanList from "./extra/PlanList";
import CustomButton from "../../../../components/common/customButton/CustomButton";
import { dateToInt } from "../../../../utils/fn/dates";
import { getDestinationsByCountries } from "../../../../utils/fn/destinations";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { MainCurrentContext } from "../../../../utils/context";
import { usePopupBar } from "../../../../components/other/popupBar/PopupBar";
import TripCreate from "../tripCreate/TripCreate";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootNavigatorParamList, SIGNINUP } from "../../../NavigationTypes";
import Section, {
  useSection,
} from "../../../../components/common/section/Section";

type Props = {};

const PlanExploreAndCreate = ({}: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const rootNavigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();
  const bottomBar = usePopupBar();

  // Redux State
  const { destinations, continents } = useAppSelector((state) => state.data);
  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );
  const user = useAppSelector((state) => state.user);
  const [mainList, setMainList] = useState<PlanInterface[] | null>([]);
  const [alternateList, setAlternativePlansList] = useState<
    PlanInterface[] | null
  >([]);

  // UI State
  const buttonLoad = useSection(mainList !== null && alternateList !== null);

  const resetData = () => {
    setMainList(null);
    setAlternativePlansList(null);
  };

  // Fetching Data When Relevant
  useEffect(() => {
    const handleFetchingData = async () => {
      resetData();

      const newData = await fetchPlans({
        startingDate: dateToInt(startingDate),
        endingDate: dateToInt(endingDate),
        selectedDestinations,
      });

      // Setting the new data as state
      setMainList(newData);

      // Fetching Alternative Data
      if (newData.length < 10) {
        const alternateDestinations = getDestinationsByCountries(
          selectedDestinations,
          destinations
        ).filter((item) => selectedDestinations.indexOf(item) === -1);

        let alternateData = await fetchPlans({
          startingDate: dateToInt(startingDate),
          endingDate: dateToInt(endingDate),
          selectedDestinations: alternateDestinations,
        });

        const filteredAlternateData = alternateData.filter(
          (item) => newData.findIndex((i) => item.title === i.title) === -1
        );
        setAlternativePlansList(filteredAlternateData);
      } else {
        setAlternativePlansList([]);
      }
    };

    if (
      startingDate !== null &&
      endingDate !== null &&
      selectedDestinations.length > 0
      //  && current !== 0
    ) {
      handleFetchingData();
    }
  }, [startingDate, endingDate, selectedDestinations]);

  const { setCurrent } = useContext(MainCurrentContext);

  useFocusEffect(
    React.useCallback(() => {
      setCurrent(2);
    }, [])
  );

  const isShown = startingDate !== null && endingDate !== null;
  return (
    isShown && (
      <SafeAreaView style={[styles.page, { backgroundColor: main }]}>
        {/* List */}
        <PlanList mainList={mainList} alternateList={alternateList} />

        {/* Button */}
        <Section load={buttonLoad.load}>
          <Animated.View entering={FadeInUp}>
            <CustomButton
              style={[center, styles.btn, { backgroundColor: invertedMain }]}
              onPress={() => {
                if (user.firebaseUser !== null)
                  bottomBar.push(<TripCreate />, false);
                else
                  rootNavigation.navigate({
                    name: SIGNINUP,
                    params: { startWithPopup: true },
                  });
              }}
            >
              <Text style={{ color: main }}>Create a new Ticket</Text>
            </CustomButton>
          </Animated.View>
        </Section>
      </SafeAreaView>
    )
  );
};

export default PlanExploreAndCreate;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  btn: {
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
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
