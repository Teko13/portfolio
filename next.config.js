/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration des images externes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'asdolncrajyqrpvfllrc.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'teko-portfolio-cms.vercel.app',
        port: '',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      }
    ]
  },
  
  // Configuration des headers CORS
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
