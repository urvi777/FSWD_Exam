/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4f46e5",
          hover: "#4338ca",
        },
        secondary: "#f59e0b",
        dark: "#1f2937",
        light: "#f3f4f6",
        danger: "#ef4444",
        success: "#10b981",
      },
    },
  },
  plugins: [],
}
