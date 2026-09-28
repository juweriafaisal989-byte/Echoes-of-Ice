/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        polar: {
          950: '#061426',
          900: '#0A1F38',
          800: '#0F2C4C',
          700: '#163B63',
          600: '#1E4D7B',
          ice: '#5EC8E0',
          icelight: '#DFF3F8',
          frost: '#F4F9FB',
        },
        status: {
          draft: '#8A94A6',
          review: '#C98A2B',
          approved: '#2B7A5B',
          published: '#1E4D7B',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(10, 31, 56, 0.06), 0 1px 8px rgba(10, 31, 56, 0.04)',
      },
    },
  },
  plugins: [],
};
