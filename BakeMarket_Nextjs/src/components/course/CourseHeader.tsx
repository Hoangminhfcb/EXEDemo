import { Course } from '@/types/course';
import { format } from 'date-fns';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

interface CourseHeaderProps {
    course: Course;
}

export const CourseHeader = ({ course }: CourseHeaderProps) => {
    return (
        <div className="lg:col-span-2">
            <h1 className={`${montserrat.className} text-3xl font-bold text-gray-900 mb-4`}>
                {course.name}
            </h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
                {course.description}
            </p>
            <div className="flex items-center text-gray-600 text-sm space-x-6 mb-6">
                <span className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Created {format(new Date(course.createdAt), 'MMM dd, yyyy')}
                </span>
                <span className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {course.categoryName}
                </span>
            </div>
            <div className="flex flex-wrap gap-2">
                <span className="cursor-pointer inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Spring Boot
                </span>
                <span className="cursor-pointer inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Java
                </span>
                <span className="cursor-pointer inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Backend Development
                </span>
                <span className="cursor-pointer inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    DevOps
                </span>
                <span className="cursor-pointer inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                    Microservices
                </span>
            </div>
        </div>
    );
};