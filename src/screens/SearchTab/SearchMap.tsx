import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useAppDispatch, useThemeColors } from "../../app/hooks";
import MapView, { Circle } from "react-native-maps";
import { center, row } from "../../utils/styling";
import { SCREEN_WIDTH } from "../../utils/constans";
import { setStatusBarShown } from "../../features/SettingsSlice";
import { SearchPrefrencesInterface } from "../../utils/interfaces";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootNavigatorParamList } from "../../navigation/NavigationTypes";
import { Entypo } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { WHITE } from "../../utils/colors";

const SearchMap = () => {
  const { main, invertedMain, isDark } = useThemeColors();

  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const { params } =
    useRoute<RouteProp<RootNavigatorParamList, "Search Map">>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setStatusBarShown(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: main }}>
      <MapView
        style={{ flex: 1 }}
        userInterfaceStyle={isDark ? "dark" : "light"}
        initialRegion={{
          ...params.location.pos,
          latitudeDelta: 0.1,
          longitudeDelta: 0.0421,
        }}
      >
        <Circle
          center={params.location.pos}
          radius={params.location.radius}
          fillColor={"rgba(0,0,0,0.2)"}
          strokeColor="rgba(0,0,0,0)"
        />
      </MapView>

      <TouchableOpacity
        style={[center, styles.back, { backgroundColor: WHITE }]}
        onPress={() => navigation.goBack()}
      >
        <Entypo name="chevron-small-left" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchMap;

const styles = StyleSheet.create({
  map: {
    height: 400,
    margin: 8,
    borderRadius: 50,
  },

  back: {
    position: "absolute",
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 30,
  },
});
