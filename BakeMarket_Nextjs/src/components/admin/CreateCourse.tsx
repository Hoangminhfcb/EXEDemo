'use client';
import { useState, FormEvent, useRef } from 'react';
import { fetchInterceptor } from '@/utils/Interceptor';
import { API_URL } from '@/utils/BaseUrl';
import { toast } from 'react-toastify';

const CreateCourse = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        categoryName: '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!formData.name || !formData.description || !formData.price || !formData.categoryName) {
            setError('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('categoryName', formData.categoryName);
        if (file) {
            formDataToSend.append('file', file);
        }

        try {
            const response = await fetchInterceptor(`${API_URL}/courses`, {
                method: 'POST',
                body: formDataToSend,
            });

            const responseData = await response.json();
            toast.success('Course created successfully!');
            setFormData({ name: '', description: '', price: '', categoryName: '' });
            setFile(null);
            setImagePreview(null);
        } catch (err: any) {
            setError(err.message || 'Failed to create course.');
            toast.error('Failed to create course.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Create a New Course</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Course Cover Preview */}
                    <div className="relative">
                        <label className="block text-lg font-semibold text-gray-800 mb-2">Course Cover</label>
                        <div
                            className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden cursor-pointer border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-colors"
                            onClick={handleImageClick}
                        >
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Course cover preview"
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    <span className="text-base font-medium">Click to upload an image</span>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            ref={fileInputRef}
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-lg font-semibold text-gray-800 mb-2">
                            Course Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-700 text-base placeholder-gray-400 transition-colors"
                            placeholder="Enter course name"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-lg font-semibold text-gray-800 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={6} // Increased rows for longer form
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-700 text-base placeholder-gray-400 transition-colors"
                            placeholder="Enter course description"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-lg font-semibold text-gray-800 mb-2">
                            Price (VND)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            min="0"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-700 text-base placeholder-gray-400 transition-colors"
                            placeholder="Enter course price"
                            required
                        />
                    </div>

                    {/* Category Name (Select Dropdown) */}
                    <div>
                        <label htmlFor="categoryName" className="block text-lg font-semibold text-gray-800 mb-2">
                            Category
                        </label>
                        <select
                            id="categoryName"
                            name="categoryName"
                            value={formData.categoryName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-700 text-base transition-colors"
                            required
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            <option value="Spring Boot">Spring Boot</option>
                            <option value="Microservices">Microservices</option>
                            <option value="Devops">Devops</option>
                            <option value="Security">Security</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Cloud Computing">Cloud Computing</option>
                            <option value="Web Development">Web Development</option>
                        </select>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="text-red-600 text-base font-medium text-center bg-red-50 py-3 rounded-xl">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full px-6 py-3 rounded-xl text-white font-semibold text-lg transition-colors duration-200 ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                        >
                            {loading ? 'Creating...' : 'Create Course'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCourse;