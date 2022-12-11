import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  ScrollView,
  TouchableOpacity,
  LayoutChangeEvent,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../utils/constans";
import { useThemeColors } from "../../../../app/hooks";
import TabSliderItem from "./TabSliderItem";
import Animated, {
  FadeIn,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import Btn from "../../../common/Btn";
import SliderLine from "../SliderLine";
import { current } from "@reduxjs/toolkit";

export interface TabSliderProperties {
  height?: number;
  width?: number;
  duration?: number;
}

export interface TabSliderItemInterface {
  title: string;
  content: string;
}

type Props = {
  list: TabSliderItemInterface[];
  headers?: React.ReactNode[];
  image: ImageSourcePropType;
  setCurrent?: Function;
  properties?: TabSliderProperties;
};

const TabSlider = ({
  list,
  headers = [],
  setCurrent = () => {},
  image,
  properties: {
    height = SCREEN_HEIGHT - 200,
    width = SCREEN_WIDTH - 40,
    duration = 600,
  } = {
    height: SCREEN_HEIGHT - 200,
    width: SCREEN_WIDTH - 40,
    duration: 600,
  },
}: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  // State
  const [localCurrent, setLocalCurrent] = useState(0);
  const [prev, setPrev] = useState(0);

  useEffect(() => {
    setCurrent(localCurrent);
  }, [localCurrent]);

  // State Related Fn's
  const nextPage = () => {
    if (localCurrent < list.length - 1) {
      setPrev(localCurrent);
      setLocalCurrent((prev) => prev + 1);
    }
  };
  const prevPage = () => {
    if (localCurrent > 0) {
      setPrev(localCurrent);
      setLocalCurrent((prev) => prev - 1);
    }
  };

  // ScrollView Ref's

  const listScrollRef = useRef<ScrollView>();
  const imageScrollRef = useRef<ScrollView>();

  // ScrollView Fn's
  useEffect(() => {
    setTimeout(() => {
      listScrollRef.current.scrollTo({
        x: localCurrent * width,
        animated: false,
      });
    }, duration / 2);
  }, [localCurrent]);

  return (
    <Animated.View style={styles.container}>
      <View style={[{ height, width, backgroundColor: second }, styles.tab]}>
        <ScrollView
          horizontal
          ref={imageScrollRef}
          style={{
            backgroundColor: invertedSecond,
            height: 300,
          }}
        >
          {headers[localCurrent]}
        </ScrollView>
        <ScrollView horizontal ref={listScrollRef} scrollEnabled={false}>
          <View style={styles.list}>
            {list.map(({ title, content }, index) => (
              <TabSliderItem
                key={index.toString()}
                title={title}
                content={content}
                width={width}
                isFocus={localCurrent === index}
                ascending={localCurrent >= prev}
                duration={duration}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.sliderContainer}>
          <View style={styles.slider}>
            {list.map((item, index) => (
              <SliderLine
                key={index.toString()}
                isFocus={localCurrent === index}
                ascending={localCurrent >= prev}
                duration={duration}
              />
            ))}
          </View>
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
    </Animated.View>
  );
};

export default TabSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH,
  },

  tab: {
    overflow: "hidden",
  },

  sliderContainer: {
    alignItems: "center",
    padding: 20,
  },

  slider: {
    flexDirection: "row",
    gap: 4,
  },

  list: {
    flexDirection: "row",
  },

  btn: {
    position: "absolute",
    height: "100%",
    width: "50%",
  },
});
