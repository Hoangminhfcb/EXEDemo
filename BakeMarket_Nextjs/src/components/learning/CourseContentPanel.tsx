import { Chapter, Lesson } from '@/types/course';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

interface CourseContentPanelProps {
    isOpen: boolean;
    chapters: Chapter[];
    expandedChapter: string | null;
    selectedLesson: Lesson | null;
    onToggleChapter: (chapterId: string) => void;
    onSelectLesson: (lesson: Lesson) => void;
}

export const CourseContentPanel: React.FC<CourseContentPanelProps> = ({
    isOpen,
    chapters,
    expandedChapter,
    selectedLesson,
    onToggleChapter,
    onSelectLesson
}) => {
    return (
        <div className={`fixed right-0 top-0 h-screen w-[400px] bg-white border-l border-gray-200 
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full">
                {/* Phần tiêu đề */}
                <div className="p-4 border-b border-gray-200">
                    <h2 className={`${montserrat.className} text-lg font-semibold text-gray-900`}>
                        Nội dung khóa học
                    </h2>
                </div>

                {/* Phần danh sách chương và bài học */}
                <div className="flex-1 overflow-y-auto">
                    <div className="divide-y divide-gray-200">
                        {chapters.map((chapter) => (
                            <div key={chapter.chapterId} className="bg-gray-50">
                                {/* Nút mở rộng/thu gọn chương */}
                                <button
                                    onClick={() => onToggleChapter(chapter.chapterId)}
                                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100"
                                >
                                    <div className="flex items-center">
                                        {/* Icon mũi tên */}
                                        <svg
                                            className={`w-5 h-5 text-gray-400 mr-2 transform transition-transform
                                                ${expandedChapter === chapter.chapterId ? 'rotate-90' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                        <span className="font-medium text-gray-900">{chapter.name}</span>
                                    </div>
                                </button>

                                {/* Danh sách bài học trong chương */}
                                {expandedChapter === chapter.chapterId && (
                                    <div className="pl-4">
                                        {chapter.lessons.map((lesson) => (
                                            <div
                                                key={lesson.lessonId}
                                                onClick={() => onSelectLesson(lesson)}
                                                className={`py-2 px-4 flex items-center space-x-3 hover:bg-gray-100 cursor-pointer
                                                    ${selectedLesson?.lessonId === lesson.lessonId ? 'bg-blue-50' : ''}`}
                                            >
                                                {/* Icon video */}
                                                <div className="flex-shrink-0">
                                                    <svg
                                                        className="w-5 h-5 text-blue-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </div>
                                                {/* Tên bài học */}
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-medium text-gray-900">
                                                        {lesson.lessonName}
                                                    </h4>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};