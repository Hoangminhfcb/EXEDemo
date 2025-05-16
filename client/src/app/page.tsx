import Image from "next/image";
import { FaSearch, FaHeart, FaMapMarkerAlt } from "react-icons/fa";

export default function Home() {
  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Bánh Sinh Nhật Hoa Tươi",
      address: "47/45 Nguyễn Tư Giản, Gò Vấp",
      image: "/images/cake1.jpg",
      discount: true,
    },
    {
      id: 2,
      name: "Bánh Cưới Sang Trọng",
      address: "6 Lâm Văn Bên, P. Tân Kiểng, Q.7",
      image: "/images/cake2.jpg",
      discount: true,
      favorite: true,
    },
    {
      id: 3,
      name: "Bánh Cupcake Nhiều Hương Vị",
      address: "19 Võ Văn Ngân, P. Linh Chiểu, TP. Thủ Đức",
      image: "/images/cake3.jpg",
      discount: true,
    },
    {
      id: 4,
      name: "Bánh Kem Tạo Hình Nhân Vật",
      address: "08 Ưng Văn Khiêm, P. 25, Bình Thạnh",
      image: "/images/cake4.jpg",
      discount: true,
    },
    {
      id: 5,
      name: "Bánh Cookies Homemade",
      address: "73 Nguyễn Văn Công, P. 3, Gò Vấp",
      image: "/images/cake5.jpg",
      discount: true,
      favorite: true,
    },
    {
      id: 6,
      name: "Bánh Cheesecake Tươi Mát",
      address: "247 Đường Số 7, P. Bình Trị Đông, Bình Tân",
      image: "/images/cake6.jpg",
      discount: true,
    },
  ];

  return (
    <>
      <section
        className="relative bg-cover bg-center h-96"
        style={{ backgroundImage: "url('/api/placeholder/1920/500')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-start relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            Đặt bánh ngọt, giao hàng từ 20
          </h1>
          <p className="text-white text-lg mb-8">
            Có 5000+ Tiệm Bánh Ở TP. HCM Từ 00:00 - 23:59
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

      {/* Category Pills */}
      <section className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="flex flex-wrap gap-2 justify-center">
          <button className="bg-white text-gray-800 px-6 py-3 rounded-full shadow hover:bg-pink-600 hover:text-white transition">
            Tất cả
          </button>
          <button className="bg-pink-600 text-white px-6 py-3 rounded-full shadow hover:bg-pink-700 transition">
            Bánh Sinh Nhật
          </button>
          <button className="bg-white text-gray-800 px-6 py-3 rounded-full shadow hover:bg-pink-600 hover:text-white transition">
            Bánh Cưới
          </button>
          <button className="bg-white text-gray-800 px-6 py-3 rounded-full shadow hover:bg-pink-600 hover:text-white transition">
            Bánh Kem
          </button>
          <button className="bg-white text-gray-800 px-6 py-3 rounded-full shadow hover:bg-pink-600 hover:text-white transition">
            Cupcake
          </button>
          <button className="bg-white text-gray-800 px-6 py-3 rounded-full shadow hover:bg-pink-600 hover:text-white transition">
            Cookies
          </button>
          <button className="bg-white text-gray-800 px-6 py-3 rounded-full shadow hover:bg-pink-600 hover:text-white transition">
            Bánh Mì Ngọt
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Ưu đãi</h2>
          <a href="#" className="text-pink-600 hover:underline">
            Xem tất cả
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <div className="relative">
                <Image
                  src={product.image}
                  width={400}
                  height={300}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <button
                    className={`p-2 rounded-full ${
                      product.favorite
                        ? "bg-pink-600 text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    <FaHeart />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm flex items-center mb-3">
                  <FaMapMarkerAlt className="mr-1" /> {product.address}
                </p>
                {product.discount && (
                  <p className="text-pink-600 flex items-center text-sm">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Giảm giá đặc biệt
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
    </>
  );
}
