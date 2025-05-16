import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  login: (body: LoginBodyType) =>
    http.post<LoginResType>("/api/auth/login", body),
  register: (body: Omit<RegisterBodyType, "confirmPassword">) =>
    http.post<RegisterResType>("/api/users", body),
  auth: (body: { accessToken: string }) =>
    http.post("/api/auth", body, { baseUrl: "" }),
  logoutFromNextServer: (accessToken: string) =>
    http.post("/api/auth/logout", null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  logoutFromNextClient: (force?: boolean | undefined) =>
    http.post("/api/auth/logout", { force }, { baseUrl: "" }),
};

export default authApiRequest;
