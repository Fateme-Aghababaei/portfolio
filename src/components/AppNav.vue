<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import profile from '@/data/profile.json'

const { y } = useWindowScroll()
const isScrolled = ref(false)
const menuOpen   = ref(false)

const links = [
  { label: 'Work',      href: '#work' },
  { label: 'About',     href: '#about' },
  { label: 'Skills',    href: '#skills' },
  { label: 'Writing',   href: '#writing' },
  { label: 'Contact',   href: '#contact' },
]

function toggleMenu() { menuOpen.value = !menuOpen.value }
function closeMenu()  { menuOpen.value = false }

// Scroll-based nav transparency
let unwatch: (() => void) | null = null
onMounted(() => {
  const check = () => { isScrolled.value = window.scrollY > 40 }
  window.addEventListener('scroll', check, { passive: true })
  unwatch = () => window.removeEventListener('scroll', check)
})
onUnmounted(() => unwatch?.())
</script>

<template>
  <!-- Desktop nav -->
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-500 py-1"
    :class="isScrolled ? 'bg-ink/80 backdrop-blur-xl border-b border-border/60' : ''"
  >
    <div class="w-full p-4! flex items-center justify-between">

      <!-- Logo -->
      <a href="#" class="flex items-center gap-3 group" aria-label="Home">
        <div class="w-8 h-8 rounded-lg bg-gold flex items-center justify-center
                    group-hover:scale-110 transition-transform duration-300">
          <span class="font-display font-semibold text-ink text-sm">{{ profile.initials }}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-display text-lg text-cream hidden sm:block tracking-wide">
            {{ profile.name }}
          </span>
          <p class="font-body text-xs text-muted">
              {{ profile.primaryRole }}
          </p>
        </div>
      </a>

      <!-- Nav links -->
      <nav class="hidden md:flex items-center gap-8">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          class="nav-link"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- CTA + Burger -->
      <div class="flex items-center gap-4">
        <a :href="profile.resumeUrl" download class="btn-outline hidden md:inline-flex">
          <span>Download CV</span>
        </a>

        <a href="#contact" class="btn-primary hidden md:inline-flex">
          <span>Let's talk</span>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="transition-transform group-hover:translate-x-0.5">
            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>

        <!-- Burger -->
        <button
          class="md:hidden flex flex-col gap-1.5 p-2 group"
          @click="toggleMenu"
          aria-label="Menu"
        >
          <span
            class="block w-6 h-px bg-cream transition-all duration-300"
            :class="menuOpen ? 'rotate-45 translate-y-2' : ''"
          />
          <span
            class="block w-4 h-px bg-cream transition-all duration-300"
            :class="menuOpen ? 'opacity-0' : ''"
          />
          <span
            class="block w-6 h-px bg-cream transition-all duration-300"
            :class="menuOpen ? '-rotate-45 -translate-y-2' : ''"
          />
        </button>
      </div>

    </div>
  </header>

  <!-- Mobile menu -->
  <Transition
    enter-active-class="transition-all duration-400 ease-out"
    enter-from-class="opacity-0 -translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-4"
  >
    <div
      v-if="menuOpen"
      class="fixed inset-0 z-40 bg-ink/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-10 md:hidden"
    >
      <a
        v-for="link in links"
        :key="link.label"
        :href="link.href"
        class="font-display text-4xl text-cream hover:text-gold transition-colors duration-200"
        @click="closeMenu"
      >
        {{ link.label }}
      </a>
      <a href="#contact" class="btn-primary mt-4" @click="closeMenu">Let's talk</a>
      <a :href="profile.resumeUrl" download class="btn-outline" @click="closeMenu">Download CV</a>
    </div>
  </Transition>
</template>
