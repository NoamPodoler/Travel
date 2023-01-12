import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SCREEN_WIDTH } from "../../../utils/constans";
import SliderLine from "./SliderLine";
import Animated, { FadeIn } from "react-native-reanimated";

type Props = {
  list: React.ReactNode[];
  state: { current: number; setCurrent: Function };
  style?: ViewStyle | ViewStyle[];
};

const ScreenSlider = ({
  list,
  state: { current, setCurrent },
  style = {},
}: Props) => {
  const scrollRef = useRef<ScrollView>();

  useEffect(() => {
    scrollRef.current.scrollTo({ x: current * SCREEN_WIDTH });
  }, [current]);

  // Sizing
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { height, width } = dimensions;

  return (
    <Animated.View
      style={style}
      onLayout={(event) =>
        setDimensions({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        })
      }
    >
      <ScrollView
        ref={scrollRef}
        horizontal
        snapToInterval={SCREEN_WIDTH}
        decelerationRate={"fast"}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        {list.map((item, index) => (
          <View key={index.toString()} style={{ height, width }}>
            {item}
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

export default ScreenSlider;

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    height: "100%",
    width: "50%",
  },
});
