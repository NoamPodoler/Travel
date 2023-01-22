import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppDispatch, useThemeColors } from "../app/hooks";
import { setDarkMode, switchDarkMode } from "../features/SettingsSlice";
import Footer from "../components/other/footer/Footer";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RootNavigatorParamList,
  SETTINGS,
} from "../navigation/NavigationTypes";
import Switch from "../components/common/switch/Switch";
import CustomButton from "../components/common/customButton/CustomButton";

type Props = {};

const Settings = (props: Props) => {
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
          <CustomButton onPress={() => navigation.goBack()}>
            <Ionicons name="return-down-back" size={22} color={invertedMain} />
          </CustomButton>
        }
        center={
          <CustomButton onPress={() => {}}>
            <Text style={{ color: invertedMain, fontStyle: "italic" }}>
              Settings
            </Text>
          </CustomButton>
        }
        right={
          <Switch
            status={isDark}
            onPress={(bool) => dispatch(setDarkMode(!bool))}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Settings;

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
