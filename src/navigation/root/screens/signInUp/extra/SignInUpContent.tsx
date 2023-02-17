import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { PURPLE, WHITE } from "../../../../../utils/colors";
import { center, row } from "../../../../../utils/styling";
import InputSection from "./InputSection";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "../../../../../app/hooks";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
  auth,
  createAnAccount,
  createUserAdditionalData,
  db,
  fetchUserAdditionalData,
  signIn,
} from "../../../../../../firebase";
import { setUser } from "../../../../../features/UserSlice";
import { MAIN, RootNavigatorParamList } from "../../../../NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../../../../components/common/customButton/CustomButton";
import {
  isUserValid,
  isFullNameValid,
  isEmailValid,
  isPasswordValid,
  isPasswordsMatching,
} from "../../../../../utils/fn/validation";
import Section, {
  useSection,
} from "../../../../../components/common/section/Section";

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

  const { load, unload } = useSection(isSignin);

  const [state, dispatch] = useReducer(reducer, initialState);

  //
  const { firebaseUser, additionalData } = useAppSelector(
    (state) => state.user
  );

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState("");

  const handleCreateAccount = async () => {
    const isDataValid =
      isFullNameValid(state.name).isValid &&
      isEmailValid(state.email).isValid &&
      isPasswordValid(state.password).isValid &&
      state.password === state.rePassword;

    if (isDataValid) {
      try {
        const user = await createAnAccount(state);

        const additionalData = {
          name: state.name,
          country: "Israel",
          uid: user.uid,
        };

        if (user !== undefined) {
          await createUserAdditionalData(user, additionalData);
          reduxDispatch(setUser({ firebaseUser: user, additionalData }));
          navigation.goBack();
        }
      } catch (error) {
        setError(error.toString());
      }
    }
  };

  const handleSignIn = async () => {
    const isDataValid =
      isEmailValid(state.email).isValid &&
      isPasswordValid(state.password).isValid;

    if (isDataValid) {
      try {
        const user = await signIn(state.email, state.password);

        if (user !== undefined) {
          const additionalData = await fetchUserAdditionalData(user);
          reduxDispatch(setUser({ firebaseUser: user, additionalData }));
          navigation.goBack();
        }
      } catch (error) {
        setError(error.toString());
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

        <Section load={load}>
          <Text style={[styles.title, { color: invertedMain }]}>Sign In</Text>
        </Section>
        <Section load={unload}>
          <Text style={[styles.title, { color: invertedMain }]}>
            Create An Account
          </Text>
        </Section>

        {/* Inputs */}
        <Section load={unload}>
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
        </Section>

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

        <Section load={unload}>
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
        </Section>

        <Text
          style={[{ color: invertedMain, textAlign: "center", padding: 20 }]}
        >
          {error}
        </Text>
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
