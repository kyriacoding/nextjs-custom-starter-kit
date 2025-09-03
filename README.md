# ChurchFlow Web – Next.js Starter Kit

Welcome to the ChurchFlow Web Starter Kit! This project provides a modern, scalable foundation for building web applications with Next.js, TypeScript, and a clean, organized folder structure.

## Features
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for rapid UI development
- **Component-based architecture** (UI, custom, admin, etc.)
- **Ready-to-use authentication actions**
- **Pre-configured ESLint and PostCSS**

## Project Structure

```
├── public/                # Static assets (images, SVGs, etc.)
├── src/
│   ├── actions/           # Server/client actions (authentication, etc.)
│   ├── app/               # Next.js app directory (pages, layouts, routes)
│   ├── components/
│   │   ├── custom/        # Custom components (admin, dashboard, etc.)
│   │   └── ui/            # Reusable UI components (button, card, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── types/             # TypeScript types and interfaces
│   └── utils/             # Utility helpers (cookie, etc.)
├── global-not-found.ts    # Global 404 handler for Next.js
├── middleware.ts          # Middleware for request handling
├── package.json           # Project metadata and scripts
├── tsconfig.json          # TypeScript configuration
├── postcss.config.mjs     # PostCSS configuration
├── eslint.config.mjs      # ESLint configuration
├── README.md              # Project documentation
```

## Getting Started

1. **Install dependencies**
   ```sh
   pnpm install
   ```
2. **Run the development server**
   ```sh
   pnpm run dev
   ```
3. **Open [http://localhost:3000](http://localhost:3000) in your browser**


## Customization
- Add your images to the `public/` folder.
- Create new pages in `src/app/`.
- Build custom UI in `src/components/ui/` and `src/components/custom/`.
- Add hooks in `src/hooks/`.
- Add server/client actions in `src/actions/`.
- Add TypeScript types in `src/types/`.
- Add utilities in `src/lib/` and `src/utils/`.

---

Happy coding!
