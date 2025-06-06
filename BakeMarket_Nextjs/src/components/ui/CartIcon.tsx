// src/components/CartIcon.tsx
"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CartIcon() {
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const totalUniqueProducts = new Set(
    cartItems.map((item: { id: string }) => item.id)
  ).size;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href="/cart">
        <button className="relative text-gray-700 hover:text-purple-600 px-4 py-3 rounded transition-colors cursor-pointer">
          <ShoppingCartIcon className="w-7 h-7" />
          {totalUniqueProducts > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
              {totalUniqueProducts}
            </span>
          )}
        </button>
      </Link>

      {isOpen && cartItems.length > 0 && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded z-50 p-4">
          <h3 className="font-semibold mb-2">Sản phẩm của bạn</h3>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {cartItems.slice(0, 3).map((item: any, index: number) => (
              <li key={index} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span>
                  {item.quantity} x {item.price}₫
                </span>
              </li>
            ))}
          </ul>
          {cartItems.length > 3 && (
            <p className="text-xs text-right text-blue-500 mt-2">
              ... và {cartItems.length - 3} sản phẩm khác
            </p>
          )}
        </div>
      )}
    </div>
  );
}
