"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  FaShoppingBag,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
  FaEye,
  FaRedo,
  FaDownload,
} from "react-icons/fa"

interface OrderItem {
  id: string
  productId: string
  name: string
  image: string
  price: number
  discountPrice?: number
  quantity: number
  size?: string
  flavor?: string
  customization?: string
}

interface Order {
  id: string
  orderNumber: string
  date: string
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  total: number
  bakery: {
    id: string
    name: string
    address: string
    phone: string
  }
  deliveryAddress: string
  deliveryDate: string
  deliveryTime: string
  paymentMethod: string
  notes?: string
  rating?: number
  review?: string
  canReorder: boolean
  canReview: boolean
  canCancel: boolean
}

export default function OrdersPage() {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

  // Mock data
  const mockOrders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      date: "2024-01-15T10:30:00Z",
      status: "delivered",
      items: [
        {
          id: "item-1",
          productId: "1",
          name: "Bánh Sinh Nhật Hoa Tươi",
          image: "/placeholder.svg?height=64&width=64",
          price: 350000,
          discountPrice: 299000,
          quantity: 1,
          size: "15cm (4-6 người)",
          flavor: "Vani",
          customization: "Chữ 'Chúc mừng sinh nhật'",
        },
      ],
      subtotal: 299000,
      deliveryFee: 0,
      total: 299000,
      bakery: {
        id: "1",
        name: "Sweet Dreams Bakery",
        address: "47/45 Nguyễn Tư Giản, Gò Vấp",
        phone: "028 3123 4567",
      },
      deliveryAddress: "123 Nguyễn Văn Cừ, Q.5, TP.HCM",
      deliveryDate: "2024-01-16",
      deliveryTime: "14:00 - 16:00",
      paymentMethod: "Thanh toán khi nhận hàng",
      rating: 5,
      review: "Bánh rất ngon và đẹp! Sẽ đặt lại lần sau.",
      canReorder: true,
      canReview: false,
      canCancel: false,
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      date: "2024-01-20T14:15:00Z",
      status: "preparing",
      items: [
        {
          id: "item-2",
          productId: "2",
          name: "Bánh Cưới Sang Trọng",
          image: "/placeholder.svg?height=64&width=64",
          price: 1200000,
          discountPrice: 999000,
          quantity: 1,
          customization: "Thiết kế theo yêu cầu riêng",
        },
        {
          id: "item-3",
          productId: "3",
          name: "Cupcake Bơ Vani",
          image: "/placeholder.svg?height=64&width=64",
          price: 150000,
          discountPrice: 120000,
          quantity: 2,
        },
      ],
      subtotal: 1239000,
      deliveryFee: 0,
      total: 1239000,
      bakery: {
        id: "2",
        name: "Golden Cake House",
        address: "dânng",
        phone: "00000000000",
      },
      deliveryAddress: "qn",
      deliveryDate: "2024-01-25",
      deliveryTime: "09:00 - 11:00",
      paymentMethod: "ck",
      notes: "note",
      canReorder: true,
      canReview: false,
      canCancel: true,
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      date: "2024-01-10T09:45:00Z",
      status: "cancelled",
      items: [
        {
          id: "item-4",
          productId: "5",
          name: "Cookies",
          image: "/placeholder.svg?height=64&width=64",
          price: 120000,
          quantity: 3,
        },
      ],
      subtotal: 360000,
      deliveryFee: 30000,
      total: 390000,
      bakery: {
        id: "1",
        name: "Sweet Dreams Bakery",
        address: "dn",
        phone: "1111111111111",
      },
      deliveryAddress: "qn",
      deliveryDate: "2024-01-12",
      deliveryTime: "16:00 - 18:00",
      paymentMethod: "tt khi nhan",
      canReorder: true,
      canReview: false,
      canCancel: false,
    },
    {
      id: "4",
      orderNumber: "ORD-2024-004",
      date: "2024-01-08T16:20:00Z",
      status: "delivered",
      items: [
        {
          id: "item-5",
          productId: "4",
          name: "Bánh Kem Tạo Hình Nhân Vật",
          image: "/placeholder.svg?height=64&width=64",
          price: 450000,
          discountPrice: 399000,
          quantity: 1,
          size: "18cm (8-12 người)",
          flavor: "Socola",
          customization: "Hình nhân vật Doraemon",
        },
      ],
      subtotal: 399000,
      deliveryFee: 0,
      total: 399000,
      bakery: {
        id: "3",
        name: "Delicious Moments",
        address: "19 Võ Văn Ngân, P. Linh Chiểu, TP. Thủ Đức",
        phone: "028 3456 7890",
      },
      deliveryAddress: "321 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM",
      deliveryDate: "2024-01-09",
      deliveryTime: "10:00 - 12:00",
      paymentMethod: "Ví điện tử MoMo",
      canReorder: true,
      canReview: true,
      canCancel: false,
    },
  ]

  // Sort orders by date
  const sortedOrders = [...mockOrders].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "preparing":
        return "bg-purple-100 text-purple-800"
      case "ready":
        return "bg-green-100 text-green-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận"
      case "confirmed":
        return "Đã xác nhận"
      case "preparing":
        return "Đang chuẩn bị"
      case "ready":
        return "Sẵn sàng giao"
      case "delivered":
        return "Đã giao"
      case "cancelled":
        return "Đã hủy"
      default:
        return status
    }
  }

  const handleReorder = (order: Order) => {
    console.log("Reordering:", order)
    alert("Đã thêm sản phẩm vào giỏ hàng!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <FaShoppingBag className="mr-3 text-pink-600" />
                Đơn hàng của tôi
              </h1>
              <p className="text-gray-600 mt-1">Quản lý và theo dõi các đơn hàng của bạn</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {sortedOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-500 mb-4">
              <FaShoppingBag className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Chưa có đơn hàng nào</h3>
            <p className="mt-2 text-gray-500">Hãy đặt bánh ngon đầu tiên của bạn!</p>
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Khám phá sản phẩm
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Order Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">Đơn hàng #{order.orderNumber}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <FaCalendarAlt className="mr-1" />
                          {formatDate(order.date)}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <div className="mt-3 sm:mt-0 text-right">
                      <div className="text-lg font-semibold text-pink-600">{formatPrice(order.total)}</div>
                      <div className="text-sm text-gray-600">{order.items.length} sản phẩm</div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-start space-x-4">
                        <Link href={`/productDetail/${item.productId}`} className="flex-shrink-0">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
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
                            href={`/productDetail/${item.productId}`}
                            className="font-medium text-gray-900 hover:text-pink-600 transition"
                          >
                            {item.name}
                          </Link>
                          <div className="text-sm text-gray-500 mt-1 space-y-1">
                            {item.size && <div>Kích thước: {item.size}</div>}
                            {item.flavor && <div>Hương vị: {item.flavor}</div>}
                            {item.customization && <div>Tùy chỉnh: {item.customization}</div>}
                            <div>Số lượng: {item.quantity}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          {item.discountPrice ? (
                            <>
                              <div className="font-semibold text-pink-600">{formatPrice(item.discountPrice)}</div>
                              <div className="text-sm text-gray-500 line-through">{formatPrice(item.price)}</div>
                            </>
                          ) : (
                            <div className="font-semibold text-pink-600">{formatPrice(item.price)}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bakery Info */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div>
                          <Link
                            href={`/bakery/${order.bakery.id}`}
                            className="font-medium text-gray-900 hover:text-pink-600 transition"
                          >
                            {order.bakery.name}
                          </Link>
                          <div className="text-sm text-gray-600 flex items-center mt-1">
                            <FaMapMarkerAlt className="mr-1" />
                            {order.bakery.address}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center">
                          <FaPhone className="mr-1" />
                          {order.bakery.phone}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-700 mb-1">Địa chỉ giao hàng:</div>
                        <div className="text-gray-600">{order.deliveryAddress}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700 mb-1">Thời gian giao:</div>
                        <div className="text-gray-600">
                          {new Date(order.deliveryDate).toLocaleDateString("vi-VN")} - {order.deliveryTime}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700 mb-1">Thanh toán:</div>
                        <div className="text-gray-600">{order.paymentMethod}</div>
                      </div>
                      {order.notes && (
                        <div>
                          <div className="font-medium text-gray-700 mb-1">Ghi chú:</div>
                          <div className="text-gray-600">{order.notes}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Review Section */}
                  {order.rating && order.review && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <div className="flex items-center mb-2">
                          <span className="font-medium text-gray-700 mr-2">Đánh giá của bạn:</span>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={`w-4 h-4 ${star <= order.rating! ? "text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{order.review}</p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/orders/${order.id}`}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center text-sm"
                      >
                        <FaEye className="mr-2" />
                        Xem chi tiết
                      </Link>

                      {order.canReorder && (
                        <button
                          onClick={() => handleReorder(order)}
                          className="bg-pink-100 text-pink-700 px-4 py-2 rounded-lg hover:bg-pink-200 transition flex items-center text-sm"
                        >
                          <FaRedo className="mr-2" />
                          Đặt lại
                        </button>
                      )}

                      {order.canReview && (
                        <Link
                          href={`/orders/${order.id}/review`}
                          className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200 transition flex items-center text-sm"
                        >
                          <FaStar className="mr-2" />
                          Đánh giá
                        </Link>
                      )}

                      <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition flex items-center text-sm">
                        <FaDownload className="mr-2" />
                        Tải hóa đơn
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
