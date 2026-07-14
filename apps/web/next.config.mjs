/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  async redirects() {
    return [
      {
        source: "/new-home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
