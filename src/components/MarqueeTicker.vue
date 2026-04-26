<script setup lang="ts">
// Marquee with duplicated content for seamless looping

const items = [
  'Frontend Engineering',
  'Creative Development',
  'Motion Design',
  'UI Architecture',
  'Design Systems',
  'WebGL Experiences',
  'Performance Optimization',
  'Interaction Design',
]

// Duplicate for seamless loop
const repeated = [...items, ...items]
</script>

<template>
  <div class="relative py-5 border-y border-border overflow-hidden bg-ink-2/50">
    <!-- Gradient masks -->
    <div class="absolute left-0 inset-y-0 w-32 bg-linear-to-r from-ink to-transparent z-10 pointer-events-none" />
    <div class="absolute right-0 inset-y-0 w-32 bg-linear-to-l from-ink to-transparent z-10 pointer-events-none" />

    <div class="marquee-container">
      <div class="marquee-track">
        <template v-for="(item, i) in repeated" :key="i">
          <span class="font-body text-sm text-muted px-2">{{ item }}</span>
          <span class="text-gold text-xl mx-4 shrink-0">✦</span>
        </template>
      </div>
      <!-- Second copy for seamless loop -->
      <div class="marquee-track" aria-hidden="true">
        <template v-for="(item, i) in repeated" :key="`b-${i}`">
          <span class="font-body text-sm text-muted px-2">{{ item }}</span>
          <span class="text-gold text-xl mx-4 shrink-0">✦</span>
        </template>
      </div>
    </div>
  </div>
</template>
