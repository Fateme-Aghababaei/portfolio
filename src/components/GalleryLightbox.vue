<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[1100] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <!-- Close -->
        <button
          class="absolute top-5 right-5 sm:top-8 sm:right-8 w-10 h-10 flex items-center justify-center rounded-full border border-border text-cream-2 hover:text-gold hover:border-gold/50 transition-colors cursor-pointer"
          aria-label="Close gallery"
          @click="$emit('close')"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>

        <!-- Counter -->
        <p class="absolute top-6 sm:top-9 left-1/2 -translate-x-1/2 eyebrow">
          {{ index + 1 }} / {{ images.length }}
        </p>

        <!-- Prev -->
        <button
          v-if="images.length > 1"
          class="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-border text-cream-2 hover:text-gold hover:border-gold/50 transition-colors cursor-pointer"
          aria-label="Previous image"
          @click.stop="prev"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M9 1L3 7l6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <!-- Image -->
        <div class="max-w-5xl w-full px-16 sm:px-24" @click.stop>
          <Transition name="lightbox-slide" mode="out-in">
            <ProjectImage
              :key="index"
              :src="images[index]"
              :alt="`${alt} screenshot ${index + 1}`"
              img-class="w-full max-h-[80vh] object-contain rounded-xl border border-border"
            />
          </Transition>
        </div>

        <!-- Next -->
        <button
          v-if="images.length > 1"
          class="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-border text-cream-2 hover:text-gold hover:border-gold/50 transition-colors cursor-pointer"
          aria-label="Next image"
          @click.stop="next"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M5 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue'
import ProjectImage from '@/components/ProjectImage.vue'

const props = defineProps<{
  open: boolean
  images: string[]
  index: number
  alt: string
}>()

const emit = defineEmits<{
  close: []
  'update:index': [value: number]
}>()

function next() {
  emit('update:index', (props.index + 1) % props.images.length)
}

function prev() {
  emit('update:index', (props.index - 1 + props.images.length) % props.images.length)
}

function onKeydown(e: KeyboardEvent) {
  if (!props.open) return
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}

watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
)

window.addEventListener('keydown', onKeydown)
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.25s ease;
}
.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

.lightbox-slide-enter-active,
.lightbox-slide-leave-active {
  transition: opacity 0.2s ease;
}
.lightbox-slide-enter-from,
.lightbox-slide-leave-to {
  opacity: 0;
}
</style>
