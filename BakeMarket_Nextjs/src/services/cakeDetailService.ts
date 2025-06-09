import { API_URL } from "@/utils/BaseUrl"
import { fetchInterceptor } from "@/utils/Interceptor"
  // @ts-expect-error
import type { Product, RelatedProduct } from "@/types/product"

export const getProductById = async (id: string): Promise<Product> => {
  try {
    // For now, return mock data. Later you can replace with real API call
    const mockProduct: Product = {
      id: id,
      name: "Bánh Sinh Nhật Hoa Tươi",
      address: "47/45 Nguyễn Tư Giản, Gò Vấp",
      description:
        "Bánh sinh nhật trang trí hoa tươi tự nhiên, làm từ kem tươi Pháp và trái cây theo mùa. Bánh có độ ngọt vừa phải, phù hợp với khẩu vị người Việt. Có thể tùy chỉnh kích thước, màu sắc và hương vị theo yêu cầu.",
      price: 350000,
      discountPrice: 299000,
      discount: true,
      favorite: false,
      rating: 4.8,
      reviewCount: 124,
      images: ["/images/cake1.jpg", "/images/cake2.jpg", "/images/cake3.jpg", "/images/cake4.jpg"],
      sizes: [
        { name: "12cm (2-4 người)", price: 299000 },
        { name: "15cm (4-6 người)", price: 399000 },
        { name: "18cm (8-12 người)", price: 499000 },
        { name: "22cm (15-20 người)", price: 699000 },
      ],
      flavors: ["Vani", "Socola", "Dâu tây", "Trà xanh", "Chanh dây"],
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return mockProduct

    // When ready to use real API, uncomment this:
    /*
    const response = await fetchInterceptor(`${API_URL}/api/Cakes/${id}`, {
      method: "GET",
      skipAuth: true, // Set to false if authentication is required
    })
    return await response.json()
    */
  } catch (error) {
    console.error("Error fetching product:", error)
    throw error
  }
}

export const getRelatedProducts = async (productId: string): Promise<RelatedProduct[]> => {
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
    ]

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return mockRelated

    // When ready to use real API, uncomment this:
    /*
    const response = await fetchInterceptor(`${API_URL}/api/Cakes/${productId}/related`, {
      method: "GET",
      skipAuth: true, // Set to false if authentication is required
    })
    return await response.json()
    */
  } catch (error) {
    console.error("Error fetching related products:", error)
    throw error
  }
}

export const addToFavorites = async (productId: string): Promise<void> => {
  try {
    const response = await fetchInterceptor(`${API_URL}/api/favorites`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      skipAuth: false, // Requires authentication
    })
    return await response.json()
  } catch (error) {
    console.error("Error adding to favorites:", error)
    throw error
  }
}

export const removeFromFavorites = async (productId: string): Promise<void> => {
  try {
    const response = await fetchInterceptor(`${API_URL}/api/favorites/${productId}`, {
      method: "DELETE",
      skipAuth: false, // Requires authentication
    })
    return await response.json()
  } catch (error) {
    console.error("Error removing from favorites:", error)
    throw error
  }
}
