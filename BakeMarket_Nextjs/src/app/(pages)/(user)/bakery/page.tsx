//page cho customer xem chi tiet cua shop

"use client"

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaMapMarkerAlt, FaClock, FaPhone, FaSearch, FaStore, FaDirections, FaCrown, FaStar } from "react-icons/fa"

export default function LocationsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Bakeries data with premium/featured status
  const bakeries = [
    {
      id: 1,
      name: "Sweet Dreams Bakery",
      address: "47/45 Nguyễn Tư Giản, Gò Vấp, TP.HCM",
      district: "Gò Vấp",
      phone: "028 3123 4567",
      operatingHours: {
        weekdays: "06:00 - 22:00",
        weekend: "06:00 - 23:00",
      },
      image: "/api/placeholder/400/250",
      specialties: ["Bánh Sinh Nhật", "Bánh Kem", "Cupcake"],
      rating: 4.8,
      totalProducts: 45,
      premium: true, // Premium bakery (top position)
      featured: false,
    },
    {
      id: 2,
      name: "Golden Cake House",
      address: "6 Lâm Văn Bên, P. Tân Kiểng, Q.7, TP.HCM",
      district: "Quận 7",
      phone: "028 3789 1234",
      operatingHours: {
        weekdays: "07:00 - 21:30",
        weekend: "07:00 - 22:00",
      },
      image: "/api/placeholder/400/250",
      specialties: ["Bánh Cưới", "Bánh Kem", "Cookies"],
      rating: 4.9,
      totalProducts: 38,
      premium: false,
      featured: true, // Featured bakery (second row)
    },
    {
      id: 3,
      name: "Delicious Moments",
      address: "19 Võ Văn Ngân, P. Linh Chiểu, TP. Thủ Đức, TP.HCM",
      district: "Thủ Đức",
      phone: "028 3456 7890",
      operatingHours: {
        weekdays: "06:30 - 22:00",
        weekend: "06:30 - 22:30",
      },
      image: "/api/placeholder/400/250",
      specialties: ["Cupcake", "Bánh Mì Ngọt", "Cookies"],
      rating: 4.5,
      totalProducts: 32,
      premium: false,
      featured: true, // Featured bakery (second row)
    },
    {
      id: 4,
      name: "Royal Pastry",
      address: "08 Ưng Văn Khiêm, P. 25, Bình Thạnh, TP.HCM",
      district: "Bình Thạnh",
      phone: "028 3567 8901",
      operatingHours: {
        weekdays: "07:00 - 21:00",
        weekend: "07:00 - 22:00",
      },
      image: "/api/placeholder/400/250",
      specialties: ["Bánh Sinh Nhật", "Bánh Kem", "Bánh Cưới"],
      rating: 4.7,
      totalProducts: 41,
      premium: false,
      featured: false,
    },
    {
      id: 5,
      name: "Sweet Corner",
      address: "73 Nguyễn Văn Công, P. 3, Gò Vấp, TP.HCM",
      district: "Gò Vấp",
      phone: "028 3234 5678",
      operatingHours: {
        weekdays: "06:00 - 21:30",
        weekend: "06:00 - 22:30",
      },
      image: "/api/placeholder/400/250",
      specialties: ["Cookies", "Bánh Mì Ngọt", "Cupcake"],
      rating: 4.6,
      totalProducts: 28,
      premium: false,
      featured: false,
    },
    {
      id: 6,
      name: "Heaven's Cake",
      address: "247 Đường Số 7, P. Bình Trị Đông, Bình Tân, TP.HCM",
      district: "Bình Tân",
      phone: "028 3345 6789",
      operatingHours: {
        weekdays: "07:00 - 22:00",
        weekend: "07:00 - 23:00",
      },
      image: "/api/placeholder/400/250",
      specialties: ["Bánh Kem", "Bánh Sinh Nhật", "Cookies"],
      rating: 4.4,
      totalProducts: 35,
      premium: false,
      featured: false,
    },
    {
      id: 7,
      name: "Artisan Bakery",
      address: "123 Lê Văn Việt, Q.9, TP. Thủ Đức, TP.HCM",
      district: "Thủ Đức",
      phone: "028 3456 7891",
      operatingHours: {
        weekdays: "06:30 - 21:00",
        weekend: "06:30 - 22:00",
      },
      image: "/api/placeholder/400/250",
      specialties: ["Bánh Sinh Nhật", "Cupcake", "Bánh Mì Ngọt"],
      rating: 4.3,
      totalProducts: 29,
      premium: false,
      featured: false,
    },
    {
      id: 8,
      name: "Premium Cakes",
      address: "45 Nguyễn Thị Minh Khai, Q.1, TP.HCM",
      district: "Quận 1",
      phone: "028 3567 8902",
      operatingHours: {
        weekdays: "08:00 - 22:00",
        weekend: "08:00 - 23:00",
      },
      image: "/api/placeholder/400/250",
      specialties: ["Bánh Cưới", "Bánh Kem", "Bánh Sinh Nhật"],
      rating: 4.9,
      totalProducts: 52,
      premium: false,
      featured: false,
    },
  ]

  // Filter bakeries based on search term
  const filteredBakeries = bakeries.filter(
    (bakery) =>
      bakery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bakery.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bakery.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Separate bakeries by type
  const premiumBakery = filteredBakeries.find((bakery) => bakery.premium)
  const featuredBakeries = filteredBakeries.filter((bakery) => bakery.featured && !bakery.premium).slice(0, 2)
  const regularBakeries = filteredBakeries.filter((bakery) => !bakery.premium && !bakery.featured)

  const handleCallPhone = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  const handleGetDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank")
  }

  // Bakery card component to avoid repetition
  // @ts-expect-error: Suppress TS error for use(params)
  const BakeryCard = ({ bakery, isPremium = false, isFeatured = false }) => (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition ${
        isPremium ? "border-2 border-yellow-400" : isFeatured ? "border border-pink-400" : ""
      }`}
    >
      <div className="relative">
        <Image
          src={bakery.image || "/placeholder.svg"}
          width={400}
          height={250}
          alt={bakery.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-pink-600 text-white px-2 py-1 rounded-full text-sm font-medium">
          {bakery.totalProducts} sản phẩm
        </div>
        {isPremium && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-medium flex items-center">
            <FaCrown className="mr-1" /> Premium
          </div>
        )}
        {isFeatured && (
          <div className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 rounded-full text-sm font-medium flex items-center">
            <FaStar className="mr-1" /> Nổi bật
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900">{bakery.name}</h3>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${star <= Math.floor(bakery.rating) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
            <span className="ml-1 text-gray-600 text-sm">{bakery.rating}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-start text-gray-600 text-sm">
            <FaMapMarkerAlt className="mr-2 mt-1 text-pink-600 flex-shrink-0" />
            <span>{bakery.address}</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <FaClock className="mr-2 text-pink-600 flex-shrink-0" />
            <div>
              <div>T2-T6: {bakery.operatingHours.weekdays}</div>
              <div>T7-CN: {bakery.operatingHours.weekend}</div>
            </div>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <FaPhone className="mr-2 text-pink-600 flex-shrink-0" />
            <span>{bakery.phone}</span>
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Chuyên môn:</p>
          <div className="flex flex-wrap gap-1">
            {bakery.specialties.map((specialty: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
              <span key={index} className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2">
          <Link
            href={`/store/${bakery.id}`}
            className={`w-full py-2 px-4 rounded-lg font-medium transition flex items-center justify-center ${
              isPremium ? "bg-yellow-500 hover:bg-yellow-600 text-white" : "bg-pink-600 hover:bg-pink-700 text-white"
            }`}
          >
            <FaStore className="mr-2" />
            Xem cửa hàng
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section */}
      <section
        className="relative bg-cover bg-center h-64"
        style={{ backgroundImage: "url('/api/placeholder/1920/400')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Cửa hàng của chúng tôi</h1>
          <p className="text-white text-lg mb-8 text-center">Tìm cửa hàng bánh gần bạn nhất</p>

          <div className="w-full max-w-2xl bg-white rounded-lg overflow-hidden flex">
            <input
              type="text"
              placeholder="Tìm theo tên cửa hàng hoặc quận..."
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
        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Tìm thấy <span className="font-medium text-pink-600">{filteredBakeries.length}</span> cửa hàng
          </p>
        </div>

        {filteredBakeries.length > 0 ? (
          <div className="space-y-8">
            {/* Premium Bakery (Top Position) */}
            {premiumBakery && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FaCrown className="text-yellow-500 mr-2" /> Cửa hàng đối tác cao cấp
                </h2>
                <div className="bg-gradient-to-r from-yellow-50 to-pink-50 p-4 rounded-lg">
                  <div className="md:flex gap-6">
                    <div className="md:w-1/2 mb-4 md:mb-0">
                      <div className="relative rounded-lg overflow-hidden">
                        <Image
                          src={premiumBakery.image || "/placeholder.svg"}
                          width={600}
                          height={400}
                          alt={premiumBakery.name}
                          className="w-full h-64 md:h-80 object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {premiumBakery.totalProducts} sản phẩm
                        </div>
                        <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <FaCrown className="mr-1" /> The Best
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2">
                      <div className="bg-white p-6 rounded-lg shadow-md h-full">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-bold text-2xl text-gray-900">{premiumBakery.name}</h3>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-5 h-5 ${
                                  star <= Math.floor(premiumBakery.rating) ? "text-yellow-400" : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                            <span className="ml-1 text-gray-600">{premiumBakery.rating}</span>
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-start text-gray-600">
                            <FaMapMarkerAlt className="mr-2 mt-1 text-pink-600 flex-shrink-0" />
                            <span>{premiumBakery.address}</span>
                          </div>

                          <div className="flex items-center text-gray-600">
                            <FaClock className="mr-2 text-pink-600 flex-shrink-0" />
                            <div>
                              <div>T2-T6: {premiumBakery.operatingHours.weekdays}</div>
                              <div>T7-CN: {premiumBakery.operatingHours.weekend}</div>
                            </div>
                          </div>

                          <div className="flex items-center text-gray-600">
                            <FaPhone className="mr-2 text-pink-600 flex-shrink-0" />
                            <span>{premiumBakery.phone}</span>
                          </div>
                        </div>

                        {/* Specialties */}
                        <div className="mb-6">
                          <p className="text-gray-500 mb-2">Chuyên môn:</p>
                          <div className="flex flex-wrap gap-2">
                            {premiumBakery.specialties.map((specialty, index) => (
                              <span key={index} className="bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="space-y-3">
                          <Link
                            href={`/store/${premiumBakery.id}`}
                            className="w-full py-3 px-6 rounded-lg font-medium transition flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white"

                          >
                            <FaStore className="mr-2" />
                            Xem cửa hàng
                          </Link>                       
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Featured Bakeries (Second Row) */}
            {featuredBakeries.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FaStar className="text-pink-500 mr-2" /> Cửa hàng nổi bật
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredBakeries.map((bakery) => (
                    <BakeryCard key={bakery.id} bakery={bakery} isFeatured={true} />
                  ))}
                </div>
              </div>
            )}

            {/* Regular Bakeries */}
            {regularBakeries.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Tất cả cửa hàng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularBakeries.map((bakery) => (
                    <BakeryCard key={bakery.id} bakery={bakery} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="text-gray-500 mb-4">
              <FaMapMarkerAlt className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Không tìm thấy cửa hàng nào</h3>
            <p className="mt-2 text-gray-500">Vui lòng thử lại với từ khóa khác.</p>
            <div className="mt-6">
              <button
                onClick={() => setSearchTerm("")}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Xem tất cả cửa hàng
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Partner Registration Section */}
      <div className="container mx-auto px-4 py-12 mt-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Left side - Image */}
            <div className="md:w-2/5 relative">
              <Image
                src="/api/placeholder/800/600"
                width={800}
                height={600}
                alt="Become a Partner Bakery"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600/30 to-yellow-500/30"></div>
            </div>

            {/* Right side - Content */}
            <div className="md:w-3/5 p-6 md:p-8 lg:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Trở thành đối tác của chúng tôi</h2>
              <p className="text-gray-600 mb-6">
                Tham gia mạng lưới các tiệm bánh hàng đầu của chúng tôi và tiếp cận hàng nghìn khách hàng tiềm năng mỗi
                ngày. Chúng tôi cung cấp các gói đối tác linh hoạt để phù hợp với quy mô và nhu cầu của cửa hàng bạn.
              </p>             

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/partner/register"
                    className="bg-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-pink-700 transition flex items-center justify-center"
                  >
                    Tham gia với chúng tôi
                  </Link>            
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
