/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   output: 'standalone',
   webpack: (config) => {
      // Set the exportLocalsConvention to camelCase for CSS modules (transform everything to camelCase)
      config.module.rules
         .find(({ oneOf }: { oneOf: any }) => !!oneOf)
         .oneOf.filter(({ use }: { use: any }) =>
            JSON.stringify(use)?.includes('css-loader'),
         )
         .reduce((acc: any[], { use }: { use: any }) => acc.concat(use), [])
         .forEach(({ options }: { options: any }) => {
            if (options.modules) {
               options.modules.exportLocalsConvention = 'camelCase';
            }
         });

      return config;
   },
   images: {
      domains: ['res.cloudinary.com'],
   },
};

export default nextConfig;
