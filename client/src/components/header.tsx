"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import ButtonLogout from "./buttonLogout";
import AuthLinks from "./auth/authLinks";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnimationClass, setMenuAnimationClass] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setMenuAnimationClass("animate-slideOut");
      setTimeout(() => {
        setIsMenuOpen(false);
        setMenuAnimationClass("");
      }, 300);
    } else {
      setIsMenuOpen(true);
      setMenuAnimationClass("animate-slideIn");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Danh mục bánh
  const cakeCategories = [
    {
      label: "Bánh Sinh Nhật",
      href: "/cakes/birthday",
    },
    {
      label: "Bánh Cưới",
      href: "/cakes/wedding",
    },
    {
      label: "Bánh Lễ Hội",
      href: "/cakes/festival",
    },
    {
      label: "Bánh Ăn Hàng Ngày",
      href: "/cakes/daily",
    },
    {
      label: "Bánh Đặc Biệt",
      href: "/cakes/special",
    },
  ];

  return (
    <>
      <header className="flex justify-between items-center px-4 md:px-8 py-4 border-b border-gray-200 bg-white">
        {/* Mobile menu button */}
        <button
          className="lg:hidden text-gray-800 transition-transform duration-300 hover:scale-110"
          onClick={toggleMenu}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        {/* Left nav - desktop only */}
        <nav className="hidden lg:flex items-center space-x-8">
          {/* Dropdown cho danh mục bánh */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-sm uppercase tracking-wide text-gray-800 hover:text-gray-600 transition-colors duration-300 flex items-center"
            >
              Danh Mục Bánh
              <ChevronDown
                size={16}
                className={`ml-1 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10 animate-slideDown">
                {cakeCategories.map((category, index) => (
                  <div key={index} className="py-1">
                    <Link
                      href={category.href}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {category.label}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/how-to-buy"
            className="text-sm uppercase tracking-wide text-gray-800 hover:text-gray-600 transition-colors duration-300"
          >
            Cách mua
          </Link>
          <Link
            href="/about"
            className="text-sm uppercase tracking-wide text-gray-800 hover:text-gray-600 transition-colors duration-300"
          >
            Về LAFUONG
          </Link>
        </nav>

        {/* Logo - centered on desktop */}
        <div className="flex-1 text-center text-2xl font-bold">
          <Link href="/">LAFUONG</Link>
        </div>

        {/* Right nav - desktop only */}
        <AuthLinks />
        {/* Cart icon */}
        <Link
          href="/cart"
          className="text-gray-800 ml-4 transition-transform duration-300 hover:scale-110"
        >
          <ShoppingCart size={20} />
        </Link>
      </header>

      {/* Mobile menu with animation */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 bg-white z-50 p-6 sm:w-3/5 lg:hidden ${menuAnimationClass}`}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-medium">Menu</h2>
            <button
              onClick={toggleMenu}
              aria-label="Close menu"
              className="text-gray-800 transition-transform duration-300 hover:scale-110"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col">
            {/* Danh mục bánh trong mobile */}
            <div className="py-4 border-b border-gray-100">
              <button
                onClick={toggleDropdown}
                className="w-full text-left text-gray-800 flex items-center justify-between"
              >
                Danh Mục Bánh
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <div className="mt-2 animate-slideDown">
                  {cakeCategories.map((category, index) => (
                    <div key={index}>
                      <Link
                        href={category.href}
                        className="block py-2 text-gray-800"
                        onClick={toggleMenu}
                      >
                        {category.label}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {[
              { href: "/how-to-buy", label: "Cách mua", delay: "delay-200" },
              { href: "/about", label: "Về LAFUONG", delay: "delay-300" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`py-4 border-b border-gray-100 text-gray-800 transition-all duration-300 ${
                  menuAnimationClass === "animate-slideIn"
                    ? `animate-fadeIn ${item.delay}`
                    : ""
                }`}
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }

        .animate-slideOut {
          animation: slideOut 0.3s ease-in forwards;
        }

        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </>
  );
};

export default Header;
