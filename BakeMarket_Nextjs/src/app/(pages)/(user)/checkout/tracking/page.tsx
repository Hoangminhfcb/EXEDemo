"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import {
  FaSearch,
  FaShippingFast,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaSpinner,
  FaBox,
  FaTruck,
  FaHome,
  FaClipboard,
} from "react-icons/fa"

import { getTrackingInfo } from "@/services/trackingService"
import type { TrackingInfo, TrackingRequest } from "@/types/tracking"

export default function TrackingPage() {
  // State for form inputs
  const [phone, setPhone] = useState<string>("")

  // State for tracking results
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState<boolean>(false)

  // Format date and time
  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Format date only
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  // Get status color class
  const getStatusColor = (color: string) => {
    const colors: Record<string, string> = {
      yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      orange: "bg-orange-100 text-orange-800 border-orange-200",
      purple: "bg-purple-100 text-purple-800 border-purple-200",
      green: "bg-green-100 text-green-800 border-green-200",
      red: "bg-red-100 text-red-800 border-red-200",
    }
    return colors[color] || colors.blue
  }

  // Get status icon
  const getStatusIcon = (statusCode: string) => {
    switch (statusCode) {
      case "pending":
        return <FaClock className="h-5 w-5" />
      case "confirmed":
        return <FaCheckCircle className="h-5 w-5" />
      case "preparing":
        return <FaBox className="h-5 w-5" />
      case "shipping":
        return <FaTruck className="h-5 w-5" />
      case "delivered":
        return <FaHome className="h-5 w-5" />
      case "cancelled":
        return <FaTimesCircle className="h-5 w-5" />
      default:
        return <FaClipboard className="h-5 w-5" />
    }
  }

  // Handle form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setTrackingInfo(null)
    setSearched(true)

    // Validate phone input
    if (!phone.trim()) {
      setError("Vui lòng nhập số điện thoại")
      return
    }

    try {
      setLoading(true)

      const request: TrackingRequest = {
        phone: phone.trim(),
      }

      const result = await getTrackingInfo(request)

      if (!result) {
        setError("Không tìm thấy thông tin đơn hàng. Vui lòng kiểm tra lại số điện thoại.")
        return
      }

      setTrackingInfo(result)
    } catch (err) {
      console.error("Error tracking order:", err)
      if (err instanceof Error) {
        setError(`Đã xảy ra lỗi: ${err.message}`)
      } else {
        setError("Đã xảy ra lỗi khi tra cứu đơn hàng. Vui lòng thử lại sau.")
      }
    } finally {
      setLoading(false)
    }
  }

  // Reset form
  const handleReset = () => {
    setPhone("")
    setTrackingInfo(null)
    setError(null)
    setSearched(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Tra cứu đơn hàng</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Nhập số điện thoại để theo dõi tình trạng giao hàng của bạn</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  placeholder="0912345678"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Nhập số điện thoại để tra cứu đơn hàng</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center">
                <FaExclamationCircle className="text-red-500 mr-2 flex-shrink-0" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-md font-medium hover:bg-pink-700 transition disabled:bg-pink-400 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Đang tra cứu...
                  </>
                ) : (
                  <>
                    <FaSearch className="mr-2" />
                    Tra cứu
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                Làm mới
              </button>
            </div>
          </form>
        </div>

        {/* Tracking Results */}
        {trackingInfo && (
          <div className="space-y-6">
            {/* Order Status Overview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Đơn hàng #{trackingInfo.orderId}</h2>
                  <p className="text-gray-600">Mã vận đơn: {trackingInfo.trackingNumber}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-full border ${getStatusColor(trackingInfo.status.color)}`}
                  >
                    {getStatusIcon(trackingInfo.status.code)}
                    <span className="ml-2 font-medium">{trackingInfo.status.name}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <FaShippingFast className="text-pink-600 mr-3 h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Phương thức giao hàng</p>
                    <p className="font-medium">{trackingInfo.shippingMethod}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaTruck className="text-pink-600 mr-3 h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Đơn vị vận chuyển</p>
                    <p className="font-medium">{trackingInfo.carrier}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaClock className="text-pink-600 mr-3 h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Dự kiến giao hàng</p>
                    <p className="font-medium">{formatDate(trackingInfo.estimatedDelivery)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tracking Timeline */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Lịch sử vận chuyển</h3>

                <div className="space-y-4">
                  {trackingInfo.trackingHistory.map((event, index) => (
                    <div key={event.id} className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            event.isCompleted ? "bg-green-500 border-green-500" : "bg-white border-gray-300"
                          }`}
                        />
                        {index < trackingInfo.trackingHistory.length - 1 && (
                          <div className={`w-0.5 h-16 ${event.isCompleted ? "bg-green-500" : "bg-gray-300"}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className={`font-medium ${event.isCompleted ? "text-gray-900" : "text-gray-500"}`}>
                              {event.status}
                            </p>
                            <p className={`text-sm ${event.isCompleted ? "text-gray-600" : "text-gray-400"}`}>
                              {event.description}
                            </p>
                            <p className={`text-sm ${event.isCompleted ? "text-gray-500" : "text-gray-400"}`}>
                              <FaMapMarkerAlt className="inline-block mr-1" />
                              {event.location}
                            </p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <p className={`text-sm ${event.isCompleted ? "text-gray-500" : "text-gray-400"}`}>
                              {formatDateTime(event.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-6">
                {/* Shipping Address */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-pink-600" />
                    Địa chỉ giao hàng
                  </h3>
                  <div className="space-y-2">
                    <p className="font-medium">{trackingInfo.shippingAddress.fullName}</p>
                    <p className="text-gray-600">{trackingInfo.shippingAddress.address}</p>
                    <p className="text-gray-600">
                      {trackingInfo.shippingAddress.district}, {trackingInfo.shippingAddress.city}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <FaPhone className="mr-1" />
                      {trackingInfo.shippingAddress.phone}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FaBox className="mr-2 text-pink-600" />
                    Sản phẩm đặt hàng
                  </h3>
                  <div className="space-y-4">
                    {trackingInfo.orderItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                          <p className="text-sm text-gray-500">SL: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">{formatPrice(item.price)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {searched && !trackingInfo && !loading && !error && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-500 mb-4">
              <FaExclamationCircle className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy đơn hàng</h3>
            <p className="text-gray-600 mb-6">Vui lòng kiểm tra lại số điện thoại và thử lại.</p>
            <button
              onClick={handleReset}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4">Cần hỗ trợ?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <FaPhone className="mx-auto h-8 w-8 text-pink-600 mb-2" />
              <p className="font-medium">Hotline</p>
              <p className="text-gray-600">114</p>
            </div>
            <div className="text-center">
              <FaMapMarkerAlt className="mx-auto h-8 w-8 text-pink-600 mb-2" />
              <p className="font-medium">Địa chỉ</p>
              <p className="text-gray-600">123 Đường ABC, Quận 100, TP.HoiAn</p>
            </div>
            <div className="text-center">
              <FaClock className="mx-auto h-8 w-8 text-pink-600 mb-2" />
              <p className="font-medium">Giờ làm việc</p>
              <p className="text-gray-600">8:00 - 22:00 hàng ngày</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
