import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useThemeColors } from "../app/hooks";
import ListSlider, {
  ListItemInterface,
} from "../components/other/sliders/listSlider/ListSlider";
import { ScrollView } from "react-native-gesture-handler";

type Props = {};

const ListSliderPage = (props: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const [list, setList] = useState<ListItemInterface[]>(
    Array(6)
      .fill(0)
      .map((item, index) => ({
        title: `Title ${index}`,
        id: index,
        resolve: false,
      }))
  );

  const setResolve = (params: { id: number }) => {
    const itemIndex = list.findIndex((item) => item.id === params.id);
    const newList = [...list];
    newList[itemIndex].resolve = !newList[itemIndex].resolve;
    setList(newList);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: main }]}>
      <ScrollView>
        <ListSlider
          list={list}
          setList={(list) => setList(list)}
          rightFn={(params) => setResolve(params)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListSliderPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
