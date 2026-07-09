export interface Project {
  id: number
  name: string
  description: string
  url: string
  githubUrl?: string
  category: string
  technologies: string[]
  date: string
  accent: string
  thumbnail?: string
  image?: string
  gallery?: string[]
  highlights?: string[]
}
