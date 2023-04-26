import { createContext } from "react";
import { ICartProduct } from "../../interfaces";
import { IShippingAddress } from "../../interfaces";

interface ContextProps {
  cart: ICartProduct[];
  isLoaded: boolean;
  orderSummary?: {
    totalNumberOfItems: number;
    subtotal: number;
    taxRate: number;
    tax: number;
    total: number;
  };
  shippingAddress?: IShippingAddress;
  addProductToCart: (cart: ICartProduct) => void;
  createOrder: () => Promise<{
    hasError: boolean;
    message: string;
  }>;
  removeProductFromCart: (product: ICartProduct) => void;
  updateAddress: (shippingAddress: IShippingAddress) => void;
  updateProductQuantityInCart: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
