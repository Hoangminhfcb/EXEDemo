"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createOrder, type CustomerInfo } from "@/services/checkoutService";
import {
  calculateOrderTotals,
  groupCartItemsByBakery,
  formatPrice,
  validateCustomerInfo,
} from "@/utils/checkout-utils";
import {
  getCart,
  updateCartItemQuantity,
  removeCartItem,
  type CartItem,
} from "@/utils/cartStorage";
import { useCart } from "@/context/CartContext";
import { API_URL } from "@/utils/BaseUrl";

export default function CheckoutPage() {
  const router = useRouter();

  const showToast = (title: string, description: string, variant?: string) => {
    if (variant === "destructive") {
      alert(`❌ ${title}: ${description}`);
    } else {
      alert(`✅ ${title}: ${description}`);
    }
    console.log(`Toast: ${title} - ${description}`);
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    city: "",
    notes: "",
  });

  const { cartItems, clearCartItems, setCartItems } = useCart(); // Lấy danh sách sản phẩm trong giỏ
  const total = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  // Load cart items on mount
  useEffect(() => {
    const items = getCart();
    setCartItems(items);

    if (items.length === 0) {
      showToast(
        "Giỏ hàng trống",
        "Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán",
        "destructive"
      );
      router.push("/cart");
    }
  }, [router]);

  // Calculate totals
  const orderTotals = calculateOrderTotals(cartItems);
  const groupedItems = groupCartItemsByBakery(cartItems);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Handle quantity update
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItemQuantity(itemId, newQuantity);
    setCartItems(getCart());
  };

  // Handle item removal
  const removeItem = (itemId: string) => {
    removeCartItem(itemId);
    const updatedCart = getCart();
    setCartItems(updatedCart);

    if (updatedCart.length === 0) {
      showToast(
        "Giỏ hàng trống",
        "Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán",
        "destructive"
      );
      router.push("/cart");
    }
  };

  // Handle order submission
  const handleSubmitOrder = async () => {
    // Validate customer info
    const validation = validateCustomerInfo(customerInfo);
    if (!validation.isValid) {
      showToast(
        "Thông tin không hợp lệ",
        validation.errors.join(", "),
        "destructive"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createOrder(customerInfo);

      showToast("Đặt hàng thành công!", `Mã đơn hàng: ${response.orderId}`);
      clearCartItems();

      router.push(`/checkout/order-confirmation?orderId=${response.orderId}`);
    } catch (error) {
      console.error("Error submitting order:", error);
      showToast(
        "Lỗi đặt hàng",
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.",
        "destructive"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link
            href="/cart"
            className="flex items-center text-pink-600 hover:text-pink-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại giỏ hàng
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Thanh toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Thông tin khách hàng</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      placeholder="Nhập họ và tên"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="Nhập số điện thoại"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Nhập email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ giao hàng *
                  </label>
                  <input
                    value={customerInfo.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    placeholder="Nhập địa chỉ chi tiết"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ghi chú
                  </label>
                  <textarea
                    value={customerInfo.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Ghi chú thêm cho đơn hàng (tùy chọn)"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">
                  Đơn hàng của bạn ({orderTotals.itemCount} sản phẩm)
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-6">
                  {Object.values(groupedItems).map((group) => (
                    <div
                      key={group.bakeryId}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <h3 className="font-medium text-gray-900 mb-4">
                        {group.bakeryName}
                      </h3>
                      <div className="space-y-4">
                        {group.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-4"
                          >
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={`${API_URL}/api/images/file/${item?.image}`}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {item.name}
                              </h4>
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
                              <div className="text-sm font-medium text-pink-600 mt-1">
                                {formatPrice(item.discountPrice || item.price)}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-4">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Tóm tắt đơn hàng</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(orderTotals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Phí giao hàng:</span>
                    <span
                      className={
                        orderTotals.shippingFee === 0 ? "text-green-600" : ""
                      }
                    >
                      {orderTotals.shippingFee === 0
                        ? "Miễn phí"
                        : formatPrice(orderTotals.shippingFee)}
                    </span>
                  </div>
                  {orderTotals.subtotal < 5000000 &&
                    orderTotals.shippingFee > 0 && (
                      <div className="text-xs text-gray-500">
                        Mua thêm {formatPrice(5000000 - orderTotals.subtotal)}{" "}
                        để được miễn phí giao hàng
                      </div>
                    )}
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                    <span>Tổng cộng:</span>
                    <span className="text-pink-600">
                      {formatPrice(orderTotals.total)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="w-full bg-pink-600 hover:bg-pink-700 py-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Đang xử lý...
                    </>
                  ) : (
                    "Đặt hàng"
                  )}
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  <p>🔒 Thanh toán an toàn và bảo mật</p>
                  <p>📞 Hỗ trợ 24/7: 1900-xxxx</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
