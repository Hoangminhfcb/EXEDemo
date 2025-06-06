"use client";

import { useState, useEffect } from "react";
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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BakeryDashboard({ params }: PageProps) {
  const bakeryId = (await params).id;

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

    const mockRecentOrders = [
      {
        id: "ORD-001",
        customerName: "Nguyễn Văn A",
        productName: "Bánh Sinh Nhật Hoa Tươi",
        amount: 299000,
        status: "pending",
        date: "2024-01-15",
      },
      {
        id: "ORD-002",
        customerName: "Trần Thị B",
        productName: "Bánh Cưới Sang Trọng",
        amount: 999000,
        status: "completed",
        date: "2024-01-14",
      },
      {
        id: "ORD-003",
        customerName: "Lê Văn C",
        productName: "Cupcake Bơ Vani",
        amount: 120000,
        status: "processing",
        date: "2024-01-14",
      },
    ];

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
    setRecentOrders(mockRecentOrders);
    setChartData(mockChartData);
  }, [bakeryId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "processing":
        return "Đang làm";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
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
                    Ngày
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
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPrice(order.amount)}
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
                      {new Date(order.date).toLocaleDateString("vi-VN")}
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
