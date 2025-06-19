"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FaCheckCircle,
  FaShoppingBag,
  FaHome,
  FaPrint,
  FaEnvelope,
} from "react-icons/fa";
import { getOrderById } from "@/services/checkoutService";
import { Order } from "@/types/checkout";
import { API_URL } from "@/utils/BaseUrl";
// import Header from "@/components/header"
// import Footer from "@/components/footer"
// import SystemBanner from "@/components/system-banner"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [currentDate] = useState(new Date());
  const [order, setOrder] = useState<Order>();

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  // Format time
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await getOrderById(orderId || "");
      setOrder(res.orderDTO);
    };
    fetchOrder();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <SystemBanner />
      <Header /> */}

      <div className="container mx-auto px-4 py-8">
        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 text-center">
          <div className="text-green-500 mb-4">
            <FaCheckCircle className="mx-auto h-16 w-16" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Đặt hàng thành công!
          </h1>
          <p className="text-gray-600">
            Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được xác nhận và đang
            được xử lý.
          </p>
          <p className="text-gray-600 mt-2">
            Mã đơn hàng: <span className="font-semibold">{order?.id}</span>
          </p>
          <p className="text-gray-600 mt-1">
            Thời gian đặt hàng: {order?.orderDate}{" "}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaShoppingBag className="mr-2 text-pink-600" /> Chi tiết đơn
                hàng
              </h2>

              <div className="space-y-4">
                {order?.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex py-4 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={`${API_URL}/api/images/file/${item?.cake?.thumbnailUrl}`}
                        alt={item?.cake?.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="line-clamp-2">{item?.cake?.name}</h3>
                          <p className="ml-4">
                            {formatPrice(item?.cake?.price * item?.quantity)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">SL: {item?.quantity}</p>
                        <p className="text-gray-500">
                          {formatPrice(item?.cake?.price)} / sản phẩm
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                Thông tin giao hàng
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Địa chỉ giao hàng
                  </h3>
                  <p className="mt-1 text-gray-900">{order?.deliveryAddress}</p>

                  <p className="text-gray-900">
                    Điện thoại: {order?.contactPhone}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Phương thức giao hàng
                  </h3>
                  <p className="mt-1 text-gray-900">COD</p>
                  <p className="text-gray-900">Dự kiến giao hàng: 15/6/2025</p>

                  <h3 className="text-sm font-medium text-gray-500 mt-4">
                    Phương thức thanh toán
                  </h3>
                  <p className="mt-1 text-gray-900">Thanh toán trực tiếp</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>

              <div className="space-y-2 py-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Tạm tính</p>
                  <p>{order?.totalAmount}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Phí vận chuyển</p>
                  <p>"Miễn phí"</p>
                </div>

                <div className="flex justify-between text-sm text-gray-600"></div>
                <div className="flex justify-between text-base font-semibold text-gray-900 pt-2 border-t border-gray-200">
                  <p>Tổng cộng</p>
                  <p>{order?.totalAmount}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href="/products"
                  className="block w-full bg-pink-600 text-white py-2 px-4 rounded-md font-medium hover:bg-pink-700 transition text-center"
                >
                  <FaHome className="inline-block mr-2" /> Tiếp tục mua sắm
                </Link>

                <button
                  onClick={() => window.print()}
                  className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50 transition text-center"
                >
                  <FaPrint className="inline-block mr-2" /> In đơn hàng
                </button>

                <Link
                  href={`mailto:?subject=Đơn hàng &body=Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được xác nhận và đang được xử lý.`}
                  className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50 transition text-center"
                >
                  <FaEnvelope className="inline-block mr-2" /> Gửi email xác
                  nhận
                </Link>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Có câu hỏi về đơn hàng?{" "}
                  <Link
                    href="/contact"
                    className="text-pink-600 hover:underline"
                  >
                    Liên hệ hỗ trợ
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
