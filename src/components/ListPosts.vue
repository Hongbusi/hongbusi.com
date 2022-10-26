<script setup lang="ts">
import { useRouter } from 'vue-router'
import { formatDate } from '~/logics'

const props = defineProps<{
  type?: string
  posts?: Post[]
}>()

export interface Post {
  path: string
  title: string
  date: string
  lang?: string
  duration?: string
}

const router = useRouter()
const routes = router.getRoutes()
  .filter(i => i.path.startsWith('/posts') && i.meta.frontmatter.date)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))

const posts = computed(() =>
  props.posts || routes
    .filter(i => !i.path.endsWith('.html') && i.meta.frontmatter.type === props.type)
    .map(i => ({
      path: i.path,
      title: i.meta.frontmatter.title,
      date: i.meta.frontmatter.date,
      lang: i.meta.frontmatter.lang,
      duration: i.meta.frontmatter.duration
    }))
)

const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isSameYear = (a: Date | string | number, b: Date | string | number) => a && b && getYear(a) === getYear(b)
</script>

<template>
  <ul>
    <template v-for="route, index in posts" :key="route.path">
      <div v-if="!isSameYear(route.date, posts[index - 1]?.date)" class="relative h-20 pointer-events-none">
        <span class="text-8em op10 absolute left-0 top--2rem font-bold">{{ getYear(route.date) }}</span>
      </div>
      <app-link
        class="item block font-normal mb-6 mt-2 no-underline"
        :to="route.path"
      >
        <li class="no-underline">
          <div class="title text-lg">
            {{ route.title }}
            <sup
              v-if="route.lang === 'en'"
              class="text-xs border border-current rounded px-1 pb-0.2"
            >English</sup>
          </div>
          <div class="time opacity-50 text-sm -mt-1">
            {{ formatDate(route.date) }} <span v-if="route.duration" class="opacity-50">· {{ route.duration }}</span>
          </div>
        </li>
      </app-link>
    </template>
  </ul>
</template>
