import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useReducer } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "../../../../../app/hooks";
import CustomButton from "../../../../../components/common/customButton/CustomButton";
import { center } from "../../../../../utils/styling";
import { PURPLE, WHITE } from "../../../../../utils/colors";
import { fetchDestinations } from "../../../../../features/DataSlice";
import { createDestination } from "../../../../../../firebase";
import { StackActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  MAIN,
  RootNavigatorParamList,
} from "../../../../../navigation/NavigationTypes";
import { hexToRgbA } from "../../../../../utils/fn/style";

type Props = {
  searchValue: string;
};

const initialState = {
  country: "",
  continent: "",
};

const ACTIONS = {
  SET_COUNTRY: "setCountry",
  SET_CONTINENT: "setContinent",
};

const reducer = (state: typeof initialState, action: { payload; type }) => {
  switch (action.type) {
    case ACTIONS.SET_COUNTRY:
      return { ...state, country: action.payload };
    case ACTIONS.SET_CONTINENT:
      return { ...state, continent: action.payload };
    default:
      return state;
  }
};

const CreateDestination = ({ searchValue }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const reduxDispatch = useAppDispatch();

  const { destinations } = useAppSelector((state) => state.data);

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCreateNewDestination = () => {
    const dest = { ...state, title: searchValue };
    createDestination(dest, destinations);
    reduxDispatch(fetchDestinations());
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate(MAIN);
  };

  return (
    <View style={[styles.container, { backgroundColor: second }]}>
      <Text
        style={[
          {
            color: invertedMain,
            paddingVertical: 10,
            fontSize: 18,
            textAlign: "center",
          },
        ]}
      >
        {searchValue}
      </Text>
      <TextInput
        placeholder="Enter Destination Country"
        placeholderTextColor={hexToRgbA(invertedMain, 0.75)}
        style={[styles.input, { color: invertedMain, backgroundColor: main }]}
        onChangeText={(value) =>
          dispatch({ payload: value, type: ACTIONS.SET_COUNTRY })
        }
      />
      <TextInput
        placeholder="Enter Destination Continent"
        placeholderTextColor={hexToRgbA(invertedMain, 0.75)}
        style={[styles.input, { color: invertedMain, backgroundColor: main }]}
        onChangeText={(value) =>
          dispatch({ payload: value, type: ACTIONS.SET_CONTINENT })
        }
      />

      <CustomButton
        onPress={handleCreateNewDestination}
        style={[center, styles.btn, {}]}
      >
        <Text style={{ color: WHITE }}>Create</Text>
      </CustomButton>
    </View>
  );
};

export default CreateDestination;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  input: {
    padding: 20,
    borderRadius: 10,
    margin: 2,
  },

  btn: {
    padding: 20,
    marginTop: 10,
    backgroundColor: PURPLE,
    borderRadius: 20,
  },
});
