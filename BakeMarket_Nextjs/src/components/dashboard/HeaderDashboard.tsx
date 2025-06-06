'use client';

import { useState } from 'react';
import { FiLogOut, FiBell, FiSearch, FiChevronDown } from 'react-icons/fi';
import { IoIosNotificationsOutline } from "react-icons/io";

const HeaderDashboard = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    return (
        <header className="bg-gray-900 shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <img
                    src="/elearning.jpg"
                    alt="Logo"
                    className="w-10 h-10 rounded-full border border-gray-700"
                />
                <h1 className="text-xl font-semibold text-gray-200">Admin Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="pl-10 pr-4 py-2 rounded-full bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200"
                    />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <button className="relative text-gray-400 hover:text-white transition-colors duration-100 cursor-pointer">
                    <IoIosNotificationsOutline className="text-xl" />
                    <span className="absolute right-0 left-3 bottom-3 w-3 h-3 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">3</span>
                </button>

                <div className="relative">
                    <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center justify-center space-x-2 hover:bg-gray-800 rounded-full px-3 py-1 transition-all duration-200 cursor-pointer"
                    >
                        <img
                            src="https://img.freepik.com/free-vector/business-user-shield_78370-7029.jpg?semt=ais_hybrid&w=740"
                            alt="Avatar"
                            className="w-8 h-8 rounded-full border border-gray-700"
                        />
                        <span className="text-sm font-medium text-gray-200">Admin User</span>
                        <FiChevronDown className={`text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-gray-200 rounded-lg shadow-md py-2 z-20">
                            <div className="px-4 py-2 border-b border-gray-700 cursor-pointer hover:bg-gray-700">
                                <p className="text-sm font-semibold">Admin User</p>
                                <p className="text-xs text-gray-400">admin@example.com</p>
                            </div>
                            <button
                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center transition-colors duration-200 cursor-pointer"
                                onClick={() => setIsUserMenuOpen(false)}
                            >
                                <FiLogOut className="mr-2 text-gray-400" /> Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default HeaderDashboard;