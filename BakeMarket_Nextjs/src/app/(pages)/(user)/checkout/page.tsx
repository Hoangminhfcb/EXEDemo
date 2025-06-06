"use client";
import { useCart } from "@/context/CartContext";
import { API_URL } from "@/utils/BaseUrl";
import { randomEmail } from "@/utils/random";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

export default function CheckoutsPage() {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { cartItems, clearCartItems } = useCart(); // Lấy danh sách sản phẩm trong giỏ
  const route = useRouter();

  const total = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Xóa lỗi khi người dùng sửa input
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!shippingInfo.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
    }

    if (!shippingInfo.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }

    if (!shippingInfo.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^\d{9,15}$/.test(shippingInfo.phone.trim())) {
      // Ví dụ kiểm tra số điện thoại chỉ chứa số và có độ dài hợp lệ
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      // 1. Kiểm tra user theo phone
      let user: any;

      const findUser = async () => {
        const res = await fetch(
          `${API_URL}/api/users/by-phone/${shippingInfo.phone}`
        );
        if (!res.ok) throw new Error("Không thể tìm thấy người dùng.");
        return await res.json();
      };

      const findUserResponse = await fetch(
        `${API_URL}/api/users/by-phone/${shippingInfo.phone}`
      );

      if (findUserResponse.ok) {
        user = await findUserResponse.json(); // Đã có user
      } else if (findUserResponse.status === 404) {
        // 2. Nếu không có thì tạo user mới
        const createUserResponse = await fetch(`${API_URL}/api/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: shippingInfo.name,
            lastName: shippingInfo.name,
            email: randomEmail(shippingInfo.name),
            phoneNumber: shippingInfo.phone,
            password: "Password@123", // Mật khẩu mặc định, có thể thay đổi sau
          }),
        });

        if (!createUserResponse.ok) {
          throw new Error("Không thể tạo người dùng mới.");
        }

        // Sau khi tạo, tiếp tục tìm lại user để lấy đúng dữ liệu
        user = await findUser();
      } else {
        throw new Error("Lỗi khi kiểm tra người dùng.");
      }

      // 3. Gửi request tạo order cho mỗi bakery
      const groupedOrders = cartItems.reduce((acc: any, item: any) => {
        const bakeryId = item.bakery.id;
        if (!acc[bakeryId]) {
          acc[bakeryId] = {
            bakery: item.bakery,
            items: [],
          };
        }
        acc[bakeryId].items.push(item);
        return acc;
      }, {});

      const orderPromises = Object.entries(groupedOrders).map(
        async ([bakeryId, group]: any) => {
          const orderResponse = await fetch(`${API_URL}/api/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customerId: user.id,
              deliveryAddress: shippingInfo.address,
              contactPhone: shippingInfo.phone,
              BakeryId: bakeryId,
              items: group.items.map((item: any) => ({
                cakeId: item.id,
                quantity: item.quantity,
                unitPrice: item.price,
              })),
            }),
          });

          if (!orderResponse.ok) {
            throw new Error(
              `Không thể đặt hàng từ tiệm bánh ${group.bakery.name}`
            );
          }

          return orderResponse.json();
        }
      );

      await Promise.all(orderPromises);

      // 4. Xóa giỏ hàng sau khi đặt hàng thành công
      clearCartItems();
      route.push("/"); // Chuyển hướng về trang chủ hoặc trang khác
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
        Thanh toán
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        noValidate
      >
        {/* Thông tin giao hàng */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={shippingInfo.name}
                onChange={handleChange}
                className={`w-full border rounded px-4 py-2 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="address"
                placeholder="Địa chỉ"
                value={shippingInfo.address}
                onChange={handleChange}
                className={`w-full border rounded px-4 py-2 ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="text-red-600 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại"
                value={shippingInfo.phone}
                onChange={handleChange}
                className={`w-full border rounded px-4 py-2 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Đơn hàng */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Đơn hàng của bạn</h2>
          {cartItems.length > 0 ? (
            <>
              {Object.entries(
                cartItems.reduce((acc: any, item: any) => {
                  const bakeryId = item.bakery.id;
                  if (!acc[bakeryId]) {
                    acc[bakeryId] = {
                      bakery: item.bakery,
                      items: [],
                      total: 0,
                    };
                  }
                  acc[bakeryId].items.push(item);
                  acc[bakeryId].total += item.price * item.quantity;
                  return acc;
                }, {})
              ).map(([bakeryId, group]: any) => (
                <div
                  key={bakeryId}
                  className="mb-8 border p-4 rounded-md bg-gray-50"
                >
                  <h3 className="text-lg font-bold mb-4 text-purple-700">
                    {group.bakery.name}
                  </h3>

                  {group.items.map((item: any, index: number) => (
                    <div key={index} className="mb-4 border-b pb-2">
                      <div className="flex justify-between items-center">
                        <span>{item.name}</span>
                        <span>{item.price.toLocaleString()}₫</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Số lượng: {item.quantity}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-700">
                          Tổng: {(item.price * item.quantity).toLocaleString()}₫
                        </p>
                      )}
                    </div>
                  ))}

                  <div className="flex justify-between font-semibold text-md mt-2">
                    <span>Tổng cho {group.bakery.name}</span>
                    <span>{group.total.toLocaleString()}₫</span>
                  </div>
                </div>
              ))}

              <hr className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Tổng cộng</span>
                <span>{total.toLocaleString()}₫</span>
              </div>
            </>
          ) : (
            <p className="text-gray-600">Giỏ hàng của bạn đang trống.</p>
          )}
          <button
            type="submit"
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded transition"
          >
            Xác nhận thanh toán
          </button>
        </div>
      </form>
    </div>
  );
}
