"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaSave, FaUpload, FaTimes } from "react-icons/fa";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBakeryPage({ params }: PageProps) {
  const bakeryId = (await params).id;
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    weekdaysHours: "",
    weekendHours: "",
    specialties: [] as string[],
    facebook: "",
    instagram: "",
  });

  const [newSpecialty, setNewSpecialty] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockBakery = {
      name: "Sweet Dreams Bakery",
      description:
        "Sweet Dreams Bakery là tiệm bánh gia đình với hơn 15 năm kinh nghiệm trong việc tạo ra những chiếc bánh ngon và đẹp mắt.",
      address: "47/45 Nguyễn Tư Giản, Gò Vấp, TP.HCM",
      phone: "028 3123 4567",
      email: "contact@sweetdreams.vn",
      website: "www.sweetdreams.vn",
      weekdaysHours: "06:00 - 22:00",
      weekendHours: "06:00 - 23:00",
      specialties: ["Bánh Sinh Nhật", "Bánh Cưới", "Bánh Kem", "Cupcake"],
      facebook: "facebook.com/sweetdreams",
      instagram: "instagram.com/sweetdreams",
    };

    setFormData(mockBakery);
  }, [bakeryId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleAddSpecialty = () => {
    if (
      newSpecialty.trim() &&
      !formData.specialties.includes(newSpecialty.trim())
    ) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, newSpecialty.trim()],
      });
      setNewSpecialty("");
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter((s) => s !== specialty),
    });
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = "Tên tiệm bánh là bắt buộc";
    if (!formData.description.trim())
      newErrors.description = "Mô tả là bắt buộc";
    if (!formData.address.trim()) newErrors.address = "Địa chỉ là bắt buộc";
    if (!formData.phone.trim()) newErrors.phone = "Số điện thoại là bắt buộc";
    if (!formData.email.trim()) newErrors.email = "Email là bắt buộc";
    if (!formData.weekdaysHours.trim())
      newErrors.weekdaysHours = "Giờ mở cửa trong tuần là bắt buộc";
    if (!formData.weekendHours.trim())
      newErrors.weekendHours = "Giờ mở cửa cuối tuần là bắt buộc";

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Phone validation
    if (formData.phone && !/^[0-9\s\-+$$$$]+$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

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
      // In real app, send data to API
      console.log("Updating bakery:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect back to bakery page
      router.push(`/bakery/${bakeryId}`);
    } catch (error) {
      console.error("Error updating bakery:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              Chỉnh sửa thông tin tiệm bánh
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Thông tin cơ bản</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tên tiệm bánh *
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
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-pink-200"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-pink-200"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Địa chỉ *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.address
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-pink-200"
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            <div className="mt-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mô tả tiệm bánh *
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
                placeholder="Mô tả về tiệm bánh của bạn, chuyên môn, kinh nghiệm..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Giờ mở cửa</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="weekdaysHours"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Thứ 2 - Thứ 6 *
                </label>
                <input
                  type="text"
                  id="weekdaysHours"
                  name="weekdaysHours"
                  value={formData.weekdaysHours}
                  onChange={handleInputChange}
                  placeholder="VD: 06:00 - 22:00"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.weekdaysHours
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-pink-200"
                  }`}
                />
                {errors.weekdaysHours && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.weekdaysHours}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="weekendHours"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Thứ 7 - Chủ nhật *
                </label>
                <input
                  type="text"
                  id="weekendHours"
                  name="weekendHours"
                  value={formData.weekendHours}
                  onChange={handleInputChange}
                  placeholder="VD: 06:00 - 23:00"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.weekendHours
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-pink-200"
                  }`}
                />
                {errors.weekendHours && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.weekendHours}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Chuyên môn</h2>

            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  placeholder="Thêm chuyên môn mới"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddSpecialty())
                  }
                />
                <button
                  type="button"
                  onClick={handleAddSpecialty}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
                >
                  Thêm
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {specialty}
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecialty(specialty)}
                    className="ml-2 text-pink-600 hover:text-pink-800"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Mạng xã hội</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="facebook"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Facebook
                </label>
                <input
                  type="text"
                  id="facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  placeholder="facebook.com/yourpage"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>

              <div>
                <label
                  htmlFor="instagram"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Instagram
                </label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="instagram.com/yourpage"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Hình ảnh</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh bìa
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FaUpload className="mx-auto text-gray-400 text-2xl mb-2" />
                  <p className="text-sm text-gray-600">
                    Kéo thả ảnh hoặc nhấp để chọn
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Kích thước khuyến nghị: 1200x400px
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FaUpload className="mx-auto text-gray-400 text-2xl mb-2" />
                  <p className="text-sm text-gray-600">
                    Kéo thả ảnh hoặc nhấp để chọn
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Kích thước khuyến nghị: 200x200px
                  </p>
                </div>
              </div>
            </div>
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
                  Đang lưu...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Lưu thay đổi
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
