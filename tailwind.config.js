/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // For tailwind to look for classes in your HTML files
    "./src/**/*.{vue,js,ts,jsx,tsx}", // For tailwind to process Vue and JS/TS files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

