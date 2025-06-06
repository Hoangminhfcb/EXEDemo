"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaStickyNote,
  FaClock,
  FaGift,
} from "react-icons/fa";

interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  deliveryNotes?: string;
  deliveryTime?: string;
  isGift?: boolean;
  giftMessage?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
    deliveryNotes: "",
    deliveryTime: "",
    isGift: false,
    giftMessage: "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên";
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10,11}$/.test(customerInfo.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (
      customerInfo.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)
    ) {
      newErrors.email = "Email không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof CustomerInfo,
    value: string | boolean
  ) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create order object
      const order = {
        id: `ORDER-${Date.now()}`,
        customerInfo,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      // In real app, send order to backend
      console.log("Order created:", order);

      // Redirect to success page
      router.push(`/orders/success?orderId=${order.id}`);
    } catch (error) {
      console.error("Order submission failed:", error);
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Quay lại
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Đặt hàng</h1>
          <p className="text-gray-600 mt-2">
            Vui lòng điền thông tin để đặt hàng
          </p>
        </div>

        {/* Customer Information Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FaUser className="mr-2 text-pink-600" />
            Thông tin khách hàng
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Required Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nhập họ và tên"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nhập số điện thoại"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Optional Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Thông tin bổ sung (tùy chọn)
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaPhone className="mr-2 text-gray-400" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Nhập email để nhận thông báo đơn hàng"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-gray-400" />
                    Địa chỉ giao hàng
                  </label>
                  <textarea
                    value={customerInfo.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Nhập địa chỉ chi tiết để giao hàng"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaClock className="mr-2 text-gray-400" />
                    Thời gian giao hàng mong muốn
                  </label>
                  <input
                    type="datetime-local"
                    value={customerInfo.deliveryTime}
                    onChange={(e) =>
                      handleInputChange("deliveryTime", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaStickyNote className="mr-2 text-gray-400" />
                    Ghi chú giao hàng
                  </label>
                  <textarea
                    value={customerInfo.deliveryNotes}
                    onChange={(e) =>
                      handleInputChange("deliveryNotes", e.target.value)
                    }
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Ghi chú đặc biệt cho việc giao hàng..."
                  />
                </div>

                {/* Gift Option */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id="isGift"
                      checked={customerInfo.isGift}
                      onChange={(e) =>
                        handleInputChange("isGift", e.target.checked)
                      }
                      className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                    />
                    <label
                      htmlFor="isGift"
                      className="ml-2 text-sm font-medium text-gray-700 flex items-center"
                    >
                      <FaGift className="mr-2 text-pink-600" />
                      Đây là món quà
                    </label>
                  </div>

                  {customerInfo.isGift && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lời nhắn tặng quà
                      </label>
                      <textarea
                        value={customerInfo.giftMessage}
                        onChange={(e) =>
                          handleInputChange("giftMessage", e.target.value)
                        }
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        placeholder="Nhập lời nhắn cho người nhận..."
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-600 text-white py-4 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Đang xử lý đơn hàng...
                  </div>
                ) : (
                  "Đặt hàng"
                )}
              </button>
            </div>
          </form>

          {/* Security Info */}
          <div className="mt-6 text-xs text-gray-500 text-center space-y-1 border-t pt-4">
            <p>🔒 Thông tin được bảo mật an toàn</p>
            <p>📞 Hỗ trợ 24/7: 1900-xxxx</p>
            <p>🚚 Giao hàng trong 2-4 giờ</p>
          </div>
        </div>
      </div>
    </div>
  );
}
