// Settings slice interfaces

import React from "react";

export interface settingsState {
  name: string;
  dark: boolean;
  isMenuOpen: boolean;
}

// Pages slice interfaces

export interface page {
  name: string;
  component: React.FC;
}

// Items slice interfaces

export interface Item {
  name: string;
  content: JSX.Element | null;
  focus: boolean;
  index: number;
  id: string;
}

export interface itemsState {
  list: Item[];
  focus: number;
}

// Product

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Seller {
  name: string;
  location: number;
  rating: number;
  numOfSuccesfulSales: number;
}

export interface Product {
  name: string;
  info: string;
  productId: string;
  images: any[];
}

export interface ProductForSale {
  seller: Seller;
  price: number;
  sellID: number;
  product: Product;
}
