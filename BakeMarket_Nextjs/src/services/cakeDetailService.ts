import { API_URL } from "@/utils/BaseUrl";
import { fetchInterceptor } from "@/utils/Interceptor";
// @ts-expect-error
import type { Product, RelatedProduct } from "@/types/product";

export const getProductById = async (id: string): Promise<Product> => {
  try {
    // For now, return mock data. Later you can replace with real API call

    const res = await fetch(`${API_URL}/api/cakes/${id}`);
    if (!res.ok) {
      throw new Error(`Error fetching product: ${res.statusText}`);
    }
    const data = await res.json();

    return data;

    // When ready to use real API, uncomment this:
    /*
    const response = await fetchInterceptor(`${API_URL}/api/Cakes/${id}`, {
      method: "GET",
      skipAuth: true, // Set to false if authentication is required
    })
    return await response.json()
    */
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const getRelatedProducts = async (
  productId: string
): Promise<RelatedProduct[]> => {
  try {
    // For now, return mock data. Later you can replace with real API call
    const mockRelated: RelatedProduct[] = [
      {
        id: 2,
        name: "Bánh Cưới Sang Trọng",
        address: "6 Lâm Văn Bên, P. Tân Kiểng, Q.7",
        image: "/images/cake2.jpg",
        discount: true,
        favorite: true,
      },
      {
        id: 3,
        name: "Bánh Cupcake Nhiều Hương Vị",
        address: "19 Võ Văn Ngân, P. Linh Chiểu, TP. Thủ Đức",
        image: "/images/cake3.jpg",
        discount: true,
      },
      {
        id: 5,
        name: "Bánh Cookies Homemade",
        address: "73 Nguyễn Văn Công, P. 3, Gò Vấp",
        image: "/images/cake5.jpg",
        discount: true,
        favorite: true,
      },
    ];

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return mockRelated;

    // When ready to use real API, uncomment this:
    /*
    const response = await fetchInterceptor(`${API_URL}/api/Cakes/${productId}/related`, {
      method: "GET",
      skipAuth: true, // Set to false if authentication is required
    })
    return await response.json()
    */
  } catch (error) {
    console.error("Error fetching related products:", error);
    throw error;
  }
};

export const addToFavorites = async (productId: string): Promise<void> => {
  try {
    const response = await fetchInterceptor(`${API_URL}/api/favorites`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      skipAuth: false, // Requires authentication
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error;
  }
};

export const removeFromFavorites = async (productId: string): Promise<void> => {
  try {
    const response = await fetchInterceptor(
      `${API_URL}/api/favorites/${productId}`,
      {
        method: "DELETE",
        skipAuth: false, // Requires authentication
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw error;
  }
};
