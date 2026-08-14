<template>
  <picture>
    <source :srcset="src.replace(/\.(jpe?g|png)$/i, '.webp')" type="image/webp" />
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
