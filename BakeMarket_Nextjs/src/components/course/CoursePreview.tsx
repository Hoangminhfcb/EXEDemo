'use client';
import { Course } from '@/types/course';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CoursePreviewProps {
    course: Course;
}

export const CoursePreview = ({ course }: CoursePreviewProps) => {
    const [enrolling, setEnrolling] = useState(false);
    const router = useRouter();

    const handleEnroll = async () => {
        setEnrolling(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            router.push(`/learning/${course.courseId}`);
        } catch (error) {
            console.error('Enrollment failed:', error);
        } finally {
            setEnrolling(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-48">
                <img
                    src={course.courseCover}
                    alt={course.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                        e.currentTarget.src = '/placeholder-course.jpg';
                    }}
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
                    <button className="bg-white/90 hover:bg-white text-gray-900 rounded-full p-4 transition-all
                        hover:scale-110 active:scale-95 hover:shadow-lg">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="p-6">
                <div className="mb-6">
                    <span className="text-3xl font-bold text-gray-900">
                        {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }).format(course.price)}
                    </span>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleEnroll}
                        disabled={enrolling}
                        className={`
                            relative w-full inline-flex items-center justify-center
                            bg-gray-900 text-white py-3 px-6 rounded-lg font-medium
                            transform transition-all duration-200
                            hover:bg-gray-800 active:scale-[0.98]
                            focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                            disabled:opacity-70 disabled:cursor-not-allowed
                            ${enrolling ? 'cursor-not-allowed' : 'cursor-pointer hover:-translate-y-0.5'}
                        `}
                    >
                        {enrolling ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Enrolling...
                            </>
                        ) : (
                            <>
                                <span className="relative inline-flex items-center">
                                    Enroll Now
                                    <svg className="ml-2 -mr-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                                <span className="absolute right-0 top-0 -mt-2 -mr-2">
                                    <span className="flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white/30"></span>
                                    </span>
                                </span>
                            </>
                        )}
                    </button>
                    <button
                        className="cursor-pointer flex items-center justify-center w-12 h-12 rounded-lg border-2 border-gray-200
                            hover:border-gray-300 active:border-gray-400 transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
                        aria-label="Add to wishlist"
                    >
                        <svg className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};