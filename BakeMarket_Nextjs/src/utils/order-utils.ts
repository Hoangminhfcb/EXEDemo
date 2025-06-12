import type { CartItem } from "@/utils/cartStorage"

/**
 * Transform cart items for API submission
 */
export const transformCartItemsForAPI = (cartItems: CartItem[]) => {
  return cartItems.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    unitPrice: item.discountPrice || item.price,
    subtotal: (item.discountPrice || item.price) * item.quantity,
    size: item.size,
    flavor: item.flavor,
    customization: item.customization,
  }))
}

/**
 * Format customer address for delivery
 */
export const formatDeliveryAddress = (customerInfo: {
  address: string
  district?: string
  city?: string
}): string => {
  return [customerInfo.address, customerInfo.district, customerInfo.city].filter(Boolean).join(", ")
}

/**
 * Group cart items by bakery
 */
export const groupCartItemsByBakery = (cartItems: CartItem[]) => {
  return cartItems.reduce(
    (groups, item) => {
      if (!groups[item.bakeryId]) {
        groups[item.bakeryId] = {
          bakeryId: item.bakeryId,
          bakeryName: item.bakeryName,
          items: [],
        }
      }
      groups[item.bakeryId].items.push(item)
      return groups
    },
    {} as Record<string, { bakeryId: string; bakeryName: string; items: CartItem[] }>,
  )
}

/**
 * Calculate totals for a group of items
 */
export const calculateGroupTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => {
    const price = item.discountPrice || item.price
    return sum + price * item.quantity
  }, 0)

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    subtotal,
    itemCount,
    shippingFee: subtotal >= 5000000 ? 0 : 200000,
    total: subtotal + (subtotal >= 5000000 ? 0 : 200000),
  }
}

/**
 * Format price to Vietnamese currency
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price)
}

/**
 * Format date to Vietnamese format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

/**
 * Format time to Vietnamese format
 */
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}
