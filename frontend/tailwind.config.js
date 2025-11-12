/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // garante que o modo dark é controlado via classe no HTML
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        light: "#ffffff",
        dark: "#0f172a",
      },
      textColor: {
        light: "#111111",
        dark: "#f1f5f9",
      },
    },
  },
  plugins: [],
}
