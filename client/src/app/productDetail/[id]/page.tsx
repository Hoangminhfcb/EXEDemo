"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaHeart, FaMapMarkerAlt, FaShoppingCart, FaMinus, FaPlus, FaArrowLeft } from "react-icons/fa"

export default function ProductDetail({ params }: { params: { id: string } }) {
  // @ts-expect-error: Suppress TS error for use(params)
  const unwrappedParams = use(params)
  // @ts-expect-error: Suppress TS error for use(params)
  const productId = unwrappedParams.id 

  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])

  useEffect(() => {
    const mockProduct = {
      id: productId, 
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

    const mockRelated = [
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

    setProduct(mockProduct)
    setRelatedProducts(mockRelated)
    setIsFavorite(mockProduct.favorite)
  }, [productId]) 

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    )
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center mb-6 text-sm">
        <Link href="/" className="text-gray-500 hover:text-pink-600">
          Trang chủ
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link href="/" className="text-gray-500 hover:text-pink-600">
          Bánh Sinh Nhật
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-pink-600">{product.name}</span>
      </div>

      {/* Back button for mobile */}
      <Link href="/" className="inline-flex items-center text-pink-600 mb-4 md:hidden">
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
              onClick={() => setIsFavorite(!isFavorite)}
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
            {product.discount ? (
              <>
                <span className="text-3xl font-bold text-pink-600">{formatPrice(product.discountPrice)}</span>
                <span className="text-xl text-gray-500 line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-pink-600">{formatPrice(product.price)}</span>
            )}
          </div>

          <div className="border-t border-b border-gray-200 py-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Kích thước</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.sizes.map((size: any, index: number) => (
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
            </div>

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
            Khách hàng có thể yêu cầu tùy chỉnh thiết kế, màu sắc, kích thước và hương vị theo ý muốn. Vui lòng liên hệ
            trước ít nhất 48 giờ để đảm bảo đáp ứng yêu cầu đặc biệt.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Sản phẩm liên quan</h2>
          <Link href="/" className="text-pink-600 hover:underline">
            Xem tất cả
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  width={400}
                  height={300}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <button
                    className={`p-2 rounded-full ${
                      product.favorite ? "bg-pink-600 text-white" : "bg-white text-gray-600"
                    }`}
                  >
                    <FaHeart />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm flex items-center mb-3">
                  <FaMapMarkerAlt className="mr-1" /> {product.address}
                </p>
                {product.discount && (
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
          ))}
        </div>
      </div>
    </div>
  )
}
