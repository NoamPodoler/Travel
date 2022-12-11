import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { useThemeColors } from "../app/hooks";
import TabSlider, {
  TabSliderItemInterface,
} from "../components/other/sliders/tabSlider/TabSlider";
import String from "../components/common/String/String";
import { BLUE, LIGHT_BLUE, PURPLE } from "../utils/colors";

type Props = {};

const HEADER1 = [
  [" Making A ", [" Small "]],
  " Difference Can Cause",
  [[" Great Things "]],
];
const HEADER2 = [
  ["Just ", [" One Positive "]],
  [[" Thought "], " In The"],
  "Morning; Can Change",
  [["Your Whole Day"]],
];
const HEADER3 = [
  [[" Love "], " Your Family."],
  " Work Hard.",
  [" Live Your ", [" Passion. "]],
];

const HEADERS = [HEADER1, HEADER2, HEADER3];

const TabSliderPage = (props: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate, isDark } =
    useThemeColors();

  const [current, setCurrent] = useState(0);

  const [list, setList] = useState<TabSliderItemInterface[]>(
    Array(HEADERS.length)
      .fill(0)
      .map((_, index) => ({
        index,
        title: `Title ${index}`,
        content:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, laborum.",
      }))
  );

  const headers = useMemo(() => {
    return HEADERS.map((item, index) => (
      <String
        list={item}
        load={index === current}
        properties={{
          startDelay: 200,
          markerColor: PURPLE,
          style: { padding: 20 },
        }}
      />
    ));
  }, [current]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: main }]}>
      <TabSlider
        list={list}
        headers={headers}
        setCurrent={(index) => setCurrent(index)}
        image={require("../../assets/images/Nature.jpg")}
      />
    </SafeAreaView>
  );
};

export default TabSliderPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
