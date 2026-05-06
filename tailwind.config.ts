import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        gf: {
          black: "#0a0a0a",
          dark: "#111111",
          surface: "#1a1a1a",
          border: "#2a2a2a",
          muted: "#666666",
          text: "#e0e0e0",
          white: "#f0f0f0",
          accent: "#c8b8a0",
        },
      },
    },
  },
  plugins: [],
};
export default config;
