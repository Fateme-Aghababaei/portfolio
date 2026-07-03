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
- 🎨 **TailwindCSS** – utility-first styling, easily customizable  
- 📬 **Contact form** – ready to integrate with EmailJS or a backend  
- 🚀 **Vite** – lightning-fast HMR and build times  

---

## 🛠 Tech Stack

| Technology       | Purpose                     |
|------------------|-----------------------------|
| Vue.js 3         | Frontend framework          |
| Vite             | Build tool & dev server     |
| TailwindCSS      | Styling & responsive design |

<!-- TODO: add vue router and emailJS and gsap -->

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

# 4. Start development server
npm run dev
```

Your portfolio will be available at http://localhost:5173.

---

## 🧩 Customization

All personal content lives in a single file: **[`src/data/profile.json`](src/data/profile.json)**. Edit its fields and the entire site — hero, about, skills, projects, work experience, stats, articles, certificates, social links, and contact info — updates automatically. No need to touch any component code.

| Field                | Used in                                  |
|-----------------------|-------------------------------------------|
| `name`, `initials`, `primaryRole` | Nav bar, hero, about card, footer, page `<title>` |
| `roles`, `tagline`    | Hero typewriter effect and subtitle       |
| `aboutMe`             | About card                                |
| `collaborationPitch`  | Contact section intro                     |
| `location`, `since`   | Hero badge card                           |
| `availability`        | Hero "open to work" status                |
| `contact`              | Contact section (email, LinkedIn, Telegram) |
| `socialMedia`          | "Find me online" card                     |
| `primaryStack`, `skills` | Hero stack badge and Skills card        |
| `marqueeItems`         | Scrolling ticker                          |
| `projects`             | Featured project cards                    |
| `articles`             | Writing card                              |
| `certificates`         | Certificates card                         |
| `workExperience`       | Work experience timeline                  |
| `statistics`           | "By the numbers" stats row                |

Each `projects`, `certificates`, and `workExperience` entry has an `accent` hex color used for that item's highlight color — pick whatever fits your palette.

The favicon (`public/favicon.ico`) is the only asset you'll need to swap manually.

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
