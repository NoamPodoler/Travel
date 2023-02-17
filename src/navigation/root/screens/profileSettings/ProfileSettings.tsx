import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector, useThemeColors } from "../../../../app/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../../../components/common/customButton/CustomButton";
import { center } from "../../../../utils/styling";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  CHAT,
  ProfileNavigatorParamList,
  PROFILE_SETTINGS,
  RootNavigatorParamList,
  SIGNINUP,
} from "../../../NavigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { getUser } from "../../../../../firebase";
import { PlanInterface, UserType } from "../../../../utils/interfaces";
import DotLoader from "../../../../components/common/loaders/DotLoader";
import { ProfileIdContext } from "../../../../utils/context";
import ProfileNavigator from "../../../profile/ProfileNavigator";
import Animated, { FadeIn } from "react-native-reanimated";
import Footer from "../../../../components/common/footer/Footer";

type Props = {};

const ProfileSettings = (props: Props) => {
  const user = useAppSelector((state) => state.user);
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const rootNavigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: main }]}>
      <Text style={[{ color: invertedMain }]}>{user.additionalData.name}</Text>
    </SafeAreaView>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
