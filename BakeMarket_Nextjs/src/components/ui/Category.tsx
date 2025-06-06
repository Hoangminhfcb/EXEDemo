import Link from "next/link";

const Category = () => {
    const categories = [
        "Java",
        "Spring boot",
        "Devops",
        "Cloud Computing",
        "UI/UX Design",
        "Data Science",
        "Machine Learning",
        "Web Development",
        "Cyber Security",
        "Blockchain",
    ];

    return (
        <div className="flex flex-wrap gap-4 justify-center py-4">
            {categories.map((category) => (
                <Link
                    href={`/category?category=${category.replace(/\s+/g, " ")}`}
                    key={category}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                    {category}
                </Link>
            ))}
        </div>
    );
};

export default Category;