import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于',
  description: '关于洪布斯的博客',
}

export default function PostsPage() {
  return (
    <div className="container">
      Posts page
    </div>
  )
}
