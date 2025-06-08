"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Search, Menu, User } from "lucide-react"
import CartSidebar from "@/components/cart-sidebar/page"

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">PEU D AMOUR</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-pink-600 transition-colors">
              Sản Phẩm
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-pink-600 transition-colors">
              Danh Mục
            </Link>
            <Link href="/custom" className="text-gray-700 hover:text-pink-600 transition-colors">
              Đặt Hàng Riêng
            </Link>
            <Link href="/bakery" className="text-gray-700 hover:text-pink-600 transition-colors">
              Tiệm Bánh
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-pink-600 transition-colors">
              Giới Thiệu
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}
