export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">Đang tải đơn hàng...</p>
      </div>
    </div>
  )
}
