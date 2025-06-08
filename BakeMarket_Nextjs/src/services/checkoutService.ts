import type {
  CartItem,
  ShippingMethod,
  PaymentMethod,
  Coupon,
  OrderSummary,
  CheckoutData,
  OrderRequest,
  OrderResponse,
} from "@/types/checkout"

// Get checkout data (cart items, shipping methods, payment methods)
export const getCheckoutData = async (): Promise<CheckoutData> => {
  try {
    // For now, return mock data. Later you can replace with real API call
    const mockCartItems: CartItem[] = [
      {
        id: "cart-1",
        productId: "banh-cuoi-co-dien",
        name: "Bánh Cưới Sang Trọng",
        image: "/placeholder.svg?height=400&width=400",
        price: 7200000,
        discountPrice: 6500000,
        quantity: 1,
        size: "3 Tầng",
        flavor: "Vanilla",
        bakeryId: "1",
        bakeryName: "Sweet Dreams Bakery",
      },
      {
        id: "cart-2",
        productId: "thap-cupcake",
        name: "Tháp Cupcake",
        image: "/placeholder.svg?height=400&width=400",
        price: 1900000,
        quantity: 2,
        bakeryId: "1",
        bakeryName: "Sweet Dreams Bakery",
      },
    ]

    const mockShippingMethods: ShippingMethod[] = [
      {
        id: "standard",
        name: "Giao hàng tiêu chuẩn",
        description: "Giao hàng trong 2-3 ngày",
        price: 30000,
        estimatedDelivery: "2-3 ngày",
      },
      {
        id: "express",
        name: "Giao hàng nhanh",
        description: "Giao hàng trong 24 giờ",
        price: 60000,
        estimatedDelivery: "24 giờ",
      },
      {
        id: "free",
        name: "Giao hàng miễn phí",
        description: "Cho đơn hàng trên 5.000.000₫",
        price: 0,
        estimatedDelivery: "3-5 ngày",
      },
    ]

    const mockPaymentMethods: PaymentMethod[] = [
      {
        id: "cod",
        name: "Thanh toán khi nhận hàng (COD)",
        icon: "cash",
        description: "Thanh toán bằng tiền mặt khi nhận hàng",
      },
      {
        id: "bank-transfer",
        name: "Chuyển khoản ngân hàng",
        icon: "bank",
        description: "Chuyển khoản trước khi giao hàng",
      },
      {
        id: "momo",
        name: "Ví MoMo",
        icon: "wallet",
        description: "Thanh toán qua ví điện tử MoMo",
      },
      {
        id: "zalopay",
        name: "ZaloPay",
        icon: "wallet",
        description: "Thanh toán qua ví điện tử ZaloPay",
      },
      {
        id: "credit-card",
        name: "Thẻ tín dụng / Ghi nợ",
        icon: "credit-card",
        description: "Thanh toán an toàn qua cổng thanh toán",
      },
    ]

    // Calculate order summary based on cart items
    const subtotal = mockCartItems.reduce((total, item) => {
      const itemPrice = item.discountPrice || item.price
      return total + itemPrice * item.quantity
    }, 0)

    // Apply free shipping if subtotal is over 5,000,000₫
    const shippingCost = subtotal >= 5000000 ? 0 : 30000

    const mockOrderSummary: OrderSummary = {
      subtotal: subtotal,
      shipping: shippingCost,
      discount: 0,
      tax: Math.round(subtotal * 0.08), // 8% tax
      total: subtotal + shippingCost + Math.round(subtotal * 0.08),
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      cartItems: mockCartItems,
      shippingMethods: mockShippingMethods,
      paymentMethods: mockPaymentMethods,
      orderSummary: mockOrderSummary,
    }

    // When ready to use real API, uncomment this:
    /*
    const response = await fetchInterceptor(`${API_URL}/api/checkout`, {
      method: "GET",
      skipAuth: false, // Set to true if authentication is not required
    })
    return await response.json()
    */
  } catch (error) {
    console.error("Error fetching checkout data:", error)
    throw error
  }
}

