import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.jsx',
  readingTime: true,
  defaultShowCopyCode: true,
})

export default withNextra({
  cleanDistDir: true,
})
