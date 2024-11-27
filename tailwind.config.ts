import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  safelist: ['col-span-1', 'col-span-2', 'col-span-3', 'row-span-1', 'row-span-2', 'row-span-3', 'md:col-span-1', 'md:col-span-2', 'md:col-span-3', 'md:row-span-1', 'md:row-span-2', 'md:row-span-3'],
  plugins: [],
};
export default config;
