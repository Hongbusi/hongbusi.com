<script setup lang="ts">
import { useTags } from '../../composables/config/blog'

const tags = useTags()
</script>

<template>
  <div class="base-card">
    <h2 class="text-xl font-bold">
      标签
    </h2>
    <ul class="flex flex-wrap mt-2">
      <li v-for="tag in tags" :key="tag" class="mr-2">
        <a :href="`/tags/${tag}`" class="text-blue-500 hover:underline">
          {{ tag }}
        </a>
      </li>
    </ul>
  </div>
</template>
