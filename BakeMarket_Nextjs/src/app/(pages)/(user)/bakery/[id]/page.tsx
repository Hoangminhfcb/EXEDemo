"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaStar,
  FaEdit,
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
import { Bakery } from "@/types/bakery";
import NavigationTabs from "@/components/bakery/NavigationTabs";
import OverviewTab from "@/components/bakery/OverviewTab";
import AllProducts from "@/components/bakery/AllProducts";
import { Product } from "@/types/product";
import { PageProps } from "@/types/ResponseData";
import { se } from "date-fns/locale";
import StatisticCards from "@/components/bakery/StatisticCards";

export default function BakeryPage({ params }: PageProps) {
  const [bakery, setBakery] = useState<Bakery>();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [bakeryId, setBakeryId] = useState<string>();

  useEffect(() => {
    const fetchBakery = async () => {
      try {
        const myBakery = await getBakeryByUserSignIn();

        if (myBakery && myBakery.id) {
          setBakery(myBakery);
          setBakeryId(myBakery.id);
        } else {
          console.warn("Bakery not found or empty response.");
        }
      } catch (error) {
        console.error("Error fetching bakery:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/cakes/bakery/${bakeryId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchBakery();
    if (bakeryId) {
      fetchProducts();
    }
  }, [bakeryId]);

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
          src={bakery.coverImageUrl || "/placeholder.svg"}
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
                  src={bakery.logoImageUrl || "/placeholder.svg"}
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
                    {bakery.isVerified && (
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
                      {products.length} sản phẩm
                    </span>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                  <Link
                    href={`/bakery/${bakeryId}/dashboard`}
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition flex items-center justify-center"
                  >
                    <FaChartLine className="mr-2" /> Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatisticCards
        totalProducts={products.length}
        totalOrders={0}
        totalRevenue={0}
        totalReviews={0}
      />
      {/* Navigation Tabs */}
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content */}
      <div className="container mx-auto px-4 pb-12">
        {activeTab === "overview" && (
          <OverviewTab bakery={bakery} products={products} />
        )}

        {activeTab === "products" && bakeryId && (
          <AllProducts bakeryId={bakeryId} />
        )}
      </div>
    </div>
  );
}
