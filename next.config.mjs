/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/methodology", permanent: true },
      { source: "/check", destination: "/due-diligence", permanent: true },
      { source: "/report", destination: "/sample-report", permanent: true },
      { source: "/pricing", destination: "/due-diligence#pricing", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true }
    ];
  }
};

export default nextConfig;
