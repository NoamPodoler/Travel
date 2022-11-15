import { Sell } from "../../utils/SellsList";

export const WELCOME = "welcome";
export const MAIN_NAVIGATOR = "main-navigator";

export type RootNavigatorParamList = {
  [WELCOME]: undefined;
  [MAIN_NAVIGATOR]: undefined;
};

export const HOME = "home";
export const SELL = "sell";
export const CHATS = "chats";
export const PRODUCT_LISTING = "productListing";

export type MainNavigatorParamList = {
  [HOME]: undefined;
  [SELL]: Sell;
  [CHATS]: undefined;
  [PRODUCT_LISTING]: Sell;
};

export const SIGNIN = "signin";
export const SIGNUP = "signup";

export type LoginNavigatorParamList = {
  [SIGNIN]: undefined;
  [SIGNUP]: undefined;
};
