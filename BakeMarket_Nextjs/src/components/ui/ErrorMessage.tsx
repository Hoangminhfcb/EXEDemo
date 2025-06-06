interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <div className="text-center py-8">
            <p className="text-red-500 font-medium">{message}</p>
        </div>
    );
};