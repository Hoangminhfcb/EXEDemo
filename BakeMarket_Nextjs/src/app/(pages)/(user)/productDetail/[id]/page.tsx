"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaHeart, FaMapMarkerAlt, FaShoppingCart, FaMinus, FaPlus, FaArrowLeft } from "react-icons/fa"
import { getProductById, getRelatedProducts, addToFavorites, removeFromFavorites } from "@/services/cakeDetailService"
  // @ts-expect-error
import type { Product, RelatedProduct } from "@/types/product"


export default function ProductDetail({ params }: { params: { id: string } }) {
  // @ts-expect-error
  const unwrappedParams = use(params)
    // @ts-expect-error
  const productId = unwrappedParams.id

  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch product and related products in parallel
        const [productData, relatedData] = await Promise.all([getProductById(productId), getRelatedProducts(productId)])

        setProduct(productData)
        setRelatedProducts(relatedData)
        setIsFavorite(productData.favorite)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải dữ liệu"
        setError(errorMessage)
        console.error("Error fetching data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [productId])

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites(productId)
      } else {
        await addToFavorites(productId)
      }
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error("Error toggling favorite:", error)
      // You might want to show a toast notification here
    }
  }

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1)
    } else if (type === "increase") {
      setQuantity(quantity + 1)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* <SystemBanner />
        <Header /> */}
        <div className="container mx-auto px-4 py-12 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
          <span className="ml-3 text-gray-600">Đang tải sản phẩm...</span>
        </div>
        {/* <Footer /> */}
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        {/* <SystemBanner />
        <Header /> */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-red-800 mb-2">Không tìm thấy sản phẩm</h3>
            <p className="text-red-700 mb-4">{error || "Sản phẩm không tồn tại hoặc đã bị xóa"}</p>
            <Link
              href="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700"
            >
              Quay lại danh sách sản phẩm
            </Link>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* <SystemBanner />
      <Header /> */}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6 text-sm">
          <Link href="/" className="text-gray-500 hover:text-pink-600">
            Trang chủ
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/products" className="text-gray-500 hover:text-pink-600">
            Sản phẩm
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-pink-600">{product.name}</span>
        </div>

        {/* Back button for mobile */}
        <Link href="/products" className="inline-flex items-center text-pink-600 mb-4 md:hidden">
          <FaArrowLeft className="mr-2" /> Quay lại
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={product.images[activeImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-[400px] object-cover"
              />
              <button
                onClick={handleFavoriteToggle}
                className={`absolute top-4 right-4 p-2 rounded-full ${
                  isFavorite ? "bg-pink-600 text-white" : "bg-white text-gray-600"
                }`}
              >
                <FaHeart />
              </button>
              {product.discount && (
                <div className="absolute top-4 left-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Giảm giá
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 rounded-md overflow-hidden border-2 ${
                    activeImage === index ? "border-pink-600" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Ảnh ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${star <= Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">{product.rating}</span>
              </div>
              <span className="text-gray-500">|</span>
              <span className="text-gray-600">{product.reviewCount} đánh giá</span>
            </div>

            <p className="text-gray-600 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-pink-600" /> {product.address}
            </p>

            <div className="flex items-center space-x-4">
              {product.discount && product.discountPrice ? (
                <>
                  <span className="text-3xl font-bold text-pink-600">{formatPrice(product.discountPrice)}</span>
                  <span className="text-xl text-gray-500 line-through">{formatPrice(product.price)}</span>
                </>
              ) : (
                <span className="text-3xl font-bold text-pink-600">{formatPrice(product.price)}</span>
              )}
            </div>

            <div className="border-t border-b border-gray-200 py-6 space-y-6">
              {/* <div>
                <h3 className="text-lg font-medium mb-3">Kích thước</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.sizes.map((size, index) => (
                    <label
                      key={index}
                      className="relative flex items-center justify-between border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-pink-600 transition"
                    >
                      <div>
                        <input type="radio" name="size" className="absolute opacity-0" defaultChecked={index === 0} />
                        <span className="text-sm font-medium">{size.name}</span>
                      </div>
                      <span className="text-sm text-pink-600 font-medium">{formatPrice(size.price)}</span>
                    </label>
                  ))}
                </div>
              </div> */}

              <div>
                <h3 className="text-lg font-medium mb-3">Hương vị</h3>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map((flavor: string, index: number) => (
                    <label
                      key={index}
                      className="relative border border-gray-300 rounded-full px-4 py-2 cursor-pointer hover:border-pink-600 transition"
                    >
                      <input type="radio" name="flavor" className="absolute opacity-0" defaultChecked={index === 0} />
                      <span className="text-sm">{flavor}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Số lượng</h3>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="w-10 h-10 rounded-l-lg bg-gray-100 flex items-center justify-center border border-gray-300"
                  >
                    <FaMinus className="text-gray-600" />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-16 h-10 text-center border-t border-b border-gray-300"
                  />
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="w-10 h-10 rounded-r-lg bg-gray-100 flex items-center justify-center border border-gray-300"
                  >
                    <FaPlus className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-pink-700 transition flex items-center justify-center">
                <FaShoppingCart className="mr-2" /> Thêm vào giỏ hàng
              </button>
              <button className="flex-1 border border-pink-600 text-pink-600 py-3 px-6 rounded-lg font-medium hover:bg-pink-50 transition">
                Mua ngay
              </button>
            </div>

            <div className="bg-pink-50 rounded-lg p-4 text-sm">
              <p className="font-medium text-pink-800 mb-2">Thông tin giao hàng:</p>
              <ul className="space-y-1 text-pink-700">
                <li>• Giao hàng miễn phí trong nội thành TP.HCM</li>
                <li>• Đặt trước ít nhất 24 giờ</li>
                <li>• Hỗ trợ giao hàng từ 8:00 - 21:00 hàng ngày</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Mô tả sản phẩm</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Bánh được làm từ nguyên liệu cao cấp, đảm bảo vệ sinh an toàn thực phẩm. Quy trình sản xuất tuân thủ các
              tiêu chuẩn nghiêm ngặt, mang đến sản phẩm chất lượng cao.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Khách hàng có thể yêu cầu tùy chỉnh thiết kế, màu sắc, kích thước và hương vị theo ý muốn. Vui lòng liên
              hệ trước ít nhất 48 giờ để đảm bảo đáp ứng yêu cầu đặc biệt.
            </p>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Sản phẩm liên quan</h2>
            <Link href="/products" className="text-pink-600 hover:underline">
              Xem tất cả
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link href={`/products/${relatedProduct.id}`} key={relatedProduct.id}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                  <div className="relative">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      width={400}
                      height={300}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        className={`p-2 rounded-full ${
                          relatedProduct.favorite ? "bg-pink-600 text-white" : "bg-white text-gray-600"
                        }`}
                      >
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{relatedProduct.name}</h3>
                    <p className="text-gray-600 text-sm flex items-center mb-3">
                      <FaMapMarkerAlt className="mr-1" /> {relatedProduct.address}
                    </p>
                    {relatedProduct.discount && (
                      <p className="text-pink-600 flex items-center text-sm">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Giảm giá đặc biệt
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  )
}
