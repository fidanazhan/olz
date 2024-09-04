/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        // Utility to hide the scrollbar across all browsers
        '.scrollbar-none': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
        '.scrollbar-none::-webkit-scrollbar': {
          display: 'none', /* Chrome, Safari, Opera */
        },
      });
    },
  ],
}