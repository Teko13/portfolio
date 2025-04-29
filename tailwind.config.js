/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-modern": "linear-gradient(135deg, var(--tw-gradient-stops))",
      },
      colors: {
        "primary": "#6366f1",
        "primary-light": "#818cf8",
        "bg": "#0f172a",
        "bg-variant": "#1e293b",
        "accent": "#22d3ee",
        "accent-light": "#67e8f9",
        "text-primary": "#f8fafc",
        "text-secondary": "#94a3b8"
      },
      boxShadow: {
        'custom-black': '0 4px 50px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 15px rgba(99, 102, 241, 0.5)',
        'neon': '0 0 20px rgba(34, 211, 238, 0.6)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        shimmer: 'shimmer 8s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
