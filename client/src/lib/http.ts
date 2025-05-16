import envConfig from "@/config";
import { LoginResType } from "@/schemaValidations/auth.schema";
import { nomalizePath } from "./utils";
import { useAuth } from "@/context/authContext";
import { redirect } from "next/navigation";

type CustomOptions = RequestInit & {
  baseUrl?: string;
};

const AUTHENTICATION_ERROR_STATUS = 401;

export class HttpError extends Error {
  status: number;
  payload: any;
  constructor({ status, payload }: { status: number; payload: any }) {
    super("HttpError");
    this.status = status;
    this.payload = payload;
  }
}

class AccessToken {
  private accessToken = "";

  get value() {
    return this.accessToken;
  }

  set value(token: string) {
    if (typeof window === "undefined") {
      throw new Error(
        "Access token cannot be set in server-side rendering context"
      );
    }
    this.accessToken = token;
  }
}

const safeParseJson = async (res: Response) => {
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      return await res.json();
    } catch {
      return {};
    }
  }
  return {};
};

export const clientAccessToken = new AccessToken();

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  option?: CustomOptions | undefined
) => {
  const isFormData = option?.body instanceof FormData;
  const body = isFormData
    ? option.body
    : option?.body
    ? JSON.stringify(option.body)
    : undefined;

  const baseHeaders = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    // Cookie: `accessToken=${clientAccessToken.value}`,
    Authorization: `Bearer ${clientAccessToken.value}`,
  };

  const baseUrl =
    option?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : option.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...option,
    headers: {
      ...baseHeaders,
      ...option?.headers,
    },
    method,
    body,
    cache: "no-store",
    credentials: "include",
  });

  const payload: Response = await safeParseJson(res);

  const data = {
    status: res.status,
    payload,
  };
  if (!res.ok) {
    if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (typeof window !== "undefined") {
        await fetch("api/auth/logout", {
          method: "POST",
          body: JSON.stringify({ force: true }),
          headers: {
            ...baseHeaders,
          },
        });
        clientAccessToken.value = "";
        // const { refreshUser } = useAuth();
        // refreshUser();
        location.href = "/login";
      } else {
        const cookieHeader = (option?.headers as any)?.Cookie;
        const token =
          cookieHeader?.split("accessToken=")[1]?.split(";")[0] || "";
        redirect("/logout?accessToken=" + token + "&rand=" + Date.now());
      }
    } else {
      throw new HttpError(data);
    }
  }
  if (typeof window === "undefined") {
    if (
      ["/api/auth/login", "/api/users/createuser"].some(
        (item) => item === nomalizePath(url)
      )
    ) {
      clientAccessToken.value = (data.payload as LoginResType).accessToken;
    } else if (url === "api/auth/logout") {
      clientAccessToken.value = "";
    }
  }
  return data;
};

const http = {
  get: <Response>(
    url: string,
    option?: Omit<CustomOptions, "body"> | undefined
  ) => request<Response>("GET", url, option),
  post: <Response>(
    url: string,
    body: any,
    option?: Omit<CustomOptions, "body"> | undefined
  ) => request<Response>("POST", url, { ...option, body }),
  put: <Response>(
    url: string,
    body: any,
    option?: Omit<CustomOptions, "body"> | undefined
  ) => request<Response>("PUT", url, { ...option, body }),
  delete: <Response>(
    url: string,
    body: any,
    option?: Omit<CustomOptions, "body"> | undefined
  ) => request<Response>("DELETE", url, { ...option, body }),
};

export default http;
