import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "../../../../app/hooks";
import DatesTable from "./extra/DatesTable";
import DatesSummary from "./extra/DatesSummary";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootNavigatorParamList } from "../../../../navigation/NavigationTypes";
import { resetDates } from "../../../../features/SearchSlice";
import { MainCurrentContext } from "../../../../utils/context";
import SelectedDestinationsRow from "../../extra/SelectedDestinationsRow";

type Props = {
  //index: number; current: number; setFocus: Function
};
const TripDates = ({}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const dispatch = useAppDispatch();

  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );
  const { firebaseUser } = useAppSelector((state) => state.user);

  const isSelected = startingDate !== null && endingDate !== null;

  // Resets selected dates when changing the destinations list
  useEffect(() => {
    dispatch(resetDates());
  }, [selectedDestinations]);

  const { setCurrent } = useContext(MainCurrentContext);

  useFocusEffect(
    React.useCallback(() => {
      setCurrent(1);
    }, [])
  );

  return (
    <View style={[styles.page, { backgroundColor: main }]}>
      {selectedDestinations.length > 1 && (
        <Text style={[styles.description, { color: invertedMain }]}>
          If you want to select specific dates for each destination, create for
          each a seperate 'Planner'.
        </Text>
      )}
      <View style={{ marginBottom: 10 }}>
        <SelectedDestinationsRow readOnly={true} />
      </View>

      <DatesTable />
      {isSelected && <DatesSummary />}
    </View>
  );
};

export default TripDates;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 28,
    marginBottom: 10,
  },

  description: {
    fontStyle: "italic",
    opacity: 0.5,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
