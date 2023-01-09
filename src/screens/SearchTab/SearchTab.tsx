import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useThemeColors } from "../../app/hooks";
import {
  SearchPrefrencesInterface,
  ServiceInterface,
} from "../../utils/interfaces";
import { BLACK, LIGHTER_GREY, PURPLE, WHITE } from "../../utils/colors";
import { Entypo, EvilIcons, Ionicons } from "@expo/vector-icons";
import { center, row } from "../../utils/styling";
import { loadValuesInterface } from "../../components/common/SliderContainerPage";
import OpenSection from "../../components/common/openSection/OpenSection";
import { SCREEN_WIDTH } from "../../utils/constans";
import MapView from "react-native-maps";
import Prefrences from "./SearchPrefrences";
import ThreeDotLoader from "../../components/common/dotLoader/ThreeDotLoader";

type Props = {
  loadValues: loadValuesInterface;
};

const SearchTab = ({ loadValues }: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate, isDark } =
    useThemeColors();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading)
      setTimeout(() => {
        setLoading(false);
      }, 3000);
  }, [loading]);

  const [search, setSearch] = useState<ServiceInterface>({
    title: "",
    location: {
      pos: {
        latitude: 0,
        longitude: 0,
      },
      radius: 2000,
    },
    userId: 0,
    serviceId: 0,
    price: null,
    tags: [""],
    type: "",
  });

  // Prefrences Data
  const [isPrefrencesShown, setPrefrencesShown] = useState(false);

  const [prefrences, setPrefrences] = useState<SearchPrefrencesInterface>({
    title: "string",
    location: {
      pos: {
        latitude: 32.05857948271059,
        longitude: 34.774568575979316,
      },
      radius: 2000,
    },
    priceMargin: { min: 0, max: 1000 },
    tags: ["Music", "Math"],
    types: [""],
  });

  const handleSearch = () => {
    Keyboard.dismiss();
    setPrefrencesShown(false);
    setLoading(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: main }]}>
      <View style={[styles.searchLine, { backgroundColor: LIGHTER_GREY }]}>
        <EvilIcons
          name="search"
          size={24}
          color="black"
          style={{ marginHorizontal: 10 }}
        />
        <TextInput
          style={[styles.search]}
          placeholder="Search for a new connection!"
          placeholderTextColor="rgba(0,0,0,0.5)"
          onFocus={() => setPrefrencesShown(true)}
        />

        <TouchableOpacity
          style={[styles.prefrencesButton, center]}
          onPress={() => {
            if (isPrefrencesShown) Keyboard.dismiss();
            setPrefrencesShown((prev) => !prev);
          }}
        >
          {isPrefrencesShown ? (
            <Entypo name="chevron-small-up" size={24} color="white" />
          ) : (
            <Ionicons name="options" size={18} color="white" />
          )}
        </TouchableOpacity>
      </View>

      <Prefrences
        prefrences={prefrences}
        setPrefrences={(data) => setPrefrences(data)}
        isOpen={isPrefrencesShown}
        setOpen={(bool) => setPrefrencesShown(bool)}
        handleSearch={handleSearch}
      />

      <View style={styles.content}>{loading ? <ThreeDotLoader /> : <></>}</View>
    </View>
  );
};

export default SearchTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchLine: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginVertical: 20,
    borderRadius: 20,
    zIndex: 10,
  },

  search: {
    flex: 1,
    height: 60,
  },

  prefrencesButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: PURPLE,
  },

  content: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH,
    paddingHorizontal: 40,
    paddingTop: 10,
    // marginTop: 20,
  },

  title: {
    fontSize: 18,
    fontStyle: "italic",
  },

  button: {
    height: 40,
    width: 40,
  },

  data: {
    flex: 1,
    alignItems: "center",
  },
});
