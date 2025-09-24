/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Default sans-serif (Inter)
        'sans': ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        // Headings and titles (Poppins)
        'heading': ['var(--font-poppins)', 'ui-sans-serif', 'system-ui'],
        // Special accent text (Orbitron)
        'accent': ['var(--font-orbitron)', 'ui-monospace', 'monospace'],
        'cursive': ['var(--font-great-vibes)', 'cursive'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
};

export default config;