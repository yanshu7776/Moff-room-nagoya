import type { Config } from "tailwindcss"
const plugin = require("tailwindcss/plugin")

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "custom-beige": {
          DEFAULT: "rgb(223,196,158)", // #DFC49E
          light: "rgb(245,235,224)", // #F5EBE0
          lighter: "rgb(251,245,238)", // #FBF5EE
          warm: "rgb(240,230,220)", // 温かみのあるベージュ色
          unified: "rgb(254, 248, 174)", // 統一背景色 (明るい黄色)
          border: "rgb(222,196,159)", // 枠線用の色
          dark: "rgb(245, 235, 140)", // ヘッダー・フッター用の濃い黄色
        },
        "custom-beige-DEFAULT": "rgb(223,196,158)",
        "brand-pink": "#FBCFE8",
        "brand-blue": "#BFDBFE",
        "brand-green": "#A7F3D0",
        "brand-orange": "#FED7AA",
        "brand-purple": "#D8B4FE",
        "brand-brown": "#8B4513",
        "theme-gold": "#D2A679",
        "accent-border": "#F5D1B0",
        "custom-mint": "rgb(202, 229, 206)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        jkg: ["JKG-M", "sans-serif"],
        heading: ["JKG-M", "sans-serif"],
        body: ["JKG-M", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addUtilities }: { addUtilities: any }) => {
      addUtilities({
        ".text-shadow": {
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
        },
        ".text-shadow-md": {
          textShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
        },
        ".text-shadow-lg": {
          textShadow: "0 10px 20px rgba(0, 0, 0, 0.4)",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
      })
    }),
  ],
} satisfies Config

export default config
