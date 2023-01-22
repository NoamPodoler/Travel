import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import OpenSection from "../../../components/common/openSection/OpenSection";
import { PURPLE, WHITE } from "../../../utils/colors";
import {
  isFullNameValid,
  isEmailValid,
  isPasswordValid,
  isPasswordsMatching,
  isUserValid,
} from "../../../utils/fn";
import { center, row } from "../../../utils/styling";
import InputSection from "./InputSection";
import {
  useAppDispatch,
  useAppSelector,
  useOpenSection,
  useThemeColors,
} from "../../../app/hooks";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import { setUser } from "../../../features/UserSlice";
import {
  MAIN,
  RootNavigatorParamList,
} from "../../../navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../../components/common/customButton/CustomButton";

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

type Props = {};

const SignInUpContent = ({}: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const reduxDispatch = useAppDispatch();

  const [isSignin, setIsSignin] = useState(false);

  const { load, unload } = useOpenSection(isSignin);

  const [state, dispatch] = useReducer(reducer, initialState);

  //
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isUserValid(user)) navigation.navigate(MAIN);
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

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

  const handleSignInOrUp = () => {
    setLoading(true);
    setAlert(true);

    if (isSignin) handleSignIn();
    else handleCreateAccount();
  };

  return (
    <>
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
          set={(value) => dispatch({ payload: value, type: ACTIONS.SET_EMAIL })}
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

      <CustomButton
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
      </CustomButton>

      <View style={[row, { marginHorizontal: 15 }]}>
        <CustomButton
          onPress={() => navigation.goBack()}
          style={[center, styles.subBtn, { backgroundColor: second }]}
          animated={false}
        >
          <Ionicons name="return-down-back" size={20} color={invertedMain} />
        </CustomButton>
        <CustomButton
          onPress={() => setIsSignin((prev) => !prev)}
          style={[center, styles.subBtn, { flex: 4, backgroundColor: second }]}
          animated={false}
        >
          <Text style={{ color: invertedMain, textAlign: "center" }}>
            {isSignin
              ? `Dont have an account yet?
  Create one`
              : `Already have an account?
  Sign in`}
          </Text>
        </CustomButton>
      </View>
    </>
  );
};

export default SignInUpContent;

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    padding: 10,
  },

  btn: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  subBtn: {
    flex: 1,
    height: 100,
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 10,
  },
});
