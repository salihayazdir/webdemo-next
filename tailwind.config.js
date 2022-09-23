/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
      '-sm': { max:'639px' },
      // => @media (min-width: 640px) { ... }

      '-md': { max:'767px' },
      // => @media (min-width: 768px) { ... }

      '-lg': { max:'1023px' },
      // => @media (min-width: 1024px) { ... }

      '-xl': { max:'1279px' },
      // => @media (min-width: 1280px) { ... }

      '-2xl': { max:'1535px' },
      // => @media (min-width: 1536px) { ... }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}