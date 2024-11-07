"use client"
import React, { useState } from 'react';
import useAuth from '@/hooks/userAuth'; // Import your useAuth hook
import { ResetSuccess } from '@/components/ResetSuccess/reset-success'


const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const { forgetPassword, error } = useAuth();

  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(false); // Reset messages on new submit

    try {
      const response = await forgetPassword(email);
      if (response) {
        setSuccessMessage(true); // Trigger success message
      }
    }
    catch (error: any) {
      console.error("error while logging in the user ", error)
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col md:flex-row">
      {/* Conditionally Render Success Message or Form */}
      {successMessage ? (
        <ResetSuccess />
      ) : (
        <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-12 bg-white">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-yellow-800 text-center mb-6">
              Forgot Your Password?
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Enter your email below and we’ll send you instructions to reset your password.
            </p>

            {/* Success or Error Message */}
            {successMessage && (
              <div className="bg-green-100 text-green-700 p-4 mb-6 rounded-lg">
                Sending reset email... Please wait.
              </div>
            )}
            {error && (
              <div className="bg-red-100 text-red-700 p-4 mb-6 rounded-lg">
                {error}
              </div>
            )}

            {/* Forgot Password Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-800 text-white py-3 rounded-lg hover:bg-yellow-700 transition duration-200"
              >
                Send Reset Instructions
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Remembered your password?{' '}
              <a href="/signin" className="text-yellow-700 font-medium hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
