import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ChatMesseage } from "../../features/CartSlice";
import Animated, { FadeInDown } from "react-native-reanimated";
import { blue, green, white } from "../../utils/colors";
import { hexToRgbA } from "../../utils/fn";
import { useThemeColors } from "../../app/hooks";

type Props = {
  item: ChatMesseage;
  index: number;
};

const Msg = ({ item, index }: Props) => {
  const colors = useThemeColors();

  const msgContainer = item.buyer ? "row" : "row-reverse";

  const msgColor = item.buyer ? blue : green;

  const msg = item.offer ? msgColor : hexToRgbA(colors.second, 0.5);

  const msgText = item.offer ? white : colors.invertedMain;

  const x = "row";

  return (
    <View style={[styles.msgContainer, { flexDirection: msgContainer }]}>
      <Animated.View
        style={[
          styles.msg,
          { backgroundColor: msg },
          item.buyer ? { borderTopLeftRadius: 0 } : { borderTopRightRadius: 0 },
        ]}
        entering={FadeInDown.delay(index * 50)}
      >
        <Text style={{ color: msgText }}>{item.msg}</Text>
      </Animated.View>
    </View>
  );
};

export default Msg;

const styles = StyleSheet.create({
  msgContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },

  msg: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 4,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});