// Apply coupon code
export const applyCoupon = async (code: string): Promise<Coupon | null> => {
  try {
    // Mock coupon validation
    const validCoupons: Record<string, Coupon> = {
      SWEET20: {
        code: "SWEET20",
        discount: 20,
        discountType: "percentage",
        description: "Giảm 20% cho đơn hàng đầu tiên",
      },
      FREESHIP: {
        code: "FREESHIP",
        discount: 30000,
        discountType: "fixed",
        description: "Miễn phí giao hàng",
      },
      CAKE100K: {
        code: "CAKE100K",
        discount: 100000,
        discountType: "fixed",
        description: "Giảm 100.000₫ cho đơn hàng từ 1.000.000₫",
      },
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const coupon = validCoupons[code.toUpperCase()]
    if (!coupon) {
      return null
    }

    return coupon

    // When ready to use real API, uncomment this:
    /*
    const response = await fetchInterceptor(`${API_URL}/api/coupons/validate`, {
      method: "POST",
      body: JSON.stringify({ code }),
      skipAuth: false,
    })
    return await response.json()
    */
  } catch (error) {
    console.error("Error validating coupon:", error)
    throw error
  }
}

// Calculate order summary with applied coupon
export const calculateOrderSummary = (
  cartItems: CartItem[],
  shippingCost: number,
  coupon: Coupon | null,
): OrderSummary => {
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.discountPrice || item.price
    return total + itemPrice * item.quantity
  }, 0)

  let discount = 0
  if (coupon) {
    if (coupon.discountType === "percentage") {
      discount = Math.round(subtotal * (coupon.discount / 100))
    } else {
      discount = coupon.discount
    }
  }

  const tax = Math.round((subtotal - discount) * 0.08) // 8% tax
  const total = subtotal + shippingCost - discount + tax

  return {
    subtotal,
    shipping: shippingCost,
    discount,
    tax,
    total,
  }
}

// Submit order
export const submitOrder = async (orderData: OrderRequest): Promise<OrderResponse> => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful order response
    const mockResponse: OrderResponse = {
      orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000).toString(),
      status: "success",
      message: "Đơn hàng đã được đặt thành công!",
      redirectUrl: "/order-confirmation",
    }

    return mockResponse

    // When ready to use real API, uncomment this:
    /*
    const response = await fetchInterceptor(`${API_URL}/api/orders`, {
      method: "POST",
      body: JSON.stringify(orderData),
      skipAuth: false,
    })
    return await response.json()
    */
  } catch (error) {
    console.error("Error submitting order:", error)
    throw error
  }
}

// Get provinces/cities
export const getProvinces = async (): Promise<string[]> => {
  // Mock provinces data
  const provinces = [
    "Hà Nội",
    "TP. Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
  ]

  return provinces
}

// Get districts for a province
export const getDistricts = async (province: string): Promise<string[]> => {
  // Mock districts data - simplified for demo
  const districtsByProvince: Record<string, string[]> = {
    "TP. Hồ Chí Minh": [
      "Quận 1",
      "Quận 2",
      "Quận 3",
      "Quận 4",
      "Quận 5",
      "Quận 6",
      "Quận 7",
      "Quận 8",
      "Quận 9",
      "Quận 10",
      "Quận 11",
      "Quận 12",
      "Quận Bình Tân",
      "Quận Bình Thạnh",
      "Quận Gò Vấp",
      "Quận Phú Nhuận",
      "Quận Tân Bình",
      "Quận Tân Phú",
      "Quận Thủ Đức",
      "Huyện Bình Chánh",
      "Huyện Cần Giờ",
      "Huyện Củ Chi",
      "Huyện Hóc Môn",
      "Huyện Nhà Bè",
    ],
    "Hà Nội": [
      "Quận Ba Đình",
      "Quận Hoàn Kiếm",
      "Quận Tây Hồ",
      "Quận Long Biên",
      "Quận Cầu Giấy",
      "Quận Đống Đa",
      "Quận Hai Bà Trưng",
      "Quận Hoàng Mai",
      "Quận Thanh Xuân",
      "Quận Hà Đông",
      "Quận Nam Từ Liêm",
      "Quận Bắc Từ Liêm",
    ],
    // Add more provinces as needed
  }

  // Return districts for the selected province or an empty array
  return districtsByProvince[province] || []
}
