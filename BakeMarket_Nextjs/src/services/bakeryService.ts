import { API_URL } from "@/utils/BaseUrl";
import { fetchInterceptor } from "@/utils/Interceptor";
import { tokenStorage } from "@/utils/tokenStorage";

export const getBakeryByUserSignIn = async () => {
  const response = await fetchInterceptor(`${API_URL}/api/bakeries/mybakery`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenStorage.getAccessToken()}`,
    },
    skipAuth: false,
  });
  return await response.json();
};

export const getBakeryDetail = async (id: string) => {
  const response = await fetchInterceptor(`${API_URL}/api/bakeries/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenStorage.getAccessToken()}`,
    },
    skipAuth: true,
  });
  return await response.json();
};

export const getCakesByBakery = async (id: string) => {
  const response = await fetchInterceptor(`${API_URL}/api/cakes/bakery/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenStorage.getAccessToken()}`,
    },
    skipAuth: true,
  });
  return await response.json();
};
