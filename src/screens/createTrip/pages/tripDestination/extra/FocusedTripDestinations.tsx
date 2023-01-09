import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  useAppSelector,
  useOpenSectionRef,
  useThemeColors,
} from "../../../../../app/hooks";
import OpenSection from "../../../../../components/common/openSection/OpenSection";
import { AntDesign, Entypo } from "@expo/vector-icons";
import ThreeDotLoader from "../../../../../components/common/dotLoader/ThreeDotLoader";
import { DESTINATIONS } from "../../../../../utils/constans";

type Props = {
  searchValue: string;
};

const FocusedTripDestinations = ({ searchValue }: Props) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const { selectedDestinations } = useAppSelector((state) => state.search);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={{ flex: 1 }}>
      {searchValue.length === 0 ? (
        selectedDestinations.length > 0 && (
          <DestinationMenu selectedDestinations={selectedDestinations} />
        )
      ) : (
        <ThreeDotLoader />
      )}
    </Animated.View>
  );
};

interface DestinationMenuInterface {
  selectedDestinations: typeof DESTINATIONS;
}

const DestinationMenu = ({
  selectedDestinations,
}: DestinationMenuInterface) => {
  const { main, second, invertedMain, invertedSecond, alternate } =
    useThemeColors();

  const [isDestinationOpen, setDestinationOpen] = useState(false);
  const { load, unload } = useOpenSectionRef(isDestinationOpen);

  return (
    <>
      <View style={{ overflow: "hidden" }}>
        <OpenSection load={unload}>
          <TouchableOpacity
            style={[
              styles.openDestinationButton,
              { backgroundColor: invertedSecond },
            ]}
            onPress={() => setDestinationOpen(true)}
          >
            <Text style={[styles.destinationButtonTitle, { color: main }]}>
              {`${selectedDestinations.length} Destinations Selected`}
            </Text>

            <Entypo name="select-arrows" size={18} color={main} />
          </TouchableOpacity>
        </OpenSection>
      </View>

      <View style={{ overflow: "hidden" }}>
        <OpenSection load={load}>
          <View
            style={[
              styles.destinationMenu,
              { backgroundColor: invertedSecond },
            ]}
          >
            <TouchableOpacity
              onPress={() => setDestinationOpen(false)}
              style={styles.closeDestinationButton}
            >
              <Text style={[styles.title, { color: main }]}>
                Selected Destinations
              </Text>
              <Entypo name="select-arrows" size={18} color={main} />
            </TouchableOpacity>

            <ScrollView
              style={{ marginHorizontal: 10 }}
              horizontal
              scrollEventThrottle={16}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
            >
              {selectedDestinations.map((item, index) => (
                <View
                  key={index.toString()}
                  style={[styles.item, { backgroundColor: main }]}
                >
                  <Text style={[styles.itemTitle, { color: invertedMain }]}>
                    {item.city}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </OpenSection>
      </View>
    </>
  );
};

export default FocusedTripDestinations;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  item: {
    height: 100,
    width: 200,
    marginRight: 10,
    borderRadius: 10,
  },

  itemTitle: {
    fontSize: 16,
    margin: 10,
  },

  openDestinationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    opacity: 0.95,
  },

  destinationButtonTitle: {
    fontSize: 18,
  },

  closeDestinationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingVertical: 20,
  },

  destinationMenu: {
    paddingBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});
