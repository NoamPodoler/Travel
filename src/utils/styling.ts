import { ViewStyle } from "react-native";

export const shadow: ViewStyle = {
  shadowColor: "#171717",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.05,
  shadowRadius: 1,
  // shadowColor: "#000",
  // shadowOffset: { width: 0, height: 1 },
  // shadowOpacity: 0.08,
  // shadowRadius: 1,
};

export const center: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
};

export const row: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
};
