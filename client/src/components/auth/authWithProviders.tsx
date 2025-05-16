"use client";

import { FaFacebookF, FaInstagram, FaTiktok, FaGoogle } from "react-icons/fa";

interface SocialAuthButtonsProps {
  mode?: "login" | "register"; // tuỳ chọn, để hiển thị thông điệp tùy theo context
  onSocialClick?: (provider: string) => void;
}

const AuthWithProviders = ({
  mode = "login",
  onSocialClick,
}: SocialAuthButtonsProps) => {
  const handleClick = (provider: string) => {
    if (onSocialClick) {
      onSocialClick(provider);
    } else {
      console.log(
        `${mode === "login" ? "Đăng nhập" : "Đăng ký"} với ${provider}`
      );
    }
  };

  return (
    <>
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-3 text-gray-500 text-sm">
          Hoặc {mode === "login" ? "đăng nhập" : "đăng ký"} bằng
        </span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleClick("Facebook")}
          className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-300"
          aria-label="Facebook"
        >
          <FaFacebookF size={20} />
        </button>
        <button
          onClick={() => handleClick("Instagram")}
          className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-300"
          aria-label="Instagram"
        >
          <FaInstagram size={20} />
        </button>
        <button
          onClick={() => handleClick("TikTok")}
          className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-300"
          aria-label="TikTok"
        >
          <FaTiktok size={20} />
        </button>
        <button
          onClick={() => handleClick("Google")}
          className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-300"
          aria-label="Google"
        >
          <FaGoogle size={20} />
        </button>
      </div>
    </>
  );
};

export default AuthWithProviders;
