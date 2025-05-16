"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/authContext";
import imageApiRequest from "@/app/apiRequests/image";
import { Button } from "../ui/button";

export default function AuthLinks() {
  const { user, logout } = useAuth();

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {user ? (
        <>
          <Link href={"/me"}>
            <div className="flex items-center space-x-3">
              <Image
                src={
                  imageApiRequest.getUrl(user.profileImageUrl) ||
                  "/default-avatar.png"
                }
                alt="Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm text-gray-800">{user.fullName}</span>
            </div>
          </Link>
          <Button onClick={logout}>Đăng xuất</Button>
        </>
      ) : (
        <>
          <Link
            href="/register"
            className="text-sm uppercase tracking-wide text-gray-800 hover:text-gray-600 transition-colors duration-300"
          >
            Đăng ký
          </Link>
          <Link
            href="/login"
            className="text-sm uppercase tracking-wide text-gray-800 hover:text-gray-600 transition-colors duration-300"
          >
            Đăng nhập
          </Link>
        </>
      )}
    </nav>
  );
}
