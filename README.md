# Joe Munene — Portfolio

<div align="center">

**Full-Stack Developer · Cybersecurity Researcher · AI Engineer**

Founder of [Complex Developers](https://github.com/complexdevelopers). Building secure systems, full-stack products, and applied AI from Nairobi, Kenya.

[![Live Site](https://img.shields.io/badge/Live-Visit_Site-4C6EF5?style=flat-square&logo=vercel&logoColor=white)](https://my-portfolio-peach-eta-42.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-joemunene--by-24292F?style=flat-square&logo=github&logoColor=white)](https://github.com/joemunene-by)
[![Hugging Face](https://img.shields.io/badge/Hugging_Face-Ghostgim-FFB000?style=flat-square&logo=huggingface&logoColor=white)](https://huggingface.co/Ghostgim)
[![License](https://img.shields.io/badge/License-MIT-555?style=flat-square)](LICENSE)

</div>

---

## About

This is my personal portfolio: a fast, accessible single-page site that pulls live GitHub
activity and presents my work across cybersecurity, applied AI, and full-stack engineering.
It is built on the current Next.js App Router, typed end to end, and tuned for performance
and reduced-motion accessibility.

## Selected work

The projects below are the ones I am most proud of. The full set is on the live site and on
[GitHub](https://github.com/joemunene-by).

| Project | What it is |
| --- | --- |
| **[GhostLM](https://github.com/joemunene-by/GhostLM)** | An 81M-parameter cybersecurity language model trained from scratch in PyTorch (RoPE + SwiGLU + RMSNorm), with a 422M-token corpus, a tool-using agent runtime, a multi-vendor API server, an MCP server, and a statistically rigorous eval suite (Wilson CIs, McNemar tests). |
| **[ghostloop](https://github.com/joemunene-by/ghostloop)** | An agent runtime and fail-closed safety pipeline for embodied AI, `pip install ghostloop`. Stable across 14 releases with 359 passing tests, a live Hugging Face demo, a web dashboard, and a Tauri desktop app. |
| **[EZCare Native](https://github.com/joemunene-by/ezcare-web-app)** | A React Native + Expo wellness app shipped to the Google Play Store, with a Supabase backend, a tRPC data layer, and an AI coach on the Anthropic SDK. |
| **[linkdrop](https://github.com/joemunene-by/linkdrop)** | A Tauri + Rust desktop app that bridges an iPhone to Linux for photos, files, notifications, and screen mirroring, with CI-built `.deb` and `.AppImage` releases. |
| **[secure-mcp](https://github.com/joemunene-by/secure-mcp) · [ghostguard](https://github.com/joemunene-by/ghostguard)** | Security tooling for AI agents: fail-closed policy pipelines, sandboxing, and full audit trails for LLMs that run offensive tooling. |

Upstream contributions include a numerical-stability fix in
[PyTorch Ignite (#3741)](https://github.com/pytorch/ignite/pull/3741) and a guide proposed to
the OWASP Cheat Sheet Series.

## Tech stack

- **Framework:** Next.js 16 (App Router) · React 19 · TypeScript
- **Styling:** Tailwind CSS 4 · Framer Motion
- **Tooling:** ESLint · Turbopack · Vercel
- **Data:** live GitHub stats via the GitHub REST API (server-side, cached)

## Features

- Single-page site with section-aware navigation and a command palette (`Cmd/Ctrl + K`)
- Live GitHub statistics (repositories, commits, languages) fetched server-side
- Dedicated resume page with on-the-fly PDF export
- Project detail modals and a filterable project grid
- Person and WebSite JSON-LD for rich search results
- Fully keyboard navigable; honors `prefers-reduced-motion`

## Running locally

```bash
git clone https://github.com/joemunene-by/My-Portfolio.git
cd My-Portfolio
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

### Environment variables

All are optional; the site renders without them.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used by metadata and the sitemap. Defaults to the Vercel URL. |
| `GITHUB_TOKEN` | Raises the GitHub API rate limit for the live stats. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification tag. |

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Lint with ESLint. |

## Project structure

```
src/
  app/            Routes, layout, metadata, sitemap, API routes
  components/     UI sections and interaction primitives
  data/           Projects, skills, experience, and resume content
  hooks/          Data hooks (e.g. live GitHub stats)
```

Content lives in `src/data/index.ts`, so updating projects, skills, or the resume is a single
edit with no component changes.

## License

[MIT](LICENSE) © Joe Munene

---

<div align="center">

Built by **Joe Munene** · Computer Science, Moi University · Nairobi, Kenya

</div>
