<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
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
})

onUnmounted(() => ctx?.revert())
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
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="w-10 h-10 rounded-full border border-border flex items-center justify-center
                        group-hover:border-gold group-hover:bg-gold/10 transition-all duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <span class="font-body text-cream-2 group-hover:text-gold transition-colors">{{ profile.contact.email.username }}</span>
          </a>

          <a :href="profile.contact.linkedin.url"
            class="flex items-center gap-3 group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="w-10 h-10 rounded-full border border-border flex items-center justify-center
                        group-hover:border-gold group-hover:bg-gold/10 transition-all duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <span class="font-body text-cream-2 group-hover:text-gold transition-colors">{{ profile.contact.linkedin.username }}</span>
          </a>

          <a :href="profile.contact.telegram.url"
            class="flex items-center gap-3 group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="w-10 h-10 rounded-full border border-border flex items-center justify-center
                        group-hover:border-gold group-hover:bg-gold/10 transition-all duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </div>
            <span class="font-body text-cream-2 group-hover:text-gold transition-colors">@{{ profile.contact.telegram.username }}</span>
          </a>

          <a :href="profile.contact.github.url"
            class="flex items-center gap-3 group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="w-10 h-10 rounded-full border border-border flex items-center justify-center
                        group-hover:border-gold group-hover:bg-gold/10 transition-all duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.52 11.52 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </div>
            <span class="font-body text-cream-2 group-hover:text-gold transition-colors">{{ profile.contact.github.username }}</span>
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
