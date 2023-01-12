import { Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useOpenSectionRef, useThemeColors } from "../app/hooks";
import Footer from "../components/other/footer/Footer";
import {
  CREATE_TRIP,
  RootNavigatorParamList,
  SETTINGS,
} from "../navigation/NavigationTypes";
import FooterItem from "../components/other/footer/FooterItem";
import FlexSection from "../components/common/flexSection/FlexSection";

type Props = {};

const Main = (props: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate, isDark } =
    useThemeColors();
  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const [isLoad, setLoad] = useState(true);
  const { load, unload } = useOpenSectionRef(isLoad);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: main }}>
      <View style={styles.content}></View>
      <Footer
        left={
          <FooterItem position="left">
            <Feather name="align-left" size={22} color={invertedMain} />
          </FooterItem>
        }
        center={
          <FooterItem
            onPress={() => navigation.navigate(CREATE_TRIP)}
            position="center"
          >
            <Text style={{ color: invertedMain, fontStyle: "italic" }}>
              Main
            </Text>
          </FooterItem>
        }
        right={
          <FooterItem
            onPress={() => navigation.navigate(SETTINGS)}
            position="right"
          >
            <AntDesign name="areachart" size={22} color={invertedMain} />
          </FooterItem>
        }
      />
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
