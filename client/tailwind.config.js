/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'opacity': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide': {
          '0%': { transform: 'translateX(-150%)',
           },
          '100%': { transform: 'translateX(0%)' },
        },
        'slidebtn': {
          '0%': { transform: 'translateY(-300%)' },
          '30%': {
            transform: 'translateY(-300%)',
            backgroundImage: 'linear-gradient(to bottom, #ff4, #fff)'
          },
          '80%': {
            backgroundImage: 'linear-gradient(170deg, #ff4, #fff)'
          },
          '100%': {
            transform: 'translateY(0%)',
            backgroundImage: 'linear-gradient(to bottom-right, #ff4, #fff)'
          },
        },

        'glow': {
          '0%': {
            boxShadow: 'none',
            transform: 'translateX(93%)'
          },
          '30%': { transform: 'translateX(93%)' },
          '100%': {
            boxShadow: '0 0 60px #fe0',
            transform: 'translateX(0%)'
          },

        },
        loading: {
          '0%,100%': {
            opacity: '0.5',
            width: '15px',
            height: '15px',
          },
          '50%': {
            opacity: '1',
            boxShadow: '0 0 20px #fe0',
          },
        }
      }
    },
  },
  plugins: [],
}

