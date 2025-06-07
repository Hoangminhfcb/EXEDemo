"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaSearch, FaHeart, FaMapMarkerAlt, FaFilter, FaSortAmountDown, FaTimes, FaChevronDown } from "react-icons/fa"

export default function ProductsPage() {
  // All products data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Bánh Sinh Nhật Hoa Tươi",
      address: "47/45 Nguyễn Tư Giản, Gò Vấp",
      image: "/images/cake1.jpg",
      price: 350000,
      discountPrice: 299000,
      discount: true,
      category: "Bánh Sinh Nhật",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Bánh Cưới Sang Trọng",
      address: "6 Lâm Văn Bên, P. Tân Kiểng, Q.7",
      image: "/images/cake2.jpg",
      price: 1200000,
      discountPrice: 999000,
      discount: true,
      favorite: true,
      category: "Bánh Cưới",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Bánh Cupcake Nhiều Hương Vị",
      address: "19 Võ Văn Ngân, P. Linh Chiểu, TP. Thủ Đức",
      image: "/images/cake3.jpg",
      price: 150000,
      discountPrice: 120000,
      discount: true,
      category: "Cupcake",
      rating: 4.5,
    },
    {
      id: 4,
      name: "Bánh Kem Tạo Hình Nhân Vật",
      address: "08 Ưng Văn Khiêm, P. 25, Bình Thạnh",
      image: "/images/cake4.jpg",
      price: 450000,
      discountPrice: 399000,
      discount: true,
      category: "Bánh Kem",
      rating: 4.7,
    },
    {
      id: 5,
      name: "Bánh Cookies Homemade",
      address: "73 Nguyễn Văn Công, P. 3, Gò Vấp",
      image: "/images/cake5.jpg",
      price: 120000,
      discountPrice: 99000,
      discount: true,
      favorite: true,
      category: "Cookies",
      rating: 4.6,
    },
    {
      id: 6,
      name: "Bánh Cheesecake Tươi Mát",
      address: "247 Đường Số 7, P. Bình Trị Đông, Bình Tân",
      image: "/images/cake6.jpg",
      price: 280000,
      discountPrice: 250000,
      discount: true,
      category: "Bánh Kem",
      rating: 4.4,
    },
    {
      id: 7,
      name: "Bánh Sinh Nhật Trái Cây",
      address: "123 Lê Văn Việt, Q.9, TP. Thủ Đức",
      image: "/images/cake1.jpg",
      price: 320000,
      discountPrice: 280000,
      discount: true,
      category: "Bánh Sinh Nhật",
      rating: 4.3,
    },
    {
      id: 8,
      name: "Bánh Mì Ngọt Nhân Socola",
      address: "45 Nguyễn Thị Minh Khai, Q.1",
      image: "/images/cake2.jpg",
      price: 35000,
      discountPrice: 30000,
      discount: true,
      category: "Bánh Mì Ngọt",
      rating: 4.2,
    },
    {
      id: 9,
      name: "Bánh Cupcake Hương Dâu",
      address: "78 Lý Tự Trọng, Q.1",
      image: "/images/cake3.jpg",
      price: 140000,
      discountPrice: 120000,
      discount: true,
      category: "Cupcake",
      rating: 4.5,
    },
    {
      id: 10,
      name: "Bánh Sinh Nhật Socola",
      address: "56 Nguyễn Huệ, Q.1",
      image: "/images/cake4.jpg",
      price: 380000,
      discountPrice: 350000,
      discount: true,
      category: "Bánh Sinh Nhật",
      rating: 4.7,
    },
    {
      id: 11,
      name: "Bánh Cookies Socola Chip",
      address: "34 Trần Hưng Đạo, Q.5",
      image: "/images/cake5.jpg",
      price: 110000,
      discountPrice: 95000,
      discount: true,
      category: "Cookies",
      rating: 4.4,
    },
    {
      id: 12,
      name: "Bánh Mì Ngọt Nhân Mứt",
      address: "67 Lê Lợi, Q.1",
      image: "/images/cake6.jpg",
      price: 40000,
      discountPrice: 35000,
      discount: true,
      category: "Bánh Mì Ngọt",
      rating: 4.3,
    },
  ])

  // Filter states
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000000 })
  const [showDiscount, setShowDiscount] = useState(false)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  // Categories
  const categories = ["Tất cả", "Bánh Sinh Nhật", "Bánh Cưới", "Bánh Kem", "Cupcake", "Cookies", "Bánh Mì Ngọt"]

  // Price ranges
  const priceRanges = [
    { label: "Tất cả giá", min: 0, max: 2000000 },
    { label: "Dưới 100.000đ", min: 0, max: 100000 },
    { label: "100.000đ - 200.000đ", min: 100000, max: 200000 },
    { label: "200.000đ - 500.000đ", min: 200000, max: 500000 },
    { label: "Trên 500.000đ", min: 500000, max: 2000000 },
  ]

  // Sort options
  const sortOptions = [
    { value: "featured", label: "Nổi bật" },
    { value: "price-asc", label: "Giá: Thấp đến cao" },
    { value: "price-desc", label: "Giá: Cao đến thấp" },
    { value: "rating", label: "Đánh giá cao nhất" },
    { value: "newest", label: "Mới nhất" },
  ]

  // Apply filters
  useEffect(() => {
    let result = [...products]

    // Search filter
    if (searchTerm) {
      result = result.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Category filter
    if (selectedCategory !== "Tất cả") {
      result = result.filter((product) => product.category === selectedCategory)
    }

    // Price range filter
    result = result.filter(
      (product) =>
        (product.discount ? product.discountPrice : product.price) >= priceRange.min &&
        (product.discount ? product.discountPrice : product.price) <= priceRange.max,
    )

    // Discount filter
    if (showDiscount) {
      result = result.filter((product) => product.discount)
    }

    // Rating filter
    if (minRating > 0) {
      result = result.filter((product) => product.rating >= minRating)
    }

    // Sorting
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
      default:
        // Featured - no specific sort
        break
    }

    setFilteredProducts(result)
  }, [products, searchTerm, selectedCategory, priceRange, showDiscount, minRating, sortBy])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("Tất cả")
    setPriceRange({ min: 0, max: 2000000 })
    setShowDiscount(false)
    setMinRating(0)
    setSortBy("featured")
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section with search */}
      <section
        className="relative bg-cover bg-center h-64"
        style={{ backgroundImage: "url('/api/placeholder/1920/400')" }}
      >
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.prismic.io/lf-web/ZsrShEaF0TcGJYEZ_LF-webcover-02.jpg?auto=format%2Ccompress&width=1920&height=1920&q=80&fit=max&w=1920')"}}></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Tất cả sản phẩm</h1>

          <div className="w-full max-w-2xl bg-white rounded-lg overflow-hidden flex">
            <input
              type="text"
              placeholder="Tìm kiếm bánh..."
              className="flex-1 px-4 py-3 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-pink-600 text-white px-6 py-3">
              <FaSearch />
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between shadow-sm"
          >
            <span className="flex items-center">
              <FaFilter className="mr-2 text-pink-600" /> Bộ lọc
            </span>
            <FaChevronDown className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } md:block w-full md:w-64 bg-white rounded-lg shadow-sm p-4 h-fit sticky top-4`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Bộ lọc</h2>
              <button onClick={clearFilters} className="text-pink-600 text-sm hover:underline flex items-center">
                <FaTimes className="mr-1" /> Xóa bộ lọc
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Danh mục</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="form-radio text-pink-600 h-4 w-4"
                    />
                    <span className="ml-2 text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Khoảng giá</h3>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <label key={index} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange.min === range.min && priceRange.max === range.max}
                      onChange={() => setPriceRange({ min: range.min, max: range.max })}
                      className="form-radio text-pink-600 h-4 w-4"
                    />
                    <span className="ml-2 text-gray-700">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Discount filter */}
            <div className="mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDiscount}
                  onChange={() => setShowDiscount(!showDiscount)}
                  className="form-checkbox text-pink-600 h-4 w-4"
                />
                <span className="ml-2 text-gray-700">Chỉ hiển thị sản phẩm giảm giá</span>
              </label>
            </div>

            {/* Rating filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Đánh giá tối thiểu</h3>
              <div className="space-y-2">
                {[0, 3, 3.5, 4, 4.5].map((rating) => (
                  <label key={rating} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === rating}
                      onChange={() => setMinRating(rating)}
                      className="form-radio text-pink-600 h-4 w-4"
                    />
                    <span className="ml-2 flex items-center">
                      {rating > 0 ? (
                        <>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${
                                star <= Math.floor(rating)
                                  ? "text-yellow-400"
                                  : star === Math.ceil(rating) && rating % 1 !== 0
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                          <span className="ml-1 text-gray-700">& trở lên</span>
                        </>
                      ) : (
                        <span className="text-gray-700">Tất cả đánh giá</span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products grid */}
          <div className="flex-1">
            {/* Sort and results count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-2 sm:mb-0">
                Hiển thị <span className="font-medium">{filteredProducts.length}</span> sản phẩm
              </p>

              <div className="flex items-center">
                <FaSortAmountDown className="text-gray-500 mr-2" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-0 focus:ring-0 text-gray-700 pr-8 py-1"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            className={`p-2 rounded-full ${
                              product.favorite ? "bg-pink-600 text-white" : "bg-white text-gray-600"
                            }`}
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
                        <p className="text-gray-600 text-sm flex items-center mb-2">
                          <FaMapMarkerAlt className="mr-1" /> {product.address}
                        </p>
                        <div className="flex items-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${
                                star <= Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                          <span className="ml-1 text-gray-600 text-sm">{product.rating}</span>
                        </div>
                        <div className="flex items-center">
                          {product.discount ? (
                            <>
                              <span className="text-lg font-bold text-pink-600">
                                {formatPrice(product.discountPrice)}
                              </span>
                              <span className="ml-2 text-sm text-gray-500 line-through">
                                {formatPrice(product.price)}
                              </span>
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
            ) : (
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
                    onClick={clearFilters}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
