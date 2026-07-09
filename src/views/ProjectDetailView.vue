<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import type { Project } from '@/types/Project'
import profile from '@/data/profile.json'

const props = defineProps<{ id: string }>()

const projects: Project[] = profile.projects

const index = computed(() => projects.findIndex((p) => String(p.id) === props.id))
const project = computed<Project | undefined>(() => projects[index.value])

const prevProject = computed(() =>
  index.value > 0 ? projects[index.value - 1] : projects[projects.length - 1]
)
const nextProject = computed(() =>
  index.value >= 0 && index.value < projects.length - 1 ? projects[index.value + 1] : projects[0]
)

onMounted(() => {
  gsap.from('.project-detail-content', {
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    delay: 0.1,
  })
})
</script>

<template>
  <main class="py-32 max-w-4xl mx-auto px-6 min-h-screen">

    <div v-if="project" class="project-detail-content">
      <router-link to="/projects" class="font-body text-sm text-muted hover:text-gold transition-colors">
        ← All projects
      </router-link>

      <!-- Header -->
      <div class="mt-6 mb-10">
        <p class="eyebrow mb-3" :style="{ color: project.accent }">{{ project.category }} · {{ project.date }}</p>
        <h1 class="font-display text-5xl lg:text-6xl text-cream font-light leading-tight">
          {{ project.name }}
        </h1>
      </div>

      <!-- Cover screenshot -->
      <img
        v-if="project.image"
        :src="project.image"
        :alt="project.name"
        class="w-full rounded-2xl border border-border mb-10 object-cover"
      />
      <div
        v-else
        class="rounded-2xl h-2 mb-10"
        :style="{ background: `linear-gradient(to right, ${project.accent}, transparent)` }"
      />

      <!-- Description -->
      <p class="font-body text-cream-2 text-lg leading-relaxed">
        {{ project.description }}
      </p>

      <!-- Key features / highlights -->
      <ul v-if="project.highlights?.length" class="space-y-3 mt-8">
        <li
          v-for="point in project.highlights"
          :key="point"
          class="flex items-start gap-3 font-body text-cream-2 leading-relaxed"
        >
          <span class="mt-2 w-1.5 h-1.5 rounded-full shrink-0" :style="{ backgroundColor: project.accent }" />
          <span>{{ point }}</span>
        </li>
      </ul>

      <!-- Technologies -->
      <div class="flex flex-wrap gap-2 mt-8">
        <span v-for="tag in project.technologies" :key="tag" class="tag">{{ tag }}</span>
      </div>

      <!-- Live links -->
       <div class="flex flex-wrap gap-2">
         <a
           v-if="project.githubUrl"
           :href="project.githubUrl"
           target="_blank"
           rel="noopener noreferrer"
           class="btn-outline mt-10 group"
         >
          View on GitHub
         </a>

         <a
           v-if="project.url"
           :href="project.url"
           target="_blank"
           rel="noopener noreferrer"
           class="btn-primary mt-10 group"
         >
           <span>Visit live site</span>
           <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="group-hover:translate-x-1 transition-transform">
             <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>
         </a>
       </div>

      <!-- Gallery -->
      <div v-if="project.gallery?.length" class="mt-16">
        <p class="eyebrow mb-4">Gallery</p>
        <div class="grid sm:grid-cols-2 gap-4">
          <a
            v-for="(shot, i) in project.gallery"
            :key="shot"
            :href="shot"
            target="_blank"
            rel="noopener noreferrer"
            class="block rounded-xl overflow-hidden border border-border hover:border-gold/40 transition-colors duration-200"
          >
            <img :src="shot" :alt="`${project.name} screenshot ${i + 1}`" class="w-full h-full object-cover" />
          </a>
        </div>
      </div>

      <!-- Prev / Next -->
      <div class="grid grid-cols-2 gap-4 mt-20 pt-10 border-t border-border">
        <router-link :to="`/projects/${prevProject.id}`" class="group">
          <p class="eyebrow mb-2">← Previous</p>
          <p class="font-display text-xl text-cream-2 group-hover:text-gold transition-colors">{{ prevProject.name }}</p>
        </router-link>
        <router-link :to="`/projects/${nextProject.id}`" class="text-right group">
          <p class="eyebrow mb-2">Next →</p>
          <p class="font-display text-xl text-cream-2 group-hover:text-gold transition-colors">{{ nextProject.name }}</p>
        </router-link>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="text-center py-24">
      <p class="eyebrow mb-4">404</p>
      <h1 class="font-display text-4xl text-cream font-light mb-6">Project not found</h1>
      <router-link to="/projects" class="btn-outline">
        <span>Back to all projects</span>
      </router-link>
    </div>
  </main>
</template>
