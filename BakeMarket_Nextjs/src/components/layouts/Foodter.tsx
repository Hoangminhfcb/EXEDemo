import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Peu d'amour</h3>
            <p className="mb-4">
              Trang web kết nối những người yêu thích bánh ngọt với các tiệm
              bánh địa phương. Tại đây, bạn có thể tìm thấy những chiếc bánh
              tươi ngon, được làm thủ công từ các nguyên liệu chất lượng nhất.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <FaFacebookF className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <FaInstagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <FaTiktok className="w-6 h-6" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Về chúng tôi</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Tin tức
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Phương thức thanh toán
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaMapMarkerAlt className="w-5 h-5 mr-2 mt-0.5" />
                <span>Hòa Hải, Ngũ Hành Sơn, Đà Nẵng</span>
              </li>
              <li className="flex items-start flex-wrap">
                <IoMdMail className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="break-words">contact@Peud'amour.com</span>
              </li>
              <li className="flex items-start">
                <FaPhoneAlt className="w-5 h-5 mr-2 mt-0.5" />
                <span>0123.456.789</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© 2025 Peu d'amour. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
