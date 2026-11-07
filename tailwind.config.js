/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FAF8F0',
          100: '#F5EED8',
          200: '#EBDCB0',
          300: '#DFCA88',
          400: '#D5B760',
          500: '#D4AF37', // Metalik Altın
          600: '#BF982A',
          700: '#9C7A1D',
          800: '#755A15',
          900: '#4D3A0C',
          light: '#F5E5A3',
          metallic: '#E5C158',
          dark: '#996515',
        },
        dark: {
          950: '#07090D', // En koyu obsidian siyahı
          900: '#0B0E14', // Zemin antrasit
          850: '#10151E', // Panel arka planı
          800: '#161D2A', // Kart arka planı
          750: '#1E2638', // Vurgu antrasit
          700: '#263248', // Çerçeveler
          600: '#3C4D6B',
          500: '#5A6E91',
        }
      },
      backgroundImage: {
        'gold-metallic-gradient': 'linear-gradient(135deg, #FBF0B9 0%, #D4AF37 50%, #996515 100%)',
        'gold-subtle-gradient': 'linear-gradient(180deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.02) 100%)',
        'dark-metallic': 'radial-gradient(circle at 50% 0%, #161D2A 0%, #0B0E14 75%, #07090D 100%)',
        'carbon-mesh': 'radial-gradient(rgba(212, 175, 55, 0.08) 1px, transparent 0)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.35)',
        'gold-glow-lg': '0 0 45px -5px rgba(212, 175, 55, 0.5)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(212, 175, 55, 0.15)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
