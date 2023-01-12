import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useAppDispatch, useThemeColors } from "../app/hooks";
import { setDarkMode, switchDarkMode } from "../features/SettingsSlice";
import Footer from "../components/other/footer/Footer";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  CREATE_TRIP,
  RootNavigatorParamList,
  SETTINGS,
} from "../navigation/NavigationTypes";
import Switch from "../components/common/switch/Switch";
import FooterItem from "../components/other/footer/FooterItem";

type Props = {};

const Ticket = (props: Props) => {
  const { main, second, invertedMain, invertedSecond, isDark } =
    useThemeColors();
  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: main }]}>
      <View style={{ flex: 1, alignItems: "center" }}></View>

      <Footer
        left={
          <FooterItem onPress={() => navigation.goBack()} position="left">
            <Ionicons name="return-down-back" size={22} color={invertedMain} />
          </FooterItem>
        }
        center={
          <FooterItem position="center">
            <Text style={{ color: invertedMain, fontStyle: "italic" }}>
              Ticket
            </Text>
          </FooterItem>
        }
        right={<></>}
      />
    </SafeAreaView>
  );
};

export default Ticket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontStyle: "italic",
  },
});
