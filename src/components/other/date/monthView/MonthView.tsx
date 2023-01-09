import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { JANURARY } from "../../../../utils/dates";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "../../../../app/hooks";
import { BLACK, BLUE, PURPLE, WHITE } from "../../../../utils/colors";
import { Temporal } from "@js-temporal/polyfill";
import { row } from "../../../../utils/styling";
import { AntDesign } from "@expo/vector-icons";
import { addDate } from "../../../../features/SearchSlice";
import { TODAY } from "../../../../utils/constans";
import { hexToRgbA } from "../../../../utils/fn";

type Props = {};
const SUNDAT_FIRST = true;
const MonthView = ({}: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const dispatch = useAppDispatch();

  const { startingDate, endingDate } = useAppSelector((state) => state.search);

  const [current, setCurrent] = useState(
    Temporal.PlainDate.from({ day: 1, month: TODAY.month, year: TODAY.year })
  );

  const currentDayOfWeek = SUNDAT_FIRST
    ? (current.dayOfWeek % 7) + 1
    : current.dayOfWeek;

  const handleNextMonth = () => {
    setCurrent(current.add({ months: 1 }));
  };

  const handlePrevMonth = () => {
    setCurrent(current.add({ months: -1 }));
  };

  const getMonth = (month: number) => {
    if (month === 1) return "Janurary";
    if (month === 2) return "Feburary";
    if (month === 3) return "March";
    if (month === 4) return "April";
    if (month === 5) return "May";
    if (month === 6) return "June";
    if (month === 7) return "July";
    if (month === 8) return "August";
    if (month === 9) return "September";
    if (month === 10) return "October";
    if (month === 11) return "November";
    if (month === 12) return "December";
    return "";
  };

  return (
    <>
      <View style={[row, { paddingVertical: 10 }]}>
        <Text style={styles.title}>{`${getMonth(current.month)} ${
          current.year
        }`}</Text>
        <TouchableOpacity style={styles.btn} onPress={() => handlePrevMonth()}>
          <AntDesign name="arrowleft" size={14} color={invertedMain} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => handleNextMonth()}>
          <AntDesign name="arrowright" size={14} color={invertedMain} />
        </TouchableOpacity>
      </View>

      <Text>{`${startingDate?.toString()} -> ${endingDate?.toString()}`}</Text>

      <View style={styles.container}>
        <View style={row}>
          {SUNDAT_FIRST && <Text style={styles.day}>Sun</Text>}
          <Text style={styles.day}>Mon</Text>
          <Text style={styles.day}>Tue</Text>
          <Text style={styles.day}>Wed</Text>
          <Text style={styles.day}>Thu</Text>
          <Text style={styles.day}>Fri</Text>
          <Text style={styles.day}>Sat</Text>
          {!SUNDAT_FIRST && <Text style={styles.day}>Sun</Text>}
        </View>
        <FlatList
          numColumns={7}
          data={Array(currentDayOfWeek < 6 ? 35 : 42).fill(0)}
          renderItem={({ item, index }) => {
            const currentDate = current.add({
              days: index - (currentDayOfWeek - 1),
            });

            const isSelected =
              startingDate !== null &&
              endingDate != null &&
              startingDate.until(currentDate).days <=
                startingDate.until(endingDate).days &&
              startingDate?.until(currentDate).days >= 0;

            const isStart =
              startingDate !== null &&
              startingDate.until(currentDate).days === 0;
            const isEnd =
              isSelected && endingDate.until(currentDate).days === 0;

            const isFocus = TODAY.until(currentDate).days >= 0;
            const isInMonth = current.month === currentDate.month;

            return (
              <TouchableOpacity
                style={[
                  styles.item,
                  isStart
                    ? {
                        borderTopLeftRadius: 30,
                        borderBottomLeftRadius: 30,
                        backgroundColor: hexToRgbA(PURPLE, 0.75),
                      }
                    : {},
                  isEnd
                    ? { borderTopRightRadius: 30, borderBottomRightRadius: 30 }
                    : {},
                  isSelected ? { backgroundColor: PURPLE } : {},
                ]}
                onPress={() => dispatch(addDate(currentDate))}
              >
                <Text
                  style={{
                    opacity: isFocus ? (isInMonth ? 1 : 0.5) : 0.25,
                    color: isSelected ? WHITE : invertedMain,
                  }}
                >
                  {currentDate.day}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </>
  );
};

export default MonthView;

const styles = StyleSheet.create({
  title: {
    flex: 6,
    fontSize: 22,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
  },

  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    marginVertical: 2,
  },

  btn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },

  day: {
    flex: 1,
    textAlign: "center",
    opacity: 0.75,
    fontSize: 12,
    marginBottom: 20,
  },
});
