import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }, // definujem vlastné farby pre použitie v tailwinde
      colors: {
        "bg-main": "#E0E0E2",
        "color-primary": "#2B4162",
        "color-secondary": "#AFCBFF",
        "color-extras": "#00E5E8",
        "color-warning": "#BD1E1E", 
        "color-text": "#141414"
      }
    },
  },
  plugins: [],
}
export default config
