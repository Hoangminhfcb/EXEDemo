"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaMapMarkerAlt, FaClock, FaPhone, FaStar, FaHeart, FaSortAmountDown, FaArrowLeft } from "react-icons/fa"

export default function BakeryDetailsPage({ params }: { params: { id: string } }) {
    // @ts-expect-error: Suppress TS error for use(params)
  const unwrappedParams = use(params)
    // @ts-expect-error: Suppress TS error for use(params)
  const bakeryId = unwrappedParams.id

  // State for bakery data
  const [bakery, setBakery] = useState<any>(null)
  const [bestSellers, setBestSellers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [sortBy, setSortBy] = useState("popular")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Fetch bakery data
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const mockBakery = {
      id: bakeryId,
      name: "Sweet Dreams Bakery",
      address: "47/45 Nguyễn Tư Giản, Gò Vấp, TP.HCM",
      district: "Gò Vấp",
      phone: "028 3123 4567",
      email: "contact@sweetdreams.vn",
      website: "www.sweetdreams.vn",
      operatingHours: {
        weekdays: "06:00 - 22:00",
        weekend: "06:00 - 23:00",
      },
      image: "/api/placeholder/1200/400",
      logo: "/api/placeholder/150/150",
      description:
        "Sweet Dreams Bakery là tiệm bánh chuyên về bánh sinh nhật, bánh kem và các loại bánh ngọt cao cấp. Chúng tôi sử dụng nguyên liệu tươi ngon nhất và công thức đặc biệt để tạo ra những chiếc bánh không chỉ đẹp mắt mà còn ngon miệng. Với hơn 10 năm kinh nghiệm, chúng tôi tự hào mang đến cho khách hàng những trải nghiệm ngọt ngào và đáng nhớ.",
      specialties: ["Bánh Sinh Nhật", "Bánh Kem", "Cupcake"],
      rating: 4.8,
      reviewCount: 256,
      totalProducts: 45,
      premium: true,
      socialMedia: {
        facebook: "facebook.com/sweetdreams",
        instagram: "instagram.com/sweetdreams",
      },
      categories: ["Bánh Sinh Nhật", "Bánh Kem", "Cupcake", "Cookies", "Bánh Mì Ngọt"],
    }

    const mockBestSellers = [
      {
        id: 1,
        name: "Bánh Sinh Nhật Hoa Tươi",
        image: "/images/cake1.jpg",
        price: 350000,
        discountPrice: 299000,
        discount: true,
        category: "Bánh Sinh Nhật",
        rating: 4.9,
        reviewCount: 124,
      },
      {
        id: 2,
        name: "Bánh Kem Socola Hạnh Nhân",
        image: "/images/cake2.jpg",
        price: 320000,
        discountPrice: 280000,
        discount: true,
        category: "Bánh Kem",
        rating: 4.8,
        reviewCount: 98,
      },
      {
        id: 3,
        name: "Cupcake Bơ Vani",
        image: "/images/cake3.jpg",
        price: 150000,
        discountPrice: 120000,
        discount: true,
        category: "Cupcake",
        rating: 4.7,
        reviewCount: 76,
      },
      {
        id: 4,
        name: "Bánh Sinh Nhật Trái Cây",
        image: "/images/cake4.jpg",
        price: 380000,
        discountPrice: 330000,
        discount: true,
        category: "Bánh Sinh Nhật",
        rating: 4.9,
        reviewCount: 112,
      },
    ]

    const mockProducts = [
      ...mockBestSellers,
      {
        id: 5,
        name: "Cookies Socola Chip",
        image: "/images/cake5.jpg",
        price: 120000,
        discountPrice: null,
        discount: false,
        category: "Cookies",
        rating: 4.6,
        reviewCount: 65,
      },
      {
        id: 6,
        name: "Bánh Mì Ngọt Nhân Kem",
        image: "/images/cake6.jpg",
        price: 35000,
        discountPrice: 30000,
        discount: true,
        category: "Bánh Mì Ngọt",
        rating: 4.5,
        reviewCount: 42,
      },
      {
        id: 7,
        name: "Bánh Kem Matcha",
        image: "/images/cake1.jpg",
        price: 300000,
        discountPrice: null,
        discount: false,
        category: "Bánh Kem",
        rating: 4.7,
        reviewCount: 58,
      },
      {
        id: 8,
        name: "Cupcake Dâu Tây",
        image: "/images/cake2.jpg",
        price: 160000,
        discountPrice: 140000,
        discount: true,
        category: "Cupcake",
        rating: 4.8,
        reviewCount: 47,
      },
      {
        id: 9,
        name: "Bánh Sinh Nhật Unicorn",
        image: "/images/cake3.jpg",
        price: 450000,
        discountPrice: 400000,
        discount: true,
        category: "Bánh Sinh Nhật",
        rating: 4.9,
        reviewCount: 89,
      },
      {
        id: 10,
        name: "Cookies Hạnh Nhân",
        image: "/images/cake4.jpg",
        price: 130000,
        discountPrice: null,
        discount: false,
        category: "Cookies",
        rating: 4.6,
        reviewCount: 36,
      },
      {
        id: 11,
        name: "Bánh Mì Ngọt Nhân Xoài",
        image: "/images/cake5.jpg",
        price: 40000,
        discountPrice: 35000,
        discount: true,
        category: "Bánh Mì Ngọt",
        rating: 4.4,
        reviewCount: 28,
      },
      {
        id: 12,
        name: "Bánh Kem Chanh Dây",
        image: "/images/cake6.jpg",
        price: 280000,
        discountPrice: null,
        discount: false,
        category: "Bánh Kem",
        rating: 4.7,
        reviewCount: 52,
      },
    ]

    setBakery(mockBakery)
    setBestSellers(mockBestSellers)
    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
  }, [bakeryId])

  // Apply filters and sorting
  useEffect(() => {
    if (!products.length) return

    let result = [...products]

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((product) => product.category === selectedCategory)
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => {
          const priceA = a.discount ? a.discountPrice : a.price
          const priceB = b.discount ? b.discountPrice : b.price
          return priceA - priceB
        })
        break
      case "price-desc":
        result.sort((a, b) => {
          const priceA = a.discount ? a.discountPrice : a.price
          const priceB = b.discount ? b.discountPrice : b.price
          return priceB - priceA
        })
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        // In a real app, you would sort by date
        result.sort((a, b) => b.id - a.id)
        break
      case "popular":
      default:
        // Sort by review count as a proxy for popularity
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
    }

    setFilteredProducts(result)
  }, [products, selectedCategory, sortBy])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  if (!bakery) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Back to locations link */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/locations" className="inline-flex items-center text-pink-600 hover:text-pink-700">
          <FaArrowLeft className="mr-2" /> Quay lại danh sách cửa hàng
        </Link>
      </div>

      {/* Bakery Hero Section */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          {/* Bakery Image */}
          <div className="relative h-64 md:h-80">
            <Image
              src={bakery.image || "/placeholder.svg"}
              alt={bakery.name}
              fill
              className="object-cover rounded-b-lg"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Bakery Info Card */}
          <div className="relative -mt-24 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col md:flex-row">
                {/* Logo */}
                <div className="md:mr-6 mb-4 md:mb-0 flex justify-center md:block">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <Image
                      src={bakery.logo || "/placeholder.svg"}
                      alt={`${bakery.name} logo`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Basic Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{bakery.name}</h1>
                      <div className="flex items-center mt-2 mb-4">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`w-5 h-5 ${
                                star <= Math.floor(bakery.rating) ? "text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-gray-600">{bakery.rating}</span>
                        </div>
                        <span className="mx-2 text-gray-400">|</span>
                        <span className="text-gray-600">{bakery.reviewCount} đánh giá</span>
                        <span className="mx-2 text-gray-400">|</span>
                        <span className="text-gray-600">{bakery.totalProducts} sản phẩm</span>
                      </div>
                    </div>

                    {/* Contact Buttons */}
                    <div className="flex space-x-2 mt-2 md:mt-0">
                      <a
                        href={`tel:${bakery.phone}`}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
                      >
                        <FaPhone className="inline mr-1" /> Gọi ngay
                      </a>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bakery.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                      >
                        <FaMapMarkerAlt className="inline mr-1" /> Chỉ đường
                      </a>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <div className="flex items-start text-gray-600 mb-2">
                        <FaMapMarkerAlt className="mt-1 mr-2 text-pink-600 flex-shrink-0" />
                        <span>{bakery.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaPhone className="mr-2 text-pink-600 flex-shrink-0" />
                        <span>{bakery.phone}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaClock className="mr-2 text-pink-600 flex-shrink-0" />
                        <div>
                          <div>T2-T6: {bakery.operatingHours.weekdays}</div>
                          <div>T7-CN: {bakery.operatingHours.weekend}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Chuyên môn:</p>
                    <div className="flex flex-wrap gap-2">
                      {bakery.specialties.map((specialty: string, index: number) => (
                        <span key={index} className="bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h2 className="text-lg font-semibold mb-2">Giới thiệu</h2>
                <p className="text-gray-600">{bakery.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Best Sellers Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Sản phẩm bán chạy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <Link href={`/productDetail/${product.id}`} className="block">
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
                        onClick={(e) => {
                          e.preventDefault()
                          // Add favorite functionality here
                        }}
                        className="p-2 rounded-full bg-white text-gray-600 hover:text-pink-600 transition"
                      >
                        <FaHeart />
                      </button>
                    </div>
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-pink-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Giảm giá
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`w-4 h-4 ${star <= Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-1 text-gray-600 text-sm">{product.rating}</span>
                      <span className="mx-1 text-gray-400">|</span>
                      <span className="text-gray-600 text-sm">{product.reviewCount} đánh giá</span>
                    </div>
                    <div className="flex items-center">
                      {product.discount ? (
                        <>
                          <span className="text-lg font-bold text-pink-600">{formatPrice(product.discountPrice)}</span>
                          <span className="ml-2 text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-pink-600">{formatPrice(product.price)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* All Products Section */}
        <section>
          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h2 className="text-2xl font-bold mb-4 md:mb-0">Tất cả sản phẩm</h2>

              {/* Sort Options */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="popular">Phổ biến nhất</option>
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="newest">Mới nhất</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FaSortAmountDown className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Horizontal Category Filter */}
            <div className="overflow-x-auto pb-2 -mx-4 px-4">
              <div className="flex space-x-2 min-w-max">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === "all"
                      ? "bg-pink-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  Tất cả
                </button>
                {bakery.categories.map((category: string) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-pink-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <Link href={`/productDetail/${product.id}`} className="block">
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
                        onClick={(e) => {
                          e.preventDefault()
                          // Add favorite functionality here
                        }}
                        className="p-2 rounded-full bg-white text-gray-600 hover:text-pink-600 transition"
                      >
                        <FaHeart />
                      </button>
                    </div>
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-pink-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Giảm giá
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`w-4 h-4 ${star <= Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-1 text-gray-600 text-sm">{product.rating}</span>
                      <span className="mx-1 text-gray-400">|</span>
                      <span className="text-gray-600 text-sm">{product.reviewCount} đánh giá</span>
                    </div>
                    <div className="flex items-center">
                      {product.discount ? (
                        <>
                          <span className="text-lg font-bold text-pink-600">{formatPrice(product.discountPrice)}</span>
                          <span className="ml-2 text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-pink-600">{formatPrice(product.price)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* No Products Found */}
          {filteredProducts.length === 0 && (
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="text-gray-500 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Không tìm thấy sản phẩm nào</h3>
              <p className="mt-2 text-gray-500">Vui lòng thử lại với bộ lọc khác.</p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSelectedCategory("all")
                    setSortBy("popular")
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
