import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
      colors: {
        honey: {
          DEFAULT: "hsl(var(--honey))",
          dark: "hsl(var(--honey-dark))",
          glow: "hsl(var(--honey-glow))",
        },
        bee: {
          red: "hsl(var(--bee-red))",
          dark: "hsl(var(--bee-dark))",
          warm: "hsl(var(--bee-warm))",
        },
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "hex-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        "honey-flow": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 200%" },
        },
        "bee-waggle": {
          "0%, 100%": { transform: "rotate(0deg) translateX(0)" },
          "25%": { transform: "rotate(-5deg) translateX(-2px)" },
          "75%": { transform: "rotate(5deg) translateX(2px)" },
        },
        "hex-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "bee-fly": {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "12.5%": { transform: "translate(15px, -10px) rotate(5deg)" },
          "25%": { transform: "translate(30px, 0) rotate(0deg)" },
          "37.5%": { transform: "translate(15px, 10px) rotate(-5deg)" },
          "50%": { transform: "translate(0, 0) rotate(0deg)" },
          "62.5%": { transform: "translate(-15px, -10px) rotate(-5deg)" },
          "75%": { transform: "translate(-30px, 0) rotate(0deg)" },
          "87.5%": { transform: "translate(-15px, 10px) rotate(5deg)" },
          "100%": { transform: "translate(0, 0) rotate(0deg)" },
        },
        "bee-wing": {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(0.6)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "hex-pulse": "hex-pulse 4s ease-in-out infinite",
        "honey-flow": "honey-flow 6s ease infinite",
        "bee-waggle": "bee-waggle 0.6s ease-in-out infinite",
        "hex-spin": "hex-spin 8s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "bee-fly": "bee-fly 8s ease-in-out infinite",
        "bee-wing": "bee-wing 0.1s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
