const FavoritePage = () => {
    // Hardcoded course data
    const favoriteCourses = [
        {
            id: 1,
            title: "Complete React Developer in 2024",
            instructor: "John Smith",
            level: "Intermediate",
            duration: "24 hours",
            rating: 4.8,
            students: 12500,
            price: 89.99,
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            isBestseller: true,
            categories: ["Web Development", "Frontend", "React"]
        },
        {
            id: 2,
            title: "Advanced JavaScript Concepts",
            instructor: "Sarah Johnson",
            level: "Advanced",
            duration: "18 hours",
            rating: 4.9,
            students: 8900,
            price: 94.99,
            image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            isBestseller: true,
            categories: ["Web Development", "JavaScript", "Programming"]
        },
        {
            id: 3,
            title: "UI/UX Design Fundamentals",
            instructor: "Alex Chen",
            level: "Beginner",
            duration: "15 hours",
            rating: 4.7,
            students: 6700,
            price: 79.99,
            image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
            isBestseller: false,
            categories: ["Design", "UI/UX", "Creative"]
        },
        {
            id: 4,
            title: "Full Stack Next.js Development",
            instructor: "Michael Rodriguez",
            level: "Intermediate",
            duration: "30 hours",
            rating: 4.9,
            students: 5200,
            price: 99.99,
            image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            isBestseller: true,
            categories: ["Web Development", "Next.js", "Frontend", "Backend"]
        },
        {
            id: 5,
            title: "Tailwind CSS Mastery",
            instructor: "Emily Wong",
            level: "All Levels",
            duration: "12 hours",
            rating: 4.6,
            students: 3800,
            price: 69.99,
            image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
            isBestseller: false,
            categories: ["Web Development", "CSS", "Frontend"]
        },
        {
            id: 6,
            title: "Node.js API Development",
            instructor: "David Lee",
            level: "Intermediate",
            duration: "20 hours",
            rating: 4.7,
            students: 4500,
            price: 84.99,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZqUWJpmOLtR3U_BVSi5aLsFDi6aLR2pYKQ&s",
            isBestseller: false,
            categories: ["Web Development", "Backend", "API"]
        }
    ];

    // Calculate total hours correctly
    const totalHours = favoriteCourses.reduce((sum, course) => {
        // Extract the number from the duration string and convert to number
        const hours = parseInt(course.duration.split(' ')[0], 10);
        return sum + hours;
    }, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-10">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        My Favorite Courses
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Your handpicked collection of the best educational content to accelerate your learning journey.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
                        <div className="text-indigo-600 dark:text-indigo-400 text-3xl font-bold mb-2">
                            {favoriteCourses.length}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">Saved Courses</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
                        <div className="text-indigo-600 dark:text-indigo-400 text-3xl font-bold mb-2">
                            {favoriteCourses.filter(course => course.isBestseller).length}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">Bestsellers</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
                        <div className="text-indigo-600 dark:text-indigo-400 text-3xl font-bold mb-2">
                            {totalHours}h
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">Total Learning Hours</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                        All Courses
                    </button>
                    <button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        Web Development
                    </button>
                    <button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        Design
                    </button>
                    <button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        Programming
                    </button>
                    <button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        Bestsellers
                    </button>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favoriteCourses.map(course => (
                        <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform hover:scale-105"
                                />
                                {course.isBestseller && (
                                    <div className="absolute top-3 left-3 bg-yellow-500 text-xs font-bold uppercase tracking-wider text-gray-900 rounded-full px-2 py-1">
                                        Bestseller
                                    </div>
                                )}
                                <button className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full text-red-500 hover:text-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            {/* Course Details */}
                            <div className="p-5">
                                <div className="flex items-center mb-3">
                                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 text-xs px-2 py-1 rounded">
                                        {course.level}
                                    </span>
                                    <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">
                                        {course.duration}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                    {course.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                    by {course.instructor}
                                </p>

                                <div className="flex items-center mb-4">
                                    <div className="flex text-yellow-400 mr-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 font-semibold">
                                        {course.rating}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                                        ({course.students.toLocaleString()} students)
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        ${course.price}
                                    </span>
                                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                                        View Course
                                    </button>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="px-5 pb-5 flex flex-wrap gap-2">
                                {course.categories.map((category, idx) => (
                                    <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                    <nav className="flex items-center space-x-2">
                        <button className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button className="px-3 py-1 rounded-md bg-indigo-600 text-white">1</button>
                        <button className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">2</button>
                        <button className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">3</button>
                        <button className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default FavoritePage;