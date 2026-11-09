import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#06090e",
          900: "#0B0F19", // Background Primer PRD
          850: "#0e1422",
          800: "#111827", // Surface / Card
          700: "#1F2937", // Border tipis
          600: "#374151",
          500: "#4B5563",
          400: "#9CA3AF",
          300: "#D1D5DB",
        },
        electric: {
          violet: {
            DEFAULT: "#6366F1", // Primary Accent AI
            hover: "#4F46E5",
            glow: "rgba(99, 102, 241, 0.25)",
          },
          teal: {
            DEFAULT: "#14B8A6", // Success / Active Verb Highlight
            hover: "#0D9488",
            glow: "rgba(20, 184, 166, 0.25)",
          },
        },
        star: {
          situation: "#38BDF8", // Sky blue for Situation
          task: "#818CF8",      // Indigo for Task
          action: "#10B981",    // Emerald for Action
          result: "#F59E0B",    // Amber/Gold for Result
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Plus Jakarta Sans", "sans-serif"],
        sans: ["var(--font-body)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.06)", opacity: "1" },
        },
        ripple: {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        "pulse-slow": "pulseSlow 3s ease-in-out infinite",
        "ripple": "ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
