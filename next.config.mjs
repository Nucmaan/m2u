/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'via.placeholder.com',
          pathname: '/**', // Allows all paths from this domain
        },
        {
          protocol: 'https',
          hostname: 'example.com', // Add example.com as a valid image source
          pathname: '/**', // Allows all paths from this domain
        },
      ],
    },
  };
  
  export default nextConfig;
  