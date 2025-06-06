'use client';
import { Course } from '@/types/course';

interface DashboardTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    selectedCourse: Course | null;
    setSelectedCourse: (course: Course | null) => void;
    courses?: Course[];
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
    activeTab,
    setActiveTab,
    selectedCourse,
    setSelectedCourse,
}) => {
    return (
        <>
            {/* Tabs */}
            <div className="flex space-x-6 border-b-2 border-gray-200">
                {['dashboard', 'courses', 'create'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                            setActiveTab(tab);
                            setSelectedCourse(null);
                        }}
                        className={`cursor-pointer p-4 font-medium text-lg transition-all duration-300 ${activeTab === tab
                            ? 'border-b-4 border-indigo-600 text-indigo-600 font-semibold'
                            : 'text-gray-500 hover:text-indigo-500'
                            }`}
                    >
                        {tab === 'dashboard' ? 'Thống kê' : tab === 'courses' ? 'Danh sách khóa học' : 'Tạo khóa học'}
                    </button>
                ))}
            </div>

            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && !selectedCourse && (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="cursor-pointer bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <h3 className="text-lg font-semibold">Tổng khóa học</h3>
                            <p className="text-4xl font-bold mt-2">0</p>
                        </div>
                        <div className="cursor-pointer bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <h3 className="text-lg font-semibold">Tổng đánh giá hữu ích</h3>
                            <p className="text-4xl font-bold mt-2">0</p>
                        </div>
                        <div className="cursor-pointer bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <h3 className="text-lg font-semibold">Doanh thu</h3>
                            <p className="text-4xl font-bold mt-2">0 ₫</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DashboardTabs;