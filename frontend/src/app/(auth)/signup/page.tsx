"use client"

import React, { useState } from 'react';
import useAuth from '@/hooks/userAuth'; // Import your useAuth hook
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { registerUser, error, isLoading } = useAuth();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await registerUser(name, email, password, confirmPassword); // Call the login function from the useAuth hook
      if (response.success) {
        toast("Registration successful!", {
          style: {
            backgroundColor: "#22c55e", // Green background for success
            color: "#ffffff", // White text color
            fontWeight: "bold",
            padding: "1rem",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Shadow for depth
          },
        });
        router.push("/signin")
      }
    }
    catch (error: any) {
      console.error("error while registering the user ", error)
    }
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image Section */}
      <div className="md:w-1/2 flex justify-center items-center bg-gradient-to-b from-yellow-50 to-yellow-200">
        {/* <img
          src="https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg" // Change to a cultural image
          alt="Cultural Art"
          className="hidden md:block object-cover h-full w-full md:w-5/6"
        /> */}
      </div>

      {/* Right Form Section */}
      <div className="md:w-1/2 flex justify-center items-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-yellow-800 text-center mb-6">
            Sign Up to Discover Unique Crafts
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Explore a world of authentic, handmade crafts and support artisans globally.
          </p>

          {/* Error Message */}
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          {/* Sign Up Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Enter your full name"
                required
              />
            </div>

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

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={isLoading ? `cursor-not-allowed w-full bg-yellow-800 text-white py-3 rounded-lg hover:bg-yellow-700 transition duration-200` : `cursor-pointer w-full bg-yellow-800 text-white py-3 rounded-lg hover:bg-yellow-700 transition duration-200`}
            >
              {isLoading ? "Creating" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <a href="/signin" className="text-yellow-700 font-medium hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div >
  );
};

export default SignUp;
