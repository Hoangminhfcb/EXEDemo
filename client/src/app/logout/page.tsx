"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import authApiRequest from "../apiRequests/auth";
import { useAuth } from "@/context/authContext";

export default function Logout() {
  const { logout } = useAuth();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  const rand = searchParams.get("rand");
  useEffect(() => {
    if (!accessToken) return;
    const doLogout = async () => {
      await authApiRequest.logoutFromNextClient(true);
      await logout();
      router.replace(`/login?redirect=${pathName}`);
    };

    doLogout();
  }, [accessToken, pathName, router, rand, logout]);

  return <div>Logout</div>;
}
