"use client";
import { API_URL } from "@/utils/BaseUrl";
import React, { use, useEffect, useState } from "react";

export default function CheckoutPage(p: { params: Promise<{ id: string }> }) {
  const { id } = use(p.params);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`${API_URL}/api/Cakes/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not Found");
        return res.json();
      })
      .then(setProduct)
      .catch(() => setProduct(null));
    window.scrollTo(0, 0);
  }, [id]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return; // Nếu có lỗi thì không gửi form
    }

    alert("Đơn hàng đã được đặt thành công!");
    // TODO: Gửi dữ liệu đến server
  };

  const total = product ? product.price * quantity : 0;

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
          {product ? (
            <>
              {product.thumbnailUrl && (
                <img
                  src={`${API_URL}/api/images/file/${product.thumbnailUrl}`}
                  alt={product.name}
                  className="w-40 h-40 object-cover rounded mb-4"
                />
              )}
              <div className="flex justify-between items-center mb-2">
                <span>{product.name}</span>
                <span>{product.price.toLocaleString()}₫</span>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Số lượng:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-20 border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Tổng cộng</span>
                <span>{total.toLocaleString()}₫</span>
              </div>
            </>
          ) : (
            <p>Đang tải thông tin sản phẩm...</p>
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
