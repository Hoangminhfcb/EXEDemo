import { Bakery } from "./bakery";
import { Product } from "./product";
import { OwnerProfile } from "./profile";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  size?: string;
  flavor?: string;
  customization?: string;
  bakeryId: string;
  bakeryName: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Coupon {
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
  description: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  notes?: string;
}

export interface CheckoutData {
  cartItems: CartItem[];
  shippingMethods: ShippingMethod[];
  paymentMethods: PaymentMethod[];
  orderSummary: OrderSummary;
}

export interface OrderRequest {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  shippingMethodId: string;
  paymentMethodId: string;
  couponCode?: string;
  notes?: string;
}

export interface OrderResponse {
  orderId: string;
  status: string;
  message: string;
  redirectUrl?: string;
}

export type OrderItem = {
  id: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  cakeId: string;
  cake: Product;
};

export type Order = {
  id: string;
  orderDate: string;
  status: number;
  deliveryAddress: string;
  contactPhone: string;
  customerId: string;
  customer: OwnerProfile;
  bakeryId: string;
  bakery: Bakery;
  driverId: string | null;
  driver: any | null; // Nếu có thông tin driver cụ thể, tạo type riêng
  items: OrderItem[];
  totalAmount: number;
};
