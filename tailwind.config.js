module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#c30b12',
          dark: '#a1080e',
          light: '#fef2f2',
          border: '#fecaca'
        },
        neutral: {
          bg: '#f8f7f4',
          card: '#ffffff',
          subtle: '#f2efe9',
          border: '#e5e2dc'
        }
      },
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        card: '0 6px 16px -2px rgba(0, 0, 0, 0.07), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        hover: '0 14px 30px -4px rgba(0, 0, 0, 0.09), 0 6px 12px -2px rgba(0, 0, 0, 0.05)',
        brand: '0 8px 20px -2px rgba(195, 11, 18, 0.28), 0 3px 8px -1px rgba(195, 11, 18, 0.15)'
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '20px',
        pill: '9999px'
      }
    }
  }
}
