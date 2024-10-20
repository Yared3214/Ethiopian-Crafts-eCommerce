import React from 'react';

const Login = () => {
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
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
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
              type="submit"
              className="w-full bg-yellow-800 text-white py-3 rounded-lg hover:bg-yellow-700 transition duration-200"
            >
              Log In
            </button>
          </form>

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
