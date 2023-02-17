import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "../../../../../app/hooks";
import { center, row } from "../../../../../utils/styling";
import { hexToRgbA } from "../../../../../utils/fn/style";
import { Feather, Ionicons } from "@expo/vector-icons";
import CustomButton from "../../../../common/customButton/CustomButton";
import { disconnect } from "../../../../../features/UserSlice";
import { usePopupBar } from "../../PopupBar";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  CHATS,
  PROFILE,
  RootNavigatorParamList,
} from "../../../../../navigation/NavigationTypes";

type Props = {};

const ProfileHeader = (props: Props) => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const user = useAppSelector((state) => state.user);
  return (
    <SafeAreaView style={styles.container}>
      {user.firebaseUser !== null && <UserBlock />}
    </SafeAreaView>
  );
};

const UserBlock = () => {
  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  const rootNavigation =
    useNavigation<StackNavigationProp<RootNavigatorParamList>>();
  const user = useAppSelector((state) => state.user);
  const popupBar = usePopupBar();

  const dispatch = useAppDispatch();

  const handleSignout = () => {
    popupBar.dismiss();
    dispatch(disconnect());
  };

  const handleProfilePress = () => {
    popupBar.dismiss();

    rootNavigation.navigate({
      name: PROFILE,
      params: { id: user.firebaseUser.uid },
    });
  };

  const handleChatsPress = () => {
    popupBar.dismiss();
    rootNavigation.navigate(CHATS);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[row, { justifyContent: "space-between" }]}>
        <CustomButton onPress={handleProfilePress} style={row}>
          <View
            style={[center, styles.image, { backgroundColor: invertedMain }]}
          >
            <Feather name="user" size={18} color={main} />
          </View>
          <View style={styles.info}>
            <Text style={[{ color: invertedMain }]}>
              {user.additionalData.name}
            </Text>
            <Text
              style={[
                {
                  color: hexToRgbA(invertedMain, 0.5),
                  fontStyle: "italic",
                  fontSize: 12,
                },
              ]}
            >{`From ${user.additionalData.country}`}</Text>
          </View>
        </CustomButton>

        <CustomButton
          onPress={handleChatsPress}
          containerStyle={{ padding: 20 }}
        >
          <Ionicons
            name="ios-chatbox-ellipses-outline"
            size={22}
            color={invertedMain}
          />
        </CustomButton>
      </View>

      <CustomButton
        onPress={handleSignout}
        style={[
          center,
          {
            padding: 20,
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: invertedMain,
          },
        ]}
      >
        <Text style={{ color: main }}>Sign Out</Text>
      </CustomButton>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },

  image: {
    height: 50,
    width: 50,
    borderRadius: 30,
  },

  info: {
    padding: 10,
    paddingHorizontal: 20,
  },
});
