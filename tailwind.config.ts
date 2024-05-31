import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    screens: {
      'sm': '480px',
      'md_sm': '640px',
      'md_lg': '768px',
      'lg': '976px',
      'xl': '1440px',
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        transparent: "transparent",
        'dark': {
          DEFAULT: '#262626'
        },
        'green': {
          dark: '#219653',
          DEFAULT: '#12B76A',
          light: '#d1fadf'
        },
        'red': {
          DEFAULT: 'D92D20',
        },
        'yellow': {
          light: 'FEDF89',
          DEFAULT: '#F79009'
        },
        'gray': {
          DEFAULT: '#AAAEB3'
        }
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
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config