/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#C30B12',
          redHover: '#A8080E',
          redDark: '#8F060B',
          redLight: '#FDF2F2',
          redTint: 'rgba(195, 11, 18, 0.08)',
          orange: '#F7941D',
          orangeHover: '#E08012',
          orangeLight: '#FFF8F0',
          yellow: '#FFB800',
        },
        surface: {
          ground: '#F8FAFC',
          card: '#FFFFFF',
          muted: '#F1F5F9',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'resting': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.03)',
        'elevated-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'brand-glow': '0 14px 28px -6px rgba(195, 11, 18, 0.18), 0 6px 12px -4px rgba(195, 11, 18, 0.1)',
        'cta-glow': '0 12px 24px -6px rgba(247, 148, 29, 0.35)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      }
    },
  },
  plugins: [],
}
