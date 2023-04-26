import { FC, useEffect, useReducer } from "react";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";
import { IShippingAddress, ICartProduct, IOrder } from "../../interfaces";
import audioRealmApi from "../../axios/audioRealmApi";
import axios from "axios";

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  orderSummary?: {
    totalNumberOfItems: number;
    subtotal: number;
    taxRate: number;
    tax: number;
    total: number;
  };
  shippingAddress?: IShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  orderSummary: undefined,
  shippingAddress: undefined,
};

export const CartProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  // Get shipping address from cookies
  useEffect(() => {
    if (Cookie.get("name")) {
      const shippingAddres: IShippingAddress = {
        address: Cookie.get("address") || "",
        address2: Cookie.get("address2") || "",
        city: Cookie.get("city") || "",
        country: Cookie.get("country") || "",
        lastName: Cookie.get("lastName") || "",
        name: Cookie.get("name") || "",
        phoneNumber: Cookie.get("phoneNumber") || "",
        postalCode: Cookie.get("postalCode") || "",
      };

      dispatch({
        type: "[Cart] - Get shipping address from cookies",
        payload: shippingAddres,
      });
    }
  }, []);

  // Get cart from cookies
  useEffect(() => {
    try {
      const cookieCart: ICartProduct[] = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];

      dispatch({
        type: "[Cart] - Get cart from cookies",
        payload: cookieCart,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "[Cart] - Get cart from cookies",
        payload: [],
      });
    }
  }, []);

  // Save cart in cookies
  useEffect(() => {
    if (state.cart.length) {
      Cookie.set("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  // Calc payments
  useEffect(() => {
    let totalNumberOfItems = 0;
    let subtotal = 0;

    for (const product of state.cart) {
      totalNumberOfItems += product.quantity;
      subtotal += product.price * product.quantity;
    }

    const taxRate = Number(process.env.NEXT_PUBLIC_TAXT_RATE);
    const tax = subtotal * taxRate;
    const total = subtotal * (taxRate + 1);

    const orderSummary = {
      totalNumberOfItems,
      taxRate,
      tax: Number(tax.toFixed(2)),
      total: Number(total.toFixed(2)),
      subtotal: Number(subtotal.toFixed(2)),
    };

    dispatch({ type: "[Cart] - HandleOrderSummary", payload: orderSummary });
  }, [state.cart]);

  const addProductToCart = (newProduct: ICartProduct) => {
    const productInCart = state.cart.some(
      (product) => product._id === newProduct._id
    );

    if (!productInCart) {
      dispatch({
        type: "[Cart] - AddProductToCart",
        payload: [...state.cart, newProduct],
      });
    }

    if (productInCart) {
      const updatedCart: ICartProduct[] = state.cart.map((product) => {
        if (newProduct._id !== product._id) return product;
        product.quantity = newProduct.quantity;
        return product;
      });

      dispatch({ type: "[Cart] - AddProductToCart", payload: updatedCart });
    }
  };

  const updateProductQuantityInCart = (product: ICartProduct) => {
    const foundedProduct = state.cart.some(
      (productInCart) => productInCart._id === product._id
    );

    if (foundedProduct) {
      const updatedProduct = state.cart.map((productInCart) => {
        if (productInCart._id !== product._id) return productInCart;
        productInCart.quantity = product.quantity;
        return productInCart;
      });
      dispatch({
        type: "[Cart] - UpdateProductQuantityInCart",
        payload: updatedProduct,
      });
    }
  };

  const removeProductFromCart = (product: ICartProduct) => {
    const updatedCart = state.cart.filter(
      (productInCart) => productInCart._id !== product._id
    );

    dispatch({ type: "[Cart] - RemoveProductFromCart", payload: updatedCart });
    Cookie.set("cart", JSON.stringify(updatedCart));
  };

  // Set the address in cookies
  const updateAddress = (shippingAddress: IShippingAddress) => {
    Cookie.set("address", shippingAddress.address);
    Cookie.set("address2", shippingAddress.address2 || "");
    Cookie.set("city", shippingAddress.city);
    Cookie.set("country", shippingAddress.country);
    Cookie.set("lastName", shippingAddress.lastName);
    Cookie.set("name", shippingAddress.name);
    Cookie.set("phoneNumber", shippingAddress.phoneNumber);
    Cookie.set("postalCode", shippingAddress.postalCode);
    dispatch({ type: "[Cart] - Update address", payload: shippingAddress });
  };

  const createOrder = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    if (!state.shippingAddress) {
      throw new Error("Shipping address not defined");
    }

    const order: IOrder = {
      orderItems: state.cart.map((product) => ({
        ...product,
        image: product.images,
      })),
      shippingAddress: state.shippingAddress,
      subtotal: state.orderSummary?.subtotal || 0,
      tax: state.orderSummary?.tax || 0,
      total: state.orderSummary?.total || 0,
      totalNumberOfItems: state.orderSummary?.totalNumberOfItems || 0,
      isPaid: false,
    };

    try {
      const { data } = await audioRealmApi.post("/orders", order);

      dispatch({ type: "[Cart] - Order complete" });
      Cookie.remove("cart");

      return {
        hasError: false,
        message: data._id!,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "Error while fetching",
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        removeProductFromCart,
        updateAddress,
        updateProductQuantityInCart,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
