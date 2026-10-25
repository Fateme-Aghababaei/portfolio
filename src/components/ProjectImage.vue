<template>
  <picture>
    <img :src="src" :alt="alt" :class="imgClass" />
  </picture>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  imgClass?: string
}>()
</script>
