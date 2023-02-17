import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "../../../app/hooks";
import { center, row } from "../../../utils/styling";
import { removeDestination } from "../../../features/SearchSlice";
import Animated, {
  FadeInDown,
  FadeOut,
  FadeOutDown,
  FadeOutUp,
} from "react-native-reanimated";
import { PURPLE, WHITE } from "../../../utils/colors";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "../../../utils/constans";
import CustomButton from "../../../components/common/customButton/CustomButton";
import { getMonth, getDay } from "../../../utils/fn/dates";
import { hexToRgbA } from "../../../utils/fn/style";

type Props = {};

const SelectedDates = ({}: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const { startingDate, endingDate } = useAppSelector((state) => state.search);

  const dispatch = useAppDispatch();

  const isShown = startingDate !== null && endingDate !== null;

  return (
    isShown && (
      <View style={[row, styles.container, { backgroundColor: invertedMain }]}>
        <View>
          <Text style={[styles.title, { color: main }]}>Create a Ticket</Text>
          <Text style={{ color: hexToRgbA(main, 0.25) }}>From</Text>
          <Text style={[styles.dateTitle, { color: main, marginBottom: 10 }]}>
            {`${getMonth(startingDate.month)} ${getDay(startingDate.day)}, ${
              startingDate.year
            }`}
          </Text>

          <Text style={{ color: hexToRgbA(main, 0.25) }}>Until</Text>
          <Text style={[styles.dateTitle, { color: main }]}>
            {`${getMonth(endingDate.month)} ${getDay(endingDate.day)}, ${
              endingDate.year
            }`}
          </Text>
        </View>

        <CustomButton style={[center, styles.btn]} onPress={() => {}}>
          <AntDesign name="plus" size={20} color={WHITE} />
        </CustomButton>
      </View>
    )
  );
};

export default SelectedDates;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    marginBottom: 10,
  },

  dateTitle: {
    fontSize: 20,
    opacity: 0.75,
  },

  btn: {
    borderRadius: SCREEN_WIDTH,
    padding: 24,
    backgroundColor: PURPLE,
  },

  btnText: {
    textAlign: "center",
    color: WHITE,
  },
});
