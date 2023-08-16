/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '1/7': 'width: 14.285714%',
      }
    },
  },
  plugins: [],
}

