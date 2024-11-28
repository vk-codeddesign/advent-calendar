import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const fluidFont = (minFont: string, maxFont: string, minWidthPx: string, maxWidthPx: string) => {
  const minFontRem = parseFloat(minFont);
  const maxFontRem = parseFloat(maxFont);
  const minWidthRem = parseFloat(minWidthPx) / 16;
  const maxWidthRem = parseFloat(maxWidthPx) / 16;

  const slope = ((maxFontRem - minFontRem) / (maxWidthRem - minWidthRem)) * 100;
  const intersection = minFontRem - (slope / 100) * minWidthRem;

  return `clamp(${minFontRem}rem, ${slope}vw + ${intersection}rem, ${maxFontRem}rem)`;
};

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      scale: {
        '25': '0.25',
        '40': '0.40',
      },
    },
  },
  safelist: ['col-span-1', 'col-span-2', 'col-span-3', 'row-span-1', 'row-span-2', 'row-span-3', 'md:col-span-1', 'md:col-span-2', 'md:col-span-3', 'md:row-span-1', 'md:row-span-2', 'md:row-span-3'],
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      const smScreen = theme('screens.sm') || '640px';
      const xlScreen = theme('screens.2xl') || '1280px';

      const minWidth = typeof smScreen === 'string' ? smScreen : smScreen.min || '640px';
      const maxWidth = typeof xlScreen === 'string' ? xlScreen : xlScreen.max || '1280px';

      const sizeMapping: { [key: string]: [string, string] } = {
        xs: ['0.6rem', '0.75rem'], // 80% of desktop size
        sm: ['0.7rem', '0.875rem'], // ~80% of desktop size
        base: ['0.8rem', '1rem'], // 80% of desktop size
        lg: ['0.9rem', '1.125rem'], // ~80% of desktop size
        xl: ['1rem', '1.25rem'], // 80% of desktop size
        '2xl': ['1.2rem', '1.5rem'], // 80% of desktop size
        '3xl': ['1.4rem', '1.875rem'], // ~75% of desktop size
        '4xl': ['1.6rem', '2.25rem'], // ~70% of desktop size
        '5xl': ['1.8rem', '3rem'], // 60% of desktop size
        '6xl': ['2.25rem', '3.75rem'], // 60% of desktop size
        '7xl': ['2.7rem', '4.5rem'], // 60% of desktop size
        '8xl': ['3rem', '6rem'], // 50% of desktop size
        '9xl': ['4rem', '8rem'], // 50% of desktop size
      };

      // Create a values object for matchUtilities
      const values = {
        ...sizeMapping,
        // Add numeric values from 1 to 10
        ...Array.from({ length: 10 }, (_, i) => i + 1).reduce(
          (acc, num) => {
            acc[num] = [`${num}rem`, `${num * 2}rem`];
            return acc;
          },
          {} as { [key: string]: [string, string] },
        ),
      };

      matchUtilities(
        {
          'text-fluid': (value: string | [string, string], { modifier }: { modifier: string | null }) => {
            let minSize: string;
            let maxSize: string;

            if (Array.isArray(value)) {
              // Value comes from the values object
              [minSize, maxSize] = value;
            } else if (typeof value === 'string') {
              // Handle arbitrary values like fluid-[1rem,2rem]
              const arbitraryMatch = modifier?.match(/^\[(.+),(.+)\]$/);
              if (arbitraryMatch) {
                minSize = arbitraryMatch[1].trim();
                maxSize = arbitraryMatch[2].trim();
              } else {
                // Handle numeric values like fluid-1, fluid-2
                const numMatch = value.match(/^(\d+)$/);
                if (numMatch) {
                  const num = parseInt(numMatch[1], 10);
                  minSize = `${num}rem`;
                  maxSize = `${num * 2}rem`;
                } else if (sizeMapping[value]) {
                  // Handle predefined sizes like fluid-9xl
                  [minSize, maxSize] = sizeMapping[value];
                } else {
                  // No match found
                  return null;
                }
              }
            } else {
              // Unexpected type
              return null;
            }

            return {
              fontSize: fluidFont(minSize, maxSize, minWidth, maxWidth),
            };
          },
        },
        {
          values,
          type: ['length', 'percentage', 'number'],
        },
      );
    }),
  ],
};
export default config;
