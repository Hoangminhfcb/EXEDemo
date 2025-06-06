"use client";
import Banner from "@/components/layouts/Banner";
import Footer from "@/components/layouts/Foodter";
import Header from "@/components/layouts/Header";
import ChatBot from "@/components/modals/ChatBot";
import Category from "@/components/ui/Category";
import CategoryPills from "@/components/ui/CategoryPills";
import { usePathname } from "next/navigation";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const isCheckoutPage = pathName?.startsWith("/checkout/");
  const isBakeryPage = pathName?.startsWith("/bakery/");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {!isCheckoutPage &&
        !pathName.startsWith("/products/") &&
        !pathName.startsWith("/cart") &&
        !pathName.startsWith("/checkout") &&
        !isBakeryPage && <Banner />}
      <main className="flex-grow">{children}</main>
      {!isCheckoutPage &&
        !pathName.startsWith("/cart") &&
        !pathName?.startsWith("/checkout") && <Footer />}
    </div>
  );
};

export default UserLayout;
