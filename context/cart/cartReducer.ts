import { CartState } from "./";
import { ICartProduct, IShippingAddress } from "../../interfaces";

type CartActionType =
  | { type: "[Cart] - AddProductToCart"; payload: ICartProduct[] }
  | { type: "[Cart] - UpdateProductQuantityInCart"; payload: ICartProduct[] }
  | { type: "[Cart] - RemoveProductFromCart"; payload: ICartProduct[] }
  | {
      type: "[Cart] - Get shipping address from cookies";
      payload: IShippingAddress;
    }
  | {
      type: "[Cart] - Update address";
      payload: IShippingAddress;
    }
  | {
      type: "[Cart] - HandleOrderSummary";
      payload: {
        totalNumberOfItems: number;
        subtotal: number;
        taxRate: number;
        tax: number;
        total: number;
      };
    }
  | {
      type: "[Cart] - Get cart from cookies";
      payload: ICartProduct[];
    }
  | {
      type: "[Cart] - Order complete";
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - AddProductToCart":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "[Cart] - Get cart from cookies":
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };

    case "[Cart] - UpdateProductQuantityInCart":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "[Cart] - RemoveProductFromCart":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "[Cart] - HandleOrderSummary":
      return {
        ...state,
        orderSummary: action.payload,
      };

    case "[Cart] - Update address":
    case "[Cart] - Get shipping address from cookies":
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case "[Cart] - Order complete":
      return {
        ...state,
        cart: [],
        orderSummary: {
          subtotal: 0,
          tax: 0,
          taxRate: 0.15,
          total: 0,
          totalNumberOfItems: 0,
        },
      };

    default:
      return state;
  }
};
