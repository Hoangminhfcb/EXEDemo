import type { CartItem } from "@/utils/cartStorage"

export interface OrderData {
  id: string
  date: Date
  status: string
  paymentMethod: string
  shippingMethod: string
  estimatedDelivery: Date
  items: CartItem[]
  shippingAddress: {
    fullName: string
    phone: string
    email: string
    address: string
    district: string
    city: string
  }
  subtotal: number
  shipping: number
  discount: number
  tax: number
  total: number
}

export const createOrder = async (
  cartItems: CartItem[],
  shippingInfo: any,
  paymentMethod: string,
): Promise<OrderData> => {
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discountPrice || item.price
    return sum + price * item.quantity
  }, 0)

  const shipping = subtotal >= 5000000 ? 0 : 200000 // Free shipping over 5M VND
  const tax = Math.round(subtotal * 0.08) // 8% tax
  const total = subtotal + shipping + tax

  // Generate order ID
  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

  const orderData: OrderData = {
    id: orderId,
    date: new Date(),
    status: "Đã xác nhận",
    paymentMethod,
    shippingMethod: "Giao hàng tiêu chuẩn",
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days later
    items: cartItems,
    shippingAddress: shippingInfo,
    subtotal,
    shipping,
    discount: 0,
    tax,
    total,
  }

  // Save order to localStorage (in real app, this would be an API call)
  const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
  existingOrders.push(orderData)
  localStorage.setItem("orders", JSON.stringify(existingOrders))

  return orderData
}

export const getOrderById = (orderId: string): OrderData | null => {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]")
  return orders.find((order: OrderData) => order.id === orderId) || null
}
