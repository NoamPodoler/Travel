import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { useThemeColors } from "../../../../app/hooks";
import LottieView from "lottie-react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  FadeIn,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ListItemInterface } from "./ListSlider";
import { Feather, Ionicons } from "@expo/vector-icons";

type Props = {
  item: ListItemInterface;
  index: number;
  handleRemoveItem: Function;
  rightFn: Function;
  isShown: boolean;
};

const SLIDE_DISTANCE = 100;
const DURATION = 400;
const ListSliderItem = ({
  item: { title, id, resolve },
  index,
  handleRemoveItem,
  rightFn,
  isShown,
}: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const translateX = useSharedValue<number>(0);
  const height = useSharedValue<number>(80);
  const marginVertical = useSharedValue<number>(4);
  const opacity = useSharedValue<number>(1);

  const handleRemove = () => {
    setTimeout(() => handleRemoveItem(id), DURATION);
  };

  const handleRightFn = () => {
    rightFn({ id });
  };

  useEffect(() => {
    if (resolve) {
      resolveRef?.current.reset();
      resolveRef?.current.play();
    }
  }, [resolve]);

  const resolveRef = useRef<LottieView>();

  const gestureHandler = Gesture.Pan()
    .onBegin((event) => {})
    .onUpdate((event) => {
      if (event.translationX > SLIDE_DISTANCE)
        translateX.value =
          event.translationX - (event.translationX - SLIDE_DISTANCE) * 0.75;
      else if (event.translationX < -SLIDE_DISTANCE)
        translateX.value =
          event.translationX - (event.translationX + SLIDE_DISTANCE) * 0.75;
      else translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX > SLIDE_DISTANCE) {
        // Remove Item From List
        opacity.value = withTiming(0, { duration: DURATION / 2 });
        height.value = withDelay(
          DURATION / 4,
          withTiming(0, { duration: DURATION / 2 })
        );
        marginVertical.value = withDelay(
          DURATION / 4,
          withTiming(0, { duration: DURATION / 2 })
        );

        runOnJS(handleRemove)();
      } else if (event.translationX < -SLIDE_DISTANCE) {
        translateX.value = withTiming(0);
        runOnJS(handleRightFn)();
      } else translateX.value = withTiming(0);
    });

  const rStyleButton = useAnimatedStyle(() => {
    return {
      height: height.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  const rStyleTranslate = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const rStyleLeft = useAnimatedStyle(() => {
    const INPUT = [40, SLIDE_DISTANCE];
    const opacity = interpolate(
      translateX.value,
      INPUT,
      [0, 1],
      Extrapolate.CLAMP
    );

    const tX = interpolate(
      translateX.value,
      INPUT,
      [-SLIDE_DISTANCE / 2, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateX: tX }],
    };
  });

  const rStyleRight = useAnimatedStyle(() => {
    const INPUT = [-40, -SLIDE_DISTANCE];

    const opacity = interpolate(
      translateX.value,
      INPUT,
      [0, 1],
      Extrapolate.CLAMP
    );

    const tX = interpolate(
      translateX.value,
      INPUT,
      [SLIDE_DISTANCE / 2, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateX: tX }],
    };
  });

  const resolveLoad = useDerivedValue(() => {
    if (resolve) return withTiming(1, { duration: DURATION });
    return withTiming(0, { duration: DURATION });
  }, [resolve]);

  const rStyleResolve = useAnimatedStyle(() => {
    return {
      opacity: resolveLoad.value,
    };
  });

  return (
    <>
      {isShown && (
        <GestureDetector gesture={gestureHandler}>
          <Animated.View style={[rStyleButton, styles.container]}>
            <Animated.View
              style={[
                rStyleTranslate,
                styles.item,
                { backgroundColor: second },
              ]}
            >
              <TouchableOpacity onPress={() => {}} style={styles.btn}>
                <View style={styles.content}>
                  <View style={[styles.line, { backgroundColor: alternate }]} />
                  <Text style={[styles.title, { color: invertedMain }]}>
                    {title}
                  </Text>
                  <Animated.View
                    style={[rStyleResolve, styles.resolveContainer]}
                  >
                    <LottieView
                      source={require("../../../../../assets/Lottie/resolve.json")}
                      style={styles.resolve}
                      loop={false}
                      ref={resolveRef}
                    />
                  </Animated.View>
                </View>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[rStyleLeft, styles.icon]}>
              <Ionicons name="close" size={24} color={invertedMain} />
            </Animated.View>
            <Animated.View style={[rStyleRight, styles.icon, { right: 0 }]}>
              {resolve ? (
                <Ionicons name="remove" size={24} color={invertedMain} />
              ) : (
                <Ionicons name="add" size={24} color={invertedMain} />
              )}
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      )}
    </>
  );
};

export default ListSliderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },

  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  line: {
    width: 4,
    height: 80,
    marginRight: 20,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    marginHorizontal: 10,
  },

  resolveContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  resolve: {
    height: 70,
    width: 70,
  },

  icon: {
    position: "absolute",
    width: 40,
    marginHorizontal: 20,
  },

  lottie: {
    width: 40,
  },
});
