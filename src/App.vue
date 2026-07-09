<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import CustomCursor from './components/CustomCursor.vue'
import AppNav       from './components/AppNav.vue'
import AppFooter    from './components/AppFooter.vue'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()

let lenis: Lenis | null = null

// Re-measure scroll triggers once the new route's content has mounted,
// since each page has a different layout/height.
watch(() => route.fullPath, () => {
  nextTick(() => ScrollTrigger.refresh())
})

onMounted(() => {
  // ── Lenis smooth scroll ──────────────────────────
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time: number) => {
    lenis?.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  // ── Page-load entrance animation ─────────────────
  const tl = gsap.timeline({ delay: 0.1 })
  tl.from('header', { y: -20, opacity: 0, duration: 0.6, ease: 'power3.out' })
})

onUnmounted(() => {
  lenis?.destroy()
  gsap.ticker.remove(() => {})
})
</script>

<template>
  <div class="min-h-screen bg-ink text-cream font-body selection:bg-gold/30">
    <!-- Noise film grain overlay -->
    <div class="noise-overlay" aria-hidden="true" />

    <CustomCursor />

    <AppNav />

    <RouterView />

    <AppFooter />
  </div>
</template>
