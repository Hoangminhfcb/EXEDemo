const Portfolio = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* About Me Section */}
            <section className="mb-12">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                    {/* Avatar */}
                    <img
                        src="https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-web-programmer-avatar-png-image_12529205.png"
                        alt="Le Khanh Duc"
                        className="w-40 h-40 rounded-full object-cover"
                    />
                    {/* About Me Content */}
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Me</h1>
                        <p className="text-lg text-gray-700 mb-4">
                            👋 Hi, I'm <span className="font-bold text-gray-800">Le Khanh Duc</span>, an aspiring backend developer passionate about building scalable, reliable, and secure systems. I'm currently an IT student at <span className="font-bold">FPT University Danang</span>, majoring in Software Engineering.
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Skilled in Java, Spring Boot, RESTful APIs, SQL/NoSQL, Kafka, Redis</li>
                            <li>Experienced with Elasticsearch, Kibana, Logstash for logging & analytics</li>
                            <li>Proficient in Nextjs, HTML, CSS, JavaScript</li>
                            <li>Hands-on with Git, Docker, Postman</li>
                            <li>Familiar with Prometheus, Grafana, and Jenkins for monitoring and CI/CD pipelines</li>
                            <li>Experienced with AWS services: EC2 for deployment, S3 for file storage, and RDS for database management</li>
                            <li>Always improving: System design, API development & microservices</li>
                        </ul>
                        <p className="mt-4 text-gray-700">
                            🌟 Fun fact: Backend is the invisible hero—ensuring everything runs seamlessly!
                        </p>
                    </div>
                </div>
            </section>

            {/* Socials Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Socials</h2>
                <div className="flex space-x-4">
                    <a href="https://www.facebook.com/profile.php?id=100028989917543" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">Facebook</a>
                    <a href="https://www.instagram.com/02_10_003/" className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition">Instagram</a>
                    <a href="https://www.tiktok.com/@khanhduc212" className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition">TikTok</a>
                    <a href="https://www.youtube.com/@backendjava212" className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition">YouTube</a>
                    <a href="mailto:lekhanhduc212003@gmail.com" className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition">Email</a>
                    <a href="https://github.com/lekhanhduc" className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-900 transition">GitHub</a>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Tech Stack</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {[
                        "Java", "Spring Framework", "Hibernate", "Postgres", "MySQL",
                        "Redis", "Elasticsearch", "Kibana", "Logstash", "Apache Kafka", "Jenkins", "SonarQube", "SonarLint",
                        "Prometheus", "Grafana", "EC2", "Nextjs",
                        "Git", "Postman", "Docker"
                    ].map((tech, index) => (
                        <span
                            key={index}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-center text-sm font-semibold cursor-pointer hover:bg-gray-800 hover:text-white transition"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </section>

            {/* Work Experience Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Work Experience</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Backend Developer Intern</h3>
                        <p className="text-gray-600">FPT Software. | August 2025 - Present</p>
                        <p className="text-gray-600 mt-2">
                            Worked on an E-Learning platform built using the Monolithic architecture.
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                            <li>Implemented login via Google, Facebook, GitHub, and JWT authentication within a single application</li>
                            <li>Used Redis for caching frequently accessed data and managing session tokens</li>
                            <li>Integrated Elasticsearch for efficient search and filtering of course content</li>
                            <li>Designed and implemented centralized APIs for user management, course enrollment, and payments</li>
                            <li>Developed email notification features using SendGrid for transactional emails</li>
                            <li>Built features like course reviews, QR code payments, and a community forum within the monolithic structure</li>
                            <li>Handled file uploads and storage using AWS S3 for scalability</li>
                            <li>Set up CI/CD pipelines using Jenkins for automated builds and deployments</li>
                            <li>Used SonarQube to ensure code quality and maintainability</li>
                            <li>Packaged the application into a Docker image for consistent deployment</li>
                            <li>Deployed the monolithic application on AWS EC2 for production</li>
                        </ul>
                        <a
                            href="https://github.com/lekhanhduc/ProjectCourse"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-800 hover:underline mt-4 inline-block"
                        >
                            View Source Code
                        </a>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Projects</h2>
                <div className="space-y-6">
                    {/* E-Learning Platform */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">E-Learning Platform</h3>
                        <p className="text-gray-600">
                            A microservices-based e-learning platform designed for seamless online education.
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                            <li>Implemented login via Google, Facebook, GitHub, and JWT authentication</li>
                            <li>Used Redis for token blacklist management and caching</li>
                            <li>Integrated Elasticsearch for full-text search functionality</li>
                            <li>Utilized Kafka for event-driven communication between microservices</li>
                            <li>Designed and implemented an API Gateway with rate limiting for traffic control</li>
                            <li>Implemented Load Balancer to distribute traffic across multiple services</li>
                            <li>Applied Saga Pattern to ensure consistency across multiple service operations</li>
                            <li>Developed email templates and integrated SendGrid for email notifications</li>
                            <li>Built features like course reviews, QR code payments, and community forums</li>
                            <li>Handled image uploads using AWS S3 and MinIO</li>
                            <li>Set up CI/CD pipelines using Jenkins for automated builds and deployments</li>
                            <li>Used SonarQube for static code analysis and quality checks</li>
                            <li>Built Docker images for each service and pushed them to Docker Hub</li>
                            <li>Deployed the platform on AWS EC2 for production</li>
                        </ul>
                        <a
                            href="https://github.com/lekhanhduc/ElearningPlatform"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-800 hover:underline mt-4 inline-block"
                        >
                            View Source Code
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section>
                <h2 className="text-3xl font-bold text-gray-800 mb-5">Contact</h2>
                <p className="text-gray-700 mb-10">
                    Feel free to reach out for collaborations or just a friendly chat!
                </p>
                <a
                    href="mailto:lekhanhduc212003@gmail.com"
                    className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-900 transition"
                >
                    Send me an email
                </a>
            </section>
        </div>
    );
};

export default Portfolio;
