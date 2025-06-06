"use client";
import {
  getProfileByUserSignIn,
  updateProfile,
} from "@/services/profileService";
import { get } from "lodash";
import { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaLock,
  FaEdit,
  FaSave,
  FaYoutube,
  FaFacebook,
  FaPhone,
  FaCamera,
  FaEye,
  FaEyeSlash,
  FaLinkedin,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

interface UserProfile {
  id?: string;
  avatar: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  fullName?: string;
  email?: string;
  address?: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile = () => {
  const [user, setUser] = useState<UserProfile>({
    avatar:
      "https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-web-programmer-avatar-png-image_12529205.png",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    fullName: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      const loadingToast = toast.loading("Đang tải thông tin hồ sơ...", {
        position: "top-right",
      });

      try {
        const response = await getProfileByUserSignIn();

        const profileData = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          avatar:
            response.profileImageUrl ||
            "https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-web-programmer-avatar-png-image_12529205.png",
          phoneNumber: response.phoneNumber || "Chưa cập nhật",
          email: response.email || "Chưa cập nhật",
          address: response.address || "Chưa cập nhật",
          fullName: `${response.firstName} ${response.lastName}`.trim(),
        };

        setUser(profileData);

        toast.dismiss(loadingToast);
        toast.success("Tải thông tin hồ sơ thành công!", {
          duration: 2000,
          position: "top-right",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.dismiss(loadingToast);
        toast.error("Không thể tải thông tin hồ sơ. Vui lòng thử lại!", {
          duration: 4000,
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState<UserProfile>({ ...user });
  const [activeTab, setActiveTab] = useState("profile");
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleEdit = () => {
    setIsEditing(true);
    setTempUser({ ...user });
  };

  const handleSave = async () => {
    if (!tempUser.firstName.trim() || !tempUser.lastName.trim()) {
      toast.error("Họ và tên không được để trống!", {
        duration: 4000,
        position: "top-right",
      });
      return;
    }

    const saveToast = toast.loading("Đang lưu thông tin...", {
      position: "top-right",
    });

    try {
      const formData = new FormData();
      const profileData = {
        firstName: tempUser.firstName,
        lastName: tempUser.lastName,
        phoneNumber: tempUser.phoneNumber || "",
        address: tempUser.address || "",
      };

      formData.append("request", JSON.stringify(profileData));

      if (
        tempUser.avatar !== user.avatar &&
        tempUser.avatar.startsWith("data:")
      ) {
        const fileInput = document.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        const file = fileInput?.files?.[0];
        if (file) {
          if (file.size > 5 * 1024 * 1024) {
            toast.dismiss(saveToast);
            toast.error("File ảnh quá lớn! Vui lòng chọn file nhỏ hơn 5MB.", {
              duration: 4000,
              position: "top-right",
            });
            return;
          }
          if (!file.type.startsWith("image/")) {
            toast.dismiss(saveToast);
            toast.error("Vui lòng chọn file ảnh hợp lệ!", {
              duration: 4000,
              position: "top-right",
            });
            return;
          }
          formData.append("avatar", file);
        }
      }

      const response = await updateProfile(formData);
      setUser({
        ...tempUser,
        id: response.id || tempUser.id,
        firstName: response.firstName || tempUser.firstName,
        lastName: response.lastName || tempUser.lastName,
        avatar: response.avatar || tempUser.avatar,
        phoneNumber: response.phoneNumber || "",
      });
      setIsEditing(false);

      toast.dismiss(saveToast);
      toast.success("Cập nhật hồ sơ thành công! 🎉", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#10B981",
          color: "#fff",
        },
      });
    } catch (error: any) {
      toast.dismiss(saveToast);
      toast.error(
        error.message || "Cập nhật hồ sơ thất bại. Vui lòng thử lại!",
        {
          duration: 4000,
          position: "top-right",
        }
      );
      console.error("Error saving profile:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempUser({ ...user });
    toast("Đã hủy chỉnh sửa", {
      icon: "↩️",
      duration: 2000,
      position: "top-right",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempUser({
      ...tempUser,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File ảnh quá lớn! Vui lòng chọn file nhỏ hơn 5MB.", {
          duration: 4000,
          position: "top-right",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Vui lòng chọn file ảnh hợp lệ!", {
          duration: 4000,
          position: "top-right",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setTempUser({
          ...tempUser,
          avatar: reader.result as string,
        });
        toast.success("Đã chọn ảnh đại diện mới!", {
          duration: 2000,
          position: "top-right",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const handleSubmitPasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password
    if (passwordForm.newPassword.length < 8) {
      toast.error("Mật khẩu mới phải có ít nhất 8 ký tự!", {
        duration: 4000,
        position: "top-right",
      });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!", {
        duration: 4000,
        position: "top-right",
      });
      return;
    }

    const changePasswordToast = toast.loading("Đang đổi mật khẩu...", {
      position: "top-right",
    });

    // Giả lập API call
    setTimeout(() => {
      toast.dismiss(changePasswordToast);
      toast.success("Đổi mật khẩu thành công! 🔐", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#10B981",
          color: "#fff",
        },
      });

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Đang tải thông tin hồ sơ...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Toast Container */}
      <Toaster
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            fontSize: "14px",
            borderRadius: "8px",
            padding: "12px 16px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="min-h-screen from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3">
                Tài khoản
              </h2>
              <ul className="space-y-3">
                <li
                  className={`flex items-center gap-3 font-medium p-2 rounded-lg transition cursor-pointer ${
                    activeTab === "profile"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <FaUserCircle className="text-lg" />
                  <span>Hồ sơ cá nhân</span>
                </li>
                <li
                  className={`flex items-center gap-3 font-medium p-2 rounded-lg transition cursor-pointer ${
                    activeTab === "password"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("password")}
                >
                  <FaLock className="text-lg" />
                  <span>Đổi mật khẩu</span>
                </li>
              </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
              {activeTab === "profile" && (
                <div className="bg-white rounded-xl shadow-md p-8">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                      Hồ sơ cá nhân
                    </h1>
                    {isEditing ? (
                      <div className="flex gap-3">
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition"
                        >
                          Hủy
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition flex items-center gap-2"
                        >
                          <FaSave /> Lưu thay đổi
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleEdit}
                        className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition flex items-center gap-2"
                      >
                        <FaEdit /> Chỉnh sửa
                      </button>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center">
                      <div className="relative group">
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                          <img
                            src={isEditing ? tempUser.avatar : user.avatar}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-web-programmer-avatar-png-image_12529205.png";
                            }}
                          />
                        </div>
                        {isEditing && (
                          <label className="absolute bottom-2 right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition shadow-md">
                            <FaCamera className="text-white text-lg" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleAvatarChange}
                            />
                          </label>
                        )}
                      </div>
                      <h2 className="mt-4 text-xl font-semibold text-gray-800">
                        {`${user.firstName} ${user.lastName}`}
                      </h2>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Họ
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="firstName"
                              value={tempUser.firstName}
                              onChange={handleInputChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                              placeholder="Nhập họ của bạn"
                            />
                          ) : (
                            <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                              {user.firstName || "Chưa cập nhật"}
                            </div>
                          )}
                        </div>

                        {/* Last Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tên
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="lastName"
                              value={tempUser.lastName}
                              onChange={handleInputChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                              placeholder="Nhập tên của bạn"
                            />
                          ) : (
                            <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                              {user.lastName || "Chưa cập nhật"}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <FaPhone className="inline mr-2 text-gray-500" />
                          Số điện thoại
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="phoneNumber"
                            value={tempUser.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Nhập số điện thoại"
                          />
                        ) : (
                          <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                            {user.phoneNumber || "Chưa cập nhật"}
                          </div>
                        )}
                      </div>

                      {/* Email (Read Only) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 cursor-not-allowed opacity-70">
                          {user.email || "Chưa cập nhật"}
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Địa chỉ
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="address"
                            value={tempUser.address}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Nhập địa chỉ của bạn"
                          />
                        ) : (
                          <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                            {user.address || "Chưa cập nhật"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "password" && (
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Đổi mật khẩu
                  </h1>
                  <p className="text-gray-600 mb-6">
                    Cập nhật mật khẩu của bạn để bảo mật tài khoản
                  </p>

                  <form
                    onSubmit={handleSubmitPasswordChange}
                    className="space-y-6 max-w-md"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mật khẩu hiện tại
                      </label>
                      <div className="relative">
                        <input
                          type={
                            showPassword.currentPassword ? "text" : "password"
                          }
                          name="currentPassword"
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                          onClick={() =>
                            togglePasswordVisibility("currentPassword")
                          }
                        >
                          {showPassword.currentPassword ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mật khẩu mới
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword.newPassword ? "text" : "password"}
                          name="newPassword"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                          onClick={() =>
                            togglePasswordVisibility("newPassword")
                          }
                        >
                          {showPassword.newPassword ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Mật khẩu phải có ít nhất 8 ký tự
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Xác nhận mật khẩu mới
                      </label>
                      <div className="relative">
                        <input
                          type={
                            showPassword.confirmPassword ? "text" : "password"
                          }
                          name="confirmPassword"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                          onClick={() =>
                            togglePasswordVisibility("confirmPassword")
                          }
                        >
                          {showPassword.confirmPassword ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition flex items-center gap-2"
                      >
                        <FaLock /> Cập nhật mật khẩu
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
