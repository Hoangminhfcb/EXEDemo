interface TabNavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
    const tabs = [
        { id: 'overview', label: 'Tổng quan' },
        { id: 'qa', label: 'Hỏi đáp' },
        { id: 'notes', label: 'Ghi chú' },
        { id: 'reviews', label: 'Đánh giá' }
    ];

    return (
        <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`cursor-pointer flex-1 px-4 py-3 font-medium text-sm transition-colors
                        ${activeTab === tab.id
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};