import {
  FaEye,
  FaHeart,
  FaMoneyBill,
  FaProductHunt,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

export default function StatisticCards({
  totalProducts,
  totalOrders,
  totalRevenue,
  totalReviews,
}: {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalReviews: number;
}) {
  return (
    <div className="container mx-auto px-4 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
          <FaMoneyBill className="text-blue-600 text-2xl mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {totalRevenue} VNĐ
          </div>
          <div className="text-sm text-gray-600">Doanh thu</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
          <FaProductHunt className="text-red-600 text-2xl mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {totalProducts}
          </div>
          <div className="text-sm text-gray-600">Sản phẩm</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
          <FaShoppingCart className="text-green-600 text-2xl mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{totalOrders}</div>
          <div className="text-sm text-gray-600">Đơn hàng</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
          <FaStar className="text-yellow-600 text-2xl mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{totalReviews}</div>
          <div className="text-sm text-gray-600">Đánh giá</div>
        </div>
      </div>
    </div>
  );
}
