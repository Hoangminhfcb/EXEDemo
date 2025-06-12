import { SignInRequest } from "@/types/request/SignInRequest";
import { UserCreationRequest } from "@/types/request/UserCreationRequest";
import { SignInResponse } from "@/types/response/SignInResponse";
import { UserCreationResponse } from "@/types/response/UserCreationResponse";
import { API_URL } from "@/utils/BaseUrl";
import { fetchInterceptor } from "@/utils/Interceptor";
import { tokenStorage } from "@/utils/tokenStorage";

interface TokenVerificationResponse {
  valid: boolean;
}

export const verifyToken = async (): Promise<TokenVerificationResponse> => {
  try {
    const response = await fetchInterceptor(
      `${API_URL}/api/auth/verification-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenStorage.getAccessToken()}`,
        },
        skipAuth: false,
      }
    );
    const data = await response.json();
    return data as TokenVerificationResponse;
  } catch (error) {
    console.log("Token verification failed:", error);
    return { valid: false };
  }
};

export const registerUser = async (
  request: UserCreationRequest
): Promise<UserCreationResponse> => {
  const response = await fetchInterceptor(
    `${API_URL}/identity/api/v1/users/registration`,
    {
      method: "POST",
      body: JSON.stringify(request),
      skipAuth: true, // Skip auth for registration
    }
  );
  const data = await response.json();
  return data as UserCreationResponse;
};

export const loginUser = async (
  request: SignInRequest
): Promise<SignInResponse> => {
  const response = await fetchInterceptor(`${API_URL}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(request),
    skipAuth: true,
    credentials: "include",
  });

  const data = await response.json();
  const signInResponse = data as SignInResponse;
  return signInResponse;
};

export const logoutUser = async (accessToken: string): Promise<void> => {
  await fetchInterceptor(`${API_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });
  tokenStorage.clearAccessToken();
};
