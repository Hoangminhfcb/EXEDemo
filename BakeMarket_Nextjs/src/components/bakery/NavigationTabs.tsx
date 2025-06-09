import {
  FaEye,
  FaShoppingCart,
  FaStar,
  FaHeart,
  FaPhone,
} from "react-icons/fa";

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const NavigationTabs = ({ activeTab, setActiveTab }: NavigationTabsProps) => {
  const tabs = [
    { id: "overview", name: "Tổng quan", icon: <FaEye /> },
    { id: "products", name: "Sản phẩm", icon: <FaShoppingCart /> },
    { id: "reviews", name: "Đánh giá", icon: <FaStar /> },
    { id: "gallery", name: "Thư viện", icon: <FaHeart /> },
    { id: "contact", name: "Liên hệ", icon: <FaPhone /> },
  ];

  return (
    <div className="container mx-auto px-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-pink-600 border-b-2 border-pink-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;
