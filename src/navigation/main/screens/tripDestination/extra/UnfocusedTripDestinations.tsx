import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import Animated, {
  Extrapolate,
  FadeIn,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "../../../../../app/hooks";
import { addDestination } from "../../../../../features/SearchSlice";
import SelectedDestinationsRow from "../../../extra/SelectedDestinationsRow";
import ContinentsBar from "../../../extra/ContinentsBar";
import {
  ContinentType,
  DestinationInterface,
} from "../../../../../utils/interfaces";
import CustomButton from "../../../../../components/common/customButton/CustomButton";
import { withCustomTiming } from "../../../../../utils/fn/style";
import { PURPLE } from "../../../../../utils/colors";
import Section, {
  useSection,
} from "../../../../../components/common/section/Section";

interface Props {}

const UnfocusedTripDestinations = ({}: Props) => {
  const dispatch = useAppDispatch();

  const { selectedDestinations } = useAppSelector((state) => state.search);
  const { destinations } = useAppSelector((state) => state.data);

  const [data, setData] = useState<DestinationInterface[]>(destinations);
  const [continent, setContinent] = useState<ContinentType>("");
  const [width, setWidth] = useState(0);

  const isSelected = selectedDestinations.length !== 0;
  const { load, unload } = useSection(isSelected);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ overflow: "hidden" }}>
        <Section load={load}>
          <View style={{ paddingTop: 10 }}>
            <SelectedDestinationsRow />
          </View>
        </Section>
      </View>

      <ContinentsBar data={data} setData={setData} />

      <ScrollView
        style={[styles.scroll, { flex: 1 }]}
        horizontal
        snapToInterval={width / 2}
        scrollEventThrottle={16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      >
        {data.slice(0, 10).map((item, index) => (
          <DestinationItem
            key={index.toString()}
            item={item}
            index={index}
            selected={
              selectedDestinations.findIndex(
                (selected) => selected.title === item.title
              ) !== -1
            }
            width={width}
          />
        ))}
      </ScrollView>
    </View>
  );
};

interface DestinationItemProps {
  item: DestinationInterface;
  index: number;
  selected: boolean;
  width: number;
}

const DestinationItem = ({
  item,
  index,
  selected,
  width,
}: DestinationItemProps) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const dispatch = useAppDispatch();

  const focus = useDerivedValue(
    () => withCustomTiming(selected ? 1 : 0, 600),
    [selected]
  );

  const rStyleItem = useAnimatedStyle(() => {
    const _width = interpolate(
      focus.value,
      [0, 1],
      [width / 2, 0],
      Extrapolate.CLAMP
    );
    const paddingHorizontal = interpolate(
      focus.value,
      [0, 1],
      [2, 0],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      focus.value,
      [0, 0.75],
      [1, 0],
      Extrapolate.CLAMP
    );

    return {
      width: _width,
      opacity,
      paddingHorizontal,
    };
  });
  return (
    <Animated.View style={[rStyleItem, { height: "100%" }]}>
      <CustomButton
        onPress={() => {
          if (!selected) dispatch(addDestination(item));
        }}
        style={[styles.destination, { backgroundColor: invertedMain }]}
        containerStyle={{ flex: 1 }}
        scaleSize={0.975}
      >
        <View style={[styles.title, { backgroundColor: second }]}>
          <Text
            style={[{ color: invertedMain, height: 20, overflow: "hidden" }]}
          >
            {item.title}
          </Text>
        </View>
      </CustomButton>
    </Animated.View>
  );
};

export default UnfocusedTripDestinations;

const styles = StyleSheet.create({
  scroll: {
    borderRadius: 10,
  },

  destination: {
    flex: 1,
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },

  title: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    padding: 20,
  },

  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: PURPLE,
  },
});
