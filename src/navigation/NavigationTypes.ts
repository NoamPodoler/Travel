import { PlanInterface } from "../utils/interfaces";

export const LANDING = "Landing";
export const SIGNINUP = "Sign In & Sign Up";
export const MAIN = "Main";
export const PLAN = "Plan";
export const PROFILE = "Profile";
export const SETTINGS = "Settings";

export type RootNavigatorParamList = {
  [LANDING]: undefined;
  [SIGNINUP]: { startWithPopup: boolean };
  [MAIN]: undefined;
  [PLAN]: PlanInterface;
  [PROFILE]: undefined;
  [SETTINGS]: undefined;
};
