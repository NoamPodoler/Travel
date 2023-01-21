import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  useAppDispatch,
  useAppSelector,
  useOpenSection,
  useThemeColors,
} from "../../../../app/hooks";
import { center } from "../../../../utils/styling";
import { ScrollView } from "react-native-gesture-handler";
import {
  dateToInt,
  dateToMonthYear,
  getMonth,
  getRandomNumber,
} from "../../../../utils/fn";
import OpenSection from "../../../../components/common/openSection/OpenSection";
import FlexSection from "../../../../components/common/flexSection/FlexSection";
import {
  GendersType,
  LanguagesType,
  PlanInterface,
} from "../../../../utils/interfaces";
import ThreeDotLoader from "../../../../components/common/dotLoader/ThreeDotLoader";
import TripTicketTab from "./extra/CreatePlanHeader";
import Animated, { FadeInUp } from "react-native-reanimated";
import TripTicketForm from "./extra/tripTicketForm/CreatePlanForm";
import { fetchPlans } from "../../../../../firebase";
import { TODAY } from "../../../../utils/constans";
import { useFocusEffect } from "@react-navigation/native";
import Popup from "../../../../components/common/popup/Popup";
import EmptyList from "./extra/EmptyList";
import TripExploreTicketItem from "./extra/PlanListItem";
import PlanListItem from "./extra/PlanListItem";
import PlanList from "./extra/PlanList";
import CreatePlanHeader from "./extra/CreatePlanHeader";
import CreatePlanForm from "./extra/tripTicketForm/CreatePlanForm";

type Props = {
  index: number;
  current: number;
  setFocus: Function;
};

interface State {
  title: string;
  description: string;
  partnerDescription: string;
  languages: LanguagesType[];
  gender: GendersType;
}

const ACTIONS = {
  SET_TITLE: "setTitle",
  SET_DESCRIPTION: "setDescription",
  SET_PARTNER_DESCRIPTION: "setPartnerDescription",
  SET_GENDER: "setGender",
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
    default:
      return state;
  }
};

const PlanExploreAndCreate = ({ index, current, setFocus }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  // Redux State
  const { destinations } = useAppSelector((state) => state.data);
  const { selectedDestinations, startingDate, endingDate } = useAppSelector(
    (state) => state.search
  );
  const user = useAppSelector((state) => state.user);

  // CreatePlan State
  const initialState: State = {
    title: "",
    description: "",
    partnerDescription: "",
    languages: ["English"],
    gender: "Any",
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // CreateTicket UI State
  const [createTicketShown, setCreateTicketShown] = useState(false);
  const createTicketLoad = useOpenSection(createTicketShown);

  // List State
  const [plansList, setPlansList] = useState<PlanInterface[]>([]);
  const [isEmpty, setEmpty] = useState(false);

  const exploreListLoad = useOpenSection(plansList.length > 0 || isEmpty);

  // Fetching Data When Relevant
  useEffect(() => {
    const handleFetchingData = async () => {
      const newData = await fetchPlans({
        startingDate: dateToInt(startingDate),
        endingDate: dateToInt(endingDate),
        selectedDestinations,
      });

      setEmpty(newData.length === 0);
      setPlansList(newData);
    };

    if (
      startingDate !== null &&
      endingDate !== null &&
      selectedDestinations.length > 0
    ) {
      setEmpty(false);
      setPlansList([]);
      handleFetchingData();
    }
  }, [startingDate, endingDate, selectedDestinations]);

  //

  const isShown = startingDate !== null && endingDate !== null;
  return isShown ? (
    <SafeAreaView style={styles.page}>
      {/* Button */}
      <OpenSection load={exploreListLoad.load}>
        <Animated.View entering={FadeInUp}>
          <OpenSection
            load={createTicketLoad.unload}
            containerStyle={{ marginHorizontal: 10, borderRadius: 10 }}
          >
            <TouchableOpacity
              style={[center, styles.btn, { backgroundColor: invertedMain }]}
              onPress={() => setCreateTicketShown(true)}
            >
              <Text style={{ color: main }}>Create a new Ticket</Text>
            </TouchableOpacity>
          </OpenSection>
        </Animated.View>
      </OpenSection>

      {/* Tab */}
      <OpenSection
        load={createTicketLoad.load}
        containerStyle={{
          marginHorizontal: 10,
          borderRadius: 10,
          zIndex: 10,
        }}
      >
        <CreatePlanHeader
          setCreateTicketShown={(bool) => {
            setCreateTicketShown(bool);
          }}
          title={state.title}
          setTitle={(value) =>
            dispatch({ payload: value, type: ACTIONS.SET_TITLE })
          }
        />
      </OpenSection>

      {/* Form */}
      <FlexSection load={createTicketLoad.load}>
        <CreatePlanForm
          state={state}
          setDescription={(value) =>
            dispatch({ payload: value, type: ACTIONS.SET_DESCRIPTION })
          }
          setPartnerDescription={(value) =>
            dispatch({
              payload: value,
              type: ACTIONS.SET_PARTNER_DESCRIPTION,
            })
          }
          setGender={(value) =>
            dispatch({ payload: value, type: ACTIONS.SET_GENDER })
          }
        />
      </FlexSection>

      {/* List */}
      <FlexSection load={createTicketLoad.unload}>
        <PlanList list={plansList} isEmpty={false} />
      </FlexSection>
    </SafeAreaView>
  ) : (
    <></>
  );
};

export default PlanExploreAndCreate;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  btn: {
    padding: 20,
    borderRadius: 10,
  },

  btnText: {},

  container: {
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 10,
  },
});