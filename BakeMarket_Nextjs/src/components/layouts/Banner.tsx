import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SystemBanner() {
  return (
    <div className="bg-rose-600 text-white py-2 px-4 relative">
      <div className="container mx-auto text-center">
        <p className="text-sm font-medium">
          🎂 Free delivery on orders over $100 | Use code SWEET20 for 20% off your first order
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-rose-700 p-1 h-auto"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
