'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiBarChart2, FiBook, FiPlus } from 'react-icons/fi';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-gray-900 text-gray-200 min-h-screen p-4 shadow-md">
            <nav className="space-y-2">
                <Link
                    href="/admin/dashboard"
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 ${pathname === '/admin/dashboard'
                        ? 'bg-gray-700 text-white font-semibold'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                >
                    <FiBarChart2 className="mr-3 text-gray-400" /> Thống kê
                </Link>
                <Link
                    href="/admin/courses"
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 ${pathname === '/admin/courses'
                        ? 'bg-gray-700 text-white font-semibold'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                >
                    <FiBook className="mr-3 text-gray-400" /> Danh sách khóa học
                </Link>
                <Link
                    href="/admin/create-course"
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 ${pathname === '/admin/create-course'
                        ? 'bg-gray-700 text-white font-semibold'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                >
                    <FiPlus className="mr-3 text-gray-400" /> Tạo khóa học
                </Link>
            </nav>
        </aside>
    );
};

export default Sidebar;