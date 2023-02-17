import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector, useThemeColors } from "../../../../app/hooks";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  CHAT,
  RootNavigatorParamList,
  SIGNINUP,
} from "../../../NavigationTypes";
import { UserType } from "../../../../utils/interfaces";
import { db, getAllChats } from "../../../../../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { center, row } from "../../../../utils/styling";
import CustomButton from "../../../../components/common/customButton/CustomButton";
import { StackNavigationProp } from "@react-navigation/stack";
import Animated, { FadeIn } from "react-native-reanimated";
import { hexToRgbA } from "../../../../utils/fn/style";
import { Ionicons } from "@expo/vector-icons";
import { PURPLE, WHITE } from "../../../../utils/colors";

type Props = {};

const Chats = (props: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const rootNavigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();
  const user = useAppSelector((state) => state.user);

  const [chats, setChats] = useState(null);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, `chats`),
        where("ids", "array-contains", user.firebaseUser.uid),
        orderBy("time")
      ),
      (snapshot) => {
        const _chats = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          _chats.push(data);
        });

        if (_chats !== chats) setChats(_chats.reverse());
      }
    );
  }, []);

  if (user.firebaseUser === null) {
    rootNavigation.navigate({
      name: SIGNINUP,
      params: { startWithPopup: true },
    });

    return <></>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: main }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={[styles.title, { color: invertedMain }]}>Chats</Text>

        {chats?.length === 0 && (
          <View style={[center, { flex: 1 }]}>
            <Text style={{ color: invertedMain, fontSize: 18 }}>
              You Dont Have Any Active Chats Yet
            </Text>
          </View>
        )}
        <ScrollView style={styles.scroll}>
          {chats?.map((item, index) => (
            <ChatItem key={index.toString()} chat={item} index={index} />
          ))}
        </ScrollView>

        <CustomButton
          onPress={() => rootNavigation.goBack()}
          style={[
            center,
            {
              padding: 20,
              marginHorizontal: 20,
              borderRadius: 10,
              backgroundColor: PURPLE,
            },
          ]}
        >
          <Ionicons name="return-down-back-outline" size={24} color={WHITE} />
        </CustomButton>
      </SafeAreaView>
    </View>
  );
};

interface ChatItemProps {
  chat: {
    ids: string[];
    latestMessage: string;
    name: string;
    users: UserType[];
    time: Timestamp;
  };
  index: number;
}

const ChatItem = ({ chat, index }: ChatItemProps) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const { firebaseUser } = useAppSelector((state) => state.user);
  const rootNavigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  return (
    <CustomButton
      onPress={() =>
        rootNavigation.navigate({
          name: CHAT,
          params: {
            id: chat.ids.filter((id) => id !== firebaseUser.uid)[0],
            replyTo: null,
          },
        })
      }
    >
      <Animated.View
        entering={FadeIn.delay(index * 50)}
        style={[styles.chatItem, { backgroundColor: second }]}
      >
        <View
          style={[
            row,
            {
              flex: 1,
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: 10,
            },
          ]}
        >
          <View style={[row, { flex: 1 }]}>
            <View
              style={[styles.chatImg, { backgroundColor: invertedSecond }]}
            />

            <View style={{ flex: 1, padding: 10 }}>
              <View
                style={[
                  row,
                  {
                    flex: 1,
                    justifyContent: "space-between",
                  },
                ]}
              >
                <Text style={[styles.chatTitle, { color: invertedMain }]}>
                  {
                    chat.users.filter(
                      (user) => user.uid !== firebaseUser.uid
                    )[0].name
                  }
                </Text>

                <Text
                  style={{
                    color: hexToRgbA(invertedMain, 0.75),
                    fontSize: 12,
                  }}
                >
                  {`${chat?.time?.toDate().toLocaleString()}`}
                </Text>
              </View>

              <Text
                style={[
                  styles.chatTitle,
                  {
                    color: hexToRgbA(invertedMain, 0.5),
                    fontSize: 12,
                    paddingVertical: 5,
                  },
                ]}
              >
                {chat.latestMessage}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </CustomButton>
  );
};

export default Chats;

const styles = StyleSheet.create({
  title: { fontSize: 26, marginHorizontal: 20 },
  scroll: {
    padding: 10,
  },
  chatItem: {
    borderRadius: 10,
    marginVertical: 4,
  },

  chatTitle: {},

  chatImg: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "red",
  },
});
