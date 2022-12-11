import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ScreenSliderItem from "./ScreenSliderItem";
import { ScreenSliderItemInterface } from "../../../../utils/interfaces";
import { SCREEN_WIDTH } from "../../../../utils/constans";
import SliderLine from "../SliderLine";

type Props = {
  list: ScreenSliderItemInterface[];
};

const ScreenSlider = ({ list }: Props) => {
  //State
  const [current, setCurrent] = useState<number>(0);
  const [prev, setPrev] = useState<number>(0);

  // State Related Fn's
  const nextPage = () => {
    if (current < list.length - 1) {
      setPrev(current);
      setCurrent((prev) => prev + 1);
    }
  };
  const prevPage = () => {
    if (current > 0) {
      setPrev(current);
      setCurrent((prev) => prev - 1);
    }
  };

  const scrollRef = useRef<ScrollView>();

  useEffect(() => {
    scrollRef.current.scrollTo({ x: current * SCREEN_WIDTH });
  }, [current]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        snapToInterval={SCREEN_WIDTH}
        decelerationRate={"fast"}
        scrollEventThrottle={16}
      >
        {list.map(({ lottie, title, content }, index) => (
          <ScreenSliderItem
            key={index.toString()}
            lottie={lottie}
            title={title}
            content={content}
            isFocus={index === current}
          />
        ))}
      </ScrollView>

      <View style={styles.bar}>
        {list.map((_, index) => (
          <SliderLine
            key={index.toString()}
            isFocus={index === current}
            ascending={current >= prev}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => prevPage()}
      ></TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, { right: 0 }]}
        onPress={() => nextPage()}
      ></TouchableOpacity>
    </View>
  );
};

export default ScreenSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bar: {
    flexDirection: "row",
    paddingHorizontal: SCREEN_WIDTH / 3,
  },

  btn: {
    position: "absolute",
    height: "100%",
    width: "50%",
  },
});
