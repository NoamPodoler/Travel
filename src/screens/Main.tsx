import { Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useThemeColors } from "../app/hooks";
import Footer from "../components/other/footer/Footer";
import {
  CREATE_TRIP,
  RootNavigatorParamList,
  SETTINGS,
} from "../navigation/NavigationTypes";
import { SCREEN_WIDTH } from "../utils/constans";
import { center } from "../utils/styling";
import LottieView from "lottie-react-native";
import FooterItem from "../components/other/footer/FooterItem";

type Props = {};

const Main = (props: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate, isDark } =
    useThemeColors();
  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

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
