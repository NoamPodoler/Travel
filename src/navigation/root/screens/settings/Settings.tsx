import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppDispatch, useThemeColors } from "../../../../app/hooks";
import {
  setDarkMode,
  switchDarkMode,
} from "../../../../features/SettingsSlice";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootNavigatorParamList, SETTINGS } from "../../../NavigationTypes";
import Switch from "../../../../components/common/switch/Switch";
import CustomButton from "../../../../components/common/customButton/CustomButton";
import { center, row } from "../../../../utils/styling";
import Footer from "../../../../components/common/footer/Footer";

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

      <Footer>
        <CustomButton
          onPress={() => navigation.goBack()}
          containerStyle={[center, { flex: 1 }]}
        >
          <Ionicons name="return-down-back" size={22} color={invertedMain} />
        </CustomButton>
        <CustomButton onPress={() => {}} containerStyle={[{ flex: 3 }, center]}>
          <Text style={{ color: invertedMain, fontStyle: "italic" }}>
            Settings
          </Text>
        </CustomButton>
        <View style={[center, { flex: 1 }]}>
          <Switch
            status={isDark}
            onPress={(bool) => dispatch(setDarkMode(!bool))}
          />
        </View>
      </Footer>
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
