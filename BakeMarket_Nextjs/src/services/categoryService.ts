import { Category } from "@/types/bakery";
import { ResponseData } from "./../types/ResponseData";
import { API_URL } from "@/utils/BaseUrl";
import { fetchInterceptor } from "@/utils/Interceptor";

export const getCategories = async (): Promise<ResponseData<Category[]>> => {
  const response = await fetchInterceptor(`${API_URL}/api/categories`, {
    method: "GET",
    skipAuth: true,
  });
  return await response.json();
};
