import { StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { SCREEN_WIDTH } from "../../../../utils/constans";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MAIN, RootNavigatorParamList } from "../../../NavigationTypes";
import { useAppSelector, useThemeColors } from "../../../../app/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { PURPLE } from "../../../../utils/colors";
import { center } from "../../../../utils/styling";

type Props = {};

const Landing = (props: Props) => {
  const rootNavigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const { main, second, invertedMain, invertedSecond, isDark, alternate } =
    useThemeColors();

  const { destinations, failedToLoad } = useAppSelector((state) => state.data);

  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    if (lottieRef.current) {
      setTimeout(() => {
        // lottieRef.current?.reset();
        lottieRef.current?.play();
      }, 100);
    }
  }, [lottieRef.current]);

  useEffect(() => {
    if (destinations.length > 0) {
      setTimeout(handleDataFetched, 1000);
    }
  }, [destinations]);

  useEffect(() => {
    if (failedToLoad) {
      console.log("failed To load");
    }
  }, [failedToLoad]);

  const handleDataFetched = () => {
    rootNavigation.navigate(MAIN);
  };

  return (
    <SafeAreaView style={[center, { flex: 1, backgroundColor: main }]}>
      <LottieView
        source={require("../../../../../assets/lottie/colorLoader.json")}
        style={{ width: SCREEN_WIDTH - 20 }}
        ref={lottieRef}
      />
    </SafeAreaView>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },

  title: {
    fontSize: 22,
    textAlign: "center",
    marginHorizontal: 20,
  },

  btn: {
    backgroundColor: PURPLE,
    width: 200,
    paddingVertical: 20,
    borderRadius: 40,
    marginVertical: 20,
  },
});
