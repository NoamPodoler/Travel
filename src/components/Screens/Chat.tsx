import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { ChatMesseage, sendMsg } from "../../features/CartSlice";
import { SCREEN_WIDTH } from "../../utils/constants";
import { blue, green, white } from "../../utils/colors";
import { useAppDispatch, useThemeColors } from "../../app/hooks";
import { hexToRgbA } from "../../utils/fn";
import { AntDesign } from "@expo/vector-icons";
import Button from "../common/Button";
import Animated, {
  BounceIn,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
  StretchInX,
  ZoomIn,
} from "react-native-reanimated";
import Msg from "../other/Msg";

type Props = {
  chat: ChatMesseage[];
  id: number;
};

const Chat = ({ chat, id }: Props) => {
  const dispatch = useAppDispatch();
  const colors = useThemeColors();

  const [newMsg, setNewMsg] = useState<string>("");

  const handleSendMsg = () => {
    if (newMsg.length > 0) {
      setNewMsg("");
      dispatch(sendMsg({ id: id, msg: newMsg, buyer: true }));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.header, { backgroundColor: colors.main }]}>
        <View
          style={[styles.profilePic, { backgroundColor: colors.invertedMain }]}
        ></View>

        <View>
          <Text style={{ color: colors.invertedSecond }}>Seller's Name</Text>
          <Text style={{ color: green, fontSize: 10 }}>Online</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {chat.map((item, index) => (
          <Msg item={item} index={index} key={index.toString()} />
        ))}
      </ScrollView>

      <Animated.View
        style={styles.inputContainer}
        entering={FadeInDown.delay(150)}
      >
        <TextInput
          onChangeText={setNewMsg}
          value={newMsg}
          style={[
            styles.input,
            { backgroundColor: colors.second, color: colors.invertedMain },
          ]}
          placeholder="Enter a messeage"
          placeholderTextColor={hexToRgbA(colors.invertedMain, 0.75)}
        />
        <Button
          onPress={() => handleSendMsg()}
          backgroundColor={blue}
          height={50}
          width={50}
        >
          <AntDesign name="arrowright" size={20} color="white" />
        </Button>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginHorizontal: 20,
  },

  scrollView: { width: "100%", marginVertical: 20, paddingHorizontal: 20 },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 30,
  },

  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
