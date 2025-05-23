export default function Loading() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600 mb-4"></div>
      <p className="text-gray-600 text-lg font-medium">Đang tải thông tin cửa hàng...</p>
    </div>
  )
}
