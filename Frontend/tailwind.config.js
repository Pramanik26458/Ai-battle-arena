/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        surface: {
          DEFAULT: "var(--color-surface)",
          card: "var(--color-surface-card)",
          elevated: "var(--color-surface-elevated)",
          border: "var(--color-surface-border)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          muted: "var(--color-accent-muted)",
          glow: "var(--color-accent-glow)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        winner: {
          gold: "var(--color-winner-gold)",
          goldMuted: "var(--color-winner-gold-muted)",
        },
        score: {
          high: "var(--color-score-high)",
          mid: "var(--color-score-mid)",
          low: "var(--color-score-low)",
        },
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
        glow: "0 0 30px rgba(124,58,237,0.15)",
        "glow-gold": "0 0 20px rgba(245,158,11,0.2)",
      },
      animation: {
        "fade-up": "fadeUp 0.4s ease both",
        "fade-in": "fadeIn 0.3s ease both",
        shimmer: "shimmer 2s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      typography: {
        invert: {
          css: {
            "--tw-prose-body": "#c4c4d0",
            "--tw-prose-headings": "#f0f0f4",
            "--tw-prose-code": "#a78bfa",
            "--tw-prose-pre-bg": "#0f0f13",
            "--tw-prose-pre-code": "#c4c4d0",
            "--tw-prose-bullets": "#52525e",
            "--tw-prose-links": "#a78bfa",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
