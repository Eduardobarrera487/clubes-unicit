/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'default': '2px 2px 4px rgba(0, 0, 0, 0.1)',
        'md': '3px 3px 6px rgba(0, 0, 0, 0.1)',
        'lg': '4px 4px 8px rgba(0, 0, 0, 0.1)',
        'xl': '5px 5px 10px rgba(0, 0, 0, 0.1)',
        '2xl': '9px 9px 10px rgba(0, 0, 0, 0.3)',
        '2xlWhite': '2px 1px 12px rgba(255, 255, 255, 0.2)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
};
