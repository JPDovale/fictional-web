import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        purpleShadow: '0 0 120px 20px',
      },
      keyframes: {
        'square-spin': {
          '25%': { transform: 'perspective(100px) rotateX(180deg) rotateY(0)' },
          '50%': {
            transform: 'perspective(100px) rotateX(180deg) rotateY(180deg)',
          },
          '75%': { transform: 'perspective(100px) rotateX(0) rotateY(180deg)' },
          '100%': { transform: 'perspective(100px) rotateX(0) rotateY(0)' },
        },
      },
      animation: {
        'square-spin':
          'square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite',
      },
      fontFamily: {
        title: 'var(--font-cinzel)',
        body: 'var(--font-robot)',
      }
    },
  },
  plugins: [],
};
export default config;
