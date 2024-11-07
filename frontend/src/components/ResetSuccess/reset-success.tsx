import React from 'react';
import Link from 'next/link';

export const ResetSuccess: React.FC = () => {
    return (
        <div className="min-h-screen flex justify-center items-center flex-col p-6 md:p-12 bg-white">
            <div className="w-full max-w-md text-center">
                <h1 className="text-4xl font-bold text-green-700 mb-6">
                    Success!
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                    Reset email has been successfully sent to your email address. Please check your inbox.
                </p>
                <Link href="/signin" passHref>
                    <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Go to Login</span>
                </Link>
            </div>
        </div>
    );
};