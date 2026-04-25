<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Stat {
  value: number
  suffix: string
  label: string
  sublabel: string
}

const stats: Stat[] = [
  { value: 2,   suffix: '+', label: 'Years of experience',     sublabel: 'Building for the web' },
  { value: 60,  suffix: '+', label: 'Projects shipped',        sublabel: 'Across 14 countries' },
  { value: 12,  suffix: 'M', label: 'Users reached',           sublabel: 'Through products I built' },
  { value: 99,  suffix: '',  label: 'Lighthouse score',        sublabel: 'Performance obsessed' },
]

const counts  = ref(stats.map(() => 0))
const statsEl = ref<HTMLElement | null>(null)

onMounted(() => {
  ScrollTrigger.create({
    trigger: statsEl.value,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      stats.forEach((stat, i) => {
        gsap.to(counts.value, {
          [i]: stat.value,
          duration: 1.8,
          ease: 'power2.out',
          snap: { [i]: 1 },
        })
      })
    },
  })
})
</script>

<template>
  <section ref="statsEl" class="py-20! border-y border-border">
    <div class="max-w-7xl mx-auto! px-6!">

      <!-- Heading row -->
      <div class="flex items-center gap-4 mb-14!">
        <div class="w-12 h-px bg-gold" />
        <p class="eyebrow">By the numbers</p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-border">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="lg:px-10! first:pl-0! last:pr-0! space-y-2!"
        >
          <div class="flex items-end gap-1">
            <span class="font-display text-6xl lg:text-7xl text-cream font-light tabular-nums">
              {{ Math.round(counts[i]) }}
            </span>
            <span class="font-display text-4xl text-gold mb-2!">{{ stat.suffix }}</span>
          </div>
          <p class="font-body text-sm text-cream-2">{{ stat.label }}</p>
          <p class="font-body text-xs text-muted">{{ stat.sublabel }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
