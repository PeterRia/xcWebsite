import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f7efef",
          100: "#ead4d5",
          200: "#d7a8ab",
          300: "#c27b7f",
          400: "#ad4f53",
          500: "#98282c",
          600: "#842125",
          700: "#6f1d20",
          800: "#5a181b",
          900: "#451214",
        },
        ink: "#232323",
        muted: "#6c6864",
        paper: "#faf8f5",
        line: "#e8e2dc",
      },
      boxShadow: {
        panel: "0 14px 38px rgba(37, 29, 23, 0.12)",
        soft: "0 8px 24px rgba(37, 29, 23, 0.08)",
      },
      maxWidth: {
        page: "1360px",
      },
      borderRadius: {
        panel: "4px",
      },
      backgroundImage: {
        "subtle-grid":
          "linear-gradient(120deg, rgba(136, 100, 81, 0.06) 0, rgba(136, 100, 81, 0.06) 1px, transparent 1px, transparent 96px), linear-gradient(30deg, rgba(136, 100, 81, 0.04) 0, rgba(136, 100, 81, 0.04) 1px, transparent 1px, transparent 72px)",
      },
    },
  },
  plugins: [],
};

export default config;
