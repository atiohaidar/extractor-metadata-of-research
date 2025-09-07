/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#f7f9fc',
        'surface': '#ffffff',
        'text': '#0e1726',
        'muted': '#5b6b8c',
        'primary': 'rgba(0, 230, 119, 0.64)', /* neon green */
        'primary-600': '#00c853', /* deeper neon green */
        'accent': 'rgba(185, 242, 105, 0.59)', /* lime accent */
        'glow': 'rgba(0, 200, 83, 0.45)',
        'glow-strong': 'rgba(0, 230, 118, 0.7)',
      },
      fontFamily: {
        'sora': ['Sora', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        'poppins': ['Poppins', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'rotate': 'rotate 1.2s linear infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'fadeIn': 'fadeIn 0.5s ease-in forwards',
        'progressShine': 'progressShine 2s infinite',
        'blobDrift': 'blobDrift var(--dur, 12s) ease-in-out infinite alternate',
        'introFade': 'introFade 0.8s ease forwards',
        'liftIn': 'liftIn 0.7s ease 0.2s forwards',
      },
      keyframes: {
        rotate: {
          to: { transform: 'rotate(1turn)' }
        },
        shimmer: {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' }
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        progressShine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        blobDrift: {
          '0%': { transform: 'translate3d(0px, 0px, 0) scale(1)' },
          '50%': { transform: 'translate3d(30px, -20px, 0) scale(1.05)' },
          '100%': { transform: 'translate3d(-25px, 25px, 0) scale(1.02)' }
        },
        introFade: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        liftIn: {
          to: { transform: 'translateY(0)' }
        }
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(to right, rgba(0,200,83,0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,200,83,0.06) 1px, transparent 1px)
        `,
        'radial-tints': `
          radial-gradient(1200px 800px at 10% -10%, rgba(0,230,118,0.12), transparent 60%),
          radial-gradient(1000px 700px at 110% 10%, rgba(184,242,105,0.12), transparent 60%)
        `,
        'primary-gradient': 'linear-gradient(90deg, var(--tw-colors-primary-600), var(--tw-colors-accent))',
        'intro-bg': 'radial-gradient(800px 500px at 50% -10%, rgba(61,214,245,0.15), rgba(255,255,255,0.95) 60%)',
      },
      backgroundSize: {
        'grid': '40px 40px, 40px 40px',
      },
      boxShadow: {
        'card': '0 4px 12px rgba(14, 23, 38, 0.07)',
        'card-hover': '0 10px 26px rgba(14, 23, 38, 0.12)',
        'primary': '0 6px 14px rgba(0, 230, 118, 0.25)',
        'primary-hover': '0 10px 22px rgba(0, 230, 118, 0.35)',
        'glow': '0 0 24px rgba(0,230,118,.25)',
        'loading': '0 10px 30px rgba(14, 23, 38, 0.15)',
        'intro': '0 10px 30px rgba(14, 23, 38, 0.18), 0 0 24px rgba(61,214,245,0.28)',
      },
      backdropBlur: {
        'loading': '5px',
        'intro': '4px',
      }
    },
  },
  plugins: [],
}
