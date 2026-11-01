# Glass Folder Cards

`glass-folder-cards.tsx` preserves the supplied React/TypeScript component. This folder is the conventional location for reusable UI components in a shadcn project, so the reference can be imported as `@/components/ui/glass-folder-cards` after a React migration.

The current portfolio is a static HTML site previewed with Live Server. Its active adaptation is `assets/js/course-folders.js` with `assets/css/course-folders.css`, loaded only on the About page. It uses the reference's folder geometry, paper stacks, frosted glass, and opening motion, with existing certificate links and course records. Decorative backgrounds are CSS-generated. All courses remain readable without JavaScript. Each folder shows three certificate shortcuts; opening it reveals a stacked carousel containing every course. There are no editing or upload controls on this public portfolio.

`assets/js/course-carousel.js` implements the supplied `carousel-07.tsx` interaction inside each folder. It uses the same wrapped offsets, horizontal spread, rotation, depth, and scale relationships, with drag/swipe, previous/next buttons, keyboard controls, reduced motion, and RTL direction. Existing course metadata and module details remain on each card. Certificate covers in `assets/images/course-previews/` are generated from reviewed public copies with `python scripts/prepare_course_previews.py`; update the media review after checking any regenerated assets. No stock photography is used for certificate records.

The original carousel, demo, and Badge source are preserved here. For a future React migration, shadcn initialization supplies `@/lib/utils`; install the carousel's additional packages with `npm install motion class-variance-authority`. The current Live Server implementation needs none of those packages.

The full Projects page also adapts `expanding-cards.tsx` using `assets/js/projects-expanding.js` and `assets/css/projects-expanding.css`. It expands on hover, focus, or selection; uses horizontal panels on desktop and vertical panels on mobile; and keeps case studies, filters, and gallery links functional. Homepage cards and gallery pages do not load these assets. The original React source and demo are preserved here; that version additionally needs `npm install lucide-react` after shadcn setup. The active static adaptation has no external package dependencies.

No React, Tailwind, or TypeScript setup is needed for this static adaptation. To use the original TSX component in a future React app, install Node.js, create a TypeScript React project, and initialize shadcn/Tailwind there:

```sh
npm create vite@latest portfolio-react -- --template react-ts
cd portfolio-react
npm install
npm install tailwindcss @tailwindcss/vite
```

Configure the Tailwind Vite plugin, import `tailwindcss` in the app stylesheet, and configure `@/*` to resolve to `src/*` in TypeScript and Vite. Then run `npx shadcn@latest init` and copy the component into `src/components/ui/`. The original component itself imports only React and embeds its own CSS; the demo uses Tailwind utilities. Use actual course data in place of its sample files.

Setup reference: [shadcn's Vite installation guide](https://ui.shadcn.com/docs/installation/vite).
