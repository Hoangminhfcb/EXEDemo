"use client";

import { FaPlus } from "react-icons/fa";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import AddProductModal from "../modals/AddProductModal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "@/utils/BaseUrl";

export default function AllProducts({ bakeryId }: { bakeryId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 3; // Number of products per page
  const maxPageButtons = 5; // Maximum page buttons to show at once

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/cakes/bakery/${bakeryId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [bakeryId, isModalOpen]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Slice products for current page
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddProductSuccess = () => {
    toast.success("Tạo bánh thành công", {
      duration: 3000,
      position: "top-right",
      style: {
        background: "#10B981",
        color: "#fff",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#10B981",
      },
    });
  };

  // Calculate page numbers to display
  const getPageNumbers = () => {
    const half = Math.floor(maxPageButtons / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxPageButtons - 1);

    start = Math.max(1, end - maxPageButtons + 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Tất cả sản phẩm ({products.length})
        </h2>
        <button
          className="text-pink-600 hover:text-pink-700 flex items-center text-sm"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className="mr-1" /> Thêm sản phẩm
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-8">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm p-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAddProductSuccess}
      />

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || isLoading}
          >
            Trang trước
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-pink-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setCurrentPage(page)}
              disabled={isLoading}
            >
              {page}
            </button>
          ))}

          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || isLoading}
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
}
