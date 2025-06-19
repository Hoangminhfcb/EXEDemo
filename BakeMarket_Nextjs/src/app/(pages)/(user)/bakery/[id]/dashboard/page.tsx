"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaChartLine,
  FaShoppingCart,
  FaStar,
  FaEye,
  FaEdit,
  FaPlus,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { API_URL } from "@/utils/BaseUrl";
import { getOrderByBakeryId } from "@/services/checkoutService";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BakeryDashboard({ params }: PageProps) {
  const bakeryId = use(params).id;

  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockStats = {
      totalRevenue: 45000000,
      totalOrders: 1250,
      averageRating: 4.8,
      totalViews: 15420,
      monthlyGrowth: 12.5,
      newCustomers: 89,
      repeatCustomers: 156,
      pendingOrders: 8,
    };

    // Mock fetchOrder function to get orders by bakeryId
    const fetchOrder = async (bakeryId: string) => {
      const res = await getOrderByBakeryId(bakeryId);
      setRecentOrders(res.orderDTO);
    };

    fetchOrder(bakeryId);

    const mockChartData = [
      { name: "T1", orders: 65, revenue: 3200000 },
      { name: "T2", orders: 78, revenue: 3800000 },
      { name: "T3", orders: 90, revenue: 4200000 },
      { name: "T4", orders: 81, revenue: 3900000 },
      { name: "T5", orders: 95, revenue: 4500000 },
      { name: "T6", orders: 102, revenue: 4800000 },
      { name: "T7", orders: 88, revenue: 4100000 },
    ];

    setStats(mockStats);

    setChartData(mockChartData);
  }, [bakeryId]);

  const handleUpdateStatus = async (orderId: string, newStatus: number) => {
    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStatus), // Ví dụ: cập nhật status từ 0 → 1
      });

      if (!res.ok) {
        throw new Error("Failed to update order status");
      }

      // Cập nhật lại giao diện nếu cần (ví dụ gọi lại API để load danh sách)
      const resOrders = await getOrderByBakeryId(bakeryId);
      setRecentOrders(resOrders.orderDTO);
    } catch (err) {
      console.error("Lỗi cập nhật đơn hàng:", err);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0: // Pending
        return "bg-yellow-100 text-yellow-800";
      case 1: // Confirmed
        return "bg-indigo-100 text-indigo-800";
      case 2: // InProgress
        return "bg-blue-100 text-blue-800";
      case 3: // Ready
        return "bg-green-100 text-green-800";
      case 4: // OutForDelivery
        return "bg-orange-100 text-orange-800";
      case 5: // Delivered
        return "bg-emerald-100 text-emerald-800";
      case 6: // Cancelled
        return "bg-gray-100 text-gray-800";
      case 7: // Refunded
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return "Chờ xác nhận";
      case 1:
        return "Đã xác nhận";
      case 2:
        return "Đang làm";
      case 3:
        return "Sẵn sàng";
      case 4:
        return "Đang giao";
      case 5:
        return "Đã giao";
      case 6:
        return "Đã hủy";
      case 7:
        return "Đã hoàn tiền";
      default:
        return "Không xác định";
    }
  };

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link
              href={`/bakery/${bakeryId}`}
              className="text-pink-600 hover:text-pink-700 mr-4"
            >
              <FaArrowLeft />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard - Sweet Dreams Bakery
            </h1>
          </div>
          <div className="flex space-x-3">
            <Link
              href={`/bakery/${bakeryId}/products/add`}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition flex items-center"
            >
              <FaPlus className="mr-2" /> Thêm sản phẩm
            </Link>
            <Link
              href={`/bakery/${bakeryId}/edit`}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition flex items-center"
            >
              <FaEdit className="mr-2" /> Chỉnh sửa
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Doanh thu tháng
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(stats.totalRevenue)}
                </p>
                <p className="text-sm text-green-600">
                  +{stats.monthlyGrowth}% so với tháng trước
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaChartLine className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Tổng đơn hàng
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalOrders}
                </p>
                <p className="text-sm text-gray-600">
                  {stats.pendingOrders} đơn chờ xử lý
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaShoppingCart className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Đánh giá trung bình
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.averageRating}
                </p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.floor(stats.averageRating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FaStar className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Lượt xem trang
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalViews.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Khách mới: {stats.newCustomers}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaEye className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Doanh thu 7 ngày qua</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    formatPrice(Number(value)),
                    "Doanh thu",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ec4899"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Orders Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">
              Số đơn hàng 7 ngày qua
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [value, "Đơn hàng"]} />
                <Bar dataKey="orders" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Đơn hàng gần đây</h3>
            <Link
              href={`/bakery/${bakeryId}/orders`}
              className="text-pink-600 hover:text-pink-700 text-sm font-medium"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã đơn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customer.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.items[0].cake.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPrice(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.status === 0 && (
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                          onClick={() => handleUpdateStatus(order.id, 1)} // Confirmed
                        >
                          Xác nhận đơn
                        </button>
                      )}

                      {order.status === 1 && (
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                          onClick={() => handleUpdateStatus(order.id, 2)} // InProgress
                        >
                          Bắt đầu làm
                        </button>
                      )}

                      {order.status === 2 && (
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                          onClick={() => handleUpdateStatus(order.id, 3)} // Ready
                        >
                          Hoàn tất đơn
                        </button>
                      )}

                      {order.status === 3 && (
                        <button
                          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
                          onClick={() => handleUpdateStatus(order.id, 4)} // OutForDelivery
                        >
                          Giao hàng
                        </button>
                      )}

                      {order.status === 4 && (
                        <button
                          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded"
                          onClick={() => handleUpdateStatus(order.id, 5)} // Delivered
                        >
                          Đã giao
                        </button>
                      )}

                      {order.status < 5 && (
                        <button
                          className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          onClick={() => handleUpdateStatus(order.id, 6)} // Cancelled
                        >
                          Hủy đơn
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
