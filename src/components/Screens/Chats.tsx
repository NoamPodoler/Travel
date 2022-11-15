import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector, useThemeColors } from "../../app/hooks";
import { FlatList } from "react-native-gesture-handler";
import Footer from "../common/Footer";
import Chevron from "../common/Chevron";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootNavigatorParamList } from "../navigations/NavigationTypes";

type Props = {};

const Chats = (props: Props) => {
  const RootNavigation =
    useNavigation<NativeStackNavigationProp<RootNavigatorParamList>>();

  const colors = useThemeColors();

  const { cartList } = useAppSelector((state) => state.cart);

  // Document Variables

  const left = (
    <Chevron
      onPress={() => RootNavigation.goBack()}
      chevronColor={colors.invertedMain}
      alternate
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.main }}>
      <ScrollView style={{ flex: 1 }}>
        {cartList.map((item, index) => (
          <View key={index.toString()} style={styles.item}>
            <Text>{item.sell.title}</Text>
          </View>
        ))}
      </ScrollView>

      <Footer left={left} />
    </SafeAreaView>
  );
};

export default Chats;

const styles = StyleSheet.create({
  item: {
    height: 80,
    marginVertical: 4,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
