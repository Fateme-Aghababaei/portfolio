<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import profile from '@/data/profile.json'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)

const form = ref({
  name: '',
  email: '',
  message: '',
})

type Status = 'idle' | 'sending' | 'sent' | 'error'
const status = ref<Status>('idle')

async function handleSubmit() {
  status.value = 'sending'

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
        to_email: profile.contact.email.username,
      },
      { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
    )
    status.value = 'sent'
    form.value = { name: '', email: '', message: '' }
  } catch (err) {
    console.error('Failed to send message:', err)
    status.value = 'error'
  } finally {
    setTimeout(() => { status.value = 'idle' }, 5000)
  }
}

onMounted(() => {
  gsap.fromTo(
    sectionRef.value,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' },
    }
  )
})
</script>

<template>
  <section id="contact" ref="sectionRef" class="py-24 max-w-7xl mx-auto px-6">

    <div class="grid lg:grid-cols-2 gap-16 items-start">

      <!-- Left: text -->
      <div class="space-y-6">
        <p class="eyebrow">Let's collaborate</p>
        <h2 class="font-display text-5xl lg:text-7xl text-cream font-light leading-none">
          Let's work<br />
          <span class="italic text-gold">together.</span>
        </h2>
        <p class="font-body text-muted leading-relaxed max-w-sm">
          {{ profile.collaborationPitch }}
        </p>

        <!-- Contact info -->
        <div class="space-y-4 pt-4">
          <a :href="profile.contact.email.url"
            class="flex items-center gap-3 group"
          >
            <div class="w-10 h-10 rounded-full border border-border flex items-center justify-center
                        group-hover:border-gold group-hover:bg-gold/10 transition-all duration-200">
              <span class="text-sm">✉</span>
            </div>
            <span class="font-body text-cream-2 group-hover:text-gold transition-colors">{{ profile.contact.email.username }}</span>
          </a>

          <a :href="profile.contact.linkedin.url"
            class="flex items-center gap-3 group"
          >
            <div class="w-10 h-10 rounded-full border border-border flex items-center justify-center
                        group-hover:border-gold group-hover:bg-gold/10 transition-all duration-200">
              <span class="text-sm">in</span>
            </div>
            <span class="font-body text-cream-2 group-hover:text-gold transition-colors">{{ profile.contact.linkedin.username }}</span>
          </a>

          <a :href="profile.contact.telegram.url"
            class="flex items-center gap-3 group"
          >
            <div class="w-10 h-10 rounded-full border border-border flex items-center justify-center
                        group-hover:border-gold group-hover:bg-gold/10 transition-all duration-200">
              <span class="text-sm">TG</span>
            </div>
            <span class="font-body text-cream-2 group-hover:text-gold transition-colors">@{{ profile.contact.telegram.username }}</span>
          </a>
        </div>
      </div>

      <!-- Right: form -->
      <form class="bento-card p-8 space-y-6" @submit.prevent="handleSubmit">

        <!-- Status messages -->
        <Transition
          enter-active-class="transition-all duration-400 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-200"
          leave-to-class="opacity-0"
        >
        <div v-if="status === 'sent'" class="flex items-center gap-3 p-4 rounded-xl bg-green/10 border border-green/30">
          <span class="text-green text-xl">✓</span>
            <p class="font-body text-sm text-cream">Message sent! I'll get back to you within 24 hours.</p>
        </div>
        <div v-else-if="status === 'error'" class="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <span class="text-red-400 text-xl">✕</span>
            <p class="font-body text-sm text-cream">Something went wrong. Please try emailing me directly.</p>
        </div>
        </Transition>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="eyebrow text-xs">Name</label>
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="Your name"
              class="w-full bg-ink-3 border border-border rounded-xl px-4 py-3 font-body text-sm text-cream placeholder:text-muted
                     focus:outline-none focus:border-gold/60 transition-colors duration-200"
            />
          </div>
          <div class="space-y-2">
            <label class="eyebrow text-xs">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full bg-ink-3 border border-border rounded-xl px-4 py-3 font-body text-sm text-cream placeholder:text-muted
                     focus:outline-none focus:border-gold/60 transition-colors duration-200"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="eyebrow text-xs">Message</label>
          <textarea
            v-model="form.message"
            rows="5"
            required
            placeholder="Tell me about your project..."
            class="w-full bg-ink-3 border border-border rounded-xl px-4 py-3 font-body text-sm text-cream placeholder:text-muted
                   focus:outline-none focus:border-gold/60 transition-colors duration-200 resize-none"
          />
        </div>

        <button
          type="submit"
          :disabled="status === 'sending'"
          class="btn-primary w-full justify-center group disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span>{{ status === 'sending' ? 'Sending…' : 'Send message' }}</span>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"
               class="group-hover:translate-x-1 transition-transform">
            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </form>
    </div>
  </section>
</template>
