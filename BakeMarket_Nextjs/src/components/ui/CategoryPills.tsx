"use client";

import { API_URL } from "@/utils/BaseUrl";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface CategoryPillsProps {
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryPills({
  selectedCategoryId,
  onCategoryChange,
}: CategoryPillsProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/Categories`);
        const data = await res.json();
        setCategories([{ id: "", name: "Tất cả" }, ...data]);
      } catch (err) {
        console.error("Lỗi lấy danh mục:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="container mx-auto px-4 -mt-6 relative z-10">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`px-6 py-3 rounded-full shadow transition ${
              selectedCategoryId === cat.id
                ? "bg-pink-600 text-white hover:bg-pink-700"
                : "bg-white text-gray-800 hover:bg-pink-600 hover:text-white"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
}
