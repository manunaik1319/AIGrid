/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.oaistatic.com',
      },
      {
        protocol: 'https',
        hostname: 'www.midjourney.com',
      },
      {
        protocol: 'https',
        hostname: 'github.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: 'elevenlabs.io',
      },
      {
        protocol: 'https',
        hostname: 'www.notion.so',
      },
      {
        protocol: 'https',
        hostname: 'www.perplexity.ai',
      },
      {
        protocol: 'https',
        hostname: 'claude.ai',
      },
      {
        protocol: 'https',
        hostname: 'www.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'app.runwayml.com',
      },
      {
        protocol: 'https',
        hostname: 'preview.devin.ai',
      },
      {
        protocol: 'https',
        hostname: 'www.udio.com',
      },
      {
        protocol: 'https',
        hostname: 'grok.x.ai',
      },
      {
        protocol: 'https',
        hostname: 'bolt.new',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
