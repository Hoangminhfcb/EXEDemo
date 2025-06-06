"use client";

import Banner from "@/components/layouts/Banner";
import ProductCard from "@/components/layouts/ProductCard";
import CategoryPills from "@/components/ui/CategoryPills";
import Loading from "@/components/ui/Loading";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Cake } from "@/types/product";
import { API_URL } from "@/utils/BaseUrl";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState<Cake[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(""); // empty = all
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const url =
      selectedCategoryId === ""
        ? `${API_URL}/api/Cakes`
        : `${API_URL}/api/Cakes/Category/${selectedCategoryId}`;
    setLoading(true);

    const fetchProducts = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi lấy bánh:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategoryId]);

  return (
    <>
      <CategoryPills
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={setSelectedCategoryId}
      />
      {loading && <Loading />}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 && !loading && <p>Không có sản phẩm nào.</p>}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
