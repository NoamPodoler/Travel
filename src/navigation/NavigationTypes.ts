import { MessageType, PlanInterface } from "../utils/interfaces";

export const LANDING = "Landing";
export const SIGNINUP = "Sign In & Sign Up";
export const MAIN = "Main";
export const PLAN = "Plan";
export const PROFILE = "Profile";
export const CHAT = "Chat";
export const CHATS = "Chats";
export const SETTINGS = "Settings";
export const PROFILE_SETTINGS = "Profile Settings";

export type RootNavigatorParamList = {
  [LANDING]: undefined;
  [SIGNINUP]: { startWithPopup: boolean };
  [MAIN]: undefined;
  [PLAN]: PlanInterface;
  [PROFILE]: { id: string };
  [CHAT]: { id: string; replyTo?: MessageType };
  [CHATS]: undefined;
  [SETTINGS]: undefined;
  [PROFILE_SETTINGS]: undefined;
};

export const MAIN_DESTINATIONS = "Main Destinations";
export const MAIN_DATES = "Main Dates";
export const MAIN_EXPLORE = "Main Explore";

export type MainNavigatorParamList = {
  [MAIN_DESTINATIONS]: undefined;
  [MAIN_DATES]: undefined;
  [MAIN_EXPLORE]: undefined;
};

export const PROFILE_HOME = "Profile Home";
export const PROFILE_PLANS = "Profile Plans";

export type ProfileNavigatorParamList = {
  [PROFILE_HOME]: undefined;
  [PROFILE_PLANS]: undefined;
};
