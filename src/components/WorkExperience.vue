<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    role: 'Front-End Developer & UI/UX Designer',
    company: 'PayamPardaz',
    type: 'Full-time',
    period: '2025 — Present',
    location: 'Isfahan, Iran',
    description:
      'Developed enterprise-grade front-end features for a Zero Trust security platform used by large organizations.',
    highlights: ['Vue.js', 'Design system', 'GraphQL', 'Playwright'],
    accent: '#C8943A',
    current: true,
  },
  {
    role: 'Front-End Developer & UI/UX Designer',
    company: 'PayamPardaz',
    type: 'Full-time',
    period: '2025 — Present',
    location: 'Isfahan, Iran',
    description:
      'Developed enterprise-grade front-end features for a Zero Trust security platform used by large organizations.',
    highlights: ['Vue.js', 'Design system', 'GraphQL', 'Playwright'],
    accent: '#9B8FEC',
    current: false,
  },
  {
    role: 'Front-End Mentor & Course Designer',
    company: 'Quera',
    type: 'Part-time',
    period: '2025',
    location: 'Remote',
    description:
      'Designed and updated various front-end courses, including HTML & CSS, Front-End Development, React, Advanced JavaScript, and TypeScript.',
    highlights: ['React', 'TypeScript', 'Cypress'],
    accent: '#4ADE80',
    current: false,
  },
  {
    role: 'UI/UX Design Intern',
    company: 'International Systems Engineering and Automation Company (IRISA)',
    type: 'Full-time',
    period: '2023',
    location: 'Isfahan, Iran',
    description:
      'Designed a mobile app for buying and selling books using the design thinking process and Improved user engagement and satisfaction through iterative design and testing.',
    highlights: ['Figma', 'Accessibility', 'User Reseaerch'],
    accent: '#C2BBB0',
    current: false,
  },
]

onMounted(() => {
  gsap.utils.toArray<HTMLElement>('.exp-card').forEach((card, i) => {
    gsap.fromTo(
      card,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
        },
      }
    )
  })

  gsap.fromTo(
    '.exp-line',
    { scaleY: 0 },
    {
      scaleY: 1,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.exp-timeline',
        start: 'top 80%',
      },
    }
  )
})
</script>

<template>
  <section id="experience" class="py-24 max-w-7xl mx-auto px-6">

    <!-- Header -->
    <div class="flex items-end justify-between mb-16">
      <div>
        <p class="eyebrow mb-3">Career path</p>
        <h2 class="font-display text-5xl lg:text-6xl text-cream font-light">
          Work <span class="italic text-gold">Experience</span>
        </h2>
      </div>
      <span class="hidden md:block font-body text-sm text-muted">
        {{ experiences.length }} positions · {{ new Date().getFullYear() - 2023 }} years
      </span>
    </div>

    <!-- Timeline -->
    <div class="exp-timeline relative">

      <!-- Vertical line -->
      <div
        class="exp-line absolute left-0 md:left-55 top-0 bottom-0 w-px bg-linear-to-b from-gold via-border to-transparent origin-top hidden md:block"
      />

      <div class="space-y-6">
        <div
          v-for="(exp, i) in experiences"
          :key="exp.company"
          class="exp-card relative grid md:grid-cols-[220px_1fr] gap-0 md:gap-12"
        >

          <!-- Left: period column (desktop only) -->
          <div class="hidden md:flex flex-col items-end pr-10 pt-7 text-right shrink-0">
            <span class="font-mono text-xs text-muted mb-1">{{ exp.period }}</span>
            <span class="font-body text-xs text-muted/60">{{ exp.location }}</span>
            <!-- Type badge -->
            <span
              class="mt-3 inline-block px-2.5 py-0.5 rounded-full text-xs font-body border"
              :style="{
                color: exp.accent,
                borderColor: exp.accent + '40',
                backgroundColor: exp.accent + '12',
              }"
            >{{ exp.type }}</span>
          </div>

          <!-- Timeline dot -->
          <div
            class="hidden md:block absolute left-55 top-8 -translate-x-1/2 z-10"
          >
            <div
              class="w-3 h-3 rounded-full border-2 transition-all duration-300"
              :style="{
                borderColor: exp.accent,
                backgroundColor: exp.current ? exp.accent : '#08070A',
                boxShadow: exp.current ? `0 0 12px ${exp.accent}60` : 'none',
              }"
            />
          </div>

          <!-- Right: card -->
          <div
            class="bento-card p-7 group hover:translate-x-1 transition-transform duration-300"
            :style="{ '--card-accent': exp.accent }"
          >
            <!-- Mobile: period row -->
            <div class="flex items-center justify-between mb-4 md:hidden">
              <span class="font-mono text-xs text-muted">{{ exp.period }}</span>
              <span
                class="inline-block px-2.5 py-0.5 rounded-full text-xs font-body border"
                :style="{
                  color: exp.accent,
                  borderColor: exp.accent + '40',
                  backgroundColor: exp.accent + '12',
                }"
              >{{ exp.type }}</span>
            </div>

            <!-- Accent top bar -->
            <div
              class="absolute top-0 left-0 right-0 h-px opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              :style="{ background: `linear-gradient(to right, ${exp.accent}, transparent)` }"
            />

            <div class="relative z-10">
              <!-- Role + company -->
              <div class="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <h3 class="font-display text-2xl text-cream font-light leading-tight">
                    {{ exp.role }}
                  </h3>
                  <p class="font-body text-sm mt-0.5" :style="{ color: exp.accent }">
                    {{ exp.company }}
                    <span class="text-muted ml-2 hidden md:inline">· {{ exp.location }}</span>
                  </p>
                </div>
                <!-- Current badge -->
                <div v-if="exp.current" class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green/10 border border-green/30">
                  <span class="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                  <span class="font-body text-xs text-green">Current</span>
                </div>
              </div>

              <!-- Description -->
              <p class="font-body text-sm text-muted leading-relaxed mb-5">
                {{ exp.description }}
              </p>

              <!-- Highlight tags -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="h in exp.highlights"
                  :key="h"
                  class="tag"
                >{{ h }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
