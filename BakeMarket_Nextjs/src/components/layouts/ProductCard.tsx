import Link from "next/link";
import Image from "next/image";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaBolt,
  FaStore,
} from "react-icons/fa";
import { API_URL } from "@/utils/BaseUrl";
import AddToCartButton from "../ui/AddToCartButton";

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 ease-in-out cursor-pointer">
      <Link href={`/products/${product.id}`}>
        <div className="relative">
          <img
            src={`${API_URL}/api/images/file/${product.thumbnailUrl}`}
            width={400}
            height={300}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 z-10">
            <button
              className={`p-2 rounded-full shadow-md ${
                product.favorite
                  ? "bg-pink-600 text-white"
                  : "bg-white text-gray-600"
              } hover:scale-105 transition`}
              onClick={(e) => {
                e.preventDefault();
                // TODO: logic yêu thích
              }}
            >
              <FaHeart />
            </button>
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-2">
        <h3 className="font-bold text-xl text-gray-800">{product.name}</h3>

        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>

        {product.bakery && (
          <div className="text-gray-700 text-sm flex items-center gap-1">
            <FaStore className="text-pink-500" />
            <span className="font-medium">{product.bakery.name}</span>
          </div>
        )}

        {product.bakery && (
          <p className="text-gray-500 text-sm flex items-center">
            <FaMapMarkerAlt className="mr-1" />
            {product.bakery.address}
          </p>
        )}

        {product && (
          <div className="flex gap-2 mt-3">
            <Link
              href={`/checkout/${product.id}`}
              className="flex-1 flex items-center justify-center gap-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-3 py-2 rounded-lg transition"
            >
              <FaBolt /> Mua ngay
            </Link>
            <AddToCartButton product={product} />
          </div>
        )}
      </div>
    </div>
  );
}
