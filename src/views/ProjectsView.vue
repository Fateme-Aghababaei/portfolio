<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import type { Project } from '@/types/Project'
import profile from '@/data/profile.json'

const projects: Project[] = profile.projects

onMounted(() => {
  gsap.from('.project-card', {
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: 'power3.out',
    delay: 0.1,
  })
})
</script>

<template>
  <main class="py-32 max-w-7xl mx-auto px-6 min-h-screen">

    <!-- Header -->
    <div class="mb-16">
      <router-link to="/" class="font-body text-sm text-muted hover:text-gold transition-colors">
        ← Back home
      </router-link>
      <div class="flex items-end justify-between mt-6">
        <div>
          <p class="eyebrow mb-3">Full archive</p>
          <h1 class="font-display text-5xl lg:text-6xl text-cream font-light">
            All <span class="italic text-gold">Projects</span>
          </h1>
        </div>
        <span class="hidden md:block font-body text-sm text-muted">
          {{ projects.length }} projects
        </span>
      </div>
    </div>

    <!-- Grid -->
    <div class="grid md:grid-cols-2 gap-5">
      <router-link
        v-for="(project, i) in projects"
        :key="project.id"
        :to="`/projects/${project.id}`"
        class="project-card bento-card relative overflow-hidden group cursor-pointer block"
      >
        <!-- Thumbnail -->
        <div class="relative aspect-video overflow-hidden">
          <img
            v-if="project.thumbnail"
            :src="project.thumbnail"
            :alt="project.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div
            v-else
            class="w-full h-full relative"
            :style="{ backgroundImage: `linear-gradient(to bottom right, ${project.accent}22, transparent)` }"
          >
            <div class="absolute top-4 right-4 font-display text-7xl font-light text-white/5 select-none">
              {{ String(i + 1).padStart(2, '0') }}
            </div>
          </div>
        </div>

        <div class="relative z-10 p-7 flex flex-col justify-between">
          <div>
            <p class="eyebrow mb-3" :style="{ color: project.accent }">{{ project.category }} · {{ project.date }}</p>
            <h2 class="font-display text-3xl text-cream font-light leading-tight mb-3">
              {{ project.name }}
            </h2>
            <p class="font-body text-muted text-sm leading-relaxed max-w-md">{{ project.description }}</p>
          </div>

          <div class="flex items-end justify-between mt-6">
            <div class="flex gap-2 flex-wrap">
              <span v-for="tag in project.technologies" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center shrink-0
                     group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
              :style="{ backgroundColor: project.accent }"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="#08070A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </main>
</template>
