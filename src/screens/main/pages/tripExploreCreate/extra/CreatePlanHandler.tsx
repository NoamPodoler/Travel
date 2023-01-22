import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  dateToInt,
  dateToMonthYear,
  isPlanValid,
} from "../../../../../utils/fn";
import {
  GendersType,
  LanguagesType,
  PlanInterface,
} from "../../../../../utils/interfaces";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { addPlan } from "../../../../../../firebase";
import { PURPLE, WHITE } from "../../../../../utils/colors";
import { center } from "../../../../../utils/styling";
import { StackActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  MAIN,
  RootNavigatorParamList,
  SIGNINUP,
} from "../../../../../navigation/NavigationTypes";
import { resetData } from "../../../../../features/SearchSlice";
import CustomButton from "../../../../../components/common/customButton/CustomButton";

type Props = {
  state: {
    title: string;
    description: string;
    partnerDescription: string;
    languages: LanguagesType[];
    gender: GendersType;
  };
  setFocus: Function;
};

const CreatePlanHandler = ({ state, setFocus }: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const dispatch = useAppDispatch();

  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );
  const user = useAppSelector((state) => state.user);

  const plan: PlanInterface = {
    title: state.title,
    destinations: selectedDestinations,
    startingDate: dateToInt(startingDate),
    endingDate: dateToInt(endingDate),
    departureMonthYear: dateToMonthYear(startingDate),
    creator: {
      name: user.fullName,
      id: user.user?.uid,
    },
    description: state.description
      .concat(" | ")
      .concat(state.partnerDescription),
    languages: ["English", "Hebrew"],
    gender: state.gender,
    uid: "",
  };

  const handleCreatePlan = () => {
    const isValid = isPlanValid(plan);
    if (user.user === null) {
      navigation.navigate({ name: SIGNINUP, params: { startWithPopup: true } });
    } else if (isValid) {
      try {
        addPlan(plan);
        dispatch(resetData());
        // setFocus(0);
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate(MAIN);
      } catch (error) {}
    }
  };
  return (
    <CustomButton style={[center, styles.btn]} onPress={handleCreatePlan}>
      <Text style={{ color: WHITE }}>Create</Text>
    </CustomButton>
  );
};

export default CreatePlanHandler;

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 15,
    marginTop: 20,
    backgroundColor: PURPLE,
    borderRadius: 20,
  },
});
