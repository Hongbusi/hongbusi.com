import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
  readingTime: true,
})

export default withNextra({
  reactStrictMode: true,
  cleanDistDir: true,
})
