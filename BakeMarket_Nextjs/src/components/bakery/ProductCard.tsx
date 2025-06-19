import { Product } from "@/types/product";
import { API_URL } from "@/utils/BaseUrl";
import { formatPrice } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaEdit, FaHeart, FaMapMarkerAlt } from "react-icons/fa";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div
      key={product.id}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
    >
      <Link href={`/productDetail/${product.id}`} className="block">
        <div className="relative">
          <img
            src={
              `${API_URL}/api/images/file/${product.thumbnailUrl}` ||
              "http://localhost:5000/api/images/file/BakeMarket/Cakes/7fd08f81-a823-4874-bd97-9f2efadc1bdb_Gato Ganache.jpg"
            }
            width={400}
            height={300}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                // Add favorite functionality here
              }}
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
          <p className="text-gray-600 text-sm flex items-center mb-2">
            <FaMapMarkerAlt className="mr-1" />
          </p>
          <div className="flex items-center mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.floor(product.averageRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
            <span className="ml-1 text-gray-600 text-sm">
              {product.averageRating}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-lg font-bold text-pink-600">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
