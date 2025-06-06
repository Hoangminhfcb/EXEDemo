'use client';
import { usePathname } from 'next/navigation';
import HeaderDashboard from '@/components/dashboard/HeaderDashboard';
import Sidebar from '@/components/layouts/Sidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gray-100">
            <HeaderDashboard />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;