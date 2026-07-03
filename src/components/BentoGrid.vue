<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
const socialLinks = profile.socialMedia

const gridRef = ref<HTMLElement | null>(null)

onMounted(() => {
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
})
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
      <a href="#" class="btn-outline hidden md:inline-flex">
        <span>All Projects</span>
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="transition-transform group-hover:translate-x-0.5">
          <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
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
      <div
        class="bento-animated bento-card col-span-12 md:col-span-8 relative overflow-hidden min-h-70 group cursor-pointer"
      >
        <!-- Background gradient -->
        <div class="absolute inset-0 bg-linear-to-br to-transparent" :style="{ backgroundImage: `linear-gradient(to bottom right, ${projects[0].accent}1a, transparent, transparent)` }" />
        <!-- Decorative number -->
        <div class="absolute top-6 right-6 font-display text-8xl font-light text-white/5 select-none">01</div>

        <div class="relative z-10 p-7 flex flex-col h-full justify-between">
          <div>
            <p class="eyebrow mb-3" :style="{ color: projects[0].accent }">{{ projects[0].category }} · {{ projects[0].date }}</p>
            <h3 class="font-display text-4xl text-cream font-light leading-tight mb-3">
              {{ projects[0].name }}
            </h3>
            <p class="font-body text-muted leading-relaxed max-w-md">{{ projects[0].description }}</p>
          </div>

          <div class="flex items-end justify-between mt-6">
            <div class="flex gap-2">
              <span v-for="tag in projects[0].technologies" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <a :href="projects[0].url || '#'" class="w-10 h-10 rounded-full flex items-center justify-center
                        group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" :style="{ backgroundColor: projects[0].accent }">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="#08070A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- ── ROW 2 ──────────────────────────────────── -->

      <!-- Project 2 (6 cols) -->
      <div
        class="bento-animated bento-card col-span-12 md:col-span-6 relative overflow-hidden min-h-60 group cursor-pointer"
      >
        <div class="absolute inset-0 bg-linear-to-br to-transparent" :style="{ backgroundImage: `linear-gradient(to bottom right, ${projects[1].accent}1a, transparent, transparent)` }" />
        <div class="absolute top-6 right-6 font-display text-8xl font-light text-white/5 select-none">02</div>
        <div class="relative z-10 p-7 flex flex-col h-full justify-between">
          <div>
            <p class="eyebrow mb-3" :style="{ color: projects[1].accent }">{{ projects[1].category }} · {{ projects[1].date }}</p>
            <h3 class="font-display text-3xl text-cream font-light">{{ projects[1].name }}</h3>
            <p class="font-body text-muted text-sm mt-2 leading-relaxed">{{ projects[1].description }}</p>
          </div>
          <div class="flex items-end justify-between mt-4">
            <div class="flex gap-2 flex-wrap">
              <span v-for="tag in projects[1].technologies" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <a :href="projects[1].url || '#'" class="w-8 h-8 rounded-full flex items-center justify-center
                        group-hover:scale-110 transition-all duration-300" :style="{ backgroundColor: projects[1].accent + '20', border: `1px solid ${projects[1].accent}40` }">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" :stroke="projects[1].accent" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Project 3 (6 cols) -->
      <div
        class="bento-animated bento-card col-span-12 md:col-span-6 relative overflow-hidden min-h-60 group cursor-pointer"
      >
        <div class="absolute inset-0 bg-linear-to-br to-transparent" :style="{ backgroundImage: `linear-gradient(to bottom right, ${projects[2].accent}1a, transparent, transparent)` }" />
        <div class="absolute top-6 right-6 font-display text-8xl font-light text-white/5 select-none">03</div>
        <div class="relative z-10 p-7 flex flex-col h-full justify-between">
          <div>
            <p class="eyebrow mb-3" :style="{ color: projects[2].accent }">{{ projects[2].category }} · {{ projects[2].date }}</p>
            <h3 class="font-display text-3xl text-cream font-light">{{ projects[2].name }}</h3>
            <p class="font-body text-muted text-sm mt-2 leading-relaxed">{{ projects[2].description }}</p>
          </div>
          <div class="flex items-end justify-between mt-4">
            <div class="flex gap-2 flex-wrap">
              <span v-for="tag in projects[2].technologies" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <a :href="projects[2].url || '#'" class="w-8 h-8 rounded-full flex items-center justify-center
                        group-hover:scale-110 transition-all duration-300" :style="{ backgroundColor: projects[2].accent + '20', border: `1px solid ${projects[2].accent}40` }">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" :stroke="projects[2].accent" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

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
      <div id="writing" class="bento-animated bento-card col-span-12 md:col-span-4 p-7 flex flex-col justify-between">
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
            class="flex items-start justify-between gap-4 py-2.5 border-b border-border/50 group cursor-pointer hover:border-gold/30 transition-colors duration-200"
          >
            <p class="font-body text-sm text-cream-2 group-hover:text-cream transition-colors">{{ article.title }}</p>
            <span class="font-mono text-xs text-muted whitespace-nowrap">{{ article.date }}</span>
          </a>
        </div>

        <a href="#" class="flex items-center gap-2 mt-4 font-body text-sm text-gold hover:text-gold-light transition-colors">
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

      <!-- ── ROW 4 ──────────────────────────────────── -->

      <!-- Process / approach card (7 cols) -->
      <div class="bento-animated bento-card col-span-12 md:col-span-7 p-7">
        <p class="eyebrow mb-3">My approach</p>
        <h3 class="font-display text-3xl text-cream font-light mb-6">How I work</h3>

        <div class="grid grid-cols-3 gap-4">
          <div v-for="step in [
            { num: '01', title: 'Discover', desc: 'Deep research into user needs, constraints, and opportunities.' },
            { num: '02', title: 'Design', desc: 'Rapid iteration from sketch to high-fidelity prototypes.' },
            { num: '03', title: 'Deliver', desc: 'Production code with obsessive attention to performance & polish.' },
          ]" :key="step.num" class="space-y-2">
            <span class="font-mono text-xs text-gold">{{ step.num }}</span>
            <h4 class="font-body text-sm font-medium text-cream">{{ step.title }}</h4>
            <p class="font-body text-xs text-muted leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Profiles / Social card (5 cols) -->
      <div class="bento-animated bento-card col-span-12 md:col-span-5 p-7 flex flex-col justify-between">
        <p class="eyebrow mb-3">Find me online</p>
        <h3 class="font-display text-3xl text-cream font-light mb-5">Profiles</h3>

        <div class="grid grid-cols-2 gap-3">
          <a v-for="social in socialLinks" :key="social.id"
            :href="social.url"
            class="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-gold/40 hover:bg-gold/5 transition-all duration-200 group"
          >
            <span class="text-lg">{{ social.icon }}</span>
            <div>
              <p class="font-body text-sm text-cream group-hover:text-gold transition-colors">{{ social.label }}</p>
              <p class="font-mono text-xs text-muted">{{ social.username }}</p>
            </div>
          </a>
        </div>
      </div>

    </div>
  </section>
</template>
