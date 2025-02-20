import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "selector",
  theme: {
    screens: {
      xl: "1280px",
      lg: "1024px",
      md: "768px",
      sm: "640px",
      xs: "360px",
    },
    extend: {
      spacing: {
        headerHeight: "500px", // 60px
      },
      colors: {
        Dark: {
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
