export const InstructorInfo = () => {
    return (
        <section className="mb-12 mt-15 p-6 rounded-lg">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <div className="w-18 h-18 rounded-full overflow-hidden">
                        <img
                            src="/author.jpg"
                            alt="Le Khanh Duc"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">Le Khanh Duc</h3>
                    <p className="text-gray-600 mt-1">Software Engineering Student at FPT University</p>
                    <p className="text-gray-700 mt-2">
                        Backend developer specializing in Java Spring Boot and microservices architecture.
                        Passionate about building scalable systems and continuous learning in software development.
                    </p>
                </div>
            </div>
        </section>
    );
};