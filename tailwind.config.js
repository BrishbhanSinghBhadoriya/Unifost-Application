/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#9333EA",
        accent: "#F59E0B",
        background: "#F9FAFB",
        card: "#FFFFFF",
        text: {
          DEFAULT: "#1F2937",
          secondary: "#6B7280",
          light: "#9CA3AF",
        }
      }
    },
  },
  plugins: [],
}
