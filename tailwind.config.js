// tailwind.config.cjs
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        accent: '#00b4d8',
        accent2: '#6a00f4',
        textLight: '#f1f5f9',
        textMuted: '#94a3b8'
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 180, 216, 0.5)',
        glow2: '0 0 20px rgba(106, 0, 244, 0.5)',
      },
    },
  },
  plugins: [],
}
