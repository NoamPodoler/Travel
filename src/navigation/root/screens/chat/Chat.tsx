import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector, useThemeColors } from "../../../../app/hooks";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  CHATS,
  PROFILE,
  RootNavigatorParamList,
} from "../../../NavigationTypes";
import { MessageType, UserType } from "../../../../utils/interfaces";
import { db, getUser, sendPrivateMessage } from "../../../../../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { center, row } from "../../../../utils/styling";
import CustomButton from "../../../../components/common/customButton/CustomButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { PURPLE, WHITE } from "../../../../utils/colors";
import Animated, {
  event,
  FadeIn,
  FadeInDown,
  FadeOut,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { hexToRgbA, withCustomTiming } from "../../../../utils/fn/style";
import Section, {
  useSection,
} from "../../../../components/common/section/Section";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { SCREEN_WIDTH } from "../../../../utils/constans";
import Slider from "../../../../components/common/slider/Slider";

type Props = {};

const Chat = (props: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const rootNavigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();
  const user = useAppSelector((state) => state.user);
  const route = useRoute<RouteProp<RootNavigatorParamList, "Chat">>();
  const scrollRef = useRef<ScrollView>();

  const chatName = [user.firebaseUser.uid, route.params.id].sort().toString();

  const [otherUser, setOtherUser] = useState<UserType | null>(null);

  const [messeages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  const [replyTo, setReplyTo] = useState<MessageType>(route.params.replyTo);

  const replyLoad = useSection(replyTo !== null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const otherUser = await getUser(route.params.id);
        setOtherUser(otherUser);
      } catch (error) {
        console.log(error);
      }
    };

    if (route.params.id !== null) fetch();
  }, [route.params.id]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, `chats/${chatName}/chat`), orderBy("time")),
      (snapshot) => {
        const msg = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          msg.push(data);
        });

        if (messeages.length !== msg.length) setMessages(msg);
      }
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current.scrollToEnd({ animated: false });
    }, 100);
  }, [messeages]);

  const handleSendMessage = async () => {
    if (msg.length > 0) {
      try {
        await sendPrivateMessage(msg, user.additionalData, otherUser, replyTo);
        setMsg("");
        setReplyTo(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: main }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={[row, { justifyContent: "center" }]}>
            <CustomButton
              onPress={() => rootNavigation.goBack()}
              style={[center, { padding: 20 }]}
              containerStyle={{ flex: 1 }}
            >
              <Entypo name="chevron-left" size={20} color={invertedMain} />
            </CustomButton>

            <View style={{ flex: 2 }}>
              <Text
                style={[styles.title, { color: invertedMain, fontSize: 16 }]}
              >
                Chat With
              </Text>
              <CustomButton
                onPress={() =>
                  rootNavigation.navigate({
                    name: PROFILE,
                    params: { id: otherUser.uid },
                  })
                }
              >
                <Text
                  style={[styles.title, { color: invertedMain, fontSize: 22 }]}
                >
                  {otherUser?.name}
                </Text>
              </CustomButton>
            </View>

            <CustomButton
              onPress={() => rootNavigation.navigate(CHATS)}
              style={[center, { padding: 20 }]}
              containerStyle={{ flex: 1 }}
            >
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={invertedMain}
              />
            </CustomButton>
          </View>

          {messeages?.length === 0 && (
            <View style={[center, { flex: 1 }]}>
              <Text
                style={{
                  color: hexToRgbA(invertedMain, 0.5),
                  fontSize: 18,
                  fontStyle: "italic",
                }}
              >
                Chat is Empty
              </Text>
            </View>
          )}

          <ScrollView style={styles.scroll} ref={scrollRef}>
            {messeages.map((item, index) => (
              <Message
                key={index.toString()}
                item={item}
                index={index}
                prev={index === 0 ? null : messeages[index - 1]}
                setReplyTo={setReplyTo}
              />
            ))}
          </ScrollView>

          <Section load={replyLoad.load}>
            <View
              style={{
                margin: 10,
                padding: 10,
                borderRadius: 10,
                backgroundColor: hexToRgbA(second, 0.5),
              }}
            >
              <View style={[row, { justifyContent: "space-between" }]}>
                <Text
                  style={{ color: hexToRgbA(invertedMain, 0.5), fontSize: 12 }}
                >
                  Reply To
                </Text>
                <CustomButton onPress={() => setReplyTo(null)}>
                  <AntDesign name="close" size={14} color={invertedMain} />
                </CustomButton>
              </View>
              <Animated.View style={{ padding: 10 }}>
                <Text style={{ color: invertedMain }}>{replyTo?.value}</Text>
              </Animated.View>
            </View>
          </Section>

          <View
            style={[
              row,
              styles.input,
              {
                backgroundColor: second,
                justifyContent: "space-between",
                marginBottom: 10,
              },
            ]}
          >
            <TextInput
              placeholder={`Send A Messeage To ${otherUser?.name}`}
              placeholderTextColor={hexToRgbA(invertedMain, 0.5)}
              onChangeText={setMsg}
              value={msg}
              style={{
                color: invertedMain,
                fontSize: 12,
                paddingHorizontal: 20,
                flex: 1,
                height: "100%",
              }}
            />
            <CustomButton
              onPress={handleSendMessage}
              style={[center, styles.btn]}
            >
              <MaterialCommunityIcons name="send" size={16} color={WHITE} />
            </CustomButton>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

interface MessageProps {
  item: MessageType;
  index: number;
  prev: MessageType;
  setReplyTo: Function;
}
const Message = ({ item, index, prev, setReplyTo }: MessageProps) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const { firebaseUser } = useAppSelector((state) => state.user);

  const fromMe = item.from.uid === firebaseUser.uid;

  const date = useMemo(
    () => (item.time !== null ? new Date(item.time.seconds * 1000) : null),
    [item.time]
  );

  const edge = prev === null || item.from.uid !== prev.from.uid;

  const [dateShown, setDateShown] = useState(false);

  const load = useDerivedValue(
    () => withCustomTiming(dateShown ? 1 : 0),
    [dateShown]
  );

  const handleSetReply = () => {
    setReplyTo(item);
  };

  const slide = useSharedValue(0);
  const prevSlide = useSharedValue(0);

  const limit = SCREEN_WIDTH / 3;
  const gestureHandler = Gesture.Pan()
    .onStart((event) => {})
    .onUpdate((event) => {
      const translate =
        prevSlide.value + event.translationX * (fromMe ? -1 : 1);

      if (translate > limit) {
        slide.value = withCustomTiming(0);
        prevSlide.value = withCustomTiming(0);
        runOnJS(handleSetReply)();
      } else if (translate > 0) slide.value = translate * (fromMe ? -1 : 1);
      else slide.value = 0;
    })
    .onEnd((event) => {
      slide.value = withCustomTiming(0);
      prevSlide.value = withCustomTiming(0);
    });

  const rStyleMessage = useAnimatedStyle(() => {
    const translateX = slide.value;
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <GestureDetector gesture={gestureHandler}>
      <CustomButton onPress={() => setDateShown((prev) => !prev)} scaleSize={1}>
        <Animated.View
          entering={FadeInDown}
          style={[
            row,
            {
              justifyContent: fromMe ? "flex-end" : "flex-start",
            },
          ]}
        >
          <View>
            {/* Header */}
            <View style={{ paddingHorizontal: 2 }}>
              {edge && (
                <Text
                  style={{
                    color: invertedMain,
                    textAlign: fromMe ? "left" : "right",
                    fontSize: 10,
                    paddingTop: 10,
                  }}
                >
                  {item.from.name}
                </Text>
              )}
              <Section load={load}>
                <Text
                  style={{
                    color: invertedMain,
                    textAlign: fromMe ? "left" : "right",
                    fontSize: 8,
                  }}
                >
                  {`${date?.toDateString()} | ${date?.toLocaleTimeString()}`}
                </Text>
              </Section>
            </View>

            <Animated.View
              style={[
                {
                  backgroundColor: hexToRgbA(second, item.refrence ? 0.5 : 0),
                  padding: item.refrence ? 10 : 0,
                  borderRadius: item.refrence ? 20 : 0,
                  borderTopLeftRadius: fromMe ? 10 : 0,
                  borderTopRightRadius: fromMe ? 0 : 10,
                  marginVertical: 4,
                },
                rStyleMessage,
              ]}
            >
              {item.refrence && (
                <View
                  style={{
                    padding: 4,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: hexToRgbA(invertedMain, 0.5),
                      fontSize: 12,
                      marginBottom: 4,
                    }}
                  >
                    Reply To
                  </Text>
                  <Text style={{ color: invertedMain, marginBottom: 4 }}>
                    {item.refrence.value}
                  </Text>
                </View>
              )}

              <View
                style={[
                  styles.msg,
                  {
                    backgroundColor: second,
                    borderTopLeftRadius: fromMe ? 0 : 10,
                    borderTopRightRadius: fromMe ? 10 : 0,
                  },
                ]}
              >
                <Text
                  style={{
                    color: invertedMain,
                  }}
                >
                  {item.value}
                </Text>
              </View>
            </Animated.View>
          </View>
        </Animated.View>
      </CustomButton>
    </GestureDetector>
  );
};

export default Chat;

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 20,
    textAlign: "center",
  },

  scroll: {
    margin: 10,
  },

  msg: {
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 52,
    paddingHorizontal: 4,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  btn: {
    height: 44,
    width: 44,
    backgroundColor: PURPLE,
    borderRadius: 25,
  },
});
