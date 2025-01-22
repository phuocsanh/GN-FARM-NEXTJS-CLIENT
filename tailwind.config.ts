import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-sans)", ...fontFamily.sans] },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        soft_green: {
          DEFAULT: "var(--soft-green)",
        },
        strong_green: {
          DEFAULT: "var(--strong-green)",
        },
        drak_green: {
          DEFAULT: "var(--drak-green)",
        },
        very_drak_green: {
          DEFAULT: "var(--very-drak-green)",
        },
        bg_green: {
          DEFAULT: "var(--bg-green)",
        },
        border: "var(--border)",
        input: "var(--input)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shine: {
          "0%": { backgroundPosition: "-10%" },
          "100%": { backgroundPosition: "200%" },
        },
        blink: {
          "0%, 100%": { color: "var(--primary)" }, // Màu xanh lá đậm
          "50%": { color: "var(--soft-green)" }, // Màu xanh lá nhạt
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        spin: "spin 1s linear infinite",
        shine: "shine 4s linear infinite",
        blink: "blink 1s infinite",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
export default config;
