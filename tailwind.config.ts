import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#4C4C4C",
          300: "#333333",
          500: "#171717",
          700: "#0D0D0D",
          900: "#000000",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
