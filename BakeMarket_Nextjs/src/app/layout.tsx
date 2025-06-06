import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "../redux/StoreProvider";
import { Montserrat } from "next/font/google";
import ToastProvider from "@/components/providers/ToastProvider";
import { CartProvider } from "@/context/CartContext";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Peu d'amour",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <StoreProvider>
          <CartProvider>
            {children}
            <ToastProvider />
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
