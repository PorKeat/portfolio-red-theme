# Alex KGM (Seng PorKeat) - Developer Portfolio

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-green?style=for-the-badge&logo=greensock&logoColor=white)

A high-performance, immersive 3D portfolio built to showcase my expertise as a **DevOps Engineer & Full-Stack Developer**. The project features a custom cyberpunk/terminal aesthetic, dynamic theme switching, and seamless hardware-accelerated animations.

## 🌟 Key Features

- **Terminal Boot Loader:** A fully custom cinematic boot sequence mimicking a secure terminal connection, complete with generated dynamic system sounds.
- **Fly-Through Parallax Engine:** A heavily customized GSAP + Lenis smooth-scrolling engine that translates vertical scroll into a deep Z-axis 3D fly-through experience.
- **Dynamic Theme Engine:** Instantly swap the entire application's color palette (including glowing neon box-shadows, SVG strokes, and background blobs) dynamically using native CSS variables and React Context.
- **Seamless Modal Transitions:** Hardware-accelerated shared layout animations (via Framer Motion) that extract components out of 3D matrices into full-screen React Portals.
- **Live GitHub Statistics:** Dynamically pulls and aggregates public repository data, calculating total stars and forks in real-time.

## 🛠️ Technology Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** 
  - [Framer Motion](https://www.framer.com/motion/) (UI micro-interactions & shared layouts)
  - [GSAP](https://gsap.com/) (ScrollTrigger & 3D matrices)
- **Smooth Scrolling:** [Lenis](https://lenis.studiofreight.com/)
- **Icons:** [Lucide React](https://lucide.dev/) & React Icons

## 🚀 Getting Started

To run this project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/PorKeat/portfolio-red-theme.git
   cd portfolio-red-theme
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Theme Configuration

The primary theme color is driven by the dynamic `var(--theme-primary)` CSS variable. You can change this using the Theme Toggle component or by manually setting a custom hex code in the UI, which writes to `localStorage` and instantly updates the DOM via a global `MutationObserver`.

## 📫 Contact

Feel free to reach out to me directly at [alexkgm2412@gmail.com](mailto:alexkgm2412@gmail.com).

---
*Built with passion, caffeine, and clean code.*
