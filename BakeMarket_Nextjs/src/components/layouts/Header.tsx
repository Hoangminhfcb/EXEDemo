"use client";
import Link from "next/link";
import { BellIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { logoutUser, verifyToken } from "@/services/authService";
import { useRouter } from "next/navigation";
import { tokenStorage } from "@/utils/tokenStorage";
import { KeyCloakConfiguration } from "@/configuration/KeyCloakConfiguration";
import CartIcon from "../ui/CartIcon";

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const validateAuth = async () => {
      const accessToken = tokenStorage.getAccessToken();
      if (!accessToken) {
        return;
      }
      const result = await verifyToken();
      setIsLoggedIn(result.valid);
    };
    validateAuth();
  }, []);

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    const accessToken = tokenStorage.getAccessToken();
    if (!accessToken) {
      return;
    }
    try {
      if (accessToken) {
        await logoutUser(accessToken);
        dispatch(logout());
        localStorage.removeItem("accessToken");
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Logout failed:", error.message);
    }
  };

  const handleKeycloakLogin = () => {
    const { url, realm, clientId, redirectUri } = KeyCloakConfiguration;
    const keycloakUrl = `${url}/realms/${realm}/protocol/openid-connect/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=openid`;
    router.push(keycloakUrl);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div>
      <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="mx-auto flex items-center justify-between px-4 py-3 max-w-7xl">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-bold text-purple-600 flex items-center space-x-2"
          >
            Peu d'amour
          </Link>

          {/* Navigation */}
          <nav className="hidden sm:flex items-center space-x-4 text-lg">
            <Link
              href="/bakery"
              className="cursor-pointer text-gray-700 hover:text-purple-600 px-4 py-3 rounded transition-colors flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 4.5h15v15h-15z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9h6v6H9z"
                />
              </svg>
              <span>Bakery</span>
            </Link>

            <Link
              href="/cake"
              className="cursor-pointer text-gray-700 hover:text-purple-600 px-4 py-3 rounded transition-colors flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75h4.5v4.5h-4.5z"
                />
              </svg>
              <span>Cake</span>
            </Link>

            <button
              className="cursor-pointer text-gray-700 hover:text-purple-600 px-3 py-2 md:px-4 md:py-2 rounded transition-colors"
              aria-label="Danh sách yêu thích"
              onClick={() => router.push("/favorite")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </button>

            <CartIcon />

            {/* Notification */}
            <div className="relative">
              <button
                onClick={toggleNotification}
                className="text-gray-700 hover:text-purple-600 px-4 py-3 rounded transition-colors cursor-pointer"
              >
                <BellIcon className="w-7 h-7" />
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg p-4 w-64">
                  <p className="text-sm text-gray-700">
                    Bạn không có thông báo mới.
                  </p>
                </div>
              )}
            </div>

            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={toggleUserDropdown}
                className="cursor-pointer flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full focus:outline-none"
              >
                <img
                  src="https://static.vecteezy.com/system/resources/previews/021/770/056/non_2x/avatar-of-a-student-character-free-vector.jpg"
                  alt="User"
                  className="w-full h-full rounded-full object-cover"
                />
              </button>

              {isUserDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg w-48 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Hồ sơ
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Cài đặt
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleLogin}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Đăng nhập
                      </button>
                      <Link
                        href="/order"
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Đơn hàng
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-purple-600 focus:outline-none px-3 py-2 rounded transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden mt-4 bg-white shadow-md rounded-lg p-4">
            <Link
              href="/bakery"
              className="block text-gray-700 hover:text-purple-600 px-4 py-2 rounded transition-colors"
            >
              Bakery
            </Link>
            <Link
              href="/cake"
              className="block text-gray-700 hover:text-purple-600 px-4 py-2 rounded transition-colors"
            >
              Cake
            </Link>
            <Link
              href="/profile"
              className="block text-gray-700 hover:text-purple-600 px-4 py-2 rounded transition-colors"
            >
              Hồ sơ
            </Link>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
