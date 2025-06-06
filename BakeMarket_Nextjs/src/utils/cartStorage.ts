// src/utils/cartStorage.ts

export const getCart = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const saveCart = (cart: any[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product: any) => {
  const cart = getCart();
  const index = cart.findIndex((item: any) => item.id === product.id);

  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
};

export const removeFromCart = (productId: string) => {
  let cart = getCart();
  cart = cart.filter((item: any) => item.id !== productId);
  saveCart(cart);
};

export const clearCart = () => {
  saveCart([]); // Ghi mảng rỗng vào localStorage
};
