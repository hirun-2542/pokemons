/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/pokemons',
            permanent: true, // Use permanent: true for a 308 redirect, or false for a 307 redirect
          },
        ];
      },
      images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.pokemondb.net',
                port: '',
                pathname: "/artwork/**"
            }
        ]
      }
    };

export default nextConfig;
