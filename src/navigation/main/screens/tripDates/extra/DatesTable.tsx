import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "../../../../../app/hooks";
import { PURPLE, WHITE } from "../../../../../utils/colors";
import { Temporal } from "@js-temporal/polyfill";
import { row } from "../../../../../utils/styling";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { addDate, setAnytime } from "../../../../../features/SearchSlice";
import { TODAY } from "../../../../../utils/constans";
import CustomButton from "../../../../../components/common/customButton/CustomButton";
import { getMonth } from "../../../../../utils/fn/dates";
import { hexToRgbA } from "../../../../../utils/fn/style";

type Props = {};

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

  const { location } = useAppSelector((state) => state.settings);

  const sundayFirst = useMemo(
    () => location[0].regionCode === "IL",
    [location]
  );

  useEffect(() => {
    if (current.day !== 1)
      setCurrent(current.add({ days: -(current.day - 1) }));
  }, [current]);

  const currentDayOfWeek = sundayFirst
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

  const data = Array(numOfRows * 7).fill(0);

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
      <CustomButton
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
        animated={false}
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
      </CustomButton>
    );
  };

  return (
    <>
      <View style={[row, { paddingVertical: 10 }]}>
        <Text style={[styles.title, { color: invertedMain }]}>{`${getMonth(
          current.month
        )} ${current.year}`}</Text>

        <View style={[row, { flex: 2, justifyContent: "flex-end" }]}>
          <CustomButton
            style={[styles.btn]}
            onPress={() => {
              dispatch(setAnytime());
            }}
            containerStyle={{ backgroundColor: PURPLE, borderRadius: 20 }}
          >
            <Text style={[{ color: WHITE, fontSize: 12 }]}>Anytime</Text>
          </CustomButton>
          {isStartingDateNotFocus && (
            <CustomButton
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
            </CustomButton>
          )}

          <CustomButton style={styles.btn} onPress={() => handlePrevMonth()}>
            <AntDesign name="arrowleft" size={14} color={invertedMain} />
          </CustomButton>
          <CustomButton style={styles.btn} onPress={() => handleNextMonth()}>
            <AntDesign name="arrowright" size={14} color={invertedMain} />
          </CustomButton>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={row}>
          {sundayFirst && (
            <Text style={[styles.day, { color: invertedMain }]}>Sun</Text>
          )}
          <Text style={[styles.day, { color: invertedMain }]}>Mon</Text>
          <Text style={[styles.day, { color: invertedMain }]}>Tue</Text>
          <Text style={[styles.day, { color: invertedMain }]}>Wed</Text>
          <Text style={[styles.day, { color: invertedMain }]}>Thu</Text>
          <Text style={[styles.day, { color: invertedMain }]}>Fri</Text>
          <Text style={[styles.day, { color: invertedMain }]}>Sat</Text>
          {!sundayFirst && (
            <Text style={[styles.day, { color: invertedMain }]}>Sun</Text>
          )}
        </View>
        <FlatList
          numColumns={7}
          data={data}
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
