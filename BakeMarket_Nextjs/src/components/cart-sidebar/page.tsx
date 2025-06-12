"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import {
  updateCartItemQuantity,
  removeCartItem,
  getCartSummary,
  type CartItem,
} from "@/utils/cartStorage";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, setCartItems, clearCartItems } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const success = updateCartItemQuantity(itemId, newQuantity);
    if (success) {
      // Update the context state to trigger re-render
      const updatedItems = cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
    }
  };

  const removeItem = (itemId: string) => {
    const success = removeCartItem(itemId);
    if (success) {
      // Update the context state to trigger re-render
      const updatedItems = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedItems);
    }
  };

  const clearCart = () => {
    clearCartItems();
  };

  // Use cart summary from utilities
  const cartSummary = getCartSummary();
  const { totalItems, subtotal, deliveryFee, total } = cartSummary;

  const getItemPrice = (item: CartItem) => {
    return item.discountPrice || item.price;
  };

  const getItemTotal = (item: CartItem) => {
    return getItemPrice(item) * item.quantity;
  };

  // Group items by bakery
  const groupedItems = cartItems.reduce((groups, item) => {
    const bakeryId = item.bakeryId;
    if (!groups[bakeryId]) {
      groups[bakeryId] = {
        bakeryName: item.bakeryName,
        bakeryId: item.bakeryId,
        items: [],
      };
    }
    groups[bakeryId].items.push(item);
    return groups;
  }, {} as Record<string, { bakeryName: string; bakeryId: string; items: CartItem[] }>);

  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      // In real app, navigate to checkout page
      window.location.href = "/checkout";
    }, 1000);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
              <ShoppingCart className="text-pink-600 mr-2 h-5 w-5" />
              <h2 className="text-lg font-semibold">
                Giỏ hàng ({totalItems}{" "}
                {totalItems === 1 ? "sản phẩm" : "sản phẩm"})
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              /* Empty Cart */
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="bg-gray-100 rounded-full p-6 mb-4">
                  <ShoppingCart className="text-gray-400 h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Giỏ hàng trống
                </h3>
                <p className="text-gray-500 mb-6">
                  Thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm
                </p>
                <Button
                  onClick={onClose}
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  Tiếp tục mua sắm
                </Button>
              </div>
            ) : (
              /* Cart Items */
              <div className="p-4">
                {/* Clear Cart Button */}
                {cartItems.length > 0 && (
                  <div className="flex justify-end mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="mr-1 h-4 w-4" /> Xóa tất cả
                    </Button>
                  </div>
                )}

                {/* Grouped by Bakery */}
                <div className="space-y-6">
                  {Object.values(groupedItems).map((group) => (
                    <div
                      key={group.bakeryId}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      {/* Bakery Header */}
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                        <Link
                          href={`/bakery/${group.bakeryId}`}
                          className="font-medium text-gray-900 hover:text-pink-600 transition"
                          onClick={onClose}
                        >
                          {group.bakeryName}
                        </Link>
                        <span className="text-sm text-gray-500">
                          {group.items.length} sản phẩm
                        </span>
                      </div>

                      {/* Items from this bakery */}
                      <div className="space-y-4">
                        {group.items.map((item) => (
                          <div key={item.id} className="space-y-3">
                            {/* Product Header with Image and Name */}
                            <div className="flex items-start space-x-3">
                              <Link
                                href={`/products/${item.productId}`}
                                className="flex-shrink-0"
                                onClick={onClose}
                              >
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </Link>
                              <div className="flex-1 min-w-0">
                                <Link
                                  href={`/products/${item.productId}`}
                                  className="font-medium text-gray-900 hover:text-pink-600 transition block text-sm leading-tight"
                                  onClick={onClose}
                                >
                                  {item.name}
                                </Link>
                                {/* Product Options */}
                                <div className="text-xs text-gray-500 mt-1">
                                  {item.size && (
                                    <span>Kích thước: {item.size}</span>
                                  )}
                                  {item.flavor && (
                                    <span className="ml-2">
                                      Hương vị: {item.flavor}
                                    </span>
                                  )}
                                </div>
                                {item.customization && (
                                  <div className="text-xs text-gray-500">
                                    Tùy chỉnh: {item.customization}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Price Row */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {item.discountPrice ? (
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-pink-600 text-sm">
                                      {formatPrice(item.discountPrice)}
                                    </span>
                                    <span className="text-xs text-gray-500 line-through">
                                      {formatPrice(item.price)}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="font-semibold text-pink-600 text-sm">
                                    {formatPrice(item.price)}
                                  </span>
                                )}
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                  className="h-7 w-7 p-0"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-6 text-center font-medium text-sm">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="h-7 w-7 p-0"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeItem(item.id)}
                                  className="h-7 w-7 p-0 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 ml-1"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            {/* Item Total */}
                            <div className="text-right">
                              <span className="font-semibold text-gray-900 text-sm">
                                Tổng: {formatPrice(getItemTotal(item))}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer - Order Summary and Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              {/* Order Summary */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Phí giao hàng:</span>
                  <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                    {deliveryFee === 0 ? "Miễn phí" : formatPrice(deliveryFee)}
                  </span>
                </div>
                {subtotal < 5000000 && deliveryFee > 0 && (
                  <div className="text-xs text-gray-500">
                    Mua thêm {formatPrice(5000000 - subtotal)} để được miễn phí
                    giao hàng
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-300">
                  <span>Tổng cộng:</span>
                  <span className="text-pink-600">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-pink-600 hover:bg-pink-700 py-3"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      Thanh toán
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Tiếp tục mua sắm
                </Button>
              </div>

              {/* Additional Info */}
              <div className="mt-3 text-xs text-gray-500 text-center">
                <p>🔒 Thanh toán an toàn và bảo mật</p>
                <p>📞 Hỗ trợ 24/7: 1900-xxxx</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
