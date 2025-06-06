"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import CakeImageSwiper from "@/components/layouts/CakeImageSwiper";
import { API_URL } from "@/utils/BaseUrl";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  thumbnailUrl?: string;
  images?: string[];
  category?: { name: string };
}

interface CakeDetailClientProps {
  id: string;
}

export default function CakeDetailClient({ id }: CakeDetailClientProps) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/Cakes/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not Found");
        return res.json();
      })
      .then(setProduct)
      .catch(() => setProduct(null));
    window.scrollTo(0, 0);
  }, [id]);

  if (product === null) return <p>Đang tải...</p>;
  if (!product) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      {product.images && (
        <CakeImageSwiper
          images={
            product.thumbnailUrl
              ? [product.thumbnailUrl, ...(product.images || [])]
              : product.images
          }
        />
      )}
      <p className="mb-2">
        <strong>Giá:</strong> {product.price}₫
      </p>
      <p className="mb-2">
        <strong>Danh mục:</strong> {product.category?.name || "N/A"}
      </p>
      <p>
        <strong>Mô tả:</strong> {product.description}
      </p>
    </div>
  );
}
