import { StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import TripTicketDescription from "./pages/TripTicketDescription";
import Slider from "../../../../../../components/common/slider/Slider";
import { WHITE } from "../../../../../../utils/colors";
import SliderFooter from "../../../../../../components/common/slider/SliderFooter";
import Footer from "../../../../../../components/other/footer/Footer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import TripTicketPartner from "./pages/TripTicketPartner";
import { useThemeColors } from "../../../../../../app/hooks";
import { shadow } from "../../../../../../utils/styling";
import { GendersType, LanguagesType } from "../../../../../../utils/interfaces";

type Props = {
  state: {
    title: string;
    description: string;
    partnerDescription: string;
    languages: LanguagesType[];
    gender: GendersType;
  };

  setDescription: Function;
  setPartnerDescription: Function;
  setGender: Function;
};

const CreatePlanForm = ({
  state,
  setDescription,
  setPartnerDescription,
  setGender,
}: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const [current, setCurrent] = useState(0);
  const pages = [
    <TripTicketDescription
      setCurrent={(next) => setCurrent(next)}
      state={state}
      setDescription={setDescription}
    />,

    <TripTicketPartner
      setCurrent={(next) => setCurrent(next)}
      state={state}
      setPartnerDescription={setPartnerDescription}
      setGender={setGender}
    />,
  ];

  const handleNext = () => {
    if (current < pages.length - 1) setCurrent((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  return (
    <View style={[styles.container, { backgroundColor: second }, shadow]}>
      <Slider list={pages} current={current} style={{ flex: 1 }} />

      <Footer
        left={
          current > 0 && (
            <TouchableOpacity onPress={handlePrev}>
              <AntDesign name="swapleft" size={24} color={invertedMain} />
            </TouchableOpacity>
          )
        }
        center={<SliderFooter list={pages} current={current} />}
        right={
          current < pages.length - 1 && (
            <TouchableOpacity onPress={handleNext}>
              <AntDesign name="swapright" size={24} color={invertedMain} />
            </TouchableOpacity>
          )
        }
        style={{ paddingVertical: 10 }}
      />
    </View>
  );
};

export default CreatePlanForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 0,
    backgroundColor: WHITE,
    borderRadius: 10,
  },
});
