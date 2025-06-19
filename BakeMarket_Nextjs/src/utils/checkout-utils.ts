import type { CartItem } from "@/utils/cartStorage";

/**
 * Calculate order totals from cart items
 */
export const calculateOrderTotals = (cartItems: CartItem[]) => {
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discountPrice || item.price;
    return sum + price * item.quantity;
  }, 0);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shippingFee = subtotal >= 500000 ? 0 : 50000;

  return {
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
    itemCount,
  };
};

/**
 * Group cart items by bakery
 */
export const groupCartItemsByBakery = (cartItems: CartItem[]) => {
  return cartItems.reduce((groups, item) => {
    const bakeryId = item.bakeryId;
    if (!groups[bakeryId]) {
      groups[bakeryId] = {
        bakeryName: item.bakeryName,
        bakeryId: item.bakeryId,
        items: [],
      };
    }
    groups[bakeryId].items.push(item);
    return groups;
  }, {} as Record<string, { bakeryName: string; bakeryId: string; items: CartItem[] }>);
};

/**
 * Format price to Vietnamese currency
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

/**
 * Validate customer information
 */
export const validateCustomerInfo = (customerInfo: {
  fullName: string;
  phone: string;
  address: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!customerInfo.fullName.trim()) {
    errors.push("Vui lòng nhập họ tên");
  }

  if (!customerInfo.phone.trim()) {
    errors.push("Vui lòng nhập số điện thoại");
  } else {
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(customerInfo.phone)) {
      errors.push("Số điện thoại không hợp lệ");
    }
  }

  if (!customerInfo.address.trim()) {
    errors.push("Vui lòng nhập địa chỉ");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
