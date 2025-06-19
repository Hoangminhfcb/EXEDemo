import { API_URL } from "@/utils/BaseUrl";
import { getCart, clearCart } from "@/utils/cartStorage";
import type { CartItem } from "@/utils/cartStorage";
import { getBakeryGuid } from "@/utils/guid-utils";
import { randomEmail } from "@/utils/random";

// Define types that match your C# OrderCreateRequest structure
export interface CustomerInfo {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  district?: string;
  city?: string;
  notes?: string;
}

// Updated to match C# API structure
export interface OrderItemCreateRequest {
  cakeId: string; // Changed from productId to cakeId
  quantity: number;
  unitPrice: number;
}

// Updated to match C# API structure
export interface OrderCreateRequest {
  orderDate?: string;
  status?: number;
  deliveryAddress: string;
  contactPhone: string;
  customerId: string; // Required GUID
  bakeryId: string;
  items: OrderItemCreateRequest[];
}

export interface OrderDTO {
  id: string;
  orderDate: string;
  status: number;
  deliveryAddress: string;
  contactPhone: string;
  totalAmount: number;
  customerId: string;
  bakeryId: string;
  items: OrderItemDTO[];
}

export interface OrderItemDTO {
  id: string;
  cakeId: string; // Changed from productId to cakeId
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderResponse {
  orderId: string;
  status: string;
  message: string;
  orderDate: string;
}

export const createOrder = async (
  customerInfo: CustomerInfo
): Promise<OrderResponse> => {
  try {
    // Get cart items from local storage
    const cartItems = getCart();

    if (cartItems.length === 0) {
      throw new Error("Giỏ hàng trống");
    }

    // Group items by bakery (taking first bakery for now)
    const bakeryGroups = cartItems.reduce((groups, item) => {
      if (!groups[item.bakeryId]) {
        groups[item.bakeryId] = [];
      }
      groups[item.bakeryId].push(item);
      return groups;
    }, {} as Record<string, CartItem[]>);

    const bakeryIds = Object.keys(bakeryGroups);
    if (bakeryIds.length === 0) {
      throw new Error("Không tìm thấy thông tin tiệm bánh");
    }

    // 1. Kiểm tra user theo phone
    let user: any;

    const findUser = async () => {
      const res = await fetch(
        `${API_URL}/api/users/by-phone/${customerInfo.phone}`
      );
      if (!res.ok) throw new Error("Không thể tìm thấy người dùng.");
      return await res.json();
    };

    const findUserResponse = await fetch(
      `${API_URL}/api/users/by-phone/${customerInfo.phone}`
    );

    if (findUserResponse.ok) {
      user = await findUserResponse.json(); // Đã có user
    } else if (findUserResponse.status === 404) {
      // 2. Nếu không có thì tạo user mới
      const createUserResponse = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: customerInfo.fullName,
          lastName: "",
          email: randomEmail(customerInfo.fullName.split(" ")[0]),
          phoneNumber: customerInfo.phone,
          password: "Password@123", // Mật khẩu mặc định, có thể thay đổi sau
        }),
      });

      if (!createUserResponse.ok) {
        throw new Error("Không thể tạo người dùng mới.");
      }

      // Sau khi tạo, tiếp tục tìm lại user để lấy đúng dữ liệu
      user = await findUser();
    } else {
      throw new Error("Lỗi khi kiểm tra người dùng.");
    }

    // Take the first bakery (you can modify this logic for multiple bakeries)
    const primaryBakeryId = bakeryIds[0];
    const orderItems = bakeryGroups[primaryBakeryId];

    // Convert cart items to order items format matching C# API
    const orderItemRequests: OrderItemCreateRequest[] = orderItems.map(
      (item) => ({
        cakeId: item.productId, // Use cakeId instead of productId
        quantity: item.quantity,
        unitPrice: item.discountPrice || item.price,
      })
    );

    // Format delivery address
    const deliveryAddress = [
      customerInfo.address,
      customerInfo.district,
      customerInfo.city,
    ]
      .filter(Boolean)
      .join(", ");

    // Create order request matching your C# OrderCreateRequest structure
    const orderCreateRequest: OrderCreateRequest = {
      deliveryAddress,
      contactPhone: customerInfo.phone,
      customerId: user.id, // Use default customer GUID for anonymous orders
      bakeryId: primaryBakeryId,
      items: orderItemRequests,
    };

    console.log("Creating order with data:", orderCreateRequest);

    // Call your API endpoint: POST /api/Orders
    const response = await fetch(`${API_URL}/api/Orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(orderCreateRequest),
    });

    console.log("API Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);

      // Try to parse error response for better error messages
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.message) {
          throw new Error(errorData.message);
        }
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors)
            .flat()
            .join(", ");
          throw new Error(errorMessages);
        }
      } catch (parseError) {
        // If we can't parse the error, use the status text
        throw new Error(
          `Lỗi tạo đơn hàng: ${response.status} ${response.statusText}`
        );
      }
    }

    // Parse the OrderDTO response
    const orderDTO: OrderDTO = await response.json();
    console.log("Order created successfully:", orderDTO);

    // Clear cart after successful order
    clearCart();

    // Return formatted response
    return {
      orderId: orderDTO.id,
      status: "success",
      message: "Đơn hàng đã được tạo thành công",
      orderDate: orderDTO.orderDate,
    };
  } catch (error) {
    console.error("Error creating order:", error);

    // Provide more specific error messages
    if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch")
    ) {
      throw new Error(
        `Không thể kết nối đến server. Vui lòng kiểm tra xem API server có đang chạy ở ${API_URL} không?`
      );
    }

    throw error;
  }
};

/**
 * Get order details by ID
 */
export const getOrderById = async (orderId: string): Promise<any> => {
  try {
    console.log("Fetching order details for ID:", orderId);

    const response = await fetch(`${API_URL}/api/Orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    console.log("Get order response status:", response.status);

    if (response.status === 404) {
      throw new Error("Không tìm thấy đơn hàng");
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(
        `Lỗi tải thông tin đơn hàng: ${response.status} ${response.statusText}`
      );
    }

    const orderDTO: OrderDTO = await response.json();
    console.log("Order data received:", orderDTO);

    // Transform the OrderDTO response to match your frontend expectations
    return {
      orderDTO,
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export const getOrderByBakeryId = async (bakeryId: string): Promise<any> => {
  try {
    console.log("Fetching order details for ID:", bakeryId);

    const response = await fetch(
      `${API_URL}/api/Orders/by-bakery/${bakeryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      }
    );

    console.log("Get order response status:", response.status);

    if (response.status === 404) {
      throw new Error("Không tìm thấy đơn hàng");
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(
        `Lỗi tải thông tin đơn hàng: ${response.status} ${response.statusText}`
      );
    }

    const orderDTO: OrderDTO = await response.json();
    console.log("Order data received:", orderDTO);

    // Transform the OrderDTO response to match your frontend expectations
    return {
      orderDTO,
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

/**
 * Map OrderStatus enum to display text
 */
const mapOrderStatus = (status: number): string => {
  const statusMap: Record<number, string> = {
    0: "Chờ xác nhận",
    1: "Đã xác nhận",
    2: "Đang chuẩn bị",
    3: "Sẵn sàng giao hàng",
    4: "Đang giao hàng",
    5: "Đã giao hàng",
    6: "Đã hủy",
  };
  return statusMap[status] || "Không xác định";
};

/**
 * Calculate order totals from cart items
 */
export const calculateOrderTotals = () => {
  const cartItems = getCart();

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discountPrice || item.price;
    return sum + price * item.quantity;
  }, 0);

  // Free shipping for orders over 5,000,000 VND
  const shippingFee = subtotal >= 5000000 ? 0 : 200000;

  return {
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
    itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
  };
};
