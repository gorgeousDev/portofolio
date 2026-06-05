```
██████╗  ██████╗ ██████╗ ████████╗ ██████╗ ███████╗ ██████╗ ██╗     ██╗ ██████╗
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   ██║   ██║█████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██║   ██║██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ╚██████╔╝██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝
```

A terminal-themed portfolio built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Featuring an animated shell interface, matrix-style aesthetics, and interactive terminal simulations.

## 🖥️ Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.7 |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Font | Share Tech Mono |
| Package Manager | Bun |

## ✨ Features

- **Splash Screen** — Boot-style loading animation
- **Shell Border** — Animated 4-line matrix-green border, 20px from viewport edges
- **Terminal Simulation** — Interactive `whoami` / password / confirm / install sequence
- **Typewriter Details** — Personal info rendered character by character
- **Matrix Aesthetic** — `#00ff41` green-on-black, glitch animations, responsive at all breakpoints
- **Responsive** — Mobile-first, adapts from 320px to ultrawide

## ⌨️ Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🏗️ Build

```bash
bun run build
bun run start
```

## 📁 Structure

```
src/
├── app/              # Next.js App Router: layout, pages, global styles
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/       # React components
│   ├── AppShell.tsx
│   └── SplashScreen.tsx
└── domain/           # Business logic & constants
    ├── types.ts
    └── constants.ts
```

## 🚀 Deploy

```bash
npx vercel --prod
```

## 📬 Contact

George Salah — [GitHub](https://github.com/gorgeousDev)

---

```
root@portofolio:~# echo "EOF"
```
