import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { interpolate } from "react-native-reanimated";
import { SCREEN_WIDTH } from "../../utils/constants";
import { useThemeColors } from "../../app/hooks";

type Props = {
  initialValue: number;
  setValue: Function;
};

const SCROLL_CONTAINER_WIDTH = SCREEN_WIDTH - 180;
const SCROLL_MARGIN = SCROLL_CONTAINER_WIDTH / 3;
const NumberScroll = ({ initialValue, setValue }: Props) => {
  const [current, setCurrent] = useState<number>(initialValue);

  // Updating Parent Value
  useEffect(() => {
    setValue(current);
  }, [current]);

  const PRICE_POWER = initialValue.toString().length - 1;
  const DIFFRENCE = PRICE_POWER <= 2 ? 5 : Math.pow(10, PRICE_POWER - 1);

  const scrollRef = useRef<ScrollView>();

  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newValue = Math.round(
      interpolate(
        event.nativeEvent.contentOffset.x,
        [0, (SCROLL_MARGIN * initialValue) / DIFFRENCE],
        [0, initialValue]
      )
    );

    if (newValue <= 0) setCurrent(0);
    else if (newValue >= initialValue) setCurrent(initialValue);
    else {
      if (PRICE_POWER > 2) setCurrent(newValue - (newValue % 5));
      else setCurrent(newValue);
    }
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      scrollRef.current.scrollToEnd({ animated: false });
    }, 16);
  }, []);

  // Handle Functions

  const handleMoveLeft = () => {
    let next = current - DIFFRENCE;
    next = next >= initialValue ? initialValue : next;

    scrollRef.current.scrollTo({
      x: (next / DIFFRENCE) * SCROLL_MARGIN,
      animated: true,
    });
  };
  const handleMoveRight = () => {
    let next = current + DIFFRENCE;
    next = next >= initialValue ? initialValue : next;

    scrollRef.current.scrollTo({
      x: (next / DIFFRENCE) * SCROLL_MARGIN,
      animated: true,
    });
  };

  const handleLongMoveRight = () => {
    scrollRef.current.scrollToEnd({ animated: true });
  };
  const handleLongMoveLeft = () => {
    scrollRef.current.scrollTo({ x: 0, animated: true });
  };

  // Document Variables

  const before = useMemo(() => {
    if (current === 0) return "";
    else if (current - DIFFRENCE < 0) return "0";
    else return (current - DIFFRENCE).toString();
  }, [current]);

  const after = useMemo(() => {
    if (current === initialValue) return "";
    else if (current + DIFFRENCE > initialValue) return initialValue.toString();
    else return (current + DIFFRENCE).toString();
  }, [current]);

  const colors = useThemeColors();

  return (
    <View style={styles.componentContainer}>
      <View style={styles.numbersContainer}>
        <TouchableOpacity
          onPress={() => handleMoveLeft()}
          onLongPress={() => handleLongMoveLeft()}
        >
          <Text style={[styles.smallNumber, { color: colors.invertedSecond }]}>
            {before}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // backgroundColor: "red",
            // width: "100%",
          }}
        >
          <TextInput
            keyboardType="numeric"
            style={[styles.largeNumber, { color: colors.invertedSecond }]}
          >
            {current}
          </TextInput>
        </View>
        <TouchableOpacity
          onPress={() => handleMoveRight()}
          onLongPress={() => handleLongMoveRight()}
        >
          <Text style={[styles.smallNumber, { color: colors.invertedSecond }]}>
            {after}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollContainer}>
        <TouchableOpacity
          onPress={() => handleMoveLeft()}
          onLongPress={() => handleLongMoveLeft()}
          style={styles.chevron}
        >
          {current !== 1 && (
            <AntDesign name="minus" size={14} color={colors.invertedMain} />
          )}
        </TouchableOpacity>
        <ScrollView
          horizontal
          ref={scrollRef}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          snapToInterval={SCROLL_MARGIN / DIFFRENCE}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.scrollView}>
            {Array(Math.round(initialValue / DIFFRENCE) + 3)
              .fill(0)
              .map((_, i) => {
                return (
                  <View key={i.toString()} style={styles.linesContainer}>
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <View
                          key={i.toString()}
                          style={[
                            i === 2 ? styles.longline : styles.shortLine,
                            { backgroundColor: colors.invertedMain },
                          ]}
                        />
                      ))}
                  </View>
                );
              })}
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => handleMoveRight()}
          onLongPress={() => handleLongMoveRight()}
          style={styles.chevron}
        >
          {current !== initialValue && (
            <AntDesign name="plus" size={14} color={colors.invertedMain} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NumberScroll;

const styles = StyleSheet.create({
  componentContainer: {
    alignItems: "center",
  },
  numbersContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: SCROLL_CONTAINER_WIDTH,
    paddingVertical: 10,
    marginHorizontal: (SCREEN_WIDTH - SCROLL_CONTAINER_WIDTH) / 2,
  },

  smallNumber: {
    fontSize: 16,
    fontWeight: "200",
    opacity: 0.5,
    width: 30,
  },
  largeNumber: {
    fontSize: 40,
    fontFamily: "Lexend-Regular",
    transform: [{ translateY: -10 }],
  },

  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: SCROLL_CONTAINER_WIDTH + 120,
  },

  chevron: {
    height: 40,
    width: 40,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  scrollView: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  linesContainer: {
    flexDirection: "row",
    width: SCROLL_MARGIN,
    alignItems: "flex-end",
    justifyContent: "space-around",
  },

  shortLine: {
    width: 1,
    height: 28,
    opacity: 0.25,
  },
  longline: {
    width: 1,
    height: 40,
    opacity: 0.5,
  },
});
