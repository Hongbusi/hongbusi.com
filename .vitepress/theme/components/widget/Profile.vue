<script setup lang="ts">
import dayjs from 'dayjs'
import { computed } from 'vue'

import { useArticles, useBlogConfig } from '../../composables/config/blog'

const blogConfig = useBlogConfig()
const articles = useArticles()

const articleCount = computed(() => articles.value.length)

const now = dayjs()

const yearUpdateCount = computed(() => {
  return articles.value.filter((article) => {
    const date = dayjs(article.meta.published)
    return date.isSame(now, 'year')
  }).length
})

const monthUpdateCount = computed(() => {
  return articles.value.filter((article) => {
    const date = dayjs(article.meta.published)
    return date.isSame(now, 'month')
  }).length
})
</script>

<template>
  <div class="base-card flex flex-col justify-center items-center space-y-4">
    <div class="overflow-hidden w-24 h-24 rounded-full">
      <img
        src="https://avatars.githubusercontent.com/u/53554371?v=4"
        width="96"
        height="96"
        alt="Hongbusi's Avatar"
      >
    </div>
    <h2 class="text-2xl font-bold">
      {{ blogConfig?.author || 'vitepress-theme-blog' }}
    </h2>
    <div>{{ blogConfig?.signature || '知道的越多，不知道的越多' }}</div>
    <ul class="grid grid-cols-3 gap-2 w-full">
      <li class="flex flex-col items-center">
        <span class="text-xl">{{ articleCount }}</span>
        <span class="opacity-70 text-sm">文章</span>
      </li>
      <li class="flex flex-col items-center">
        <span class="text-xl">+{{ yearUpdateCount }}</span>
        <span class="opacity-70 text-sm">今年更新</span>
      </li>
      <li class="flex flex-col items-center">
        <span class="text-xl">+{{ monthUpdateCount }}</span>
        <span class="opacity-70 text-sm">本月更新</span>
      </li>
    </ul>
  </div>
</template>
