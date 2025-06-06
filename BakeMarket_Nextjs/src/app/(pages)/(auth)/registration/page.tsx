'use client';

import { registerUser } from '@/services/authService';
import { UserCreationRequest } from '@/types/request/UserCreationRequest';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Registration = () => {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistration = async (event: React.FormEvent) => {
        event.preventDefault();

        const request: UserCreationRequest = { firstName, lastName, email, password };

        try {
            await registerUser(request);
            toast.success('Registration successful!', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setTimeout(() => {
                router.push('/login');
            }, 1000);

        } catch (error: any) {
            console.error('Registration failed:', error.message);

            toast.error(error.message || 'Registration failed!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <ToastContainer /> {/* Container để hiển thị thông báo */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Register</h2>
                <form className="space-y-4" onSubmit={handleRegistration}>
                    {/* First Name */}
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                            placeholder="Enter your first name"
                        />
                    </div>
                    {/* Last Name */}
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                            placeholder="Enter your last name"
                        />
                    </div>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition"
                    >
                        Register
                    </button>
                </form>
                {/* Back to Login */}
                <div className="mt-4 text-center">
                    <a href="/login" className="text-purple-600 hover:underline text-sm">
                        Already have an account? Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Registration;