import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
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
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        // Neon accent colors
        neon: {
          cyan: "oklch(var(--neon-cyan) / <alpha-value>)",
          purple: "oklch(var(--neon-purple) / <alpha-value>)",
          pink: "oklch(var(--neon-pink) / <alpha-value>)",
          green: "oklch(var(--neon-green) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["Orbitron", "monospace"],
        heading: ["Syne", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        "neon-cyan": "0 0 20px oklch(var(--neon-cyan) / 0.5), 0 0 40px oklch(var(--neon-cyan) / 0.2)",
        "neon-purple": "0 0 20px oklch(var(--neon-purple) / 0.5), 0 0 40px oklch(var(--neon-purple) / 0.2)",
        "neon-pink": "0 0 20px oklch(var(--neon-pink) / 0.5), 0 0 40px oklch(var(--neon-pink) / 0.2)",
        "glass": "0 8px 32px oklch(0 0 0 / 0.5)",
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
        "float-particle": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px) scale(1)", opacity: "0.3" },
          "25%": { transform: "translateY(-30px) translateX(10px) scale(1.1)", opacity: "0.7" },
          "50%": { transform: "translateY(-15px) translateX(-15px) scale(0.9)", opacity: "0.5" },
          "75%": { transform: "translateY(-45px) translateX(5px) scale(1.05)", opacity: "0.8" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "text-glow-pulse": {
          "0%, 100%": { textShadow: "0 0 10px oklch(0.75 0.2 200 / 0.8)" },
          "50%": { textShadow: "0 0 20px oklch(0.75 0.2 200 / 1), 0 0 40px oklch(0.75 0.2 200 / 0.8)" },
        },
        "loading-bar": {
          "0%": { width: "0%" },
          "30%": { width: "40%" },
          "60%": { width: "70%" },
          "90%": { width: "95%" },
          "100%": { width: "100%" },
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "scan-line": {
          "0%": { top: "-10%" },
          "100%": { top: "110%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-particle": "float-particle 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "text-glow-pulse": "text-glow-pulse 3s ease-in-out infinite",
        "loading-bar": "loading-bar 2s ease-in-out forwards",
        "blink": "blink 1s step-end infinite",
        "scan-line": "scan-line 3s linear infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
