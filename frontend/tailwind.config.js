/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Palette from User Image
        brand: {
          primary: '#1F3A5F',    // Navy Blue
          secondary: '#2A9D8F',  // Teal
          bg: '#F4F6F8',         // Light Gray/White
          card: '#FFFFFF',       // White
          accent: '#E9C46A',     // Golden Yellow
          text: {
            main: '#1A1A1D',     // Dark Black/Gray
            secondary: '#4A4E69' // Medium Blue-Gray
          }
        },
        // Mapped semantic colors for compatibility
        primary: {
          50: '#f2f6fc',
          100: '#e1e9f7',
          200: '#c5d7f0',
          300: '#9cbce6',
          400: '#6d9bd9',
          500: '#467bcb',
          600: '#1F3A5F', // Brand Primary
          700: '#1a3152',
          800: '#162844',
          900: '#15233b',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#2A9D8F', // Brand Secondary
          600: '#115e59',
          700: '#0f766e',
          800: '#134e4a',
          900: '#164e63',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1F3A5F 0%, #2A9D8F 100%)', // Navy to Teal
        'gradient-accent': 'linear-gradient(135deg, #E9C46A 0%, #F4A261 100%)',   // Gold to Orange
        'gradient-soft': 'linear-gradient(180deg, #F4F6F8 0%, #FFFFFF 100%)',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(31, 58, 95, 0.08)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'glow-accent': '0 0 15px rgba(233, 196, 106, 0.4)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        spiritual: ['Lora', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
