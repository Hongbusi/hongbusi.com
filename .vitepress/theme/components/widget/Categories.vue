<script setup lang="ts">
import { useCategories } from '../../composables/config/blog'

const categories = useCategories()
</script>

<template>
  <div class="base-card">
    <h2 class="text-xl font-bold">
      分类
    </h2>
    <ul class="flex flex-wrap mt-2">
      <li v-for="category in categories" :key="category" class="mr-2">
        <a :href="`/categories/${category}`" class="text-blue-500 hover:underline">
          {{ category }}
        </a>
      </li>
    </ul>
  </div>
</template>
