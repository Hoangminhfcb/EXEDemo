"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaStar,
  FaEdit,
  FaPlus,
  FaEye,
  FaHeart,
  FaShare,
  FaCrown,
  FaChartLine,
  FaShoppingCart,
} from "react-icons/fa";
import { API_URL } from "@/utils/BaseUrl";
import { getBakeryByUserSignIn } from "@/services/bakeryService";
import { set } from "lodash";

interface PageProps {
  params: Promise<{ id: string }>;
}
export default function BakeryPage({ params }: PageProps) {
  const bakeryId = use(params).id;

  const [bakery, setBakery] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isOwner, setIsOwner] = useState(false); // In real app, check if current user owns this bakery

  useEffect(() => {
    // const fetchBakery = async () => {
    //   try {
    //     const myBakery = await getBakeryByUserSignIn();
    //     console.log("My Bakery Data:", myBakery, JSON.stringify(myBakery));

    //     if (myBakery && myBakery.id) {
    //       // setBakery(myBakery);
    //       // setIsOwner(true); // Nếu đúng user đăng nhập
    //     } else {
    //       console.warn("Bakery not found or empty response.");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching bakery:", error);
    //   }
    // };

    // fetchBakery();
    // Mock data - in real app, fetch from API
    const mockBakery = {
      id: bakeryId,
      name: "Sweet Dreams Bakery",
      slug: "sweet-dreams-bakery",
      description:
        "Sweet Dreams Bakery là tiệm bánh gia đình với hơn 15 năm kinh nghiệm trong việc tạo ra những chiếc bánh ngon và đẹp mắt. Chúng tôi chuyên về bánh sinh nhật, bánh cưới và các loại bánh ngọt cao cấp.",
      address: "47/45 Nguyễn Tư Giản, Gò Vấp, TP.HCM",
      phone: "028 3123 4567",
      email: "contact@sweetdreams.vn",

      coverImage: "/api/placeholder/1200/400",
      logo: "/api/placeholder/200/200",
      gallery: [
        "/api/placeholder/400/300",
        "/api/placeholder/400/300",
        "/api/placeholder/400/300",
        "/api/placeholder/400/300",
      ],
      specialties: ["Bánh Sinh Nhật", "Bánh Cưới", "Bánh Kem", "Cupcake"],
      rating: 4.8,
      reviewCount: 256,
      totalProducts: 45,
      totalOrders: 1250,
      memberSince: "2020-01-15",
      premium: true,
      verified: true,
      socialMedia: {
        facebook: "facebook.com/sweetdreams",
        instagram: "instagram.com/sweetdreams",
      },
      stats: {
        views: 15420,
        favorites: 892,
        orders: 1250,
        rating: 4.8,
      },
      owner: {
        name: "Nguyễn Thị Lan",
        avatar: "/api/placeholder/100/100",
        title: "Chủ tiệm bánh",
        experience: "15 năm kinh nghiệm",
      },
    };

    const mockProducts = [
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
        featured: true,
      },
      {
        id: 2,
        name: "Bánh Cưới Sang Trọng",
        image: "/images/cake2.jpg",
        price: 1200000,
        discountPrice: 999000,
        discount: true,
        category: "Bánh Cưới",
        rating: 4.9,
        reviewCount: 89,
        featured: true,
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
        featured: false,
      },
      {
        id: 4,
        name: "Bánh Kem Socola",
        image: "/images/cake4.jpg",
        price: 280000,
        discountPrice: null,
        discount: false,
        category: "Bánh Kem",
        rating: 4.6,
        reviewCount: 54,
        featured: false,
      },
    ];

    const mockReviews = [
      {
        id: 1,
        customerName: "Nguyễn Văn A",
        avatar: "/api/placeholder/50/50",
        rating: 5,
        comment: "Bánh rất ngon và đẹp mắt. Dịch vụ tuyệt vời!",
        date: "2024-01-15",
        productName: "Bánh Sinh Nhật Hoa Tươi",
      },
      {
        id: 2,
        customerName: "Trần Thị B",
        avatar: "/api/placeholder/50/50",
        rating: 5,
        comment: "Bánh cưới của tôi rất hoàn hảo. Cảm ơn Sweet Dreams!",
        date: "2024-01-10",
        productName: "Bánh Cưới Sang Trọng",
      },
      {
        id: 3,
        customerName: "Lê Văn C",
        avatar: "/api/placeholder/50/50",
        rating: 4,
        comment: "Chất lượng tốt, giao hàng đúng giờ.",
        date: "2024-01-08",
        productName: "Cupcake Bơ Vani",
      },
    ];

    setBakery(mockBakery);
    setProducts(mockProducts);
    setReviews(mockReviews);
    setIsOwner(true); // Mock - in real app, check authentication
  }, [bakeryId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  if (!bakery) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <Image
          src={bakery.coverImage || "/placeholder.svg"}
          alt={bakery.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Action buttons overlay */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-white/90 text-gray-700 p-2 rounded-full hover:bg-white transition">
            <FaShare />
          </button>
          <button className="bg-white/90 text-gray-700 p-2 rounded-full hover:bg-white transition">
            <FaHeart />
          </button>
          {isOwner && (
            <Link
              href={`/bakery/${bakeryId}/edit`}
              className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition"
            >
              <FaEdit />
            </Link>
          )}
        </div>
      </div>

      {/* Bakery Info Header */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row">
            {/* Logo */}
            <div className="md:mr-6 mb-4 md:mb-0 flex justify-center md:block">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
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
                  <div className="flex items-center mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mr-3">
                      {bakery.name}
                    </h1>
                    {bakery.premium && (
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <FaCrown className="mr-1" /> Premium
                      </span>
                    )}
                    {bakery.verified && (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium ml-2">
                        ✓ Đã xác minh
                      </span>
                    )}
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.floor(bakery.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600 font-medium">
                        {bakery.rating}
                      </span>
                    </div>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="text-gray-600">
                      {bakery.reviewCount} đánh giá
                    </span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="text-gray-600">
                      {bakery.totalProducts} sản phẩm
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{bakery.description}</p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {bakery.specialties.map(
                      (specialty: string, index: number) => (
                        <span
                          key={index}
                          className="bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                  {isOwner && (
                    <Link
                      href={`/bakery/${bakeryId}/dashboard`}
                      className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition flex items-center justify-center"
                    >
                      <FaChartLine className="mr-2" /> Dashboard
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <FaEye className="text-blue-600 text-2xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {bakery.stats.views.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Lượt xem</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <FaHeart className="text-red-600 text-2xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {bakery.stats.favorites.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Yêu thích</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <FaShoppingCart className="text-green-600 text-2xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {bakery.stats.orders.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Đơn hàng</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <FaStar className="text-yellow-600 text-2xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {bakery.stats.rating}
            </div>
            <div className="text-sm text-gray-600">Đánh giá</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex overflow-x-auto">
            {[
              { id: "overview", name: "Tổng quan", icon: <FaEye /> },
              { id: "products", name: "Sản phẩm", icon: <FaShoppingCart /> },
              { id: "reviews", name: "Đánh giá", icon: <FaStar /> },
              { id: "gallery", name: "Thư viện", icon: <FaHeart /> },
              { id: "contact", name: "Liên hệ", icon: <FaPhone /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-pink-600 border-b-2 border-pink-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 pb-12">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Products */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Sản phẩm nổi bật</h2>
                  {isOwner && (
                    <Link
                      href={`/bakery/${bakeryId}/products/add`}
                      className="text-pink-600 hover:text-pink-700 flex items-center text-sm"
                    >
                      <FaPlus className="mr-1" /> Thêm sản phẩm
                    </Link>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products
                    .filter((p) => p.featured)
                    .map((product) => (
                      <div
                        key={product.id}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
                      >
                        <div className="relative h-48">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                          {product.discount && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                              Giảm giá
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">{product.name}</h3>
                          <div className="flex items-center mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= Math.floor(product.rating)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-sm text-gray-600">
                              ({product.reviewCount})
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
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
                                <span className="text-lg font-bold text-pink-600">
                                  {formatPrice(product.price)}
                                </span>
                              )}
                            </div>
                            <Link
                              href={`/productDetail/${product.id}`}
                              className="text-pink-600 hover:text-pink-700 text-sm font-medium"
                            >
                              Xem chi tiết
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Owner Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Thông tin chủ tiệm
                </h3>
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={bakery.owner.avatar || "/placeholder.svg"}
                      alt={bakery.owner.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{bakery.owner.name}</h4>
                    <p className="text-sm text-gray-600">
                      {bakery.owner.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {bakery.owner.experience}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Thành viên từ: {formatDate(bakery.memberSince)}
                </p>
              </div>

              {/* Recent Reviews */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Đánh giá gần đây</h3>
                <div className="space-y-4">
                  {reviews.slice(0, 3).map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 pb-4 last:border-b-0"
                    >
                      <div className="flex items-center mb-2">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                          <Image
                            src={review.avatar || "/placeholder.svg"}
                            alt={review.customerName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {review.customerName}
                          </p>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Tất cả sản phẩm ({products.length})
              </h2>
              {isOwner && (
                <Link
                  href={`/bakery/${bakeryId}/products/add`}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition flex items-center"
                >
                  <FaPlus className="mr-2" /> Thêm sản phẩm mới
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  <div className="relative h-48">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                        Giảm giá
                      </div>
                    )}
                    {isOwner && (
                      <div className="absolute top-2 right-2">
                        <Link
                          href={`/bakery/${bakeryId}/products/${product.id}/edit`}
                          className="bg-white/90 text-gray-700 p-1 rounded-full hover:bg-white transition"
                        >
                          <FaEdit className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {product.category}
                    </p>
                    <div className="flex items-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm text-gray-600">
                        ({product.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
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
                          <span className="text-lg font-bold text-pink-600">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/productDetail/${product.id}`}
                        className="text-pink-600 hover:text-pink-700 text-sm font-medium"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">
              Đánh giá từ khách hàng ({reviews.length})
            </h2>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-100 pb-6 last:border-b-0"
                >
                  <div className="flex items-start">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                      <Image
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.customerName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{review.customerName}</h4>
                        <span className="text-sm text-gray-500">
                          {formatDate(review.date)}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          cho {review.productName}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Thư viện hình ảnh</h2>
              {isOwner && (
                <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition flex items-center">
                  <FaPlus className="mr-2" /> Thêm ảnh
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {bakery.gallery.map((image: string, index: number) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Thông tin liên hệ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-pink-600 mr-3" />
                  <div>
                    <p className="font-medium">Địa chỉ</p>
                    <p className="text-gray-600">{bakery.address}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-pink-600 mr-3" />
                  <div>
                    <p className="font-medium">Điện thoại</p>
                    <p className="text-gray-600">{bakery.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-pink-600 mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{bakery.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaGlobe className="text-pink-600 mr-3" />
                  <div>
                    <p className="font-medium">Website</p>
                    <p className="text-gray-600">{bakery.website}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaClock className="text-pink-600 mr-3" />
                  <div>
                    <p className="font-medium">Giờ mở cửa</p>
                    <p className="text-gray-600">
                      T2-T6: {bakery.operatingHours.weekdays}
                    </p>
                    <p className="text-gray-600">
                      T7-CN: {bakery.operatingHours.weekend}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-2">Mạng xã hội</p>
                  <div className="flex space-x-3">
                    <a
                      href={`https://${bakery.socialMedia.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <FaFacebook className="text-2xl" />
                    </a>
                    <a
                      href={`https://${bakery.socialMedia.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-700"
                    >
                      <FaInstagram className="text-2xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
