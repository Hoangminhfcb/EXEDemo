// AddToCartButton.tsx
import { addToCart, getCart } from "@/utils/cartStorage";
import { useCart } from "@/context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function AddToCartButton({ product }: { product: any }) {
  const { setCartItems } = useCart();

  const handleClick = () => {
    addToCart(product);
    setCartItems(getCart()); // cập nhật context
  };

  return (
    <button
      className="flex items-center justify-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-3 py-2 rounded-lg transition"
      onClick={handleClick}
    >
      <FaShoppingCart /> Thêm vào giỏ
    </button>
  );
}
