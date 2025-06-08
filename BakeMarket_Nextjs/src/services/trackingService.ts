import type { TrackingInfo, TrackingRequest, OrderStatus, TrackingEvent } from "@/types/tracking"

// Get tracking information by order ID or tracking number
export const getTrackingInfo = async (request: TrackingRequest): Promise<TrackingInfo | null> => {
  try {
    // For now, return mock data. Later you can replace with real API call

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock order statuses
    const orderStatuses: Record<string, OrderStatus> = {
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

    // Mock tracking data based on request
    const mockTrackingData: TrackingInfo = {
      orderId: request.orderId || "ORD-123456",
      trackingNumber: "VN" + Math.floor(100000000 + Math.random() * 900000000).toString(),
      status: orderStatuses.shipping,
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      shippingMethod: "Giao hàng tiêu chuẩn",
      carrier: "Giao hàng nhanh",
      recipientName: "Nguyễn Văn A",
      shippingAddress: {
        fullName: "Nguyễn Văn A",
        address: "123 Đường Lê Lợi, Phường Bến Nghé",
        district: "Quận 1",
        city: "TP. Hồ Chí Minh",
        phone: "0912345678",
      },
      trackingHistory: [
        {
          id: "1",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          status: "Đã xác nhận",
          location: "Sweet Dreams Bakery",
          description: "Đơn hàng đã được xác nhận và đang chuẩn bị",
          isCompleted: true,
        },
        {
          id: "2",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          status: "Đang chuẩn bị",
          location: "Sweet Dreams Bakery",
          description: "Đang chuẩn bị bánh theo yêu cầu của bạn",
          isCompleted: true,
        },
        {
          id: "3",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          status: "Đã hoàn thành",
          location: "Sweet Dreams Bakery",
          description: "Bánh đã được hoàn thành và đóng gói",
          isCompleted: true,
        },
        {
          id: "4",
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
          status: "Đang giao hàng",
          location: "Trung tâm phân phối Quận 1",
          description: "Đơn hàng đã được giao cho đơn vị vận chuyển",
          isCompleted: true,
        },
        {
          id: "5",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          status: "Đang giao hàng",
          location: "Đang trên đường giao",
          description: "Shipper đang trên đường giao hàng đến địa chỉ của bạn",
          isCompleted: true,
        },
        {
          id: "6",
          timestamp: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
          status: "Giao hàng thành công",
          location: "123 Đường Lê Lợi, Quận 1",
          description: "Đơn hàng sẽ được giao đến địa chỉ của bạn",
          isCompleted: false,
        },
      ],
      orderItems: [
        {
          id: "item-1",
          name: "Bánh Cưới Sang Trọng",
          image: "/placeholder.svg?height=400&width=400",
          quantity: 1,
          price: 6500000,
        },
        {
          id: "item-2",
          name: "Tháp Cupcake",
          image: "/placeholder.svg?height=400&width=400",
          quantity: 2,
          price: 1900000,
        },
      ],
    }

    // Simulate different scenarios based on input
    if (request.orderId === "ORD-404" || request.trackingNumber === "VN404") {
      return null // Order not found
    }

    return mockTrackingData

    // When ready to use real API, uncomment this:
    /*
    const response = await fetchInterceptor(`${API_URL}/api/tracking`, {
      method: "POST",
      body: JSON.stringify(request),
      skipAuth: true, // Set to false if authentication is required
    })
    return await response.json()
    */
  } catch (error) {
    console.error("Error fetching tracking info:", error)
    throw error
  }
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
