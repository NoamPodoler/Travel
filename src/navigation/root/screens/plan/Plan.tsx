import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "../../../../app/hooks";
import {
  setDarkMode,
  switchDarkMode,
} from "../../../../features/SettingsSlice";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  CHAT,
  PROFILE,
  RootNavigatorParamList,
  SETTINGS,
  SIGNINUP,
} from "../../../NavigationTypes";
import Switch from "../../../../components/common/switch/Switch";
import { SCREEN_WIDTH } from "../../../../utils/constans";
import { center, row } from "../../../../utils/styling";
import { Temporal } from "@js-temporal/polyfill";
import CustomButton from "../../../../components/common/customButton/CustomButton";
import { hexToRgbA } from "../../../../utils/fn/style";
import { dateFormat, intToDate } from "../../../../utils/fn/dates";
import { destinationsToString } from "../../../../utils/fn/destinations";
import { DestinationInterface } from "../../../../utils/interfaces";
import Footer from "../../../../components/common/footer/Footer";

type Props = {};

const Plan = (props: Props) => {
  const { main, second, invertedMain, invertedSecond, isDark } =
    useThemeColors();
  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const user = useAppSelector((state) => state.user);

  const {
    params: {
      title,
      description,
      destinations,
      startingDate,
      endingDate,
      gender,
      creatorName,
      creatorUid,
    },
  } = useRoute<RouteProp<RootNavigatorParamList, "Plan">>();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: main }]}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={{}}
          style={[styles.image, { backgroundColor: invertedSecond }]}
        />

        <Text style={[styles.title, { color: invertedMain }]}>{title}</Text>

        <Text style={{ color: invertedMain, marginVertical: 10 }}>
          {destinationsToString(destinations as DestinationInterface[])}
        </Text>

        <Text
          style={{ color: hexToRgbA(invertedMain, 0.75), marginVertical: 10 }}
        >{`${dateFormat(intToDate(startingDate))}  - ${dateFormat(
          intToDate(endingDate)
        )}`}</Text>

        <View style={row}></View>

        <Text style={[styles.description, { color: invertedMain }]}>
          {description}
        </Text>
      </View>

      <View style={styles.footer}></View>

      <Footer>
        <CustomButton
          onPress={() => navigation.goBack()}
          containerStyle={[center, { flex: 1 }]}
        >
          <Ionicons name="return-down-back" size={22} color={invertedMain} />
        </CustomButton>

        <View style={[center, { flex: 3 }]}>
          <CustomButton
            onPress={() =>
              navigation.navigate({ name: PROFILE, params: { id: creatorUid } })
            }
          >
            <Text style={{ color: invertedMain }}>{creatorName}</Text>
          </CustomButton>
        </View>

        {user.firebaseUser?.uid !== creatorUid ? (
          <CustomButton
            onPress={() => {
              if (user.firebaseUser !== null)
                navigation.navigate({
                  name: CHAT,
                  params: {
                    id: creatorUid,
                    replyTo: {
                      value: title,
                      from: user.additionalData,
                      time: null,
                      id: null,
                    },
                  },
                });
              else
                navigation.navigate({
                  name: SIGNINUP,
                  params: { startWithPopup: true },
                });
            }}
            containerStyle={[center, { flex: 1 }]}
          >
            <Ionicons
              name="ios-chatbox-ellipses-outline"
              size={22}
              color={invertedMain}
            />
          </CustomButton>
        ) : (
          <View style={{ flex: 1 }} />
        )}
      </Footer>
    </SafeAreaView>
  );
};

export default Plan;

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    height: 300,
    width: SCREEN_WIDTH - 30,
    borderRadius: 20,
  },

  title: {
    fontSize: 24,
    marginTop: 20,
  },

  creator: {
    height: 44,
    width: 150,
    marginVertical: 10,
    borderRadius: 30,
  },

  subTitle: {
    opacity: 0.75,
    paddingHorizontal: 4,
    fontStyle: "italic",
  },

  description: {
    marginTop: 10,
    marginHorizontal: 20,
    opacity: 0.5,
    textAlign: "center",
  },

  footer: {
    alignItems: "center",
  },
});
