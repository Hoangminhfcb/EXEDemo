import { Bakery } from "@/types/bakery";
import Image from "next/image";

const OwnerInfo = (bakery: Bakery) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Thông tin chủ tiệm</h3>
      <div className="flex items-center mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
          <Image
            src={bakery.owner.profileImageUrl || "/placeholder.svg"}
            alt={bakery.owner.fullName}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold">{bakery.owner.fullName}</h4>
          <p className="text-sm text-gray-600">{bakery.owner.description}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600">Thành viên từ: 2011</p>
    </div>
  );
};

export default OwnerInfo;
