"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { useRouter } from "next/navigation";
import authApiRequest from "../apiRequests/auth";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import AuthWithProviders from "@/components/auth/authWithProviders";
import { useAuth } from "@/context/authContext";

const LoginForm = () => {
  const router = useRouter();
  const { login, refreshUser } = useAuth();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginBodyType) => {
    try {
      const response = await authApiRequest.login(data);
      await authApiRequest.auth({ accessToken: response.payload.accessToken });
      await login();
      await refreshUser();
      // router.push("/");
    } catch (err: any) {
      // Nếu là lỗi 422 từ backend
      if (err?.status === 422) {
        const errors = err?.payload?.errors;
        Object.keys(errors).forEach((field) => {
          form.setError(field as keyof LoginBodyType, {
            type: "server",
            message: errors[field][0], // Chỉ lấy thông báo lỗi đầu tiên
          });
        });
      } else {
        console.error("Lỗi đăng nhập:", err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
            noValidate
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="!mt-8 w-full">
              Đăng nhập
            </Button>
          </form>
        </Form>

        <AuthWithProviders mode="login" />

        <p className="mt-4 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
