"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/userAuth';

interface ResetPasswordPageProps {
    params: {
        token: string;
    };
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
    const router = useRouter();
    const { token } = params;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { resetPassword, error } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        try {
            const response = await resetPassword(token, password, confirmPassword);
            if (response) {
                router.push('/signin');
            }
        } catch (error) {
            console.error('Reset password error:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-6">Reset Password</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="password" className="block font-medium">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full mt-1 p-2 border rounded-md"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block font-medium">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full mt-1 p-2 border rounded-md"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
}
