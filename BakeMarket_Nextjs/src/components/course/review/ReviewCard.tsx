import { Review } from '@/types/course';
import { StarRating } from '@/components/ui/StarRating';
import { format } from 'date-fns';

interface ReviewCardProps {
    review: Review;
    onReply: () => void;
    replyingTo: number | null;
    replyText: string;
    onReplyTextChange: (text: string) => void;
    onSubmitReply: () => void;
    onCancelReply: () => void;
}

export const ReviewCard = ({
    review,
    onReply,
    replyingTo,
    replyText,
    onReplyTextChange,
    onSubmitReply,
    onCancelReply
}: ReviewCardProps) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <img
                            src={review.user.avatar}
                            alt={review.user.name}
                            className="w-12 h-12 rounded-full"
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{review.user.name}</h3>
                        <p className="text-sm text-gray-600">{review.user.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                            <StarRating rating={review.rating} />
                            <span className="text-sm text-gray-500">
                                • {format(new Date(review.date), 'MMM dd, yyyy')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <p className="mt-4 text-gray-700 leading-relaxed">{review.comment}</p>

            <div className="mt-4 flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>Helpful • {review.helpful}</span>
                </button>
                <button
                    onClick={onReply}
                    className="text-sm text-gray-600 hover:text-gray-900"
                >
                    Reply
                </button>
            </div>

            {review.replies && review.replies.length > 0 && (
                <div className="mt-4 pl-12 space-y-4">
                    {review.replies.map((reply) => (
                        <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <img
                                    src={reply.user.avatar}
                                    alt={reply.user.name}
                                    className="w-8 h-8 rounded-full"
                                />
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <h4 className="font-medium text-gray-900">
                                            {reply.user.name}
                                        </h4>
                                        <span className="text-sm text-gray-500">
                                            • {format(new Date(reply.createdAt), 'MMM dd, yyyy')}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 mt-1">{reply.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {replyingTo === review.id && (
                <div className="mt-4 pl-12">
                    <div className="flex items-start space-x-3">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser"
                            alt="Current User"
                            className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                            <textarea
                                value={replyText}
                                onChange={(e) => onReplyTextChange(e.target.value)}
                                placeholder="Write your reply..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                                    focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                                    resize-none text-sm"
                                rows={3}
                            />
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    onClick={onCancelReply}
                                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onSubmitReply}
                                    className="px-3 py-1 bg-gray-900 text-white text-sm rounded-lg
                                        hover:bg-gray-800 transition-colors"
                                >
                                    Reply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};