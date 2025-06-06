import { Course } from "@/types/course";
import { API_URL } from "@/utils/BaseUrl";
import { fetchInterceptor } from "@/utils/Interceptor";

export const getCourses = async (page: number): Promise<any> => {
    const response = await fetchInterceptor(`${API_URL}/courses/fetch-all?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch courses');
    }

    const data = await response.json();
    return data.data;
}

export const getCourseDetail = async (id: string): Promise<Course> => {
    const response = await fetchInterceptor(`${API_URL}/courses/info-detail//${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch course details');
    }

    const data = await response.json();
    return data.data;
};
export const getCoursesByCategory = async (category: string): Promise<any> => {
    const response = await fetchInterceptor(`${API_URL}/courses/search/category?categoryName=${category}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        skipAuth: true
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch courses');
    }

    const data = await response.json();
    return data.data;
}