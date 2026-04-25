<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useMouseInElement, useMouse } from '@vueuse/core'

const cursorDot  = ref<HTMLElement | null>(null)
const cursorRing = ref<HTMLElement | null>(null)
const isHovered  = ref(false)

let dotX  = 0, dotY  = 0
let ringX = 0, ringY = 0
let animId: number

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function onMouseMove(e: MouseEvent) {
  dotX = e.clientX
  dotY = e.clientY
}

function onMouseEnterLink() { isHovered.value = true }
function onMouseLeaveLink() { isHovered.value = false }

function animate() {
  ringX = lerp(ringX, dotX, 0.12)
  ringY = lerp(ringY, dotY, 0.12)

  if (cursorDot.value) {
    cursorDot.value.style.left  = `${dotX}px`
    cursorDot.value.style.top   = `${dotY}px`
  }
  if (cursorRing.value) {
    cursorRing.value.style.left = `${ringX}px`
    cursorRing.value.style.top  = `${ringY}px`
  }

  animId = requestAnimationFrame(animate)
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)

  document.querySelectorAll('a, button, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', onMouseEnterLink)
    el.addEventListener('mouseleave', onMouseLeaveLink)
  })

  animate()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(animId)
})
</script>

<template>
  <div ref="cursorDot"  class="cursor-dot"  />
  <div ref="cursorRing" class="cursor-ring" :class="{ 'is-hovered': isHovered }" />
</template>
