import type { Config } from 'tailwindcss';

const config: Config = {
   darkMode: ['class'],
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      container: {
         center: true,
         padding: '16px',
         screens: {
            sm: '640px',
            md: '768px',
            lg: '960px',
            xl: '1200px',
         },
      },
      fontFamily: {
         primary: 'var(--font-roboto)',
      },
      extend: {
         colors: {
            bg: '#111824',
            primary: '#162336',
            secondary: '#1f2e44',
            third: '#172336',
         },
      },
   },
   plugins: [require('tailwindcss-animate')],
};
export default config;
