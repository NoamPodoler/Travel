import { createSlice, Reducer } from "@reduxjs/toolkit";
import { Sell } from "../utils/SellsList";

export interface Offer {
  price: number;
  buyer: boolean;
}

export interface ChatMesseage {
  buyer: boolean;
  msg: string;
  offer: boolean;
}

export interface Product {
  sell: Sell;
  offers: Offer[];
  chat: ChatMesseage[];
}

interface State {
  cartList: Product[];
}

const initialState: State = {
  cartList: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state: State,
      action: {
        payload: { sell: Sell; offer: Offer };
      }
    ) => {
      // Item is already in cart
      if (state.cartList[action.payload.sell.id]) return;

      const sellerMsg: ChatMesseage = {
        buyer: false,
        msg: action.payload.sell.price.toString(),
        offer: true,
      };

      const buyerMsg: ChatMesseage = {
        buyer: true,
        msg: action.payload.offer.price.toString(),
        offer: true,
      };

      state.cartList[action.payload.sell.id] = {
        sell: action.payload.sell,
        offers: [action.payload.offer],
        chat: [sellerMsg, buyerMsg],
      };
    },

    addOffer: (
      state: State,
      action: {
        payload: { id: number; offer: Offer; buyer: boolean };
      }
    ) => {
      // Item is not found in cart
      if (!state.cartList[action.payload.id]) return;

      state.cartList[action.payload.id].offers.push(action.payload.offer);
      state.cartList[action.payload.id].chat.push({
        buyer: action.payload.buyer,
        msg: action.payload.offer.price.toString(),
        offer: true,
      });
    },

    sendMsg: (
      state: State,
      action: { payload: { id: number; msg: string; buyer: boolean } }
    ) => {
      // Item is not found in cart
      if (!state.cartList[action.payload.id]) return;

      state.cartList[action.payload.id].chat.push({
        buyer: action.payload.buyer,
        msg: action.payload.msg,
        offer: false,
      });
    },
  },
});

export const { addToCart, addOffer, sendMsg } = CartSlice.actions;
const reducer = CartSlice.reducer as Reducer<State>;
export default reducer;
