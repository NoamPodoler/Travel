import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppDispatch, useThemeColors } from "../app/hooks";
import Btn from "../components/common/Btn";
import { switchDarkMode } from "../features/SettingsSlice";
import Center from "../components/common/Center";

type Props = {};

const Settings = (props: Props) => {
  const { main, second, invertedMain, invertedSecond, isDark } =
    useThemeColors();

  const dispatch = useAppDispatch();

  return (
    <View style={[styles.container, { backgroundColor: main }]}>
      <SafeAreaView>
        <Center>
          <Btn
            onPress={() => dispatch(switchDarkMode())}
            style={{ width: 200 }}
          >
            <Center>
              <Text style={{ color: invertedMain }}>
                {isDark ? "Set Light Mode" : "Set Dark Mode"}
              </Text>
            </Center>
          </Btn>
        </Center>
      </SafeAreaView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
