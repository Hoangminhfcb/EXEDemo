// src/context/CartContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getCart, saveCart, clearCart } from "@/utils/cartStorage";

type CartContextType = {
  cartItems: any[];
  setCartItems: (items: any[]) => void;
  clearCartItems: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItemsState, setCartItemsState] = useState<any[]>([]);

  // Lấy cart từ localStorage khi load trang
  useEffect(() => {
    const cart = getCart();
    setCartItemsState(cart);
  }, []);

  // Hàm này giúp cập nhật cả localStorage và state
  const setCartItems = (items: any[]) => {
    saveCart(items);
    setCartItemsState(items);
  };

  // Hàm xóa toàn bộ cart
  const clearCartItems = () => {
    clearCart();
    setCartItemsState([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems: cartItemsState, setCartItems, clearCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
