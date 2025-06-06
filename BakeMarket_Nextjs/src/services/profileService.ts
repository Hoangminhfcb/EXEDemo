import { API_URL } from "@/utils/BaseUrl";
import { fetchInterceptor } from "@/utils/Interceptor";
import { tokenStorage } from "@/utils/tokenStorage";

export const getProfileByUserSignIn = async () => {
  const response = await fetchInterceptor(`${API_URL}/api/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenStorage.getAccessToken()}`,
    },
    skipAuth: false,
  });
  return await response.json();
};

export const updateProfile = async (data: any) => {
  const response = await fetchInterceptor(`${API_URL}/profile/api/v1/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenStorage.getAccessToken()}`,
    },
    body: JSON.stringify(data),
    skipAuth: false,
  });
  return await response.json();
};
