import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PURPLE, WHITE } from "../../../../../utils/colors";
import { center } from "../../../../../utils/styling";
import { useThemeColors } from "../../../../../app/hooks";
import LottieView from "lottie-react-native";
import CustomButton from "../../../../../components/common/customButton/CustomButton";

type Props = {
  setNoAccount: Function;
};

const NoUser = ({ setNoAccount }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  return (
    <>
      <View style={[center, { flex: 1, justifyContent: "space-between" }]}>
        <Text
          style={{
            color: invertedMain,
            fontSize: 28,
            margin: 10,
            textAlign: "center",
          }}
        >
          {`It Seems That You
Dont Have An Account Yet`}
        </Text>
        <LottieView
          source={require("../../../../../../assets/lottie/mustache.json")}
          style={{ flex: 1 }}
          autoPlay
          loop
        />
      </View>

      <CustomButton
        onPress={() => setNoAccount(false)}
        style={[
          center,
          {
            padding: 20,
            margin: 20,
            backgroundColor: PURPLE,
            borderRadius: 10,
          },
        ]}
      >
        <Text style={{ color: WHITE }}>Create One!</Text>
      </CustomButton>
    </>
  );
};

export default NoUser;

const styles = StyleSheet.create({});
