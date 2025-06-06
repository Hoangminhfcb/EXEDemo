'use client';
import { useState } from 'react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (review: { rating: number; comment: string }) => void;
}

const ReviewModal = ({ isOpen, onClose, onSubmit }: ReviewModalProps) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ rating, comment });
        setRating(5);
        setComment('');
        onClose();
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black/30"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg mx-4 z-[999]">
                <div className="bg-white rounded-xl p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className={`${montserrat.className} text-xl font-semibold text-gray-900 cursor-pointer`}>
                            Write a Review
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rating
                            </label>
                            <div className="flex gap-2 ">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className="focus:outline-none cursor-pointer"
                                    >
                                        <svg
                                            className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
                                                } hover:text-yellow-400 transition-colors`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Review
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                                focus:ring-gray-900 focus:border-transparent resize-none"
                                placeholder="Share your experience with this course..."
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="cursor-pointer px-4 py-2 text-gray-700 border border-gray-300 rounded-lg
                                hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="cursor-pointer px-4 py-2 bg-gray-900 text-white rounded-lg
                                hover:bg-gray-800 transition-colors"
                            >
                                Submit Review
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ReviewModal;