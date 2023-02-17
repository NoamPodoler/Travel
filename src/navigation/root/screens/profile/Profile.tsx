import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector, useThemeColors } from "../../../../app/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../../../components/common/customButton/CustomButton";
import { center } from "../../../../utils/styling";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  CHAT,
  ProfileNavigatorParamList,
  PROFILE_SETTINGS,
  RootNavigatorParamList,
  SIGNINUP,
} from "../../../NavigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { getUser } from "../../../../../firebase";
import { PlanInterface, UserType } from "../../../../utils/interfaces";
import DotLoader from "../../../../components/common/loaders/DotLoader";
import { ProfileIdContext } from "../../../../utils/context";
import ProfileNavigator from "../../../profile/ProfileNavigator";
import Animated, { FadeIn } from "react-native-reanimated";
import Footer from "../../../../components/common/footer/Footer";

type Props = {};

const Profile = (props: Props) => {
  const { firebaseUser, additionalData } = useAppSelector(
    (state) => state.user
  );
  const { main, second, invertedMain, invertedSecond } = useThemeColors();

  const rootNavigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  const profileNavigation =
    useNavigation<StackNavigationProp<ProfileNavigatorParamList>>();

  const [user, setUser] = useState<UserType | null>(null);
  const [plans, setPlans] = useState<PlanInterface[]>([]);

  const [load, setLoad] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const route = useRoute<RouteProp<RootNavigatorParamList, "Profile">>();

  useEffect(() => {
    const fetch = async () => {
      try {
        const user = await getUser(route.params.id);
        setUser(user);
        // const plans = await getUserPlans(route.params.id);
        // setPlans(plans);
        setLoad(true);
      } catch (error) {
        setError(error.toString());
      }
    };

    fetch();
  }, []);

  if (load === false) return <DotLoader />;

  return (
    <ProfileIdContext.Provider value={{ user }}>
      <SafeAreaView style={[styles.container, { backgroundColor: main }]}>
        {user !== null ? (
          <Animated.View entering={FadeIn.delay(200)} style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.title, { color: invertedMain }]}>
                {user.name}
              </Text>

              <ProfileNavigator />
            </View>

            <Footer>
              <CustomButton
                onPress={() => rootNavigation.goBack()}
                containerStyle={[center, { flex: 1 }]}
              >
                <Ionicons
                  name="return-down-back"
                  size={20}
                  color={invertedMain}
                />
              </CustomButton>

              <View style={{ flex: 3 }} />

              {firebaseUser?.uid !== user.uid ? (
                <CustomButton
                  onPress={() => {
                    if (firebaseUser === null)
                      rootNavigation.navigate({
                        name: SIGNINUP,
                        params: { startWithPopup: true },
                      });
                    else
                      rootNavigation.navigate({
                        name: CHAT,
                        params: { id: route.params.id },
                      });
                  }}
                  containerStyle={[center, { flex: 1 }]}
                >
                  <Ionicons
                    name="ios-chatbox-ellipses-outline"
                    size={22}
                    color={invertedMain}
                  />
                </CustomButton>
              ) : (
                <CustomButton
                  onPress={() => rootNavigation.navigate(PROFILE_SETTINGS)}
                  containerStyle={[center, { flex: 1 }]}
                >
                  <Ionicons
                    name="ios-settings-outline"
                    size={22}
                    color={invertedMain}
                  />
                </CustomButton>
              )}
            </Footer>
          </Animated.View>
        ) : (
          <DotLoader />
        )}
      </SafeAreaView>
    </ProfileIdContext.Provider>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    padding: 10,
  },
});
