import type { Config } from 'tailwindcss'

const config = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx,md,mdx}',
    'theme.config.tsx',
  ],
} satisfies Config

export default config
