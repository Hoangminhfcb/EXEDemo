'use client';
import { Course, Chapter } from '@/types/course';
import { useState } from 'react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

interface CourseContentProps {
    course: Course;
}

export const CourseContent = ({ course }: CourseContentProps) => {
    const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
    const [expandAll, setExpandAll] = useState(false);

    const toggleChapter = (chapterId: string) => {
        setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
    };

    const toggleExpandAll = () => {
        setExpandAll(!expandAll);
        setExpandedChapter(expandAll ? null : 'all');
    };

    return (
        <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className={`${montserrat.className} text-2xl font-bold text-gray-900`}>
                    Course Content
                </h2>
                <button
                    onClick={toggleExpandAll}
                    className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
                >
                    {expandAll ? 'Collapse all' : 'Expand all'}
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
                {course.chapters.map((chapter: Chapter) => (
                    <div key={chapter.chapterId}>
                        <button
                            onClick={() => toggleChapter(chapter.chapterId)}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center space-x-3">
                                <svg
                                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 
                                        ${expandedChapter === chapter.chapterId || expandAll ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                                <h3 className="font-medium text-gray-900">{chapter.name}</h3>
                            </div>
                            <span className="text-sm text-gray-500">
                                {chapter.lessons.length} lessons
                            </span>
                        </button>

                        {(expandedChapter === chapter.chapterId || expandAll) && (
                            <div className="bg-gray-50 px-6 py-3 space-y-1">
                                {chapter.lessons.map((lesson, index) => (
                                    <div
                                        key={lesson.lessonId}
                                        className="flex items-start space-x-3 py-3 px-4 rounded-lg 
                                            hover:bg-white transition-colors duration-200"
                                    >
                                        <div className="flex-shrink-0 mt-1">
                                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">
                                                {index + 1}. {lesson.lessonName}
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {lesson.lessonDescription}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};