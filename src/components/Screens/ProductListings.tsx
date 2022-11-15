import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Chevron from "../common/Chevron";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootNavigatorParamList } from "../navigations/NavigationTypes";
import { useThemeColors } from "../../app/hooks";
import Button from "../common/Button";
import Footer from "../common/Footer";

type Props = {};

const ProductListings = (props: Props) => {
  const RootNavigation =
    useNavigation<NativeStackNavigationProp<RootNavigatorParamList>>();

  const {
    params: { title },
  } = useRoute<RouteProp<RootNavigatorParamList>>();

  const colors = useThemeColors();

  // Document Variables

  // Footer

  const left = (
    <Chevron
      onPress={() => RootNavigation.goBack()}
      chevronColor={colors.invertedMain}
      alternate
    />
  );

  const center = <Text style={{ color: colors.invertedSecond }}>{title}</Text>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.main }}>
      <View style={{ flex: 1 }}></View>
      <Footer left={left} center={center} />
    </SafeAreaView>
  );
};
export default ProductListings;

const styles = StyleSheet.create({});
