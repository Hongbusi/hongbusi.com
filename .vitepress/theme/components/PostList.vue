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
          <div class="i-mingcute:time-line" />
          <time> {{ post.meta?.published || '' }}</time>
        </div>
        <div v-if="post.meta?.category" class="flex items-center space-x-1">
          <div class="i-ph:stack-light" />
          <a :href="`/categories/${post.meta.category}`">{{ post.meta.category }}</a>
        </div>
        <div v-if="post.meta?.tags?.length" class="flex items-center space-x-1">
          <div class="i-solar:hashtag-square-bold" />
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
