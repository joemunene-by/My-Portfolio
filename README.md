# Joe Munene — Portfolio

<div align="center">

**Full-Stack Developer • Cybersecurity Researcher • CS Student @ Moi University**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-00ff88?style=for-the-badge&logo=vercel&logoColor=white)](https://my-portfolio-peach-eta-42.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-joemunene--by-181717?style=for-the-badge&logo=github)](https://github.com/joemunene-by)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## Overview

Professional portfolio website showcasing my work across **cybersecurity**, **full-stack development**, and **AI engineering**. Built with modern web technologies and designed with a cybersecurity-inspired dark aesthetic.

## Features

- **Responsive Design** — Optimized for all screen sizes and devices
- **Dark Cybersecurity Theme** — Professional dark UI with green accent colors
- **Interactive Animations** — Smooth scroll, fade-in effects, and hover states
- **Project Showcase** — 24+ projects organized by category (Cybersecurity, AI/ML, Web Apps, Tools)
- **Skills Section** — Comprehensive display of technical expertise
- **GitHub Integration** — Live stats from your GitHub profile
- **Performance Optimized** — Built with Next.js App Router for fast loading

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5.7 |
| **Styling** | Tailwind CSS 3.4 |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/joemunene-by/My-Portfolio.git

# Navigate to project directory
cd My-Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio locally.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
My-Portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main page composition
│   │   └── globals.css         # Global styles and animations
│   ├── components/
│   │   ├── Navbar.tsx          # Responsive navigation bar
│   │   ├── Hero.tsx            # Landing section with animated intro
│   │   ├── About.tsx           # About me, stats, and skills
│   │   ├── Projects.tsx        # Filterable project showcase
│   │   └── Contact.tsx         # Contact section with social links
│   └── data/
│       └── index.ts            # All project data, skills, and stats
├── public/                     # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Customization

### Update Personal Information

Edit `src/data/index.ts` to update:
- **Projects** — Add, remove, or modify project entries
- **Skills** — Update your technical skills and expertise
- **Stats** — Modify GitHub statistics
- **Nav Links** — Customize navigation menu items

### Update Contact Information

Edit `src/components/Contact.tsx` to update:
- Email address
- Social media links (GitHub, LinkedIn)

### Update Metadata

Edit `src/app/layout.tsx` to update:
- Page title and description
- Open Graph metadata
- Keywords

## Deployment

The portfolio is deployed on **Vercel** and automatically updates on every push to the main branch.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjoemunene-by%2FMy-Portfolio)

## License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Built with by **Joe Munene**

[Portfolio](https://my-portfolio-peach-eta-42.vercel.app) • [GitHub](https://github.com/joemunene-by)

</div>
