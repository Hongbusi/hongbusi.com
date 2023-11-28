'use client'

import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-[200px] leading-none font-bold text-white opacity-40">404</h1>
      <p className="text-white">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="mt-10 pointer-events-auto select-none text-xl font-bold text-white mix-blend-difference hover:underline"
      >
        返回主页
      </Link>
    </main>
  )
}
