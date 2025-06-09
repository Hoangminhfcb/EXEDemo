"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FaCheck,
  FaImage,
  FaPlus,
  FaSave,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import { getCategories } from "@/services/categoryService";
import { Category } from "@/types/bakery";
import { fetchInterceptor } from "@/utils/Interceptor";
import { API_URL } from "@/utils/BaseUrl";
import { getBakeryByUserSignIn } from "@/services/bakeryService";
import toast from "react-hot-toast";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onSuccess,
}: AddProductModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    description: "",
    price: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [bakeryId, setBakeryId] = useState<string>("");

  useEffect(() => {
    if (!isOpen) return;

    const fetchCategories = async () => {
      const res = await getCategories();
      setCategories(res.data || []);
    };

    const fetchBakery = async () => {
      try {
        const myBakery = await getBakeryByUserSignIn();
        // console.log("My Bakery Data:", myBakery, JSON.stringify(myBakery));

        if (myBakery && myBakery.id) {
          setBakeryId(myBakery.id);
        } else {
          console.warn("Bakery not found or empty response.");
        }
      } catch (error) {
        console.error("Error fetching bakery:", error);
      }
    };

    fetchBakery();
    fetchCategories();
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        categoryId: "",
        description: "",
        price: "",
      });
      setProductImages([]);
      setErrors({});
    }
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setProductImages([...productImages, ...newImages]);

    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...productImages];
    URL.revokeObjectURL(newImages[index]);
    newImages.splice(index, 1);
    setProductImages(newImages);
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = "Tên sản phẩm là bắt buộc";
    if (!formData.categoryId) newErrors.category = "Danh mục là bắt buộc";
    if (!formData.description.trim())
      newErrors.description = "Mô tả sản phẩm là bắt buộc";
    if (!formData.price.trim()) newErrors.price = "Giá sản phẩm là bắt buộc";
    else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0)
      newErrors.price = "Giá sản phẩm phải là số dương";

    if (productImages.length === 0)
      newErrors.images = "Cần ít nhất một hình ảnh sản phẩm";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // 1. Upload images trước
      const uploadedImageUrls: { imageUrl: string }[] = [];

      for (const image of productImages) {
        const file = await fetch(image)
          .then((res) => res.blob())
          .then((blob) => new File([blob], "image.jpg", { type: blob.type }));

        const formData = new FormData();
        formData.append("file", file);
        formData.append("subFolder", "Cakes");

        const res = await fetch(`${API_URL}/api/images/upload`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload ảnh thất bại");
        const data = await res.json();

        uploadedImageUrls.push({ imageUrl: data.filePath });
      }

      // 2. Gửi data sản phẩm kèm theo URLs ảnh
      const productData = {
        ...formData,
        images: uploadedImageUrls,
        thumbnailUrl: uploadedImageUrls[0].imageUrl,
        bakeryId: bakeryId,
      };

      console.log("Sending product data:", productData);

      await fetch(`${API_URL}/api/Cakes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error("Lỗi tạo bánh!", {
        duration: 4000,
        position: "top-right",
      });
      setErrors({
        ...errors,
        submit: "Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: string) => {
    if (!price) return "";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(price));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleBackdropClick}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Thêm sản phẩm mới
            </h1>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Basic Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-6">Thông tin cơ bản</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Tên sản phẩm *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.name
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-pink-200"
                      }`}
                      placeholder="VD: Bánh Sinh Nhật Hoa Tươi"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Danh mục *
                    </label>
                    <select
                      id="category"
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.category
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-pink-200"
                      }`}
                    >
                      <option value="">-- Chọn danh mục --</option>
                      {categories.map((category: Category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.category}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mô tả sản phẩm *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.description
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-pink-200"
                    }`}
                    placeholder="Mô tả chi tiết về sản phẩm của bạn..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Giá sản phẩm (VNĐ) *
                    </label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.price
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-pink-200"
                      }`}
                      placeholder="VD: 350000"
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.price}
                      </p>
                    )}
                    {formData.price && !errors.price && (
                      <p className="mt-1 text-sm text-gray-600">
                        = {formatPrice(formData.price)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Images */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-6">
                  Hình ảnh sản phẩm *
                </h2>

                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    errors.images
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <FaImage className="mx-auto text-gray-400 text-3xl mb-2" />
                  <p className="text-sm text-gray-600">
                    Nhấp để chọn hoặc kéo thả hình ảnh vào đây
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Hỗ trợ: JPG, PNG, GIF (Tối đa 5MB/ảnh)
                  </p>
                </div>
                {errors.images && (
                  <p className="mt-1 text-sm text-red-600">{errors.images}</p>
                )}

                {productImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                    {productImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Product ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTrash className="text-red-500 w-3 h-3" />
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-1 left-1 bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
                            Ảnh chính
                          </div>
                        )}
                      </div>
                    ))}
                    <div
                      className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FaPlus className="text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition flex items-center disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang thêm...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" />
                      Thêm sản phẩm
                    </>
                  )}
                </button>
              </div>

              {errors.submit && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {errors.submit}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
