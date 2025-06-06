import { FaSearch } from "react-icons/fa";

export default function Banner() {
  return (
    <section className="relative bg-cover bg-center h-120 flex items-center justify-center text-center text-white">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-start relative z-10">
        <h1 className="text-4xl font-bold text-white mb-4">
          Đặt bánh ngọt, giao hàng từ 20 phút
        </h1>
        <p className="text-white text-lg mb-8">
          Có 5000+ Tiệm Bánh Ở TP. Đà Nẵng Từ 00:00 - 23:59
        </p>
        <div className="w-full max-w-2xl bg-white rounded-lg overflow-hidden flex">
          <input
            type="text"
            placeholder="Tìm bánh sinh nhật, bánh cưới, cupcake..."
            className="flex-1 px-4 py-3 outline-none"
          />
          <button className="bg-pink-600 text-white px-6 py-3">
            <FaSearch />
          </button>
        </div>
      </div>
    </section>
  );
}
