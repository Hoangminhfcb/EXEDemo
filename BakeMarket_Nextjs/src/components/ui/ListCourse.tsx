'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCourses } from "@/services/courseService";
import Pagination from "@/utils/Pagination";
import { useRouter } from "next/navigation";

const ListCourse = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [clickedCourse, setClickedCourse] = useState<number | null>(null);
    const router = useRouter();

    const fetchCourses = async (page: number) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getCourses(page);
            setCourses(data.data);
            setTotalPages(data.totalPages);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses(currentPage);
    }, [currentPage]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    const handleClick = (courseId: number) => {
        setClickedCourse(courseId);
        setTimeout(() => {
            router.push(`/course/${courseId}`);
        }, 400);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-700"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500 font-medium">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-8 text-slate-900 text-center">
                Explore Our Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {courses.map((course: any) => (
                    <Link
                        key={course.courseId}
                        href={`/course/${course.courseId}`}
                        className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative ${clickedCourse === course.courseId ? 'scale-95 opacity-70' : ''
                            }`} // Hiệu ứng scale và mờ khi nhấn
                        prefetch={false}
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick(course.courseId);
                        }}
                    >
                        <div className="aspect-w-16 aspect-h-9 relative">
                            <img
                                src={course.courseCover}
                                alt={course.name}
                                className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />
                            <div className="absolute top-3 right-3">
                                <span className="bg-slate-700/70 backdrop-blur-sm text-white text-xs tracking-wider px-3 py-1.5 rounded-full">
                                    {course.categoryName}
                                </span>
                            </div>
                            {clickedCourse === course.courseId && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-slate-700"></div>
                                </div>
                            )}
                        </div>
                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-1 group-hover:text-slate-600 transition-colors duration-200">
                                {course.name}
                            </h3>
                            <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                                {course.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-slate-800">
                                    {formatPrice(course.price)}
                                </span>
                                <button
                                    className={`cursor-pointer bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium tracking-wide hover:bg-slate-700 active:bg-slate-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 ${clickedCourse === course.courseId ? 'scale-90' : ''
                                        }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClick(course.courseId);
                                    }}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {totalPages > 10 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            )}
        </div>
    );
};

export default ListCourse;