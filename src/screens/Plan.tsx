import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useAppDispatch, useThemeColors } from "../app/hooks";
import { setDarkMode, switchDarkMode } from "../features/SettingsSlice";
import Footer from "../components/other/footer/Footer";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  PROFILE,
  RootNavigatorParamList,
  SETTINGS,
} from "../navigation/NavigationTypes";
import Switch from "../components/common/switch/Switch";
import { SCREEN_WIDTH } from "../utils/constans";
import { center, row } from "../utils/styling";
import { dateFormat, hexToRgbA, intToDate } from "../utils/fn";
import { Temporal } from "@js-temporal/polyfill";
import CustomButton from "../components/common/customButton/CustomButton";

type Props = {};

const Plan = (props: Props) => {
  const { main, second, invertedMain, invertedSecond, isDark } =
    useThemeColors();
  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const dispatch = useAppDispatch();

  const {
    params: {
      title,
      creator,
      description,
      destinations,
      startingDate,
      endingDate,
      gender,
    },
  } = useRoute<RouteProp<RootNavigatorParamList, "Plan">>();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: main }]}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../../assets/images/destinations/Paris.jpeg")}
          style={styles.image}
        />

        <Text style={[styles.title, { color: invertedMain }]}>{title}</Text>

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

      <Footer
        left={
          <CustomButton onPress={() => navigation.goBack()}>
            <Ionicons name="return-down-back" size={22} color={invertedMain} />
          </CustomButton>
        }
        center={
          <CustomButton
            style={[center, styles.creator, { backgroundColor: second }]}
            onPress={() => navigation.navigate(PROFILE)}
          >
            <Text style={[styles.subTitle, { color: invertedMain }]}>
              {creator.name}
            </Text>
          </CustomButton>
        }
        right={<></>}
      />
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
