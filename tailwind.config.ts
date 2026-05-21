import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        noir: "#0b0b0d",
        charcoal: "#17171a",
        graphite: "#25252a",
        gold: {
          100: "#fff8d5",
          200: "#f9e7a7",
          300: "#ebca70",
          400: "#d7a63d",
          500: "#b98222",
          600: "#8d5b13"
        },
        diamond: {
          100: "#f8fbff",
          200: "#dce8f7",
          300: "#b9c6d8",
          400: "#8391a5"
        },
        emerald: "#0b6b52",
        ruby: "#8f1634"
      },
      boxShadow: {
        glow: "0 0 45px rgba(215, 166, 61, 0.24)",
        diamond: "0 0 40px rgba(220, 232, 247, 0.18)",
        insetGold: "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(215,166,61,0.14)"
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, transparent, rgba(215,166,61,0.9), transparent)",
        "metallic-gold": "linear-gradient(115deg, #8d5b13 0%, #fff8d5 24%, #d7a63d 45%, #7d4e11 64%, #f9e7a7 82%, #9c6515 100%)",
        "diamond-sheen": "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(185,198,216,0.35), rgba(255,255,255,0.08))"
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-120%) skewX(-18deg)" },
          "100%": { transform: "translateX(180%) skewX(-18deg)" }
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" }
        },
        sparkle: {
          "0%, 100%": { opacity: "0.25", transform: "scale(0.75) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1.16) rotate(45deg)" }
        },
        aurora: {
          "0%, 100%": { transform: "translate3d(-10%, -4%, 0) scale(1)" },
          "50%": { transform: "translate3d(8%, 4%, 0) scale(1.08)" }
        },
        shine: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" }
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(18px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(18px) rotate(-360deg)" }
        }
      },
      animation: {
        shimmer: "shimmer 2.8s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        sparkle: "sparkle 2.6s ease-in-out infinite",
        aurora: "aurora 16s ease-in-out infinite",
        shine: "shine 4.5s linear infinite",
        orbit: "orbit 12s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
