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
