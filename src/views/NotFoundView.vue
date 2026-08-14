<template>
  <main class="py-32 max-w-4xl mx-auto px-6 min-h-screen">
    <div class="not-found-content text-center py-24">
      <p class="eyebrow mb-4 text-3xl">404</p>
      <h1 class="font-display text-4xl text-cream font-light mb-6">Page not found</h1>
      <router-link to="/" class="btn-outline">
        <span>Back to home</span>
      </router-link>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(() => {
  gsap.from('.not-found-content', {
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    delay: 0.1,
  })
})
</script>
