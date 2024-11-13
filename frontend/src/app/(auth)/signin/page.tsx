"use client"

import React, { useState } from 'react';
import useAuth from '@/hooks/userAuth'; // Import your useAuth hook
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const Login: React.FC = () => {
  const { loginUser, error, isLoading } = useAuth(); // Get the login function and error from the hook
  const [email, setEmail] = useState<string>(''); // State for email
  const [password, setPassword] = useState<string>(''); // State for password
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior



    try {
      const response = await loginUser(email, password); // Call the login function from the useAuth hook
      if (response) {
        toast("Login successful!", {
          style: {
            backgroundColor: "#22c55e", // Green background for success
            color: "#ffffff", // White text color
            fontWeight: "bold",
            padding: "1rem",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Shadow for depth
          },
        });
        router.push("/dashboard")
      }
    } catch (error: any) {
      console.error("error while logging in the user ", error)
    }
  };



  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image Section - Hidden on small screens */}
      <div className="md:w-1/2 flex justify-center items-center bg-gradient-to-b from-yellow-50 to-yellow-200">
        {/* <img
          src="https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg" // Change to a cultural image
          alt="Cultural Art"
          className="hidden md:block object-cover h-full w-full md:w-5/6"
        /> */}
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-yellow-800 text-center mb-6">
            Welcome Back!
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Log in to continue exploring unique and handmade crafts.
          </p>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email} // Bind the email state
                onChange={(e) => setEmail(e.target.value)} // Update state on change
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
                value={password} // Bind the password state
                onChange={(e) => setPassword(e.target.value)} // Update state on change
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a href="/forgot-password" className="text-yellow-700 hover:underline text-sm">
                Forgot Password?
              </a>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className={isLoading ? `cursor-not-allowed w-full bg-yellow-800 text-white py-3 rounded-lg hover:bg-yellow-700 transition duration-200` : `cursor-pointer w-full bg-yellow-800 text-white py-3 rounded-lg hover:bg-yellow-700 transition duration-200`}
            >
              {isLoading ? "Logging" : "Login"}
            </button>
          </form>

          {/* Display error message if login fails */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{' '}
            <a href="/signup" className="text-yellow-700 font-medium hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
