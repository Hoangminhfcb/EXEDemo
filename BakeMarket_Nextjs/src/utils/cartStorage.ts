/**
 * Cart Storage Utility
 * Simple localStorage operations for cart items
 */

import { generateGuid } from "./guid-utils"

export interface CartItem {
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
  bakeryName: string
  bakeryId: string
}

const CART_STORAGE_KEY = "bakemarket_cart"

/**
 * Get cart items from localStorage
 */
export const getCart = (): CartItem[] => {
  try {
    if (typeof window === "undefined") return []

    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) ? parsed : []
    }
    return []
  } catch (error) {
    console.error("Error getting cart from localStorage:", error)
    return []
  }
}

/**
 * Save cart items to localStorage
 */
export const saveCart = (items: CartItem[]): void => {
  try {
    if (typeof window === "undefined") return

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error("Error saving cart to localStorage:", error)
  }
}

/**
 * Clear cart from localStorage
 */
export const clearCart = (): void => {
  try {
    if (typeof window === "undefined") return

    localStorage.removeItem(CART_STORAGE_KEY)
  } catch (error) {
    console.error("Error clearing cart from localStorage:", error)
  }
}

/**
 * Add item to cart
 * Helper function that gets current cart, adds item, and saves
 */
export const addToCart = (
  product: any,
  quantity = 1,
  options: { size?: string; flavor?: string; customization?: string } = {},
): boolean => {
  try {
    if (typeof window === "undefined") return false

    const cartItems = getCart()

    // Create cart item
    const cartItem: CartItem = {
      id: generateGuid(), // Use proper GUID for cart item ID
      productId: product.id,
      name: product.name,
      image: product.images?.[0] || product.image || "/placeholder.svg",
      price: product.price,
      discountPrice: product.discountPrice,
      quantity,
      size: options.size,
      flavor: options.flavor,
      customization: options.customization,
      bakeryName: product.bakeryName || "Tiệm bánh",
      bakeryId: product.bakeryId || "1",
    }

    // Check if item already exists with same options
    const existingItemIndex = cartItems.findIndex(
      (item) => item.productId === cartItem.productId && item.size === cartItem.size && item.flavor === cartItem.flavor,
    )

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cartItems[existingItemIndex].quantity += quantity
    } else {
      // Add new item
      cartItems.push(cartItem)
    }

    // Save to localStorage
    saveCart(cartItems)
    return true
  } catch (error) {
    console.error("Error adding to cart:", error)
    return false
  }
}

/**
 * Remove item from cart
 */
export const removeCartItem = (itemId: string): boolean => {
  try {
    if (typeof window === "undefined") return false

    const cartItems = getCart()
    const updatedItems = cartItems.filter((item) => item.id !== itemId)
    saveCart(updatedItems)
    return true
  } catch (error) {
    console.error("Error removing cart item:", error)
    return false
  }
}

/**
 * Update item quantity in cart
 */
export const updateCartItemQuantity = (itemId: string, quantity: number): boolean => {
  try {
    if (typeof window === "undefined") return false

    const cartItems = getCart()
    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item,
    )
    saveCart(updatedItems)
    return true
  } catch (error) {
    console.error("Error updating cart item:", error)
    return false
  }
}

/**
 * Get cart summary (totals, counts, etc)
 */
export const getCartSummary = () => {
  const items = getCart()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => {
    const price = item.discountPrice || item.price
    return sum + price * item.quantity
  }, 0)

  // Free shipping for orders over 5,000,000 VND
  const deliveryFee = subtotal >= 5000000 ? 0 : 200000

  return {
    items,
    totalItems,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
  }
}

/**
 * Get cart total (sum of price * quantity)
 */
export const getCartTotal = (): number => {
  const cart = getCart()
  return cart.reduce((total, item) => {
    const price = item.discountPrice || item.price
    return total + price * (item.quantity || 1)
  }, 0)
}
