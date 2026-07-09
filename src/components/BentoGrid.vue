<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '@/types/Project'
import type { SkillGroup } from '@/types/SkillGroup'
import profile from '@/data/profile.json'

gsap.registerPlugin(ScrollTrigger)

const projects: Project[] = profile.projects
const skillGroups: SkillGroup[] = profile.skills
const articles = profile.articles
const certificates = profile.certificates

const gridRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('.bento-animated').forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
        }
      )
    })

    // Skill bars animate in
    gsap.utils.toArray<HTMLElement>('.skill-bar-fill').forEach((bar) => {
      ScrollTrigger.create({
        trigger: bar,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(bar, {
            scaleX: 1,
            duration: 1,
            ease: 'power3.out',
          })
        },
      })
    })
  }, gridRef)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="work" class="py-24 max-w-7xl mx-auto px-6" ref="gridRef">

    <!-- Section header -->
    <div class="flex items-end justify-between mb-12 bento-animated">
      <div>
        <p class="eyebrow mb-3">Selected work</p>
        <h2 class="font-display text-5xl lg:text-6xl text-cream font-light">
          Projects <span class="italic text-gold">& Craft</span>
        </h2>
      </div>
      <router-link to="/projects" class="btn-outline hidden md:inline-flex">
        <span>All Projects</span>
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="transition-transform group-hover:translate-x-0.5">
          <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </router-link>
    </div>

    <!-- ======================== BENTO GRID ======================== -->
    <div class="grid grid-cols-12 grid-rows-auto gap-4">

      <!-- ── ROW 1 ──────────────────────────────────── -->

      <!-- About card (4 cols) -->
      <div id="about" class="bento-animated bento-card col-span-12 md:col-span-4 p-7 flex flex-col justify-between min-h-70">
        <div>
          <p class="eyebrow mb-4">About me</p>
          <p class="font-body text-cream-2 leading-relaxed">
            {{ profile.aboutMe }}
          </p>
        </div>
        <div class="flex items-center gap-3 mt-6">
          <div class="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
            <span class="font-display text-gold font-semibold">{{ profile.initials }}</span>
          </div>
          <div>
            <p class="font-body text-sm text-cream">{{ profile.name }}</p>
            <p class="font-body text-xs text-muted">{{ profile.primaryRole }}</p>
          </div>
        </div>
      </div>

      <!-- Featured project 1 (8 cols) -->
      <router-link
        :to="`/projects/${projects[0].id}`"
        class="bento-animated bento-card col-span-12 md:col-span-8 relative overflow-hidden min-h-70 group cursor-pointer block"
      >
        <!-- Cover image -->
        <img v-if="projects[0].thumbnail" :src="projects[0].thumbnail" :alt="projects[0].name" class="absolute inset-0 w-full h-full object-cover" />
        <!-- Background gradient / scrim -->
        <div
          class="absolute inset-0"
          :style="{ backgroundImage: projects[0].thumbnail
            ? 'linear-gradient(to bottom, rgba(8,7,10,0.88), rgba(8,7,10,0.55), rgba(8,7,10,0.88))'
            : `linear-gradient(to bottom right, ${projects[0].accent}1a, transparent, transparent)` }"
        />
        <!-- Decorative number -->
        <div v-if="!projects[0].thumbnail" class="absolute top-6 right-6 font-display text-8xl font-light text-white/5 select-none">01</div>

        <div class="relative z-10 p-7 flex flex-col h-full justify-between">
          <div>
            <p class="eyebrow mb-3" :style="{ color: projects[0].accent }">{{ projects[0].category }} · {{ projects[0].date }}</p>
            <h3 class="font-display text-4xl text-cream font-light leading-tight mb-3">
              {{ projects[0].name }}
            </h3>
            <p class="font-body text-white leading-relaxed max-w-md">{{ projects[0].description }}</p>
          </div>

          <div class="flex items-end justify-between mt-6">
            <div class="flex gap-2">
              <span v-for="tag in projects[0].technologies" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <div class="w-10 h-10 rounded-full flex items-center justify-center
                        group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" :style="{ backgroundColor: projects[0].accent }">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="#08070A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </router-link>

      <!-- ── ROW 2 ──────────────────────────────────── -->

      <!-- Project 2 (6 cols) -->
      <router-link
        :to="`/projects/${projects[1].id}`"
        class="bento-animated bento-card col-span-12 md:col-span-6 relative overflow-hidden min-h-60 group cursor-pointer block"
      >
        <img v-if="projects[1].thumbnail" :src="projects[1].thumbnail" :alt="projects[1].name" class="absolute inset-0 w-full h-full object-cover" />
        <div
          class="absolute inset-0"
          :style="{ backgroundImage: projects[1].thumbnail
            ? 'linear-gradient(to bottom, rgba(8,7,10,0.88), rgba(8,7,10,0.55), rgba(8,7,10,0.88))'
            : `linear-gradient(to bottom right, ${projects[1].accent}1a, transparent, transparent)` }"
        />
        <div v-if="!projects[1].thumbnail" class="absolute top-6 right-6 font-display text-8xl font-light text-white/5 select-none">02</div>
        <div class="relative z-10 p-7 flex flex-col h-full justify-between">
          <div>
            <p class="eyebrow mb-3" :style="{ color: projects[1].accent }">{{ projects[1].category }} · {{ projects[1].date }}</p>
            <h3 class="font-display text-3xl text-cream font-light">{{ projects[1].name }}</h3>
            <p class="font-body text-white text-sm mt-2 leading-relaxed">{{ projects[1].description }}</p>
          </div>
          <div class="flex items-end justify-between mt-4">
            <div class="flex gap-2 flex-wrap">
              <span v-for="tag in projects[1].technologies" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <div class="w-8 h-8 rounded-full flex items-center justify-center
                        group-hover:scale-110 transition-all duration-300" :style="{ backgroundColor: projects[1].accent + '20', border: `1px solid ${projects[1].accent}40` }">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" :stroke="projects[1].accent" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </router-link>

      <!-- Project 3 (6 cols) -->
      <router-link
        :to="`/projects/${projects[2].id}`"
        class="bento-animated bento-card col-span-12 md:col-span-6 relative overflow-hidden min-h-60 group cursor-pointer block"
      >
        <img v-if="projects[2].thumbnail" :src="projects[2].thumbnail" :alt="projects[2].name" class="absolute inset-0 w-full h-full object-cover" />
        <div
          class="absolute inset-0"
          :style="{ backgroundImage: projects[2].thumbnail
            ? 'linear-gradient(to bottom, rgba(8,7,10,0.88), rgba(8,7,10,0.55), rgba(8,7,10,0.88))'
            : `linear-gradient(to bottom right, ${projects[2].accent}1a, transparent, transparent)` }"
        />
        <div v-if="!projects[2].thumbnail" class="absolute top-6 right-6 font-display text-8xl font-light text-white/5 select-none">03</div>
        <div class="relative z-10 p-7 flex flex-col h-full justify-between">
          <div>
            <p class="eyebrow mb-3" :style="{ color: projects[2].accent }">{{ projects[2].category }} · {{ projects[2].date }}</p>
            <h3 class="font-display text-3xl text-cream font-light">{{ projects[2].name }}</h3>
            <p class="font-body text-white text-sm mt-2 leading-relaxed">{{ projects[2].description }}</p>
          </div>
          <div class="flex items-end justify-between mt-4">
            <div class="flex gap-2 flex-wrap">
              <span v-for="tag in projects[2].technologies" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <div class="w-8 h-8 rounded-full flex items-center justify-center
                        group-hover:scale-110 transition-all duration-300" :style="{ backgroundColor: projects[2].accent + '20', border: `1px solid ${projects[2].accent}40` }">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" :stroke="projects[2].accent" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </router-link>

      <!-- ── ROW 3 ──────────────────────────────────── -->

      <!-- Skills card (5 cols) -->
      <div id="skills" class="bento-animated bento-card col-span-12 md:col-span-5 p-7 space-y-6">
        <div>
          <p class="eyebrow mb-1">Technical depth</p>
          <h3 class="font-display text-3xl text-cream font-light">Skills & Stack</h3>
        </div>
 
        <div class="space-y-5">
          <div v-for="group in skillGroups" :key="group.category" class="space-y-2.5">
            <!-- Category label -->
            <div class="flex items-center gap-2">
              <span
                class="w-1.5 h-1.5 rounded-full shrink-0"
                :style="{ backgroundColor: group.color }"
              />
              <span class="font-body text-xs font-medium tracking-widest uppercase" :style="{ color: group.color }">
                {{ group.category }}
              </span>
            </div>
            <!-- Tag cloud -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="item in group.items"
                :key="item"
                class="tag transition-colors duration-200 hover:border-current"
                :style="{ '--tw-ring-color': group.color }"
              >{{ item }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Writing / Articles card (4 cols) -->
      <div id="writing" class="bento-animated bento-card col-span-12 md:col-span-4 p-7 flex flex-col justify-start">
        <div>
          <p class="eyebrow mb-3">Writing</p>
          <h3 class="font-display text-3xl text-cream font-light leading-tight">
            Technical<br /><span class="italic text-gold">Articles</span>
          </h3>
          <p class="font-body text-muted text-sm mt-3 leading-relaxed">
            Sharing insights on frontend architecture, performance, and the intersection of design & engineering.
          </p>
        </div>

        <div class="space-y-3 mt-5">
          <a
            v-for="article in articles"
            :key="article.id"
            :href="article.url || '#'"
            target="_blank"
            class="flex items-start justify-between gap-4 py-2.5 border-b border-border/50 group cursor-pointer hover:border-gold/30 transition-colors duration-200"
          >
            <p class="font-body text-sm text-cream-2 group-hover:text-cream transition-colors">{{ article.title }}</p>
            <span class="font-mono text-xs text-muted whitespace-nowrap">{{ article.date }}</span>
          </a>
        </div>

        <a v-if="false" href="#" class="flex items-center gap-2 mt-4 font-body text-sm text-gold hover:text-gold-light transition-colors">
          <span>All articles</span>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="transition-transform group-hover:translate-x-0.5">
            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>

      <!-- Certificates card (3 cols) -->
      <div class="bento-animated bento-card col-span-12 md:col-span-3 p-7 flex flex-col justify-between relative overflow-hidden">
        <!-- Decorative circles -->
        <div class="absolute -top-8 -right-8 w-32 h-32 rounded-full border border-gold/20" />
        <div class="absolute -top-4 -right-4 w-20 h-20 rounded-full border border-gold/15" />
 
        <div class="relative z-10 space-y-4">
          <p class="eyebrow mb-3">Credentials</p>
          <h3 class="font-display text-3xl text-cream font-light leading-tight">
            Licenses &<br /><span class="italic text-gold">Certifications</span>
          </h3>
 
          <a
            v-for="cert in certificates"
            :key="cert.id"
            :href="cert.url || '#'"
            target="_blank"
            class="flex items-start gap-3 group"
          >
            <div
              class="mt-0.5 w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-xs font-mono font-medium"
              :style="{ backgroundColor: cert.accent + '20', color: cert.accent, border: `1px solid ${cert.accent}40` }"
            >
              {{ cert.issuer[0] }}
            </div>
            <div>
              <p class="font-body text-xs text-cream leading-snug">{{ cert.title }}</p>
              <p class="font-body text-xs text-muted mt-0.5">
                {{ cert.issuer }} · <span :style="{ color: cert.accent + 'cc' }">{{ cert.type }}</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
