"use client";

import { useEffect, useState } from "react";
import { getCart, saveCart } from "@/utils/cartStorage";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cartItems, setCartItems } = useCart();
  const route = useRouter();

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  // Cập nhật cart state và localStorage
  const updateCart = (newCart: any[]) => {
    setCartItems(newCart);
    saveCart(newCart); // ✅ Dùng đúng hàm này để lưu giỏ hàng
  };

  // Xóa sản phẩm theo index
  const handleRemove = (index: number) => {
    const newCart = cartItems.filter((_: any, i: number) => i !== index);
    updateCart(newCart);
  };

  // Tăng số lượng sản phẩm
  const handleIncrease = (index: number) => {
    const newCart = [...cartItems];
    newCart[index].quantity += 1;
    updateCart(newCart);
  };

  // Giảm số lượng sản phẩm (ít nhất 1)
  const handleDecrease = (index: number) => {
    const newCart = [...cartItems];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      updateCart(newCart);
    }
  };

  // Tính tổng tiền
  const totalPrice = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  // Thanh toán (mô phỏng)
  const handleCheckout = () => {
    route.push("/checkout"); // Chuyển hướng đến trang thanh toán
  };

  return (
    <div className="max-w-4xl mx-auto p-22">
      <br></br>
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Giỏ hàng</h1>

      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item: any, index: number) => (
              <li
                key={index}
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.price}₫ / mỗi cái
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDecrease(index)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(index)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                <div className="w-32 text-right font-semibold">
                  {(item.price * item.quantity).toLocaleString()}₫
                </div>

                <button
                  onClick={() => handleRemove(index)}
                  className="ml-4 text-red-500 hover:text-red-700 font-bold"
                  aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right font-bold text-xl">
            Tổng: {totalPrice.toLocaleString()}₫
          </div>

          <div className="mt-4 text-right">
            <button
              onClick={handleCheckout}
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
}
