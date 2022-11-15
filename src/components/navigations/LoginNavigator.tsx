import { StyleSheet, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "../Screens/Welcome/Screens/LoginPages/Signin";
import Signup from "../Screens/Welcome/Screens/LoginPages/Signup";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SIGNIN, SIGNUP } from "./NavigationTypes";

type Props = {};

const Stack = createNativeStackNavigator();

const LoginNavigator = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={SIGNIN} component={Signin} />
        <Stack.Screen name={SIGNUP} component={Signup} />
      </Stack.Navigator>
    </View>
  );
};

export default LoginNavigator;
