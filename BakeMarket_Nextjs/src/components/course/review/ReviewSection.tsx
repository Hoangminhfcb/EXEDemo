import { Review } from '@/types/course';
import { Montserrat } from 'next/font/google';
import { useState } from 'react';
import { ReviewStats } from './ReviewStats';
import { ReviewCard } from './ReviewCard';

const montserrat = Montserrat({ subsets: ['latin'] });

interface ReviewSectionProps {
    reviews: Review[];
    onWriteReview: () => void;
    onReviewSubmit: (review: { rating: number; comment: string }) => void;
}

export const ReviewSection = ({ reviews, onWriteReview, onReviewSubmit }: ReviewSectionProps) => {
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState('');

    const handleReply = (reviewId: number) => {
        if (!replyText.trim()) return;
        // Handle reply logic here
        setReplyText('');
        setReplyingTo(null);
    };

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    return (
        <section className="mt-16">
            <h2 className={`${montserrat.className} text-2xl font-bold text-gray-900 mb-8`}>
                Student Reviews
            </h2>

            <ReviewStats
                averageRating={averageRating}
                totalReviews={reviews.length}
                onWriteReview={onWriteReview}
            />

            <div className="space-y-6">
                {reviews.map((review) => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                        onReply={() => setReplyingTo(review.id)}
                        replyingTo={replyingTo}
                        replyText={replyText}
                        onReplyTextChange={setReplyText}
                        onSubmitReply={() => handleReply(review.id)}
                        onCancelReply={() => {
                            setReplyText('');
                            setReplyingTo(null);
                        }}
                    />
                ))}
            </div>

            <div className="mt-8 text-center">
                <button className="px-6 py-2 border-2 border-gray-200 text-gray-700 rounded-lg
                    hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
                    Load More Reviews
                </button>
            </div>
        </section>
    );
};