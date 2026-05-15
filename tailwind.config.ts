import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#08080b",
          900: "#0c0c10",
          800: "#14141a",
          700: "#1c1c25",
          600: "#2a2a36",
          500: "#3a3a48",
        },
        ember: {
          50: "#fff4eb",
          100: "#ffe2c4",
          200: "#ffc585",
          300: "#ff9e4a",
          400: "#ff7a1f",
          500: "#f25c00",
          600: "#c64600",
          700: "#8f3300",
          800: "#5a2000",
        },
        twilight: {
          300: "#b39ddb",
          400: "#7f63d1",
          500: "#5a3fb8",
          600: "#3b258a",
        },
        sage: {
          300: "#a8c5b5",
          400: "#7aa993",
          500: "#4e8773",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-5%,-5%)" },
          "20%": { transform: "translate(-10%,5%)" },
          "30%": { transform: "translate(5%,-10%)" },
          "40%": { transform: "translate(-5%,15%)" },
          "50%": { transform: "translate(-10%,5%)" },
          "60%": { transform: "translate(15%,0)" },
          "70%": { transform: "translate(0,10%)" },
          "80%": { transform: "translate(-15%,0)" },
          "90%": { transform: "translate(10%,5%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
        shimmer: "shimmer 6s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
