import type { TrackingInfo, TrackingRequest, OrderStatus, TrackingEvent } from "@/types/tracking"

// Determine API base URL based on environment
const isDevelopment = process.env.NODE_ENV === "development"
const API_BASE_URL = isDevelopment ? "http://localhost:5000/api" : "http://api.zanis.id.vn/api"

// Get tracking information by phone number
export const getTrackingInfo = async (request: TrackingRequest): Promise<TrackingInfo | null> => {
  try {
    // Validate phone number is provided
    if (!request.phone) {
      throw new Error("Phone number is required")
    }

    console.log("Using API URL:", API_BASE_URL)
    console.log("Calling API:", `${API_BASE_URL}/Orders/by-phone/${encodeURIComponent(request.phone)}`)

    // Call the real API endpoint with better error handling
    const response = await fetch(`${API_BASE_URL}/Orders/by-phone/${encodeURIComponent(request.phone)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // Add credentials if needed for cookies/auth
      credentials: "include",
      // Add cache control
      cache: "no-cache",
    })

    console.log("Response status:", response.status)

    // Handle 404 - order not found
    if (response.status === 404) {
      console.log("Order not found (404)")
      return null
    }

    // Handle other error responses
    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error Response:", errorText)
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    // Parse the response
    const orderData = await response.json()
    console.log("Order data received:", orderData)

    // If no orders found or empty array
    if (!orderData || (Array.isArray(orderData) && orderData.length === 0)) {
      console.log("No orders found in response")
      return null
    }

    // Take the first order if multiple orders are returned
    const order = Array.isArray(orderData) ? orderData[0] : orderData
    console.log("Processing order:", order)

    // Map the API response to TrackingInfo interface
    const trackingInfo: TrackingInfo = mapOrderToTrackingInfo(order)

    return trackingInfo
  } catch (error) {
    console.error("Error fetching tracking info:", error)

    // Provide more specific error messages for common errors
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      if (isDevelopment) {
        throw new Error(
          "Không thể kết nối đến server",
        )
      } else {
        throw new Error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng hoặc liên hệ hỗ trợ.")
      }
    }

    throw error
  }
}

// Update the mapOrderToTrackingInfo function to properly handle your OrderDTO structure
const mapOrderToTrackingInfo = (order: any): TrackingInfo => {
  console.log("Mapping order to tracking info:", order)

  // Map your OrderStatus enum to display statuses
  const orderStatuses: Record<string, OrderStatus> = {
    0: {
      // Pending
      code: "pending",
      name: "Chờ xác nhận",
      description: "Đơn hàng đang chờ được xác nhận",
      color: "yellow",
    },
    1: {
      // Confirmed
      code: "confirmed",
      name: "Đã xác nhận",
      description: "Đơn hàng đã được xác nhận và đang chuẩn bị",
      color: "blue",
    },
    2: {
      // Preparing
      code: "preparing",
      name: "Đang chuẩn bị",
      description: "Đang chuẩn bị sản phẩm",
      color: "orange",
    },
    3: {
      // Ready
      code: "ready",
      name: "Sẵn sàng giao hàng",
      description: "Đơn hàng đã sẵn sàng để giao",
      color: "blue",
    },
    4: {
      // Shipping
      code: "shipping",
      name: "Đang giao hàng",
      description: "Đơn hàng đang được giao đến bạn",
      color: "purple",
    },
    5: {
      // Delivered
      code: "delivered",
      name: "Đã giao hàng",
      description: "Đơn hàng đã được giao thành công",
      color: "green",
    },
    6: {
      // Cancelled
      code: "cancelled",
      name: "Đã hủy",
      description: "Đơn hàng đã bị hủy",
      color: "red",
    },
  }

  // Get the status based on the enum value
  const currentStatus = orderStatuses[order.status] || orderStatuses[0]

  // Handle potential string format of ID
  const orderId = typeof order.id === "string" ? order.id : String(order.id)

  // Create tracking number from ID
  const trackingNumber = `BM${orderId.substring(0, 8).toUpperCase()}`

  return {
    orderId: orderId,
    trackingNumber: trackingNumber,
    status: currentStatus,
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from order date
    actualDelivery: order.status === 5 ? new Date() : undefined, // If delivered
    shippingMethod: "Giao hàng tiêu chuẩn",
    carrier: order.driver ? `${order.driver.firstName} ${order.driver.lastName}` : "Đang phân công",
    recipientName: order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : "Khách hàng",
    shippingAddress: {
      fullName: order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : "Khách hàng",
      address: order.deliveryAddress || "",
      district: "", // Extract from deliveryAddress if needed
      city: "", // Extract from deliveryAddress if needed
      phone: order.contactPhone || "",
    },
    trackingHistory: generateTrackingHistory(order),
    orderItems: mapOrderItems(order.items || []),
  }
}

// Generate tracking history based on order status and date
const generateTrackingHistory = (order: any): TrackingEvent[] => {
  const orderDate = new Date(order.orderDate)
  const events: TrackingEvent[] = []

  // Always add order placed event
  events.push({
    id: "1",
    timestamp: orderDate,
    status: "Đặt hàng thành công",
    location: order.bakery?.name || "Tiệm bánh",
    description: "Đơn hàng đã được đặt thành công",
    isCompleted: true,
  })

  // Add events based on current status
  if (order.status >= 1) {
    // Confirmed
    events.push({
      id: "2",
      timestamp: new Date(orderDate.getTime() + 30 * 60 * 1000), // 30 minutes after order
      status: "Đã xác nhận",
      location: order.bakery?.name || "Tiệm bánh",
      description: "Đơn hàng đã được xác nhận và đang chuẩn bị",
      isCompleted: true,
    })
  }

  if (order.status >= 2) {
    // Preparing
    events.push({
      id: "3",
      timestamp: new Date(orderDate.getTime() + 60 * 60 * 1000), // 1 hour after order
      status: "Đang chuẩn bị",
      location: order.bakery?.name || "Tiệm bánh",
      description: "Đang chuẩn bị bánh theo yêu cầu của bạn",
      isCompleted: true,
    })
  }

  if (order.status >= 3) {
    // Ready
    events.push({
      id: "4",
      timestamp: new Date(orderDate.getTime() + 2 * 60 * 60 * 1000), // 2 hours after order
      status: "Sẵn sàng giao hàng",
      location: order.bakery?.name || "Tiệm bánh",
      description: "Bánh đã được hoàn thành và sẵn sàng giao hàng",
      isCompleted: true,
    })
  }

  if (order.status >= 4) {
    // Shipping
    events.push({
      id: "5",
      timestamp: new Date(orderDate.getTime() + 3 * 60 * 60 * 1000), // 3 hours after order
      status: "Đang giao hàng",
      location: "Đang trên đường giao",
      description: order.driver
        ? `${order.driver.firstName} ${order.driver.lastName} đang giao hàng đến bạn`
        : "Đang giao hàng đến địa chỉ của bạn",
      isCompleted: true,
    })
  }

  if (order.status >= 5) {
    // Delivered
    events.push({
      id: "6",
      timestamp: new Date(orderDate.getTime() + 4 * 60 * 60 * 1000), // 4 hours after order
      status: "Giao hàng thành công",
      location: order.deliveryAddress || "Địa chỉ giao hàng",
      description: "Đơn hàng đã được giao thành công",
      isCompleted: true,
    })
  }

  if (order.status === 6) {
    // Cancelled
    events.push({
      id: "cancelled",
      timestamp: new Date(), // Current time
      status: "Đã hủy đơn hàng",
      location: order.bakery?.name || "Tiệm bánh",
      description: "Đơn hàng đã bị hủy",
      isCompleted: true,
    })
  }

  return events.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
}

// Update the mapOrderItems function to handle OrderItemDTO
const mapOrderItems = (items: any[]) => {
  if (!Array.isArray(items)) {
    return []
  }

  return items.map((item) => ({
    id: item.id || item.productId,
    name: item.product?.name || item.productName || "Sản phẩm",
    image: item.product?.imageUrl || "/placeholder.svg?height=400&width=400",
    quantity: item.quantity || 1,
    price: item.subtotal || item.unitPrice || 0,
  }))
}

// Get order status by code
export const getOrderStatus = (statusCode: string): OrderStatus => {
  const statuses: Record<string, OrderStatus> = {
    pending: {
      code: "pending",
      name: "Chờ xác nhận",
      description: "Đơn hàng đang chờ được xác nhận",
      color: "yellow",
    },
    confirmed: {
      code: "confirmed",
      name: "Đã xác nhận",
      description: "Đơn hàng đã được xác nhận và đang chuẩn bị",
      color: "blue",
    },
    preparing: {
      code: "preparing",
      name: "Đang chuẩn bị",
      description: "Đang chuẩn bị sản phẩm",
      color: "orange",
    },
    shipping: {
      code: "shipping",
      name: "Đang giao hàng",
      description: "Đơn hàng đang được giao đến bạn",
      color: "purple",
    },
    delivered: {
      code: "delivered",
      name: "Đã giao hàng",
      description: "Đơn hàng đã được giao thành công",
      color: "green",
    },
    cancelled: {
      code: "cancelled",
      name: "Đã hủy",
      description: "Đơn hàng đã bị hủy",
      color: "red",
    },
  }

  return statuses[statusCode] || statuses.pending
}

// Format tracking events for timeline display
export const formatTrackingEvents = (events: TrackingEvent[]): TrackingEvent[] => {
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}
