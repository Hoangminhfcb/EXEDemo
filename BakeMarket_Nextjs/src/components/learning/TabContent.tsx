import { useState } from 'react';
import { Montserrat } from 'next/font/google';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Lesson } from '@/types/course';

const montserrat = Montserrat({ subsets: ['latin'] });

interface TabContentProps {
    tab: string;
    lesson: Lesson | null;
    onSubmitComment: (comment: string) => void;
    onSaveNote: (note: string) => void;
    onSubmitReview: (review: { rating: number; comment: string }) => void;
}

export const TabContent: React.FC<TabContentProps> = ({
    tab,
    lesson,
    onSubmitComment,
    onSaveNote,
    onSubmitReview
}) => {
    const [comment, setComment] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewContent, setReviewContent] = useState('');

    if (!lesson) return null;

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmitComment(comment);
        setComment('');
    };

    const handleNoteSave = (e: React.FormEvent) => {
        e.preventDefault();
        onSaveNote(noteContent);
        setNoteContent('');
    };

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmitReview({ rating, comment: reviewContent });
        setReviewContent('');
        setRating(0);
    };

    switch (tab) {
        case 'overview':
            return (
                <div className="space-y-4">
                    <h2 className={`${montserrat.className} text-xl font-semibold`}>
                        {lesson.lessonName}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium text-gray-900 mb-2">Mục tiêu bài học</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                <li>Hiểu về kiến trúc Spring Framework</li>
                                <li>Nắm vững các layer trong ứng dụng</li>
                                <li>Thực hành xây dựng ứng dụng theo layer</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium text-gray-900 mb-2">Yêu cầu kiến thức</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                <li>Cơ bản về Java</li>
                                <li>Hiểu về Spring Boot</li>
                                <li>Kiến thức về REST API</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Mô tả bài học</h3>
                        <p className="text-gray-600">{lesson.lessonDescription}</p>
                    </div>
                </div>
            );

        case 'qa':
            return (
                <div className="space-y-6">
                    <form onSubmit={handleCommentSubmit} className="bg-white rounded-lg border border-gray-200">
                        <div className="p-4">
                            <h3 className="font-medium text-gray-900 mb-2">Đặt câu hỏi</h3>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg"
                                placeholder="Bạn có thắc mắc gì về bài học..."
                                rows={3}
                                required
                            />
                            <div className="mt-2 flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Gửi câu hỏi
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="space-y-4">
                        {/* Sample comments - replace with actual data */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gray-300" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-medium">Học viên A</h4>
                                        <span className="text-sm text-gray-500">
                                            {formatDistanceToNow(new Date(), { addSuffix: true, locale: vi })}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-gray-600">
                                        Làm thế nào để tích hợp Spring Security vào project ạ?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

        case 'notes':
            return (
                <div className="space-y-6">
                    <form onSubmit={handleNoteSave} className="bg-white rounded-lg border border-gray-200">
                        <div className="p-4">
                            <h3 className="font-medium text-gray-900 mb-2">Ghi chú của bạn</h3>
                            <textarea
                                value={noteContent}
                                onChange={(e) => setNoteContent(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg"
                                placeholder="Thêm ghi chú cho bài học..."
                                rows={4}
                                required
                            />
                            <div className="mt-2 flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Lưu ghi chú
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="space-y-4">
                        {/* Sample notes - replace with actual data */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                                <pre className="text-gray-600 font-sans whitespace-pre-wrap">
                                    Spring Architecture có 3 layer chính:
                                    - Controller Layer
                                    - Service Layer
                                    - Repository Layer
                                </pre>
                                <span className="text-sm text-gray-500">
                                    {formatDistanceToNow(new Date(), { addSuffix: true, locale: vi })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );

        case 'reviews':
            return (
                <div className="space-y-6">
                    <form onSubmit={handleReviewSubmit} className="bg-white rounded-lg border border-gray-200">
                        <div className="p-4">
                            <h3 className="font-medium text-gray-900 mb-2">Đánh giá bài học</h3>
                            <div className="flex items-center space-x-2 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={reviewContent}
                                onChange={(e) => setReviewContent(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg"
                                placeholder="Chia sẻ nhận xét của bạn..."
                                rows={4}
                                required
                            />
                            <div className="mt-2 flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    disabled={rating === 0}
                                >
                                    Gửi đánh giá
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Sample review */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-300" />
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium">Trần Thị B</h4>
                                    <span className="text-sm text-gray-500">1 ngày trước</span>
                                </div>
                                <div className="flex items-center mt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star} className="text-yellow-400">★</span>
                                    ))}
                                </div>
                                <p className="mt-2 text-gray-600">
                                    Bài giảng rất chi tiết và dễ hiểu. Giảng viên giải thích rõ ràng về
                                    các concept của Spring Architecture.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );

        default:
            return null;
    }
};