<script setup lang="ts">
import { computed } from 'vue'

import { useFooterConfig } from '../composables/config/blog'
import FooterLink from './FooterLink.vue'

const footerConfig = useFooterConfig()

const footerData = computed(() => {
  if (!footerConfig)
    return {}

  const data: Record<string, { text: string, link?: string }> = {}

  const { copyright, icpRecord } = footerConfig

  // copyright
  if (typeof copyright === 'string') {
    data.copyright = {
      text: copyright,
    }
  }
  else if (copyright instanceof Object) {
    data.copyright = copyright
  }

  // 备案信息
  if (icpRecord) {
    data.icpRecord = icpRecord
  }

  return data
})

const showFooter = computed(() => {
  return Object.keys(footerData.value).length > 0
})
</script>

<template>
  <footer v-if="showFooter" class="pt-8 px-4 pb-16 bg-base flex flex-col items-center text-sm opacity-75">
    <FooterLink v-if="footerData.copyright" :data="footerData.copyright" />
    <div md="flex space-x-2">
      <FooterLink v-if="footerData.version" :data="footerData.version" />
      <FooterLink v-if="footerData.icpRecord" :data="footerData.icpRecord" />
    </div>
  </footer>
</template>
