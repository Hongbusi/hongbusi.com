<script setup lang="ts">
import { useArticles } from '../composables/config/blog'

const posts = useArticles()
</script>

<template>
  <article v-for="(post, index) in posts" :key="index">
    <div class="base-card space-y-2">
      <a :href="post.route">
        <h2 class="text-lg font-bold">
          {{ post.meta.title }}
        </h2>
      </a>
      <div class="flex flex-wrap space-x-2 text-sm opacity-75">
        <div class="flex items-center space-x-1">
          <ClockIcon class="size-4" />
          <time> {{ post.meta?.published || '' }}</time>
        </div>
        <div v-if="post.meta?.category" class="flex items-center space-x-1">
          <RectangleStackIcon class="size-4" />
          <a :href="`/categories/${post.meta.category}`">{{ post.meta.category }}</a>
        </div>
        <div v-if="post.meta?.tags?.length" class="flex items-center space-x-1">
          <HashtagIcon class="size-4" />
          <template v-for="(tag, idx) in post.meta.tags" :key="idx">
            <a :href="`/tags/${tag}`">{{ tag }}</a>
            <span v-if="idx !== post.meta.tags.length - 1" class="opacity-70 text-xs">/</span>
          </template>
        </div>
      </div>
      <p v-if="post.meta?.description">
        {{ post.meta.description }}
      </p>
      <div class="flex space-x-2 text-sm opacity-50">
        <div>400 个字</div>
        <div>·</div>
        <div>需要 5 分钟</div>
      </div>
    </div>
  </article>
</template>
