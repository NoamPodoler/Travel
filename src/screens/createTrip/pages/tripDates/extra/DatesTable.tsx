import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { JANURARY } from "../../../../../utils/dates";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "../../../../../app/hooks";
import { BLACK, BLUE, PURPLE, WHITE } from "../../../../../utils/colors";
import { Temporal } from "@js-temporal/polyfill";
import { row } from "../../../../../utils/styling";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { addDate } from "../../../../../features/SearchSlice";
import { TODAY } from "../../../../../utils/constans";
import { getMonth, hexToRgbA } from "../../../../../utils/fn";

type Props = {};
const SUNDAT_FIRST = true;

const DatesTable = ({}: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const dispatch = useAppDispatch();

  const { startingDate, endingDate } = useAppSelector((state) => state.search);

  const [current, setCurrent] = useState(
    startingDate !== null
      ? startingDate
      : Temporal.PlainDate.from({
          day: 1,
          month: TODAY.month,
          year: TODAY.year,
        })
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

  const isStartingDateNotFocus =
    startingDate !== null && current.month !== startingDate.month;

  const daysInGrid = current.daysInMonth + currentDayOfWeek - 1;
  const numOfRows = Math.ceil(daysInGrid / 7);

  // Grid Cell

  const Cell = ({ index }) => {
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
      startingDate !== null && startingDate.until(currentDate).days === 0;
    const isEnd = isSelected && endingDate.until(currentDate).days === 0;

    const isInFuture = TODAY.until(currentDate).days >= 0;
    const isInMonth = current.month === currentDate.month;

    return (
      <TouchableOpacity
        style={[
          styles.item,

          isStart && {
            backgroundColor: hexToRgbA(PURPLE, 0.75),
            borderRadius: 10,
          },

          isStart &&
            isSelected && {
              borderRadius: 0,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            },

          isEnd && {
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          },

          isSelected && { backgroundColor: PURPLE },
        ]}
        onPress={() => {
          if (isInFuture) dispatch(addDate(currentDate));
        }}
      >
        <Text
          style={[
            {
              opacity: isInFuture ? (isInMonth ? 1 : 0.5) : 0.25,
              color: isSelected || isStart ? WHITE : invertedMain,
            },
          ]}
        >
          {currentDate.day}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={[row, { paddingVertical: 10 }]}>
        <Text style={[styles.title, { color: invertedMain }]}>{`${getMonth(
          current.month
        )} ${current.year}`}</Text>

        <View style={[row, { flex: 2, justifyContent: "flex-end" }]}>
          {isStartingDateNotFocus && (
            <TouchableOpacity
              style={[styles.btn]}
              onPress={() =>
                setCurrent(startingDate.add({ days: -startingDate.day + 1 }))
              }
            >
              <MaterialCommunityIcons
                name="set-center"
                size={14}
                color={invertedMain}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.btn}
            onPress={() => handlePrevMonth()}
          >
            <AntDesign name="arrowleft" size={14} color={invertedMain} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleNextMonth()}
          >
            <AntDesign name="arrowright" size={14} color={invertedMain} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={row}>
          {SUNDAT_FIRST && (
            <Text style={[styles.day, { color: invertedMain }]}>Sun</Text>
          )}
          <Text style={[styles.day, { color: invertedMain }]}>Mon</Text>
          <Text style={[styles.day, { color: invertedMain }]}>Tue</Text>
          <Text style={[styles.day, { color: invertedMain }]}>Wed</Text>
          <Text style={[styles.day, { color: invertedMain }]}>Thu</Text>
          <Text style={[styles.day, { color: invertedMain }]}>Fri</Text>
          <Text style={[styles.day, { color: invertedMain }]}>Sat</Text>
          {!SUNDAT_FIRST && (
            <Text style={[styles.day, { color: invertedMain }]}>Sun</Text>
          )}
        </View>
        <FlatList
          numColumns={7}
          data={Array(numOfRows * 7).fill(0)}
          renderItem={({ item, index }) => <Cell index={index} />}
        />
      </View>
    </>
  );
};

export default DatesTable;

const styles = StyleSheet.create({
  title: {
    flex: 3,
    fontSize: 22,
    marginHorizontal: 10,
  },
  grid: {
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
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
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
