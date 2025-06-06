import { StarRating } from '@/components/ui/StarRating';

interface ReviewStatsProps {
    averageRating: number;
    totalReviews: number;
    onWriteReview: () => void;
}

export const ReviewStats = ({ averageRating, totalReviews, onWriteReview }: ReviewStatsProps) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-4">
                        <span className="text-4xl font-bold text-gray-900">
                            {averageRating.toFixed(1)}
                        </span>
                        <StarRating rating={Math.round(averageRating)} />
                    </div>
                    <p className="text-gray-600 mt-2">Course Rating • {totalReviews} Reviews</p>
                </div>
                <button
                    onClick={onWriteReview}
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 
                        transition-colors duration-200"
                >
                    Write a Review
                </button>
            </div>
        </div>
    );
};