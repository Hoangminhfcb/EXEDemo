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
import { Input } from "@/components/ui/input";
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { useRouter } from "next/navigation";
import AuthWithProviders from "@/components/auth/authWithProviders";
import Link from "next/link";
import authApiRequest from "../apiRequests/auth";

const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: RegisterBodyType) {
    const { confirmPassword, ...dataToSend } = data;

    console.log("dataToSend", dataToSend);
    try {
      const response = await authApiRequest.register(dataToSend);
      await authApiRequest.auth({ accessToken: response.payload.accessToken });
      router.push("/me");
    } catch (err: any) {
      if (err?.status === 409) {
        const errors = err?.payload?.errors;

        Object.keys(errors).forEach((field) => {
          form.setError(field as keyof RegisterBodyType, {
            type: "server",
            message: errors[field][0], // Chỉ lấy thông báo lỗi đầu tiên
          });
        });
      } else {
        console.error("Lỗi đăng ký:", err);
      }
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng Ký</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
            noValidate
          >
            {/* First Name và Last Name */}
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@domain.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234567890" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="!mt-8 w-full">
              Register
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

export default RegisterForm;
