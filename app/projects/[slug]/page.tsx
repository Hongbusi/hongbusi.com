import { notFound } from 'next/navigation'
import { allProjects } from 'contentlayer/generated'
import { Header } from './header'
import { Mdx } from '@/components/Mdx'
import './mdx.css'

export const revalidate = 60

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams(): Promise<Props['params'][]> {
  return allProjects
    .filter(p => p.published)
    .map(p => ({
      slug: p.slug,
    }))
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug
  const project = allProjects.find(project => project.slug === slug)

  if (!project)
    notFound()

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
      </article>
    </div>
  )
}
