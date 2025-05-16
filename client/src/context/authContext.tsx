"use client";

import { createContext, useContext, useEffect, useState } from "react";
import accountApiRequest from "@/app/apiRequests/account";
import authApiRequest from "@/app/apiRequests/auth";
import { clientAccessToken } from "@/lib/http";
import { useRouter } from "next/navigation";

interface User {
  fullName: string;
  profileImageUrl: string;
}

interface AuthContextProps {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const refreshUser = async () => {
    if (!clientAccessToken.value) {
      setUser(null);
      return;
    }

    try {
      const res = await accountApiRequest.meClient();
      if (res?.payload) setUser(res.payload);
    } catch {
      setUser(null);
    }
  };

  const login = async () => {
    await refreshUser();
  };

  const logout = async () => {
    try {
      await authApiRequest.logoutFromNextClient();
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Lỗi đăng xuất:", err);
    }
  };

  useEffect(() => {
    if (clientAccessToken.value) refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
