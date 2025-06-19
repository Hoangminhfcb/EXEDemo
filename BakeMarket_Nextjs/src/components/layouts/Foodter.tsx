import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-15 h-15 bg-pink-600 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src="/489729664_1044120057678678_3768152540585589613_n.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-white-900">
                PEU D AMOUR
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Tạo ra những chiếc bánh đẹp mắt, thơm ngon cho những khoảnh khắc
              ngọt ngào nhất của cuộc sống. Thủ công với tình yêu từ năm 2014.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Liên Kết Nhanh</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/products"
                  className="hover:text-white transition-colors"
                >
                  Tất Cả Sản Phẩm
                </Link>
              </li>
              <li>
                <Link
                  href="/custom"
                  className="hover:text-white transition-colors"
                >
                  Đặt Hàng Riêng
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-white transition-colors"
                >
                  Thư Viện
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  Giới Thiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Danh Mục</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/wedding-cakes"
                  className="hover:text-white transition-colors"
                >
                  Bánh Cưới
                </Link>
              </li>
              <li>
                <Link
                  href="/birthday-cakes"
                  className="hover:text-white transition-colors"
                >
                  Bánh Sinh Nhật
                </Link>
              </li>
              <li>
                <Link
                  href="/cupcakes"
                  className="hover:text-white transition-colors"
                >
                  Cupcakes
                </Link>
              </li>
              <li>
                <Link
                  href="/seasonal"
                  className="hover:text-white transition-colors"
                >
                  Bánh Theo Mùa
                </Link>
              </li>
              <li>
                <Link
                  href="/corporate"
                  className="hover:text-white transition-colors"
                >
                  Sự Kiện Doanh Nghiệp
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Hỗ Trợ</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  Câu Hỏi Thường Gặp
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-white transition-colors"
                >
                  Thông Tin Vận Chuyển
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-white transition-colors"
                >
                  Đổi Trả & Hoàn Tiền
                </Link>
              </li>
              <li>
                <Link
                  href="/care"
                  className="hover:text-white transition-colors"
                >
                  Hướng Dẫn Bảo Quản
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Chính Sách Bảo Mật
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 PEU D AMOUR. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Điều Khoản Dịch Vụ
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Chính Sách Bảo Mật
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Chính Sách Cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
