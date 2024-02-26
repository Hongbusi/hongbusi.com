import React from 'react'
import Copyright from '@theme-original/Footer/Copyright'

export default function CopyrightWrapper(props) {
  return (
    <>
      <Copyright {...props} />
      <div>
        <a
          className="footer__link-item"
          href="https://beian.miit.gov.cn"
          target="_blank"
          rel="noreferrer"
        >
          浙ICP备2022017304号-1
        </a>
      </div>
    </>
  )
}
