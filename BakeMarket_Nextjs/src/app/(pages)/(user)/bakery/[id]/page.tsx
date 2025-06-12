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
import NavigationTabs from "@/components/bakery/NavigationTabs";
import OverviewTab from "@/components/bakery/OverviewTab";
import AllProducts from "@/components/bakery/AllProducts";
import { PageProps } from "@/types/ResponseData";
import {
  getBakeryByUserSignIn,
  getBakeryDetail,
  getCakesByBakery,
} from "@/services/bakeryService";
import { Bakery } from "@/types/bakery";
import { Product } from "@/types/product";
import { API_URL } from "@/utils/BaseUrl";

export default function BakeryPage({ params }: PageProps) {
  const Id = use(params).id;

  const [bakery, setBakery] = useState<Bakery>();
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isOwner, setIsOwner] = useState(false); // In real app, check if current user owns this bakery

  useEffect(() => {
    const fetchData = async () => {
      // Method 1: Try bakery first, then user
      let bakeryData = null;
      let productsData = null;
      let isUserBakery = false;

      try {
        // First try to fetch as bakery ID
        bakeryData = await getBakeryDetail(Id);

        if (bakeryData && bakeryData.id) {
          // Successfully got bakery data
          productsData = await getCakesByBakery(Id);
          isUserBakery = false;
          setBakery(bakeryData);
          setProducts(productsData);
          setIsOwner(isUserBakery);
        } else {
          throw new Error("Not a bakery ID");
        }
      } catch (bakeryError) {
        // If bakery fetch fails, try as user ID
        try {
          bakeryData = await getBakeryByUserSignIn(); // API to get bakery by user ID
          if (bakeryData && bakeryData.id) {
            productsData = await getCakesByBakery(bakeryData.id);
            isUserBakery = true;
            setBakery(bakeryData);
            setProducts(productsData);
            setIsOwner(isUserBakery);
          } else {
            throw new Error("Not a user ID either");
          }
        } catch (userError) {
          console.error("ID is neither bakery nor user:", Id);
          return;
        }
      }
    };
    fetchData();
    // Mock data - in real app, fetch from API

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

    setReviews(mockReviews);
  }, [Id]);

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
          src={`${API_URL}/api/images/file/${bakery.coverImageUrl}`}
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
              href={`/bakery/${bakery.id}/edit`}
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
                  src={`${API_URL}/api/images/file/${bakery.coverImageUrl}`}
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
                    {bakery.isVerified && (
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <FaCrown className="mr-1" /> Premium
                      </span>
                    )}
                    {bakery.isActive && (
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
                            star <= Math.floor(bakery.averageRating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600 font-medium">
                        {bakery.averageRating}
                      </span>
                    </div>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="text-gray-600">
                      {bakery.totalReviews} đánh giá
                    </span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="text-gray-600">
                      {bakery.totalProducts} sản phẩm
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{bakery.description}</p>

                  {/* Specialties */}
                  {/* <div className="flex flex-wrap gap-2 mb-4">
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
                  </div> */}
                </div>

                {/* Contact Buttons */}
                <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                  {isOwner && (
                    <Link
                      href={`/bakery/${bakery.id}/dashboard`}
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
            <div className="text-2xl font-bold text-gray-900">{1000}</div>
            <div className="text-sm text-gray-600">Lượt xem</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <FaHeart className="text-red-600 text-2xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{500}</div>
            <div className="text-sm text-gray-600">Yêu thích</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <FaShoppingCart className="text-green-600 text-2xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {bakery.totalOrder}
            </div>
            <div className="text-sm text-gray-600">Đơn hàng</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <FaStar className="text-yellow-600 text-2xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {bakery.totalReviews}
            </div>
            <div className="text-sm text-gray-600">Đánh giá</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content */}
      <div className="container mx-auto px-4 pb-12">
        {activeTab === "overview" && (
          <OverviewTab bakery={bakery} products={products} />
        )}

        {activeTab === "products" && bakery.id && (
          <AllProducts bakeryId={bakery.id} />
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
                    <p className="text-gray-600">{bakery.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-pink-600 mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{bakery.email}</p>
                  </div>
                </div>
                {/* <div className="flex items-center">
                  <FaGlobe className="text-pink-600 mr-3" />
                  <div>
                    <p className="font-medium">Website</p>
                    <p className="text-gray-600">{bakery.website}</p>
                  </div>
                </div> */}
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaClock className="text-pink-600 mr-3" />
                  <div>
                    <p className="font-medium">Giờ mở cửa</p>
                    <p className="text-gray-600">T2-T6:</p>
                    <p className="text-gray-600">T7-CN:</p>
                  </div>
                </div>
                {/* <div>
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
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
