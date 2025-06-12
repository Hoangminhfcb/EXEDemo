import FeaturedProducts from "./FeaturedProducts";
import OwnerInfo from "./OwnerInfo";
import { Bakery } from "@/types/bakery";
import { Product } from "@/types/product";

export default function OverviewTab({
  bakery,
  products,
}: {
  bakery: Bakery;
  products: Product[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <FeaturedProducts products={products} />
      </div>

      <div className="space-y-6">
        <OwnerInfo bakery={bakery} />
      </div>
    </div>
  );
}
