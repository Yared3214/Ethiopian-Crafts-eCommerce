/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'www.ephremtube.com',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
        {
          protocol: 'https',
          hostname: 'cdn.gamma.app',
          port: '', // Leave empty for default port
          pathname: '/**', // Allow all paths under the hostname
        },
      ],
    },
  };
  
 export default nextConfig;
  