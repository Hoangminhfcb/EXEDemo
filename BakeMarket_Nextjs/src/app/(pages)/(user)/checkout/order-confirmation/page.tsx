import { Suspense } from "react";
import OrderConfirmation from "./OrderConfirmationComponent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmation />
    </Suspense>
  );
}
