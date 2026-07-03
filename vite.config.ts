import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import profile from './src/data/profile.json'

function profileHtmlPlugin(): Plugin {
  return {
    name: 'profile-html',
    transformIndexHtml(html) {
      return html
        .replace(/<title>.*<\/title>/, `<title>${profile.name} — ${profile.primaryRole}</title>`)
        .replace(
          /<meta name="description" content=".*"\s*\/>/,
          `<meta name="description" content="Portfolio of ${profile.name}, ${profile.primaryRole} crafting immersive digital experiences." />`
        )
    },
  }
}

export default defineConfig({
  plugins: [vue(), tailwindcss(), profileHtmlPlugin()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
