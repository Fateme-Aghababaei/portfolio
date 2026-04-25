export interface Project {
  id: number
  title: string
  category: string
  description: string
  tags: string[]
  year: string
  featured?: boolean
}

export interface Stat {
  value: string
  label: string
  sublabel?: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  platform: string
  href: string
  icon: string
}
