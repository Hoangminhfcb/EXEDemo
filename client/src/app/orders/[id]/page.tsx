"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
  FaRedo,
  FaDownload,
  FaPrint,
  FaCheck,
  FaClock,
  FaTruck,
  FaBox,
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

interface OrderStatus {
  status: string
  label: string
  date: string
  description: string
  completed: boolean
}

interface Order {
  id: string
  orderNumber: string
  date: string
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
  bakery: {
    id: string
    name: string
    address: string
    phone: string
    email: string
  }
  customer: {
    name: string
    phone: string
    email: string
  }
  deliveryAddress: string
  deliveryDate: string
  deliveryTime: string
  paymentMethod: string
  paymentStatus: string
  notes?: string
  rating?: number
  review?: string
  statusHistory: OrderStatus[]
  canReorder: boolean
  canReview: boolean
  canCancel: boolean
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
    // @ts-expect-error: Suppress TS error for use(params)
  const unwrappedParams = use(params)
  // @ts-expect-error: Suppress TS error for use(params)
  const orderId = unwrappedParams.id

  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockOrder: Order = {
      id: orderId,
      orderNumber: "ORD-2024-001",
      date: "2024-01-15T10:30:00Z",
      status: "delivered",
      items: [
        {
          id: "item-1",
          productId: "1",
          name: "Bánh Sinh Nhật Hoa Tươi",
          image: "/images/cake1.jpg",
          price: 350000,
          discountPrice: 299000,
          quantity: 1,
          size: "15cm (4-6 người)",
          flavor: "Vani",
          customization: "Chữ 'Chúc mừng sinh nhật'",
        },
        {
          id: "item-2",
          productId: "3",
          name: "Cupcake Bơ Vani",
          image: "/images/cake3.jpg",
          price: 150000,
          discountPrice: 120000,
          quantity: 2,
        },
      ],
      subtotal: 539000,
      deliveryFee: 0,
      discount: 50000,
      total: 489000,
      bakery: {
        id: "1",
        name: "Sweet Dreams Bakery",
        address: "47/45 Nguyễn Tư Giản, Gò Vấp, TP.HCM",
        phone: "028 3123 4567",
        email: "contact@sweetdreams.vn",
      },
      customer: {
        name: "Nguyễn Văn A",
        phone: "0901234567",
        email: "nguyenvana@email.com",
      },
      deliveryAddress: "123 Nguyễn Văn Cừ, Q.5, TP.HCM",
      deliveryDate: "2024-01-16",
      deliveryTime: "14:00 - 16:00",
      paymentMethod: "Thanh toán khi nhận hàng",
      paymentStatus: "Đã thanh toán",
      rating: 5,
      review: "Bánh rất ngon và đẹp! Sẽ đặt lại lần sau.",
      statusHistory: [
        {
          status: "pending",
          label: "Đặt hàng",
          date: "2024-01-15T10:30:00Z",
          description: "Đơn hàng đã được đặt thành công",
          completed: true,
        },
        {
          status: "confirmed",
          label: "Xác nhận",
          date: "2024-01-15T11:00:00Z",
          description: "Tiệm bánh đã xác nhận đơn hàng",
          completed: true,
        },
        {
          status: "preparing",
          label: "Chuẩn bị",
          date: "2024-01-16T08:00:00Z",
          description: "Đang chuẩn bị bánh theo yêu cầu",
          completed: true,
        },
        {
          status: "ready",
          label: "Sẵn sàng",
          date: "2024-01-16T13:30:00Z",
          description: "Bánh đã hoàn thành, sẵn sàng giao hàng",
          completed: true,
        },
        {
          status: "delivered",
          label: "Đã giao",
          date: "2024-01-16T15:15:00Z",
          description: "Đơn hàng đã được giao thành công",
          completed: true,
        },
      ],
      canReorder: true,
      canReview: false,
      canCancel: false,
    }

