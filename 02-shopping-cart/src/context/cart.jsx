import { createContext, useReducer, useState } from "react";
import { initialState, reducer } from "../reducer/cart";

export const CartContext = createContext();

function useCartReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  const removeFromCart = (product) =>
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });

  const clearCart = () =>
    dispatch({
      type: "CLEAR_CART",
    });

  return { state, addToCart, clearCart, removeFromCart };
}

export function CartProvider({ children }) {
  const { state, addToCart, clearCart, removeFromCart } = useCartReducer();
  return (
    <CartContext.Provider
      value={{ cart: state, addToCart, clearCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
