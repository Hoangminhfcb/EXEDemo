"use client";

import { API_URL } from "@/utils/BaseUrl";
import React, { useState } from "react";

// Define interfaces for the data structure
interface Cake {
  id: string;
  name: string;
}

interface Item {
  id: string;
  cake: Cake;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface Bakery {
  name: string;
  address: string;
}

interface Order {
  id: string;
  orderDate: string;
  status: number;
  deliveryAddress: string;
  bakery: Bakery;
  items: Item[];
  totalAmount: number;
}

export default function OrderByPhone() {
  const [phone, setPhone] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>([]); // Explicitly type orders as Order[]
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    if (!phone) {
      alert("Vui lòng nhập số điện thoại");
      return;
    }
    setLoading(true);
    setError(null);
    setOrders([]);
    try {
      const res = await fetch(`${API_URL}/api/orders/by-phone/${phone}`);
      if (!res.ok) throw new Error("Không thể lấy dữ liệu");
      const data: Order[] = await res.json(); // Type the response data
      setOrders(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "20px auto",
        padding: 20,
        fontFamily: "Arial",
      }}
    >
      <h2>Xem đơn hàng theo số điện thoại</h2>
      <input
        type="text"
        placeholder="Nhập số điện thoại"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ padding: 8, fontSize: 16, width: "300px" }}
      />
      <button
        onClick={fetchOrders}
        style={{ marginLeft: 10, padding: "8px 16px", fontSize: 16 }}
      >
        Xem đơn hàng
      </button>

      {loading && <p>Đang tải đơn hàng...</p>}
      {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}

      {orders.length === 0 && !loading && <p>Không có đơn hàng nào.</p>}

      {orders.length > 0 && (
        <div style={{ marginTop: 20 }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ccc",
                padding: 15,
                marginBottom: 15,
                borderRadius: 5,
              }}
            >
              <h3>Đơn hàng ID: {order.id}</h3>
              <p>
                <b>Ngày đặt:</b> {new Date(order.orderDate).toLocaleString()}
              </p>
              <p>
                <b>Trạng thái:</b>{" "}
                {order.status === 0 ? "Chưa xử lý" : "Đã xử lý"}
              </p>
              <p>
                <b>Địa chỉ giao hàng:</b> {order.deliveryAddress}
              </p>
              <p>
                <b>Tiệm bánh:</b> {order.bakery.name} - {order.bakery.address}
              </p>
              <p>
                <b>Danh sách sản phẩm:</b>
              </p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.cake.name} - Số lượng: {item.quantity} - Đơn giá:{" "}
                    {item.unitPrice.toLocaleString()}đ - Thành tiền:{" "}
                    {item.subtotal.toLocaleString()}đ
                  </li>
                ))}
              </ul>
              <p>
                <b>Tổng tiền:</b> {order.totalAmount.toLocaleString()}đ
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
