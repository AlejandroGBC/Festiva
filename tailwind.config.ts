import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        festiva: {
          'midnight-blue': "#261E4E",
          'euphoric-pink': "#FF4D8D",
          'electric-violet': "#7B3FE4",
          'confetti-orange': "#FF9C2E",
          'mint-neon': "#2EC4B6",
          'monochromatic': "#f5f2fa",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
