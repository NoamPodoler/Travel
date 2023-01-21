import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useThemeColors } from "../../../app/hooks";
import { hexToRgbA } from "../../../utils/fn";
import { PURPLE, RED } from "../../../utils/colors";
import OpenSection from "../../../components/common/openSection/OpenSection";
import { row } from "../../../utils/styling";

type Props = {
  title: string;
  validation: Function;
  set: Function;
  content: string;
  placeholder: string;
  secureTextEntry?: boolean;
  alert?: boolean;
};

const InputSection = ({
  title,
  validation,
  set,
  content,
  placeholder,
  secureTextEntry = false,
  alert = false,
}: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const _validation = validation(content);

  return (
    <>
      <View
        style={[
          row,
          {
            paddingVertical: 12,
            justifyContent: "space-between",
            marginHorizontal: 10,
          },
        ]}
      >
        <Text style={[styles.title, { color: invertedMain }]}>{title}</Text>
        {(content.length > 0 || alert) && (
          <Text style={{ color: hexToRgbA(invertedMain, 0.5) }}>
            {_validation.error}
          </Text>
        )}
      </View>
      <TextInput
        style={[
          ,
          styles.input,
          {
            backgroundColor: second,
            color: invertedMain,
            borderColor:
              _validation.isValid || (content.length === 0 && !alert)
                ? main
                : hexToRgbA(RED, 0.75),
          },
        ]}
        onChangeText={(value) => set(value)}
        placeholder={placeholder}
        placeholderTextColor={hexToRgbA(invertedMain, 0.25)}
        secureTextEntry={secureTextEntry}
      />
    </>
  );
};

export default InputSection;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },

  input: {
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 4,
    borderWidth: 1,
  },
});
