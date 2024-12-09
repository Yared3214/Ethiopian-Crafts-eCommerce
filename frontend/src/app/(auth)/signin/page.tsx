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
import logo from '@/assets/Free-Letter-S-Logo-Design-Template-1180x664.jpg'; // Assuming you have a logo image in the public directory

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // Handle form submission (e.g., API call for creating the account)
    console.log('Form submitted');
    setError('');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Section (Form) */}
      <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center items-center lg:items-start">
        <a href="/" className="absolute top-6 left-6">
          <Image src={logo} alt="Website Logo" width={100} height={100} />
        </a>
        <h1 className="text-3xl font-semibold mb-4">Get Started</h1>
        <p className="text-xl mb-6">Welcome to Fillianta - Let's create your account</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@fillianta.com"
              className="w-full p-3 rounded-md text-gray-900"
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
              className="w-full p-3 rounded-md text-gray-900"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-md mt-4">Sign up</button>
          <div className="flex justify-between items-center text-sm mt-4">
            <a href="#" className="text-teal-200 hover:underline">Forgot?</a>
            <p>Already have an account? <a href="/login" className="text-teal-200 hover:underline">Log in</a></p>
          </div>
        </form>
      </div>

      {/* Right Section (Image) */}
      <div className="w-full lg:w-1/2 relative">
        <Image src={logo} alt="Website Logo" className="w-full h-full bg-cover bg-center"   />
      </div>
    </div>
  );
};

export default SignUpPage;
