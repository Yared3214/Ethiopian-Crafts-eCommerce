"use client"

// import React, { useState } from 'react';
// import useAuth from '@/hooks/userAuth'; // Import your useAuth hook
// import { useRouter } from 'next/navigation'
// import { toast } from 'sonner'

// const Login: React.FC = () => {
//   const { loginUser, error, isLoading } = useAuth(); // Get the login function and error from the hook
//   const [email, setEmail] = useState<string>(''); // State for email
//   const [password, setPassword] = useState<string>(''); // State for password
//   const router = useRouter();


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); // Prevent the default form submission behavior



//     try {
//       const response = await loginUser(email, password); // Call the login function from the useAuth hook
//       if (response) {
//         toast("Login successful!", {
//           style: {
//             backgroundColor: "#22c55e", // Green background for success
//             color: "#ffffff", // White text color
//             fontWeight: "bold",
//             padding: "1rem",
//             borderRadius: "0.5rem",
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Shadow for depth
//           },
//         });
//         router.push("/dashboard")
//       }
//     } catch (error: any) {
//       console.error("error while logging in the user ", error)
//     }
//   };



//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Left Image Section - Hidden on small screens */}
//       <div className="md:w-1/2 flex justify-center items-center bg-gradient-to-b from-yellow-50 to-yellow-200">
//         {/* <img
//           src="https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg" // Change to a cultural image
//           alt="Cultural Art"
//           className="hidden md:block object-cover h-full w-full md:w-5/6"
//         /> */}
//       </div>

//       {/* Right Form Section */}
//       <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-12 bg-white">
//         <div className="w-full max-w-md">
//           <h1 className="text-4xl font-bold text-yellow-800 text-center mb-6">
//             Welcome Back!
//           </h1>
//           <p className="text-center text-gray-600 mb-8">
//             Log in to continue exploring unique and handmade crafts.
//           </p>

//           {/* Login Form */}
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email} // Bind the email state
//                 onChange={(e) => setEmail(e.target.value)} // Update state on change
//                 className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password} // Bind the password state
//                 onChange={(e) => setPassword(e.target.value)} // Update state on change
//                 className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>

//             {/* Forgot Password Link */}
//             <div className="flex justify-end">
//               <a href="/forgot-password" className="text-yellow-700 hover:underline text-sm">
//                 Forgot Password?
//               </a>
//             </div>

//             <button
//               disabled={isLoading}
//               type="submit"
//               className={isLoading ? `cursor-not-allowed w-full bg-yellow-800 text-white py-3 rounded-lg hover:bg-yellow-700 transition duration-200` : `cursor-pointer w-full bg-yellow-800 text-white py-3 rounded-lg hover:bg-yellow-700 transition duration-200`}
//             >
//               {isLoading ? "Logging" : "Login"}
//             </button>
//           </form>

//           {/* Display error message if login fails */}
//           {error && <p className="text-red-500 text-center mt-4">{error}</p>}

//           <p className="text-center text-gray-600 mt-6">
//             Don’t have an account?{' '}
//             <a href="/signup" className="text-yellow-700 font-medium hover:underline">
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Login;


// pages/signup.tsx
// pages/signup.tsx
// pages/signup.tsx
// pages/signup.tsx

import { useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/logo.jpg'; // Assuming you have a logo image in the public directory
import Link from 'next/link';
import useAuth from '@/hooks/userAuth'; // Import your useAuth hook
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ErrorMessage } from "@hookform/error-message"


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, error, isLoading } = useAuth();
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
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dso7gnmps/image/upload/v1733815395/Create_a_serene_and_artistic_background_showcasing_traditional_Ethiopian_culture._The_scene_should_feature_rich_vibrant_textures_with_intricate_designs_inspired_by_Ethiopian_art_pottery_and_fabric_patterns._In_2_jmrmkl.jpg)`,
      }}
    >
      <div className="absolute inset-0 lg:w-1/2 p-10 flex flex-col justify-center text-white">
        {/* Logo */}
        <Link href="/" className="absolute top-4 left-4 flex items-center justify-center w-24 h-24">
          <Image
            src={logo}
            alt="Website Logo"
            width={96}
            height={96}
            className="rounded-full transition-transform hover:scale-110"
          />
        </Link>

        {/* Heading and Description */}
        <h1 className="text-4xl font-semibold mb-4 text-shadow-lg text-white">
          Crafting Timeless Ethiopian Art
        </h1>
        <p className="text-xl mb-6 text-shadow-lg text-white">
          Log in and explore exclusive works from talented artisans.
        </p>

        {/* Error Message */}
        {error && (
          <p className="bg-red-100 text-red-600 font-medium text-sm inline-block px-2 py-1 rounded-md">
            {error}
          </p>
        )}


        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@fillianta.com"
              className="w-full p-3 rounded-md text-white bg-black bg-opacity-60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:shadow-lg focus:shadow-green-500/50 transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 rounded-md text-white bg-black bg-opacity-60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:shadow-lg focus:shadow-green-500/50 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base w-1/2 ${isLoading ? 'cursor-wait' : ''}`}
          >
            <span
              className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px ${isLoading ? 'bg-opacity-50' : ''}`}
            ></span>

            <span
              className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]"
            ></span>

            <div
              className={`relative flex items-center justify-between py-3 px-6 text-lg text-white rounded-lg transform -translate-y-1 bg-gradient-to-r from-[#f27121] via-[#e94057] to-[#8a2387] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110 ${isLoading ? 'bg-opacity-60' : ''}`}
            >
              {/* Animated Text */}
              <span className={`select-none transition-all duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                Log In
              </span>
              <span className={`select-none transition-all duration-300 absolute ${isLoading ? 'opacity-100' : 'opacity-0'} transform ${isLoading ? 'translate-x-0' : 'translate-x-3'}`}>
                Signing in...
              </span>

              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-5 h-5 ml-2 -mr-1 transition-transform duration-500 group-hover:translate-x-1 ${isLoading ? 'animate-spin-slow' : ''}`}
              >
                <path
                  clip-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
          </button>

          <div className="flex justify-between items-center text-sm mt-4">
            <Link href="/forgotpassword" className="text-white hover:underline">Forgot Password?</Link>
            <p className="text-white">Don't have an account? <Link href="/signup" className="hover:underline">Sign Up</Link></p>
          </div>
        </form>

      </div>

      {/* Right Section (Image) */}
      <div className="hidden lg:block w-full h-full">
        {/* The image is already set as background */}
      </div>
    </div>
  );
};

export default LoginPage;
