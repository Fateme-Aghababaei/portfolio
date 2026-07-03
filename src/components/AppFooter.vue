<script setup lang="ts">
import profile from '@/data/profile.json'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border p-8 mt-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="font-body text-xs text-muted">
          © {{ year }} {{ profile.name }}. All rights reserved.
        </p>
        <p class="font-body text-xs text-muted">
          Built with <span class="text-gold">Vue 3</span> + <span class="text-lavender">TypeScript</span> + <span class="text-cream-2">Tailwind</span>
        </p>
      </div>
  </footer>
</template>
