"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  FaShoppingCart,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaLock,
  FaMoneyBillWave,
  FaCreditCard,
  FaWallet,
  FaUniversity,
  FaTag,
  FaArrowLeft,
  FaCheck,
  FaTimes,
  FaSpinner,
} from "react-icons/fa"
import {
  getCheckoutData,
  applyCoupon,
  calculateOrderSummary,
  submitOrder,
  getProvinces,
  getDistricts,
} from "@/services/checkoutService"
import type {
  CartItem,
  ShippingMethod,
  PaymentMethod,
  Coupon,
  OrderSummary,
  ShippingAddress,
  OrderRequest,
} from "@/types/checkout"

export default function CheckoutPage() {
  const router = useRouter()

  // State for checkout data
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [orderSummary, setOrderSummary] = useState<OrderSummary>({
    subtotal: 0,
    shipping: 0,
    discount: 0,
    tax: 0,
    total: 0,
  })

  // State for form inputs
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    city: "",
    province: "",
    postalCode: "",
    notes: "",
  })

  // State for selected options
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("")
  const [couponCode, setCouponCode] = useState<string>("")
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)

  // State for UI
  const [loading, setLoading] = useState<boolean>(true)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [couponLoading, setCouponLoading] = useState<boolean>(false)
  const [couponError, setCouponError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [provinces, setProvinces] = useState<string[]>([])
  const [districts, setDistricts] = useState<string[]>([])

  // Fetch checkout data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch checkout data and provinces in parallel
        const [checkoutData, provincesData] = await Promise.all([getCheckoutData(), getProvinces()])

        setCartItems(checkoutData.cartItems)
        setShippingMethods(checkoutData.shippingMethods)
        setPaymentMethods(checkoutData.paymentMethods)
        setOrderSummary(checkoutData.orderSummary)
        setProvinces(provincesData)

        // Set default shipping method
        if (checkoutData.shippingMethods.length > 0) {
          setSelectedShippingMethod(checkoutData.shippingMethods[0].id)
        }

        // Set default payment method
        if (checkoutData.paymentMethods.length > 0) {
          setSelectedPaymentMethod(checkoutData.paymentMethods[0].id)
        }
      } catch (error) {
        console.error("Error fetching checkout data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Update districts when province changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (shippingAddress.province) {
        const districtsData = await getDistricts(shippingAddress.province)
        setDistricts(districtsData)

        // Reset district if it's not in the new list
        if (!districtsData.includes(shippingAddress.district)) {
          setShippingAddress((prev) => ({ ...prev, district: "" }))
        }
      } else {
        setDistricts([])
      }
    }

    fetchDistricts()
  }, [shippingAddress.province])

  // Format price to VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  // Handle shipping address input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setShippingAddress((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle shipping method selection
  const handleShippingMethodChange = (methodId: string) => {
    setSelectedShippingMethod(methodId)

    // Update order summary with new shipping cost
    const selectedMethod = shippingMethods.find((method) => method.id === methodId)
    if (selectedMethod) {
      const newSummary = calculateOrderSummary(cartItems, selectedMethod.price, appliedCoupon)
      setOrderSummary(newSummary)
    }
  }

  // Handle payment method selection
  const handlePaymentMethodChange = (methodId: string) => {
    setSelectedPaymentMethod(methodId)
  }

  // Handle coupon application
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Vui lòng nhập mã giảm giá")
      return
    }

    try {
      setCouponLoading(true)
      setCouponError(null)

      const coupon = await applyCoupon(couponCode)

      if (!coupon) {
        setCouponError("Mã giảm giá không hợp lệ hoặc đã hết hạn")
        setAppliedCoupon(null)
        return
      }

      setAppliedCoupon(coupon)

      // Update order summary with applied coupon
      const shippingCost = shippingMethods.find((method) => method.id === selectedShippingMethod)?.price || 0
      const newSummary = calculateOrderSummary(cartItems, shippingCost, coupon)
      setOrderSummary(newSummary)
    } catch (error) {
      setCouponError("Đã xảy ra lỗi khi áp dụng mã giảm giá")
      console.error("Error applying coupon:", error)
    } finally {
      setCouponLoading(false)
    }
  }

  // Handle coupon removal
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
    setCouponError(null)

    // Update order summary without coupon
    const shippingCost = shippingMethods.find((method) => method.id === selectedShippingMethod)?.price || 0
    const newSummary = calculateOrderSummary(cartItems, shippingCost, null)
    setOrderSummary(newSummary)
  }

  // Validate form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    // Required fields
    if (!shippingAddress.fullName.trim()) errors.fullName = "Vui lòng nhập họ tên"
    if (!shippingAddress.phone.trim()) errors.phone = "Vui lòng nhập số điện thoại"
    if (!shippingAddress.email.trim()) errors.email = "Vui lòng nhập email"
    if (!shippingAddress.address.trim()) errors.address = "Vui lòng nhập địa chỉ"
    if (!shippingAddress.province) errors.province = "Vui lòng chọn tỉnh/thành phố"
    if (!shippingAddress.district) errors.district = "Vui lòng chọn quận/huyện"

    // Phone validation
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
    if (shippingAddress.phone && !phoneRegex.test(shippingAddress.phone)) {
      errors.phone = "Số điện thoại không hợp lệ"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (shippingAddress.email && !emailRegex.test(shippingAddress.email)) {
      errors.email = "Email không hợp lệ"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle order submission
  const handleSubmitOrder = async () => {
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(formErrors)[0]
      const errorElement = document.getElementsByName(firstErrorField)[0]
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    try {
      setSubmitting(true)

      const orderRequest: OrderRequest = {
        cartItems,
        shippingAddress,
        shippingMethodId: selectedShippingMethod,
        paymentMethodId: selectedPaymentMethod,
        couponCode: appliedCoupon?.code,
        notes: shippingAddress.notes,
      }

      const response = await submitOrder(orderRequest)

      if (response.status === "success") {
        // Redirect to order confirmation page
        router.push(`/order-confirmation?orderId=${response.orderId}`)
      } else {
        // Handle error
        console.error("Order submission failed:", response.message)
      }
    } catch (error) {
      console.error("Error submitting order:", error)
    } finally {
      setSubmitting(false)
    }
  }

  // Get payment method icon
  const getPaymentIcon = (iconName: string) => {
    switch (iconName) {
      case "cash":
        return <FaMoneyBillWave className="h-5 w-5" />
      case "credit-card":
        return <FaCreditCard className="h-5 w-5" />
      case "wallet":
        return <FaWallet className="h-5 w-5" />
      case "bank":
        return <FaUniversity className="h-5 w-5" />
      default:
        return <FaCreditCard className="h-5 w-5" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* <SystemBanner />
        <Header /> */}
        <div className="container mx-auto px-4 py-12 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
          <span className="ml-3 text-gray-600">Đang tải thông tin thanh toán...</span>
        </div>
        {/* <Footer /> */}
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* <SystemBanner />
        <Header /> */}
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-500 mb-4">
              <FaShoppingCart className="mx-auto h-16 w-16" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-600 mb-6">Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán</p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-pink-600 hover:bg-pink-700"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <SystemBanner />
      <Header /> */}

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>
          <div className="flex items-center mt-2">
            <Link href="/cart" className="text-pink-600 hover:text-pink-700 flex items-center">
              <FaArrowLeft className="mr-2" /> Quay lại giỏ hàng
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Shipping & Payment */}
          <div className="lg:w-2/3 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-pink-600" /> Thông tin giao hàng
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingAddress.fullName}
                      onChange={handleInputChange}
                      className={`pl-10 w-full border ${formErrors.fullName ? "border-red-500" : "border-gray-300"} rounded-md py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500`}
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  {formErrors.fullName && <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleInputChange}
                      className={`pl-10 w-full border ${formErrors.phone ? "border-red-500" : "border-gray-300"} rounded-md py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500`}
                      placeholder="0912345678"
                    />
                  </div>
                  {formErrors.phone && <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>}
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={shippingAddress.email}
                      onChange={handleInputChange}
                      className={`pl-10 w-full border ${formErrors.email ? "border-red-500" : "border-gray-300"} rounded-md py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500`}
                      placeholder="example@email.com"
                    />
                  </div>
                  {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ *</label>
                  <input
                    type="text"
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    className={`w-full border ${formErrors.address ? "border-red-500" : "border-gray-300"} rounded-md py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500`}
                    placeholder="Số nhà, tên đường"
                  />
                  {formErrors.address && <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố *</label>
                  <select
                    name="province"
                    value={shippingAddress.province}
                    onChange={handleInputChange}
                    className={`w-full border ${formErrors.province ? "border-red-500" : "border-gray-300"} rounded-md py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500`}
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {provinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                  {formErrors.province && <p className="mt-1 text-sm text-red-600">{formErrors.province}</p>}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện *</label>
                  <select
                    name="district"
                    value={shippingAddress.district}
                    onChange={handleInputChange}
                    disabled={!shippingAddress.province}
                    className={`w-full border ${formErrors.district ? "border-red-500" : "border-gray-300"} rounded-md py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 ${!shippingAddress.province ? "bg-gray-100" : ""}`}
                  >
                    <option value="">Chọn quận/huyện</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {formErrors.district && <p className="mt-1 text-sm text-red-600">{formErrors.district}</p>}
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
                  <textarea
                    name="notes"
                    value={shippingAddress.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Thông tin bổ sung về đơn hàng, yêu cầu đặc biệt..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Shipping Methods */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Phương thức giao hàng</h2>

              <div className="space-y-3">
                {shippingMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition ${
                      selectedShippingMethod === method.id
                        ? "border-pink-600 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={method.id}
                        checked={selectedShippingMethod === method.id}
                        onChange={() => handleShippingMethodChange(method.id)}
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{method.name}</p>
                        <p className="text-sm text-gray-500">{method.description}</p>
                        <p className="text-xs text-gray-500">Thời gian giao hàng: {method.estimatedDelivery}</p>
                      </div>
                    </div>
                    <span className="font-medium">{method.price === 0 ? "Miễn phí" : formatPrice(method.price)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaLock className="mr-2 text-pink-600" /> Phương thức thanh toán
              </h2>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition ${
                      selectedPaymentMethod === method.id
                        ? "border-pink-600 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={() => handlePaymentMethodChange(method.id)}
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                      />
                      <div className="ml-3 flex items-center">
                        <span className="text-pink-600 mr-2">{getPaymentIcon(method.icon)}</span>
                        <div>
                          <p className="font-medium text-gray-900">{method.name}</p>
                          {method.description && <p className="text-sm text-gray-500">{method.description}</p>}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-3">
                <p className="text-sm text-blue-800">
                  <FaLock className="inline-block mr-1" /> Thông tin thanh toán của bạn được bảo mật an toàn
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>

              {/* Cart Items */}
              <div className="max-h-80 overflow-y-auto mb-4 pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex py-4 border-b border-gray-200">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="line-clamp-2">{item.name}</h3>
                          <p className="ml-4">
                            {item.discountPrice
                              ? formatPrice(item.discountPrice * item.quantity)
                              : formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                        {item.size && <p className="mt-1 text-sm text-gray-500">Kích thước: {item.size}</p>}
                        {item.flavor && <p className="mt-1 text-sm text-gray-500">Hương vị: {item.flavor}</p>}
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">SL: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mã giảm giá</label>
                <div className="flex">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaTag className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      disabled={!!appliedCoupon}
                      className={`pl-10 w-full border ${couponError ? "border-red-500" : "border-gray-300"} rounded-l-md py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 ${appliedCoupon ? "bg-gray-100" : ""}`}
                      placeholder="Nhập mã giảm giá"
                    />
                  </div>
                  {appliedCoupon ? (
                    <button
                      onClick={handleRemoveCoupon}
                      className="bg-gray-200 text-gray-700 px-4 rounded-r-md hover:bg-gray-300 transition"
                    >
                      <FaTimes />
                    </button>
                  ) : (
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponLoading}
                      className="bg-pink-600 text-white px-4 rounded-r-md hover:bg-pink-700 transition disabled:bg-pink-400"
                    >
                      {couponLoading ? <FaSpinner className="animate-spin" /> : "Áp dụng"}
                    </button>
                  )}
                </div>
                {couponError && <p className="mt-1 text-sm text-red-600">{couponError}</p>}
                {appliedCoupon && (
                  <div className="mt-2 text-sm text-green-600 flex items-center">
                    <FaCheck className="mr-1" />
                    {appliedCoupon.description}
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="space-y-2 py-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Tạm tính</p>
                  <p>{formatPrice(orderSummary.subtotal)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Phí vận chuyển</p>
                  <p>{orderSummary.shipping === 0 ? "Miễn phí" : formatPrice(orderSummary.shipping)}</p>
                </div>
                {orderSummary.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <p>Giảm giá</p>
                    <p>-{formatPrice(orderSummary.discount)}</p>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Thuế (8%)</p>
                  <p>{formatPrice(orderSummary.tax)}</p>
                </div>
                <div className="flex justify-between text-base font-semibold text-gray-900 pt-2 border-t border-gray-200">
                  <p>Tổng cộng</p>
                  <p>{formatPrice(orderSummary.total)}</p>
                </div>
              </div>

              {/* Submit Order Button */}
              <button
                onClick={handleSubmitOrder}
                disabled={submitting}
                className="mt-6 w-full bg-pink-600 text-white py-3 px-4 rounded-md font-medium hover:bg-pink-700 transition disabled:bg-pink-400 flex items-center justify-center"
              >
                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Đang xử lý...
                  </>
                ) : (
                  "Đặt hàng"
                )}
              </button>

              <p className="mt-4 text-xs text-gray-500 text-center">
                Bằng cách nhấn "Đặt hàng", bạn đồng ý với{" "}
                <Link href="/terms" className="text-pink-600 hover:underline">
                  Điều khoản dịch vụ
                </Link>{" "}
                và{" "}
                <Link href="/privacy" className="text-pink-600 hover:underline">
                  Chính sách bảo mật
                </Link>{" "}
                của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  )
}