    setTimeout(() => {
      setOrder(mockOrder)
      setIsLoading(false)
    }, 1000)
  }, [orderId])

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <FaClock className="w-5 h-5" />
      case "confirmed":
        return <FaCheck className="w-5 h-5" />
      case "preparing":
        return <FaBox className="w-5 h-5" />
      case "ready":
        return <FaCheck className="w-5 h-5" />
      case "delivered":
        return <FaTruck className="w-5 h-5" />
      default:
        return <FaClock className="w-5 h-5" />
    }
  }

  const handleReorder = () => {
    // In real app, add items to cart
    console.log("Reordering:", order)
    alert("Đã thêm sản phẩm vào giỏ hàng!")
  }

  const handlePrint = () => {
    window.print()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Đang tải chi tiết đơn hàng...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy đơn hàng</h2>
          <p className="text-gray-600 mb-4">Đơn hàng này không tồn tại hoặc đã bị xóa.</p>
          <Link
            href="/orders"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700"
          >
            <FaArrowLeft className="mr-2" />
            Quay lại danh sách đơn hàng
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/orders" className="text-pink-600 hover:text-pink-700 mr-4">
                <FaArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Chi tiết đơn hàng #{order.orderNumber}</h1>
                <p className="text-gray-600">Đặt lúc {formatDate(order.date)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrint}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center"
              >
                <FaPrint className="mr-2" />
                In
              </button>
              <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition flex items-center">
                <FaDownload className="mr-2" />
                Tải hóa đơn
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Trạng thái đơn hàng</h2>
              <div className="relative">
                {order.statusHistory.map((statusItem, index) => (
                  <div key={index} className="flex items-start mb-6 last:mb-0">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        statusItem.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {getStatusIcon(statusItem.status)}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${statusItem.completed ? "text-gray-900" : "text-gray-500"}`}>
                          {statusItem.label}
                        </h3>
                        <span className="text-sm text-gray-500">{formatDate(statusItem.date)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{statusItem.description}</p>
                    </div>
                    {index < order.statusHistory.length - 1 && (
                      <div className="absolute left-5 mt-10 w-0.5 h-6 bg-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Sản phẩm đã đặt</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                    <Link href={`/productDetail/${item.productId}`} className="flex-shrink-0">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
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
                          <div className="font-semibold text-pink-600">
                            {formatPrice(item.discountPrice * item.quantity)}
                          </div>
                          <div className="text-sm text-gray-500 line-through">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </>
                      ) : (
                        <div className="font-semibold text-pink-600">{formatPrice(item.price * item.quantity)}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Section */}
            {order.rating && order.review && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Đánh giá của bạn</h2>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`w-5 h-5 ${star <= order.rating! ? "text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium text-gray-700">{order.rating}/5</span>
                  </div>
                  <p className="text-gray-700">{order.review}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">Tóm tắt đơn hàng</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá:</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí giao hàng:</span>
                  <span>{order.deliveryFee === 0 ? "Miễn phí" : formatPrice(order.deliveryFee)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                  <span>Tổng cộng:</span>
                  <span className="text-pink-600">{formatPrice(order.total)}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trạng thái:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thanh toán:</span>
                    <span className="text-green-600 font-medium">{order.paymentStatus}</span>
                  </div>
                </div>
              </div>

              {order.canReorder && (
                <button
                  onClick={handleReorder}
                  className="w-full mt-4 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition flex items-center justify-center"
                >
                  <FaRedo className="mr-2" />
                  Đặt lại đơn hàng
                </button>
              )}
            </div>

            {/* Bakery Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">Thông tin tiệm bánh</h3>
              <div className="space-y-3">
                <div>
                  <Link href={`/bakery/${order.bakery.id}`} className="font-medium text-pink-600 hover:text-pink-700">
                    {order.bakery.name}
                  </Link>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="mr-2 mt-1 flex-shrink-0" />
                    <span>{order.bakery.address}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="mr-2 flex-shrink-0" />
                    <a href={`tel:${order.bakery.phone}`} className="hover:text-pink-600">
                      {order.bakery.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">Thông tin giao hàng</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-700 mb-1">Địa chỉ:</div>
                  <div className="text-gray-600">{order.deliveryAddress}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700 mb-1">Thời gian:</div>
                  <div className="text-gray-600">
                    {new Date(order.deliveryDate).toLocaleDateString("vi-VN")} - {order.deliveryTime}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-700 mb-1">Phương thức thanh toán:</div>
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

            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">Thông tin khách hàng</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Tên:</span>
                  <span className="ml-2 text-gray-600">{order.customer.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Điện thoại:</span>
                  <span className="ml-2 text-gray-600">{order.customer.phone}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="ml-2 text-gray-600">{order.customer.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
