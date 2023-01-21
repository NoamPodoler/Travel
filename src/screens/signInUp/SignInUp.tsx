import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useAppDispatch,
  useAppSelector,
  useOpenSection,
  useThemeColors,
} from "../../app/hooks";

import OpenSection from "../../components/common/openSection/OpenSection";
import { center } from "../../utils/styling";
import { PURPLE, WHITE } from "../../utils/colors";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../../firebase";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MAIN, RootNavigatorParamList } from "../../navigation/NavigationTypes";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  isEmailValid,
  isFullNameValid,
  isPasswordsMatching,
  isPasswordValid,
  isUserValid,
} from "../../utils/fn";
import { setUser } from "../../features/UserSlice";
import InputSection from "./extra/InputSection";
import FlexSection from "../../components/common/flexSection/FlexSection";
import LottieView from "lottie-react-native";

type Props = {};

const initialState = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
  country: "",
};

const ACTIONS = {
  SET_NAME: "setName",
  SET_EMAIL: "setEmail",
  SET_COUNTRY: "setCountry",
  SET_PASSWORD: "setPassword",
  SET_RE_PASSWORD: "setRePassword",
};

const reducer = (state: typeof initialState, action: { payload; type }) => {
  switch (action.type) {
    case ACTIONS.SET_NAME:
      return { ...state, name: action.payload };
    case ACTIONS.SET_EMAIL:
      return { ...state, email: action.payload };
    case ACTIONS.SET_COUNTRY:
      return { ...state, country: action.payload };
    case ACTIONS.SET_PASSWORD:
      return { ...state, password: action.payload };
    case ACTIONS.SET_RE_PASSWORD:
      return { ...state, rePassword: action.payload };
    default:
      return state;
  }
};

const SignInUp = (props: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();
  const reduxDispatch = useAppDispatch();

  const [isSignin, setIsSignin] = useState(false);
  const { load, unload } = useOpenSection(isSignin);

  //

  const [state, dispatch] = useReducer(reducer, initialState);

  //
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isUserValid(user)) navigation.navigate(MAIN);
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  //

  const handleSignInOrUp = () => {
    setLoading(true);
    setAlert(true);

    if (isSignin) handleSignIn();
    else handleCreateAccount();
  };

  const handleCreateAccount = async () => {
    const isDataValid =
      isFullNameValid(state.name).isValid &&
      isEmailValid(state.email).isValid &&
      isPasswordValid(state.password).isValid &&
      state.password === state.rePassword;

    if (isDataValid) {
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          state.email,
          state.password
        );

        const userData = await setDoc(doc(db, "users", res.user.email), {
          id: res.user.uid,
          fullName: state.name,
          country: "Israel",
        });

        const newUser = {
          user: res.user,
          fullName: state.name,
          country: "Israel",
        };

        if (isUserValid(newUser)) reduxDispatch(setUser(newUser));
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const handleSignIn = async () => {
    const isDataValid =
      isEmailValid(state.email).isValid &&
      isPasswordValid(state.password).isValid;

    if (isDataValid) {
      try {
        const res = await signInWithEmailAndPassword(
          auth,
          state.email,
          state.password
        );

        const userData = (
          await getDoc(doc(db, "users", res.user.email))
        )?.data();

        const newUser = {
          user: res.user,
          fullName: userData.fullName,
          country: userData.country,
        };

        if (isUserValid) reduxDispatch(setUser(newUser));
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  //

  const { params } =
    useRoute<RouteProp<RootNavigatorParamList, "Sign In & Sign Up">>();

  const [isNoAccount, setNoAccount] = useState(params.startWithPopup);
  const isNoAccountLoad = useOpenSection(isNoAccount);

  return (
    <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: main }}>
      <FlexSection load={isNoAccountLoad.load}>
        <View style={[center, { flex: 1, justifyContent: "space-between" }]}>
          <Text
            style={{
              color: invertedMain,
              fontSize: 28,
              margin: 10,
              textAlign: "center",
            }}
          >
            {`It Seems That You
Dont Have An Account Yet`}
          </Text>
          <LottieView
            source={require("../../../assets/lottie/mustache.json")}
            style={{ flex: 1 }}
            autoPlay
            loop
          />
        </View>

        <TouchableOpacity
          onPress={() => setNoAccount(false)}
          style={[
            center,
            {
              padding: 20,
              margin: 20,
              backgroundColor: PURPLE,
              borderRadius: 10,
            },
          ]}
        >
          <Text style={{ color: WHITE }}>Create One!</Text>
        </TouchableOpacity>
      </FlexSection>

      <FlexSection load={isNoAccountLoad.unload}>
        <View style={{ flex: 1 }}>
          {/* Header */}
          <OpenSection load={load}>
            <Text style={[styles.title, { color: invertedMain }]}>Sign In</Text>
          </OpenSection>
          <OpenSection load={unload}>
            <Text style={[styles.title, { color: invertedMain }]}>
              Create An Account
            </Text>
          </OpenSection>

          {/* Inputs */}
          <OpenSection load={unload}>
            <InputSection
              title={"Full Name"}
              validation={isFullNameValid}
              set={(value) =>
                dispatch({ payload: value, type: ACTIONS.SET_NAME })
              }
              content={state.name}
              placeholder={"Enter Your Full Name"}
              alert={alert}
            />
          </OpenSection>

          <InputSection
            title={"Email"}
            validation={isEmailValid}
            set={(value) =>
              dispatch({ payload: value, type: ACTIONS.SET_EMAIL })
            }
            content={state.email}
            placeholder={"Enter Your Email Adress"}
            alert={alert}
          />

          <InputSection
            title={"Password"}
            validation={isPasswordValid}
            set={(value) =>
              dispatch({ payload: value, type: ACTIONS.SET_PASSWORD })
            }
            content={state.password}
            placeholder={"Enter Your Password"}
            secureTextEntry={true}
            alert={alert}
          />

          <OpenSection load={unload}>
            <InputSection
              title={"Re Enter Password"}
              validation={(value) => isPasswordsMatching(state.password, value)}
              set={(value) =>
                dispatch({ payload: value, type: ACTIONS.SET_RE_PASSWORD })
              }
              content={state.rePassword}
              placeholder={"Enter Your Password"}
              secureTextEntry={true}
              alert={alert}
            />
          </OpenSection>
        </View>

        {/* Footer */}
        <TouchableOpacity
          onPress={handleSignInOrUp}
          style={[
            styles.btn,
            center,
            { backgroundColor: PURPLE, marginBottom: 10 },
          ]}
        >
          <Text style={{ color: WHITE, textAlign: "center" }}>
            {isSignin ? `Sign In` : `Sign Up`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsSignin((prev) => !prev)}
          style={[styles.btn, center, { backgroundColor: main }]}
        >
          <Text style={{ color: invertedMain, textAlign: "center" }}>
            {isSignin
              ? `Dont have an account yet?
Create one`
              : `Already have an account?
Sign in`}
          </Text>
        </TouchableOpacity>
      </FlexSection>
    </SafeAreaView>
  );
};

export default SignInUp;

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    padding: 10,
  },

  subTitle: {
    fontSize: 16,
    marginHorizontal: 10,
    marginBottom: 4,
    marginTop: 20,
  },

  input: {
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 4,
    borderWidth: 1,
  },

  btn: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
});
