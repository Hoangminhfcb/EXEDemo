"use client";

import type React from "react";

import { useState, useRef } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FaArrowLeft,
  FaSave,
  FaImage,
  FaPlus,
  FaTrash,
  FaCheck,
} from "react-icons/fa";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AddProductPage({ params }: PageProps) {
  const bakeryId = (await params).id;

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    discountPrice: "",
    hasDiscount: false,
    featured: false,
    ingredients: "",
    allergens: "",
    preparationTime: "",
    customizable: false,
    availableForDelivery: true,
    availableForPickup: true,
    minOrderQuantity: "1",
    stock: "unlimited", // unlimited or limited
    stockQuantity: "",
  });

  const [productImages, setProductImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Predefined categories
  const categories = [
    "Bánh Sinh Nhật",
    "Bánh Cưới",
    "Bánh Kem",
    "Cupcake",
    "Cookies",
    "Bánh Mì Ngọt",
    "Bánh Su Kem",
    "Bánh Crepe",
    "Bánh Flan",
    "Khác",
  ];

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

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // In a real app, you would upload these files to a server
    // Here we'll just create object URLs for preview
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setProductImages([...productImages, ...newImages]);

    // Clear the input so the same file can be selected again
    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...productImages];
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newImages[index]);
    newImages.splice(index, 1);
    setProductImages(newImages);
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = "Tên sản phẩm là bắt buộc";
    if (!formData.category) newErrors.category = "Danh mục là bắt buộc";
    if (!formData.description.trim())
      newErrors.description = "Mô tả sản phẩm là bắt buộc";
    if (!formData.price.trim()) newErrors.price = "Giá sản phẩm là bắt buộc";
    else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0)
      newErrors.price = "Giá sản phẩm phải là số dương";

    if (formData.hasDiscount && formData.discountPrice.trim() === "")
      newErrors.discountPrice = "Giá khuyến mãi là bắt buộc khi có giảm giá";
    else if (
      formData.hasDiscount &&
      (isNaN(Number(formData.discountPrice)) ||
        Number(formData.discountPrice) <= 0 ||
        Number(formData.discountPrice) >= Number(formData.price))
    )
      newErrors.discountPrice =
        "Giá khuyến mãi phải là số dương và nhỏ hơn giá gốc";

    if (productImages.length === 0)
      newErrors.images = "Cần ít nhất một hình ảnh sản phẩm";

    if (formData.stock === "limited" && !formData.stockQuantity.trim())
      newErrors.stockQuantity = "Số lượng tồn kho là bắt buộc";
    else if (
      formData.stock === "limited" &&
      (isNaN(Number(formData.stockQuantity)) ||
        Number(formData.stockQuantity) < 0)
    )
      newErrors.stockQuantity = "Số lượng tồn kho phải là số không âm";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error
      const firstError = document.querySelector(".text-red-600");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, you would upload images and send data to API
      console.log("Adding product:", { ...formData, images: productImages });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      setShowSuccess(true);

      // Reset form after 2 seconds and redirect
      setTimeout(() => {
        router.push(`/bakery/${bakeryId}`);
      }, 2000);
    } catch (error) {
      console.error("Error adding product:", error);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FaCheck className="text-green-600 text-xl" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">
              Thêm sản phẩm thành công!
            </h3>
            <p className="text-gray-600 text-center">
              Sản phẩm của bạn đã được thêm vào danh sách.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link
              href={`/bakery/${bakeryId}`}
              className="text-pink-600 hover:text-pink-700 mr-4"
            >
              <FaArrowLeft />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Thêm sản phẩm mới
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
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
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.category
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-pink-200"
                  }`}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
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
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
                {formData.price && !errors.price && (
                  <p className="mt-1 text-sm text-gray-600">
                    = {formatPrice(formData.price)}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="hasDiscount"
                    name="hasDiscount"
                    checked={formData.hasDiscount}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="hasDiscount"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Có giảm giá
                  </label>
                </div>

                {formData.hasDiscount && (
                  <div>
                    <label
                      htmlFor="discountPrice"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Giá khuyến mãi (VNĐ) *
                    </label>
                    <input
                      type="text"
                      id="discountPrice"
                      name="discountPrice"
                      value={formData.discountPrice}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.discountPrice
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-pink-200"
                      }`}
                      placeholder="VD: 299000"
                    />
                    {errors.discountPrice && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.discountPrice}
                      </p>
                    )}
                    {formData.discountPrice && !errors.discountPrice && (
                      <p className="mt-1 text-sm text-gray-600">
                        = {formatPrice(formData.discountPrice)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Đánh dấu là sản phẩm nổi bật
                </label>
              </div>
              <p className="text-xs text-gray-500">
                Sản phẩm nổi bật sẽ được hiển thị ở vị trí đặc biệt trên trang
                của bạn
              </p>
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Hình ảnh sản phẩm *</h2>

            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 ${
                errors.images ? "border-red-300 bg-red-50" : "border-gray-300"
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
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        fill
                        className="object-cover"
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
                  className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FaPlus className="text-gray-400" />
                </div>
              </div>
            )}
          </div>

          {/* Additional Details */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Thông tin chi tiết</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="ingredients"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nguyên liệu
                </label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  rows={3}
                  value={formData.ingredients}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                  placeholder="VD: Bột mì, đường, trứng, sữa tươi..."
                />
              </div>

              <div>
                <label
                  htmlFor="allergens"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Thông tin dị ứng
                </label>
                <textarea
                  id="allergens"
                  name="allergens"
                  rows={3}
                  value={formData.allergens}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                  placeholder="VD: Có chứa gluten, sữa, trứng..."
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="preparationTime"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Thời gian chuẩn bị
                </label>
                <input
                  type="text"
                  id="preparationTime"
                  name="preparationTime"
                  value={formData.preparationTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                  placeholder="VD: 2 giờ, 1 ngày..."
                />
              </div>

              <div>
                <label
                  htmlFor="minOrderQuantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Số lượng đặt tối thiểu
                </label>
                <input
                  type="number"
                  id="minOrderQuantity"
                  name="minOrderQuantity"
                  value={formData.minOrderQuantity}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="customizable"
                  name="customizable"
                  checked={formData.customizable}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="customizable"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Sản phẩm có thể tùy chỉnh theo yêu cầu
                </label>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="availableForDelivery"
                  name="availableForDelivery"
                  checked={formData.availableForDelivery}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="availableForDelivery"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Có giao hàng
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="availableForPickup"
                  name="availableForPickup"
                  checked={formData.availableForPickup}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="availableForPickup"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Có lấy tại cửa hàng
                </label>
              </div>
            </div>
          </div>

          {/* Inventory Management */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Quản lý tồn kho</h2>

            <div className="mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="stockUnlimited"
                    name="stock"
                    value="unlimited"
                    checked={formData.stock === "unlimited"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                  />
                  <label
                    htmlFor="stockUnlimited"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Không giới hạn
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="stockLimited"
                    name="stock"
                    value="limited"
                    checked={formData.stock === "limited"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                  />
                  <label
                    htmlFor="stockLimited"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Có giới hạn
                  </label>
                </div>
              </div>
            </div>

            {formData.stock === "limited" && (
              <div>
                <label
                  htmlFor="stockQuantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Số lượng tồn kho *
                </label>
                <input
                  type="number"
                  id="stockQuantity"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.stockQuantity
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-pink-200"
                  }`}
                />
                {errors.stockQuantity && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.stockQuantity}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link
              href={`/bakery/${bakeryId}`}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Hủy
            </Link>
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
  );
}
