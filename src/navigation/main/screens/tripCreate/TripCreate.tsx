import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "../../../../app/hooks";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { withCustomTiming } from "../../../../utils/fn/style";
import { PURPLE, WHITE } from "../../../../utils/colors";
import { center, row } from "../../../../utils/styling";
import CustomButton from "../../../../components/common/customButton/CustomButton";
import TripCreateDescription from "./extra/TripCreateDescription";
import Slider from "../../../../components/common/slider/Slider";
import TripCreateTitle from "./extra/TripCreateTitle";
import TripCreatePrefrences from "./extra/TripCreatePrefrences";
import { PlanInterface } from "../../../../utils/interfaces";
import { StackActions, useNavigation } from "@react-navigation/native";
import { addPlan } from "../../../../../firebase";
import { useNotifications } from "../../../../components/other/notifications/Notifications";
import NotificationPromiseLoader from "../../../../components/other/notifications/tabs/NotificationLoader";
import { resetData } from "../../../../features/SearchSlice";
import {
  SIGNINUP,
  MAIN,
  RootNavigatorParamList,
} from "../../../../navigation/NavigationTypes";
import { _stringify } from "../../../../utils/fn";
import { dateToInt, dateToMonthYear } from "../../../../utils/fn/dates";
import { isPlanValid } from "../../../../utils/fn/validation";
import { StackNavigationProp } from "@react-navigation/stack";
import { usePopupBar } from "../../../../components/other/popupBar/PopupBar";
import NotificationSuccess from "../../../../components/other/notifications/tabs/NotificationSuccess";
import NotificationFail from "../../../../components/other/notifications/tabs/NotificationFail";
import NotificationLoader from "../../../../components/other/notifications/tabs/NotificationLoader";

type Props = {};

type State = Partial<PlanInterface>;

const initialState: State = {
  title: "",
  description: "",
  languages: ["English"],
  gender: "Any",
  global: false,
};

const ACTIONS = {
  SET_TITLE: "setTitle",
  SET_DESCRIPTION: "setDescription",
  SET_PARTNER_DESCRIPTION: "setPartnerDescription",
  SET_GENDER: "setGender",
  SET_GLOBAL: "setGlobal",
};

const reducer = (state: State, action: { payload; type }) => {
  switch (action.type) {
    case ACTIONS.SET_TITLE:
      return { ...state, title: action.payload };
    case ACTIONS.SET_PARTNER_DESCRIPTION:
      return { ...state, partnerDescription: action.payload };
    case ACTIONS.SET_DESCRIPTION:
      return { ...state, description: action.payload };
    case ACTIONS.SET_GENDER:
      return { ...state, gender: action.payload };
    case ACTIONS.SET_GLOBAL:
      return { ...state, global: action.payload === "Global" };
    default:
      return state;
  }
};

const TripCreate = (props: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const rootNavigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();
  const notifications = useNotifications();
  const popupBar = usePopupBar();

  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );

  const user = useAppSelector((state) => state.user);

  const reduxDispatch = useAppDispatch();

  const [state, dispatch] = useReducer(reducer, initialState);

  const [error1, setError1] = useState<string | null>(null);
  const [error2, setError2] = useState<string | null>(null);

  //

  const plan: PlanInterface = {
    title: state.title,
    destinations: selectedDestinations.map((dest) => _stringify(dest)),
    startingDate: dateToInt(startingDate),
    endingDate: dateToInt(endingDate),
    departureMonthYear: dateToMonthYear(startingDate),
    description: state.description,
    languages: ["English", "Hebrew"],
    gender: state.gender,
    origin: user?.additionalData?.country,
    global: true,
    type: ["Travel"],
    budget: "Cheap",
    creatorName: user?.additionalData?.name,
    creatorUid: user?.firebaseUser?.uid,
    uid: "",
  };

  const createPlan = async () => {
    try {
      addPlan(plan);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreatePlan = async () => {
    const isValid = isPlanValid(plan);
    if (user.firebaseUser === null) {
      popupBar.dismiss();
      rootNavigation.navigate({
        name: SIGNINUP,
        params: { startWithPopup: true },
      });
    } else if (isValid) {
      popupBar.dismiss();
      notifications.push(<NotificationLoader />);
      try {
        await addPlan(plan);

        setTimeout(() => {
          notifications.push(<NotificationSuccess />);
        }, 1000);

        setTimeout(() => {
          reduxDispatch(resetData());
          rootNavigation.dispatch(StackActions.popToTop());
          rootNavigation.navigate(MAIN);
        }, 1500);
      } catch (error) {
        setTimeout(() => {
          notifications.push(<NotificationFail />);
        }, 1000);
      }
    }
  };

  const data = [
    <TripCreateTitle
      title={state.title}
      setTitle={(str) => dispatch({ payload: str, type: ACTIONS.SET_TITLE })}
      error={error1}
    />,
    <TripCreateDescription
      setDescription={(str) =>
        dispatch({ payload: str, type: ACTIONS.SET_DESCRIPTION })
      }
      error={error2}
    />,
    <TripCreatePrefrences
      gender={state.gender}
      setGender={(str) => dispatch({ payload: str, type: ACTIONS.SET_GENDER })}
      global={state.global}
      setGlobal={(bool) =>
        dispatch({ payload: bool, type: ACTIONS.SET_GLOBAL })
      }
    />,
  ];

  const dataLength = data.length;
  const [current, setCurrent] = useState<number>(0);
  const load = useDerivedValue(
    () => withCustomTiming((current + 1) / dataLength),
    [current]
  );

  const rStyleLoader = useAnimatedStyle(() => {
    const flex = load.value;
    return {
      flex,
    };
  });

  const handlePrev = () => {
    if (current !== 0) setCurrent((prev) => prev - 1);
  };

  const handleNext = () => {
    handleError();
    if (current === data.length - 1) handleCreatePlan();
    else if (
      (current === 0 && state.title.length > 4) ||
      (current == 1 && state.description.length > 10)
    )
      setCurrent((prev) => prev + 1);
  };

  const handleError = () => {
    if (current === 0) {
      if (state.title.length === 0) setError1("Plan Must Have A Title");
      else if (state.title.length < 5)
        setError1("Plan Title Must Be At Least 5 Characters");
    } else if (current === 1) {
      if (state.description.length === 0)
        setError2("Plan Must Have A Description");
      else if (state.description.length < 10)
        setError2("Plan Desription Must Have At Least 10 Characters");
    }
  };

  useEffect(() => {
    if (error1 !== null) setError1(null);
  }, [state.title]);

  useEffect(() => {
    if (error2 !== null) setError2(null);
  }, [state.description]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[
          row,
          { backgroundColor: main, margin: 10, padding: 4, borderRadius: 10 },
        ]}
      >
        <Animated.View style={[styles.loader, rStyleLoader]} />
        <TouchableOpacity
          style={{
            position: "absolute",
            width: "50%",
            height: "100%",
          }}
          onPress={handlePrev}
        />
      </View>

      <View style={styles.content}>
        <Slider list={data} current={current} style={{ flex: 1 }} />
      </View>

      <CustomButton onPress={handleNext} style={[center, styles.btn]}>
        <Text style={{ color: WHITE }}>
          {current < data.length - 1 ? "Contine" : "Create Plan"}
        </Text>
      </CustomButton>
    </SafeAreaView>
  );
};

export default TripCreate;

const styles = StyleSheet.create({
  content: { flex: 1 },
  loader: {
    height: 12,
    backgroundColor: PURPLE,
    borderRadius: 20,
  },

  btn: {
    backgroundColor: PURPLE,
    height: 60,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
