import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../../../../app/hooks";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootNavigatorParamList } from "../../../NavigationTypes";
import NoUser from "./extra/NoUser";
import SignInUpContent from "./extra/SignInUpContent";
import Section, {
  useSection,
} from "../../../../components/common/section/Section";

type Props = {};

const SignInUp = (props: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const { params } =
    useRoute<RouteProp<RootNavigatorParamList, "Sign In & Sign Up">>();

  const [isNoAccount, setNoAccount] = useState(params.startWithPopup);
  const isNoAccountLoad = useSection(isNoAccount);

  return (
    <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: main }}>
      <Section load={isNoAccountLoad.load} flex>
        <NoUser setNoAccount={(bool) => setNoAccount(bool)} />
      </Section>

      <Section load={isNoAccountLoad.unload} flex>
        <SignInUpContent />
      </Section>
    </SafeAreaView>
  );
};

export default SignInUp;

const styles = StyleSheet.create({});
