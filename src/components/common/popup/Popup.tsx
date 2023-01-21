import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../utils/constans";
import { center, row } from "../../../utils/styling";
import { EvilIcons } from "@expo/vector-icons";
import { useThemeColors } from "../../../app/hooks";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type Props = {
  refrence: {
    isShown: boolean;
    setShown: Function;
  };
};

const Popup = ({ refrence: { isShown, setShown } }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const handleExit = () => {
    setShown(false);
  };

  return (
    isShown && (
      <Animated.View
        style={[center, styles.container]}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <View style={[styles.popup, { backgroundColor: second }]}>
          <View style={row}>
            <TouchableOpacity
              style={[center, styles.btn, { backgroundColor: main }]}
              onPress={handleExit}
            >
              <EvilIcons name="close" size={22} color={invertedMain} />
            </TouchableOpacity>
          </View>

          {/* {ref.children} */}
        </View>
      </Animated.View>
    )
  );
};

export default Popup;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "flex-end",
    padding: 40,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.75)",
  },

  popup: {
    width: SCREEN_WIDTH - 20,
    height: SCREEN_HEIGHT - 100,
    borderRadius: 10,
    padding: 20,
  },

  btn: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginBottom: 20,
  },
});
