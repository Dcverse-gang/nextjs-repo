# CloneOS Frontend - Next.js

A modern Next.js 16 frontend application for CloneOS, migrated from Create React App.

## Features

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **SEO optimized** with proper metadata
- **Authentication** with protected routes
- **Responsive design** with mobile-first approach

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your backend URLs

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_CLONEOS_BACKEND_URL=http://localhost:3001
```

## Project Structure

```
nextjs-repo/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── login/             # Login page
│   ├── signup/            # Sign up page
│   ├── dashboard/         # Dashboard (protected)
│   ├── waitlist/          # Waitlist page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities
│   ├── api.ts            # API client
│   ├── auth.ts           # Auth utilities
│   └── utils.ts          # Helper functions
├── hooks/                # Custom React hooks
├── public/               # Static assets
└── middleware.ts         # Route protection
```

## Pages

- `/` - Landing page with features, testimonials, FAQ
- `/login` - User login
- `/signup` - User registration
- `/dashboard` - Protected dashboard (requires auth)
- `/waitlist` - Join waitlist form

## Authentication

Authentication is handled client-side using localStorage. Protected routes check for authentication tokens and redirect to login if not authenticated.

## Logo

Replace `/public/logo.png` with your actual CloneOS logo.

## Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Tech Stack

- **Framework**: Next.js 16.1.6
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Notifications**: Sonner
- **Forms**: React Hook Form + Zod

## Migration Notes

This project was migrated from a Create React App (CRA) to Next.js. Key changes:

- Converted React Router to Next.js App Router
- Migrated all components to TypeScript
- Updated routing to use Next.js Link and navigation
- Converted environment variables from `REACT_APP_*` to `NEXT_PUBLIC_*`
- Removed CRA-specific dependencies and configurations
- Added SEO metadata and optimizations
- Implemented proper client/server component separation
