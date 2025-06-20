"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Foodter";
import SystemBanner from "@/components/layouts/Banner";
import { Product } from "@/types/product";
import { API_URL } from "@/utils/BaseUrl";
import { useEffect, useState } from "react";

export default function CakeEcommerceLanding() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/Cakes`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* System Banner */}

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/aC309ydWJ-7kSZ7y_LAFUONG_1.6_Cover_01.png"
            alt="Beautiful decorated cake with elegant design"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <p className="text-white/90 text-sm lg:text-base font-medium tracking-wider mb-4">
                BỘ SƯU TẬP BÁNH CAO CẤP
              </p>
              <h1 className="text-white text-4xl lg:text-6xl font-light leading-tight mb-8">
                Hoàn Hảo Thủ Công
                <br />
                <span className="font-normal">cho Mọi Dịp Đặc Biệt</span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 font-medium px-8 py-3 text-base tracking-wide"
                >
                  MUA NGAY
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-gray-900 font-medium px-8 py-3 text-base tracking-wide"
                >
                  XEM THƯ VIỆN
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Mỗi chiếc bánh là một kiệt tác, được chế tác cẩn thận với nguyên
              liệu cao cấp và nghệ thuật tinh tế
            </p>
          </div>

          {/* Horizontal Scrolling Products */}
          <div className="relative">
            <div
              className="flex overflow-x-auto scrollbar-hide gap-6 pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products.map((product, index) => (
                <div
                  key={index}
                  className="flex-none w-80 group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={`${API_URL}/api/images/file/${product.thumbnailUrl}`}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{product.description}</p>
                  <p className="text-2xl font-light text-gray-900">
                    {product.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Scroll Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {[1, 2, 3].map((dot) => (
                <div
                  key={dot}
                  className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-500 cursor-pointer transition-colors"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Scroll Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Mua Theo Danh Mục
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Khám phá các bộ sưu tập chuyên biệt cho mọi dịp
            </p>
          </div>

          <div className="relative">
            <div
              className="flex overflow-x-auto scrollbar-hide gap-6 pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {[
                {
                  name: "Bánh Sinh Nhật",
                  count: "36 mẫu",
                  image: "/birthday_cake.jpg",
                },
                {
                  name: "Lễ Kỉ Niệm",
                  count: "18 mẫu",
                  image: "/custom_cake.jpg",
                },
                {
                  name: "Bánh Nhỏ",
                  count: "42 loại",
                  image: "/cup_cake.jpg",
                },
                {
                  name: "Bánh Theo Mùa",
                  count: "12 mẫu",
                  image: "/images.jpg",
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className="flex-none w-72 group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-xl font-semibold mb-1">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-sm">{category.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-6">
                Câu Chuyện Của Chúng Tôi
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                For over a decade, we've been creating extraordinary cakes that
                celebrate life's most precious moments. Each creation is a
                testament to our commitment to quality, artistry, and the joy of
                sharing something truly special.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                From intimate gatherings to grand celebrations, our cakes are
                designed to create lasting memories and bring people together
                around the sweetest moments in life.
              </p>
              <Button variant="outline" size="lg" className="font-medium">
                LEARN MORE
              </Button>
            </div>
            <div className="relative">
              <img
                src="/photo-3-16497648997512065397697.jpg"
                alt="Baker crafting a cake"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
