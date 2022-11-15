import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useThemeColors } from "../../../../../app/hooks";
import { blue } from "../../../../../utils/colors";
import {
  HOME,
  LoginNavigatorParamList,
  MAIN_NAVIGATOR,
  RootNavigatorParamList,
  SIGNIN,
  SIGNUP,
} from "../../../../navigations/NavigationTypes";

type Props = {};
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("screen");

const Signup = (props: Props) => {
  const LoginNavigation =
    useNavigation<BottomTabNavigationProp<LoginNavigatorParamList>>();
  const RootNavigation =
    useNavigation<NativeStackNavigationProp<RootNavigatorParamList>>();

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const colors = useThemeColors();

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: colors.second, opacity: 0.9 },
      ]}
    >
      <Animated.View style={{ flex: 1 }}>
        <Text style={[styles.formTitle, { color: colors.invertedSecond }]}>
          Create an Account
        </Text>

        <View style={[styles.input, { backgroundColor: colors.main }]}>
          <TextInput
            style={{ color: colors.invertedSecond }}
            onChangeText={setUsername}
            value={email}
            placeholder={"Username"}
            placeholderTextColor={colors.invertedSecond}
          />
        </View>
        <View style={[styles.input, { backgroundColor: colors.main }]}>
          <TextInput
            style={{ color: colors.invertedSecond }}
            onChangeText={setEmail}
            value={email}
            placeholder={"Email"}
            placeholderTextColor={colors.invertedSecond}
          />
        </View>
        <View style={[styles.input, { backgroundColor: colors.main }]}>
          <TextInput
            style={{ color: colors.invertedSecond }}
            onChangeText={setPassword}
            value={password}
            placeholder={"Password"}
            placeholderTextColor={colors.invertedSecond}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => RootNavigation.navigate(MAIN_NAVIGATOR)}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={[styles.line, { backgroundColor: colors.main }]}></View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={[styles.button, styles.linkButton]}>
              <AntDesign name="google" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.linkButton]}>
              <FontAwesome5 name="facebook-f" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={{ color: colors.invertedMain }}>
            Already have an Account?
          </Text>
          <TouchableOpacity
            onPress={() => LoginNavigation.navigate(SIGNIN)}
            style={{ marginLeft: 10 }}
          >
            <Text style={{ color: colors.invertedSecond }}>Sign in!</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 30,
  },

  formTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 30,
  },

  input: {
    marginHorizontal: 2,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 12,
    marginVertical: 4,
  },

  button: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    backgroundColor: blue,
    borderRadius: 14,
    marginVertical: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
  },

  line: {
    height: 1,
    width: SCREEN_WIDTH,
    margin: 20,
  },

  linkButton: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#EBEBEB",
  },
});
