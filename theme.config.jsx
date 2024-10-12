import Cusdis from 'nextra-theme-blog/cusdis'

export default {
  darkMode: true,
  footer: (
    <small style={{ display: 'block', marginTop: '8rem' }}>
      <abbr
        title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
        style={{ cursor: 'help' }}
      >
        CC BY-NC 4.0
      </abbr>
      {' '}
      {new Date().getFullYear()}
      {' '}
      © Hongbusi.
      <a href="/feed.xml">RSS</a>
      <style jsx>
        {`
        a {
          float: right;
        }

        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}
      </style>
    </small>
  ),
  comments: <Cusdis lang="zh-cn" appId="d30b8dc2-ee4b-46c9-979f-4805192fda9b" />,
}
