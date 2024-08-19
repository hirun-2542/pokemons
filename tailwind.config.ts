import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      '2xl': {'min': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'min': '1279px'},
      // => @media (max-width: 1279px) { ... }
      'min-lg': { "min": "1024px"},

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'type-normal': '#A8A77A',
        'type-fire': '#EE8130',
        'type-water': '#6390F0',
        'type-electric': '#F7D02C',
        'type-grass': '#7AC74C',
        'type-ice': '#96D9D6',
        'type-fighting': '#C22E28',
        'type-poison': '#A33EA1',
        'type-ground': '#E2BF65',
        'type-flying': '#A98FF3',
        'type-psychic': '#F95587',
        'type-bug': '#A6B91A',
        'type-rock': '#B6A136',
        'type-ghost': '#735797',
        'type-dragon': '#6F35FC',
        'type-dark': '#705746',
        'type-steel': '#B7B7CE',
        'type-fairy': '#D685AD',
      },
    },
  },
  plugins: [],
};
export default config;
