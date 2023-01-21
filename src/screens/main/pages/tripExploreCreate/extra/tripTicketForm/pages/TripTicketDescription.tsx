import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useOpenSection, useThemeColors } from "../../../../../../../app/hooks";
import { center, row } from "../../../../../../../utils/styling";
import { hexToRgbA } from "../../../../../../../utils/fn";
import { Entypo } from "@expo/vector-icons";
import { PURPLE, WHITE } from "../../../../../../../utils/colors";
import Animated, { FadeInDown } from "react-native-reanimated";
import OpenSection from "../../../../../../../components/common/openSection/OpenSection";
import { SCREEN_WIDTH } from "../../../../../../../utils/constans";
import {
  LanguagesType,
  GendersType,
} from "../../../../../../../utils/interfaces";

type Props = {
  setCurrent: Function;
  state: {
    title: string;
    description: string;
    partnerDescription: string;
    languages: LanguagesType[];
    gender: GendersType;
  };
  setDescription: Function;
};

const TripTicketDescription = ({
  setCurrent,
  state,
  setDescription,
}: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    const isNew =
      tags.findIndex((item) => item === tagInput) === -1 && tagInput.length > 0;

    if (isNew) {
      setTags((prev) => prev.concat(tagInput));
      setTagInput("");
    }
  };
  return (
    <View style={[styles.container]}>
      <Text style={[styles.title, { color: invertedMain, marginTop: 0 }]}>
        Description
      </Text>

      <Text
        style={[
          styles.subTitle,
          {
            color: hexToRgbA(invertedMain, 0.5),
          },
        ]}
      >
        Enter a brief description of the trip you plan
      </Text>

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: main,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: hexToRgbA(invertedMain, 0.75),
            },
          ]}
          placeholder="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi,
            quo!"
          placeholderTextColor={hexToRgbA(invertedMain, 0.25)}
          multiline={true}
          value={state.description}
          onChangeText={(value) => setDescription(value)}
        />
      </View>
    </View>
  );
};

export default TripTicketDescription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 12,
    marginBottom: 20,
    marginTop: 10,
  },
  inputContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  input: {
    flex: 1,
  },
});
