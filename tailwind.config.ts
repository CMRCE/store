import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: {
            DEFAULT: "#f4d35e",
            light: "#faf0ca",
          },
          blue: {
            DEFAULT: "#0d3b66",
          },
        },
      },
      spacing: {
        30: "7.5rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
