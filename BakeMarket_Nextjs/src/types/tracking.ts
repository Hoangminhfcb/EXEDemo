export interface TrackingInfo {
  orderId: string
  trackingNumber: string
  status: OrderStatus
  estimatedDelivery: Date
  actualDelivery?: Date
  shippingMethod: string
  carrier: string
  recipientName: string
  shippingAddress: ShippingAddress
  trackingHistory: TrackingEvent[]
  orderItems: OrderItem[]
}

export interface TrackingEvent {
  id: string
  timestamp: Date
  status: string
  location: string
  description: string
  isCompleted: boolean
}

export interface OrderStatus {
  code: string
  name: string
  description: string
  color: string
}

export interface ShippingAddress {
  fullName: string
  address: string
  district: string
  city: string
  phone: string
}

export interface OrderItem {
  id: string
  name: string
  image: string
  quantity: number
  price: number
}

export interface TrackingRequest {
  phone?: string
}
