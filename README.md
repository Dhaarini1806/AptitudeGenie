
# Aptitude Genie

Aptitude Genie is a modern web application for practicing aptitude questions, tracking progress, and visualizing results. Built with React, TypeScript, Vite, Tailwind CSS, and shadcn-ui, it features a clean UI and interactive components for an engaging user experience.

## Features

- User authentication (login/register)
- Game mode for answering aptitude questions
- Dashboard with recent results, stats overview, and streak calendar
- Profile management
- Theme toggle (light/dark)
- Responsive design for mobile and desktop
- Rich UI components (cards, tables, charts, accordions, dialogs, etc.)

## Project Structure

- `src/` - Main source code
	- `components/` - UI and feature components
		- `auth/` - Authentication forms
		- `dashboard/` - Dashboard widgets
		- `game/` - Game logic and display
		- `layout/` - Layout elements (Header, Footer, MainLayout)
		- `profile/` - Profile card
		- `shared/` - Shared components (ThemeToggle)
		- `ui/` - Reusable UI primitives (accordion, button, dialog, etc.)
	- `context/` - React context providers (Auth, Game, Theme)
	- `hooks/` - Custom React hooks
	- `lib/` - Utility functions and animations
	- `pages/` - Main pages (Index, NotFound)
- `public/` - Static assets
- `index.html` - App entry point

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation

```sh
git clone <YOUR_GIT_URL>
cd AptitudeGenie
npm install
```

### Development

```sh
npm run dev
```
The app will be available at `http://localhost:8080`.

### Supabase Integration

Aptitude Genie can use [Supabase](https://supabase.com/) as its backend for authentication, database, and real-time features.

#### Setup Steps

1. Create a project at [Supabase](https://supabase.com/).
2. Get your Supabase URL and anon key from the project settings.
3. Install the Supabase client:
	```sh
	npm install @supabase/supabase-js
	```
4. Add your Supabase credentials to a `.env` file:
	```env
	VITE_SUPABASE_URL=your-supabase-url
	VITE_SUPABASE_ANON_KEY=your-anon-key
	```
5. Initialize Supabase in your app (e.g., in `src/lib/supabaseClient.ts`):
	```ts
	import { createClient } from '@supabase/supabase-js';
	export const supabase = createClient(
	  import.meta.env.VITE_SUPABASE_URL!,
	  import.meta.env.VITE_SUPABASE_ANON_KEY!
	);
	```
6. Use Supabase APIs for authentication, data storage, and more in your React components and context.

### Build

```sh
npm run build
```

### Lint

```sh
npm run lint
```

## Technologies Used

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Recharts](https://recharts.org/)
 - [Supabase](https://supabase.com/)

## Customization

Tailwind config (`tailwind.config.ts`) includes custom colors for Aptitude Genie. UI components are organized for easy extension and reuse.

## License

This project is licensed under the MIT License.
