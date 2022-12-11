import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ListSliderItem from "./ListSliderItem";
import { useThemeColors } from "../../../../app/hooks";

export interface ListItemInterface {
  title: string;
  id: number;
  resolve: boolean;
}

type Props = {
  list: ListItemInterface[];
  setList: Function;
  rightFn: Function;
};

const ListSlider = ({ list, setList, rightFn }: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const [renderdList, setRenderedList] = useState<ListItemInterface[]>([]);

  useEffect(() => {
    setRenderedList(list);
  }, []);

  const [deleted, setDeleted] = useState<number[]>([]);

  const handleRemoveItem = (id: number) => {
    setDeleted((prev) => prev.concat([id]));
  };

  useEffect(() => {
    const newList = list.filter((item, index) => {
      const isDeleted = deleted.find((del) => item.id === del) !== undefined;
      return !isDeleted;
    });

    setList(newList);
  }, [deleted]);

  return (
    <View style={styles.container}>
      {renderdList.map((item, index) => (
        <ListSliderItem
          key={index.toString()}
          item={item}
          index={index}
          handleRemoveItem={(i) => handleRemoveItem(i)}
          rightFn={(params) => rightFn(params)}
          isShown={deleted.find((el) => el === item.id) === undefined}
        />
      ))}
    </View>
  );
};

export default ListSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
