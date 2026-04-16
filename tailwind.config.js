/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",
        secondary: "#00D4FF",
        accent: "#00D4FF",
        background: "#0A0E27",
        surface: "#151A3D",
        card: "#1F254B",
        text: {
          DEFAULT: "#FFFFFF",
          secondary: "#A0AEC0",
          light: "#718096",
        }
      }
    },
  },
  plugins: [],
}
