<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const heroRef   = ref<HTMLElement | null>(null)
const titleRef  = ref<HTMLElement | null>(null)
const orbRef    = ref<HTMLElement | null>(null)

const roles = [
  'Frontend Developer',
  'UI/UX Designer',
]
const currentRole   = ref(0)
const displayedRole = ref('')
let   typing        = true
let   charIndex     = 0
let   typeTimer: ReturnType<typeof setTimeout>

function typeRole() {
  const role = roles[currentRole.value]

  if (typing) {
    if (charIndex < role.length) {
      displayedRole.value = role.slice(0, ++charIndex)
      typeTimer = setTimeout(typeRole, 80)
    } else {
      typing = false
      typeTimer = setTimeout(typeRole, 2200)
    }
  } else {
    if (charIndex > 0) {
      displayedRole.value = role.slice(0, --charIndex)
      typeTimer = setTimeout(typeRole, 40)
    } else {
      typing = true
      currentRole.value = (currentRole.value + 1) % roles.length
      typeTimer = setTimeout(typeRole, 300)
    }
  }
}

// Orb follow mouse
function onMouseMove(e: MouseEvent) {
  if (!heroRef.value || !orbRef.value) return
  const rect = heroRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  gsap.to(orbRef.value, {
    x: (x - rect.width / 2) * 0.15,
    y: (y - rect.height / 2) * 0.15,
    duration: 1.2,
    ease: 'power2.out',
  })
}

onMounted(() => {
  // Page-load animation timeline
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.6 })
    .from('.hero-name',    { y: 60, opacity: 0, duration: 0.9 }, '-=0.3')
    .from('.hero-role',    { y: 30, opacity: 0, duration: 0.7 }, '-=0.4')
    .from('.hero-desc',    { y: 30, opacity: 0, duration: 0.7 }, '-=0.4')
    .from('.hero-ctas',    { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
    .from('.hero-badge',   { scale: 0.8, opacity: 0, duration: 0.5 }, '-=0.2')
    .from('.hero-scroll',  { opacity: 0, duration: 0.6 }, '-=0.1')

  // Start typewriter
  setTimeout(typeRole, 1200)
})
</script>

<template>
  <section
    id="home"
    ref="heroRef"
    class="relative min-h-screen flex items-center pt-24 pb-16 px-6 overflow-hidden"
    @mousemove="onMouseMove"
  >
    <!-- Background orbs -->
    <div
      ref="orbRef"
      class="absolute inset-0 pointer-events-none"
    >
      <div class="orb w-150 h-150 bg-gold/10 top-1/4 -left-48" />
      <div class="orb w-125 h-125 bg-lavender/10 bottom-1/4 -right-48 animation-delay-2000" style="animation-delay:2s" />
      <div class="orb w-75 h-75 bg-gold/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>

    <!-- Grid lines decoration -->
    <div class="absolute inset-0 pointer-events-none opacity-20">
      <div class="absolute inset-0"
        style="background-image: linear-gradient(rgba(46,45,53,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(46,45,53,0.5) 1px, transparent 1px); background-size: 80px 80px;" />
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 w-full">
      <div class="grid lg:grid-cols-[1fr_auto] gap-16 items-center">

        <!-- Main content -->
        <div class="space-y-6">

          <!-- Eyebrow -->
          <div class="hero-eyebrow flex items-center gap-3">
            <span class="w-8 h-px bg-gold" />
            <span class="eyebrow">Available for work</span>
            <span class="w-2 h-2 rounded-full bg-green animate-pulse-gold" />
          </div>

          <!-- Name -->
          <div class="hero-name">
            <h1 class="font-display text-[clamp(3.5rem,10vw,8rem)] leading-none tracking-tight text-cream">
              Fateme
              <br />
              <span class="gradient-text italic">Aghababaei</span>
            </h1>
          </div>

          <!-- Animated role -->
          <div class="hero-role flex items-center gap-3 h-8">
            <span class="font-body text-lg text-muted">—</span>
            <span class="font-body text-lg text-cream-2">
              {{ displayedRole }}<span class="inline-block w-0.5 h-5 bg-gold ml-0.5 animate-pulse" />
            </span>
          </div>

          <!-- Description -->
          <p class="hero-desc font-body text-muted text-lg leading-relaxed max-w-xl">
            I build interfaces where craft meets code — blending engineering precision
            with a deep obsession for motion, typography, and visual detail.
          </p>

          <!-- CTAs -->
          <div class="hero-ctas flex flex-wrap items-center gap-4 pt-2">
            <a href="#work" class="btn-primary group">
              View my work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="group-hover:translate-x-1 transition-transform">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a href="#contact" class="btn-outline">
              Get in touch
            </a>
          </div>
        </div>

        <!-- Right side - floating badge cards -->
        <div class="hero-badge hidden lg:flex flex-col gap-4 w-64">

          <!-- Status card -->
          <div class="bento-card p-5 space-y-2">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-green animate-pulse" />
              <span class="eyebrow text-green">Open to work</span>
            </div>
            <p class="font-body text-sm text-cream-2 leading-relaxed">
              Accepting select freelance & full-time opportunities.
            </p>
          </div>

          <!-- Year + location -->
          <div class="bento-card p-5 flex items-center justify-between">
            <div>
              <p class="eyebrow">Based in</p>
              <p class="font-body text-cream text-sm mt-1">Isfahan, Iran</p>
            </div>
            <div class="w-px h-10 bg-border" />
            <div class="text-right">
              <p class="eyebrow">Since</p>
              <p class="font-body text-cream text-sm mt-1">2023</p>
            </div>
          </div>

          <!-- Stack badge -->
          <div class="bento-card p-5 space-y-3">
            <p class="eyebrow">Primary stack</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="t in ['Vue', 'React', 'TypeScript', 'Node', 'GSAP']" :key="t" class="tag">{{ t }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span class="eyebrow text-xs">scroll</span>
      <div class="w-px h-12 bg-linear-to-b from-border to-transparent" />
    </div>
  </section>
</template>
