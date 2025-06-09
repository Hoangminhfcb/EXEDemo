"use client";

import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import { useState } from "react";
import AddProductModal from "../modals/AddProductModal";

export default function FeaturedProducts({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Sản phẩm nổi bật</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.slice(0, 2).map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm p-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
