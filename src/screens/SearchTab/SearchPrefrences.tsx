import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Circle } from "react-native-maps";
import { useAppDispatch, useThemeColors } from "../../app/hooks";
import OpenSection from "../../components/common/openSection/OpenSection";
import { BLACK, LIGHTER_GREY, PURPLE, WHITE } from "../../utils/colors";
import { row } from "../../utils/styling";
import { SCREEN_WIDTH } from "../../utils/constans";
import Tabs from "./SearchPrefrencesTabs";
import { SearchPrefrencesInterface } from "../../utils/interfaces";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RootNavigatorParamList,
  SEARCH_MAP,
} from "../../navigation/NavigationTypes";
import { setStatusBarShown } from "../../features/SettingsSlice";

type Props = {
  prefrences: SearchPrefrencesInterface;
  setPrefrences: Function;
  isOpen: boolean;
  setOpen: Function;
  handleSearch: Function;
};

const SearchPrefrences = ({
  prefrences,
  setPrefrences,
  isOpen,
  setOpen,
  handleSearch,
}: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate, isDark } =
    useThemeColors();

  const [tagsList, setTagsList] = useState(prefrences.tags);

  const tabList = [
    {
      title: "Location",
      reactNode: <LocationTab prefrences={prefrences} />,
    },
    {
      title: "Prefrences",
      reactNode: (
        <PrefrenceTab
          tagsList={tagsList}
          setTagsList={(arr) => setTagsList(arr)}
        />
      ),
    },
  ];

  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < tabList.length - 1) setCurrent((prev) => prev + 1);
    else handleSearch();
  };

  const handlePrev = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  return (
    <OpenSection
      isOpen={isOpen}
      style={styles.container}
      properties={{ opacity: true }}
    >
      <View style={styles.section}>
        <Tabs
          tabList={tabList}
          current={current}
          setCurrent={(index) => setCurrent(index)}
        />
      </View>

      <View style={styles.footer}>
        <View style={[row, styles.footerLine]}>
          <TouchableOpacity
            style={[styles.footerButton, { backgroundColor: LIGHTER_GREY }]}
            onPress={handlePrev}
          >
            <Text style={{ color: BLACK }}>
              {current === 0 ? "Reset" : "Prev"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.footerButton, { backgroundColor: PURPLE }]}
            onPress={handleNext}
          >
            <Text style={{ color: WHITE }}>
              {current === tabList.length - 1 ? "Search" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </OpenSection>
  );
};

export default SearchPrefrences;

const PrefrenceTab = ({ tagsList, setTagsList }) => {
  const handleRemoveTag = (tag: string) => {
    const newTags = tagsList.filter((item) => item != tag);
    setTagsList(newTags);
  };
  return (
    <Animated.View style={styles.item} entering={FadeIn} exiting={FadeOut}>
      <View style={{ flex: 1, width: "100%" }}>
        <View>
          <TextInput placeholder="Enter Tag" style={styles.input} />
          <View style={row}>
            {tagsList.map((item, index) => (
              <TouchableOpacity
                key={index.toString()}
                style={styles.tag}
                onPress={() => handleRemoveTag(item)}
              >
                <Text style={styles.tagText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const LocationTab = ({ prefrences }) => {
  const { isDark } = useThemeColors();

  const navigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const dispatch = useAppDispatch();

  useFocusEffect(() => {
    dispatch(setStatusBarShown(true));
  });

  return (
    <Animated.View style={styles.item} entering={FadeIn} exiting={FadeOut}>
      <TouchableOpacity
        style={styles.map}
        onPress={() =>
          navigation.navigate({ name: SEARCH_MAP, params: prefrences })
        }
      >
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            ...prefrences.location.pos,
            latitudeDelta: 0.1,
            longitudeDelta: 0.0421,
          }}
          scrollEnabled={false}
        >
          <Circle
            center={prefrences.location.pos}
            radius={prefrences.location.radius}
            fillColor={"rgba(0,0,0,0.2)"}
            strokeColor="rgba(0,0,0,0)"
          />
        </MapView>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    transform: [{ translateY: -100 }],
    paddingTop: 100,
    marginBottom: -100,
    backgroundColor: "white",
    borderRadius: 20,
  },

  section: {
    flex: 1,
    marginBottom: 80,
  },

  footer: {
    height: 80,
  },

  type: {
    marginHorizontal: 4,
  },

  tab: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 30,
  },

  prefrenceInput: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
    borderRadius: 10,
  },

  mapContainer: {
    width: SCREEN_WIDTH,
  },

  footerLine: {
    flex: 1,
    justifyContent: "space-around",
    marginHorizontal: 20,
  },

  footerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    height: 50,
    borderRadius: 20,
  },

  item: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: 200,
    paddingHorizontal: 20,
  },

  input: {
    textAlign: "center",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },

  tag: {
    backgroundColor: PURPLE,
    padding: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },

  tagText: {
    color: WHITE,
  },
  map: {
    flex: 1,
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
});
