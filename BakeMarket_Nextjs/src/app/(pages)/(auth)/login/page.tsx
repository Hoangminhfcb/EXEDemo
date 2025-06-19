"use client";

import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/slices/authSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignInRequest } from "@/types/request/SignInRequest";
import { loginUser } from "@/services/authService";
import toast, { Toaster } from "react-hot-toast";
import jwt from "jsonwebtoken";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ email và mật khẩu!", {
        duration: 4000,
        position: "top-right",
      });
      return;
    }

    const request: SignInRequest = { email, password };
    setIsLoading(true);

    const loadingToast = toast.loading("Đang đăng nhập...", {
      position: "top-right",
    });

    try {
      const data = await loginUser(request);
      toast.dismiss(loadingToast);
      toast.success("Đăng nhập thành công! 🎉", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#10B981",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#10B981",
        },
      });

      localStorage.setItem("accessToken", data.accessToken);

      dispatch(
        login({
          userType: data.roles,
        })
      );
      setTimeout(() => {
        if (data.roles.includes("BakeryOwner")) {
          const decoded = jwt.decode(data.accessToken);
          const userId = decoded?.sub; // Standard JWT claim
          router.push(`/bakery/${userId}`);
        } else {
          router.push("/");
        }
      }, 500);
    } catch (error: any) {
      toast.dismiss(loadingToast);
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!", {
        duration: 5000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#EF4444",
        },
      });

      console.error("Login failed:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            fontSize: "14px",
            borderRadius: "8px",
            padding: "12px 16px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl flex flex-col items-center">
          {/* Login Form */}
          <div className="w-full flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Login
              </h2>
              <form className="space-y-4" onSubmit={handleLogin}>
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your email"
                  />
                </div>
                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your password"
                  />
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang đăng nhập...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
            </div>

            {/* Divider */}
            <div className="h-full flex items-center px-4">
              <div className="w-px bg-gray-300 h-32"></div>
              <span className="mx-4 text-gray-500 font-medium">OR</span>
              <div className="w-px bg-gray-300 h-32"></div>
            </div>

            {/* Social Login */}
            <div className="w-full md:w-1/2 pl-6 mt-17">
              <div className="space-y-3">
                {/* Facebook */}
                <button
                  type="button"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() =>
                    toast("Tính năng đang phát triển!", { icon: "🚧" })
                  }
                >
                  Continue with Facebook
                </button>
                {/* Google */}
                <button
                  type="button"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() =>
                    toast("Tính năng đang phát triển!", { icon: "🚧" })
                  }
                >
                  Continue with Google
                </button>
                {/* GitHub */}
                <button
                  type="button"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() =>
                    toast("Tính năng đang phát triển!", { icon: "🚧" })
                  }
                >
                  Continue with GitHub
                </button>
              </div>
            </div>
          </div>

          {/* Additional Buttons */}
          <div className="mt-6 flex justify-between w-full">
            <a
              href="/registration"
              className="text-purple-600 hover:underline text-sm"
            >
              Don't have an account? Register
            </a>
            <a href="/" className="text-purple-600 hover:underline text-sm">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
