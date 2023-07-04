/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'user-blue': 'rgba(85, 138, 255, 0.5)', // 50% opacity
        'ai-cyan': 'rgba(0, 212, 197, 0.5)', // 50% opacity
        'user-blue-solid': '#558AFF', // No opacity
        'ai-cyan-solid': '#00D4C5', // No opacity
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
