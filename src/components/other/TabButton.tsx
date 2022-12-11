import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  ParamListBase,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../../navigation/NavigationTypes";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { useThemeColors } from "../../app/hooks";
import { hexToRgbA } from "../../utils/fn";

type Props = {
  route: RouteProp<BottomTabParamList>;
  index: number;
  isFocus: boolean;
};

const TabButton = ({ route, index, isFocus }: Props) => {
  const navigation =
    useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const { main, second, invertedMain, invertedSecond, isDark } =
    useThemeColors();

  //

  const scale = useDerivedValue(() => {
    if (isFocus) return withTiming(1.1);
    else return withTiming(1);
  }, [isFocus]);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <TouchableOpacity onPress={() => navigation.navigate(route.name)}>
      <View style={{ width: "100%" }}>
        <Animated.View
          style={[
            rStyle,
            styles.button,
            { backgroundColor: isFocus ? second : "rgba(0,0,0,0)" },
          ]}
        >
          <Text style={[styles.buttonText, { color: invertedMain }]}>
            {route.name}
          </Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  buttonText: {
    fontSize: 12,
  },
});
