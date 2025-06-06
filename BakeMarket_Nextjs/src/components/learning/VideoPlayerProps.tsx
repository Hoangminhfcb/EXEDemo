interface VideoPlayerProps {
    lessonId?: string;
    videoUrl?: string;
}

export const VideoPlayer = ({ lessonId, videoUrl }: VideoPlayerProps) => {
    return (
        <div className="flex-1 bg-black">
            <video
                key={lessonId}
                className="w-full h-full"
                controls
                playsInline
                preload="auto"
                controlsList="nodownload"
                src={videoUrl}
                onError={(e) => console.error("Video error:", e)}
            />
        </div>
    );
};