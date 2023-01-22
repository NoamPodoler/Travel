import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOpenSection, useThemeColors } from "../../app/hooks";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootNavigatorParamList } from "../../navigation/NavigationTypes";
import FlexSection from "../../components/common/flexSection/FlexSection";
import NoUser from "./extra/NoUser";
import SignInUpContent from "./extra/SignInUpContent";

type Props = {};

const SignInUp = (props: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const { params } =
    useRoute<RouteProp<RootNavigatorParamList, "Sign In & Sign Up">>();

  const [isNoAccount, setNoAccount] = useState(params.startWithPopup);
  const isNoAccountLoad = useOpenSection(isNoAccount);

  return (
    <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: main }}>
      <FlexSection load={isNoAccountLoad.load}>
        <NoUser setNoAccount={(bool) => setNoAccount(bool)} />
      </FlexSection>

      <FlexSection load={isNoAccountLoad.unload}>
        <SignInUpContent />
      </FlexSection>
    </SafeAreaView>
  );
};

export default SignInUp;

const styles = StyleSheet.create({});
