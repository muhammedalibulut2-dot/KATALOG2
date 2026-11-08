/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // %60 Ana Renk Paleti - Koyu Zümrüt / Orman Yeşili (#1f4d3a)
        forest: {
          950: '#0b1c15',
          900: '#11291f',
          850: '#17382a',
          800: '#1f4d3a', // %60 Ana Renk
          750: '#265d47',
          700: '#2d6d53',
          600: '#398466',
          500: '#479d7b',
          400: '#64b695',
          300: '#8ecfb5',
          200: '#bfe5d5',
          100: '#e1f4ec',
          50: '#f2f9f6',
        },
        // %30 İkincil Renk Paleti - Sıcak Krem / Keten / Bej (#e9dfcb)
        cream: {
          50: '#fbf9f5',
          100: '#f6f2ea',
          200: '#eee5d6',
          300: '#e9dfcb', // %30 İkincil Renk
          400: '#dacdb3',
          500: '#c6b494',
          600: '#ac9875',
          700: '#8a7758',
          800: '#685941',
          900: '#463b2a',
        },
        // %10 Tıklanabilir Vurgu Rengi Paleti - Canlı Mor (#8b5cf6 - SADECE TIKLANABİLİR ÖĞELER)
        action: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // %10 Tıklanması İstenilen Renk
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        // Dark tonları %60 Ana Renk zümrüt paletine bağlandı
        dark: {
          950: '#0b1c15',
          900: '#11291f',
          850: '#17382a',
          800: '#1f4d3a',
          700: '#265d47',
        },
        // Gold tonları %30 İkincil Renk krem paletine bağlandı (Görsel hiyerarşi & Tipografi)
        gold: {
          50: '#fbf9f5',
          100: '#f6f2ea',
          200: '#eee5d6',
          300: '#e9dfcb',
          400: '#dacdb3',
          500: '#c6b494',
          600: '#ac9875',
          700: '#8a7758',
        },
        // Standart marka tanımları
        brand: {
          50: '#fbf9f5',
          100: '#f6f2ea',
          200: '#eee5d6',
          300: '#e9dfcb',
          400: '#dacdb3',
          500: '#1f4d3a',
          600: '#17382a',
          700: '#11291f',
          800: '#0b1c15',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace']
      },
      boxShadow: {
        'action-glow': '0 0 20px -3px rgba(139, 92, 246, 0.45)',
        'action-glow-lg': '0 0 30px -4px rgba(139, 92, 246, 0.65)',
        'card-dark': '0 10px 30px -10px rgba(11, 28, 21, 0.8)',
      }
    },
  },
  plugins: [],
}
