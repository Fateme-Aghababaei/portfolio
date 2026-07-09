# 🧑‍💻 Personal Portfolio - Vue.js

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-222222?logo=github-pages)

> A modern, responsive portfolio website built with **Vue.js 3** and **Vite** — designed to showcase frontend projects, technical skills, and professional contact information. Clean UI, fast performance, and recruiter‑friendly.

<!-- 🔗 **Live demo:** [YOUR_PORTFOLIO_LINK](https://YOUR_PORTFOLIO_LINK) -->

---

## 📌 Table of Contents

- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [🧩 Customization](#-customization)
- [📄 License](#-license)
- [🤝 Contact](#-contact)

---

## ✨ Features

- ⚡ **Vue 3 Composition API** – reactive, modular, and maintainable code  
- 📱 **Fully responsive** – mobile-first design, works on all devices  
- 🧩 **Reusable components** – Hero, Projects, Skills, Contact sections  
- 📄 **All Projects & Project Detail pages** – `/projects` lists every project, `/projects/:id` gives each one its own page with prev/next navigation  
- 🎨 **TailwindCSS** – utility-first styling, easily customizable  
- 📬 **Contact form** – sends real emails via EmailJS, no backend required  
- 🚀 **Vite** – lightning-fast HMR and build times  

---

## 🛠 Tech Stack

| Technology       | Purpose                     |
|------------------|-----------------------------|
| Vue.js 3         | Frontend framework          |
| Vue Router       | Client-side routing (home, all projects, project detail) |
| Vite             | Build tool & dev server     |
| TailwindCSS      | Styling & responsive design |
| GSAP + Lenis     | Scroll animations & smooth scrolling |
| EmailJS          | Client-side contact form delivery |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_GITHUB/portfolio.git

# 2. Navigate into the folder
cd portfolio

# 3. Install dependencies
npm install

# 4. Create your personal data file (gitignored, never committed)
cp src/data/profile.example.json src/data/profile.json

# 5. Fill in src/data/profile.json with your own info, then start the dev server
npm run dev
```

Your portfolio will be available at http://localhost:5173.

---

## 🧩 Customization

All personal content lives in a single file: **`src/data/profile.json`**. Edit its fields and the entire site — hero, about, skills, projects, work experience, stats, articles, certificates, social links, and contact info — updates automatically. No need to touch any component code.

This file is **gitignored** — it holds your real name, email, and other personal details, so it's never committed. **[`src/data/profile.example.json`](src/data/profile.example.json)** is the tracked template with the same fields filled in with placeholders; copy it to `profile.json` and edit that copy (see [Getting Started](#-getting-started)). If you ever change the schema (add/rename a field), update `profile.example.json` too so the template stays in sync.

| Field                | Used in                                  |
|-----------------------|-------------------------------------------|
| `name`, `initials`, `primaryRole` | Nav bar, hero, about card, footer, page `<title>` |
| `roles`, `tagline`    | Hero typewriter effect and subtitle       |
| `aboutMe`             | About card                                |
| `collaborationPitch`  | Contact section intro                     |
| `location`, `since`   | Hero badge card                           |
| `availability`        | Hero "open to work" status                |
| `contact`              | Contact section (email, LinkedIn, Telegram) |
| `primaryStack`, `skills` | Hero stack badge and Skills card        |
| `marqueeItems`         | Scrolling ticker                          |
| `projects`             | Featured project cards                    |
| `articles`             | Writing card                              |
| `certificates`         | Certificates card                         |
| `workExperience`       | Work experience timeline                  |

Each `projects`, `certificates`, and `workExperience` entry has an `accent` hex color used for that item's highlight color — pick whatever fits your palette.

The favicon (`public/favicon.ico`) is the only asset you'll need to swap manually.

### 🖼️ Adding project screenshots

Drop your screenshot files anywhere under `public/projects/` (e.g. `public/projects/my-app-cover.jpg`), then reference them from `src/data/profile.json` with a leading `/` — same convention as `resumeUrl`. Like `profile.json` and `resume.pdf`, everything under `public/projects/` is gitignored (only a `.gitkeep` placeholder is tracked) — your screenshots stay local and never get committed. Each project in the `projects` array supports four optional fields on top of the required ones:

```json
{
  "id": 1,
  "name": "My App",
  "thumbnail": "/projects/my-app-thumb.jpg",
  "image": "/projects/my-app-hero.jpg",
  "gallery": ["/projects/my-app-1.jpg", "/projects/my-app-2.jpg"],
  "highlights": [
    "Built a real-time dashboard with WebSocket updates",
    "Cut initial load time by 40% via code-splitting"
  ]
}
```

- `thumbnail` — used on the home page teaser cards and the All Projects grid. Pick a tight crop that still reads well small.
- `image` — the large hero screenshot at the top of that project's own detail page (`/projects/:id`). Can be the same file as `thumbnail` or a different, higher-res shot — they're independent fields.
- `gallery` — extra screenshots shown in a grid further down the detail page, each opening full-size in a new tab.
- `highlights` — a bullet list of key features or what you built, shown on the detail page under the description, for projects you want to explain in more depth than the card blurb allows.

Any of the four can be omitted independently — cards and the detail hero each fall back to the existing accent-colored decorative treatment (no broken image icons) if their respective field isn't set.

All three are optional — add them per-project as you have material for them.

### 📬 Making the contact form work

The contact form sends email via [EmailJS](https://www.emailjs.com) directly from the browser — no backend required, so it works on GitHub Pages.

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. Add an **Email Service** (e.g. Gmail) and note its Service ID.
3. Create an **Email Template** with `from_name`, `from_email`, `message`, and `to_email` variables, and note its Template ID.
4. Copy your **Public Key** from Account → General.
5. Copy `.env.example` to `.env` and fill in the three values:

   ```bash
   cp .env.example .env
   ```

6. Restart the dev server. Submitted messages will now arrive in your inbox.

### 🌐 Deploying to GitHub Pages

This site uses real routes (`/projects`, `/projects/2`, …), which GitHub Pages — a static file host — doesn't natively support on refresh or direct link. A `public/404.html` fallback is already included to handle this, but check one setting depending on where you deploy:

- **Custom domain or `username.github.io` (root):** works out of the box, no changes needed.
- **Project page at `username.github.io/repo-name`:** set `pathSegmentsToKeep = 1` in `public/404.html`, and add `base: '/repo-name/'` to `vite.config.ts`.

---

## 📄 License

This project is licensed under the **MIT License** – you are free to use, modify, and distribute it as you like.  
See the [LICENSE](https://github.com/Fateme-Aghababaei/portfolio/blob/master/LICENSE) file for details.

---

## 🤝 Contact

**YOUR_NAME**  
- GitHub: [Fateme-Aghababaei](https://github.com/Fateme-Aghababaei)  
- Email: [YOUR_EMAIL](mailto:faghababaei81@gmail.com)  
<!-- - Portfolio: [YOUR_PORTFOLIO_LINK](https://YOUR_PORTFOLIO_LINK) -->

---

⭐ **If you find this portfolio useful, please give it a star!**  
PRs and suggestions are always welcome.
