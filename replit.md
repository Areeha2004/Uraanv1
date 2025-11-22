# Uraan — AI-Powered Business Platform for Pakistani Women Entrepreneurs

## Overview

Uraan (meaning "flight" in Urdu) is a Next.js-based web application designed to empower Pakistani women to launch and grow their own businesses. The platform uses AI to provide personalized business recommendations, step-by-step roadmaps, and a collaborative community marketplace. Users take an AI-powered quiz that analyzes their skills, interests, time availability, and constraints to recommend suitable business ideas with detailed implementation plans. The platform also includes a collaboration marketplace where entrepreneurs can hire service providers and track project progress.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**: Built on Next.js 15 with the App Router architecture, using React 19 for component rendering. TypeScript provides type safety throughout the codebase with strict mode enabled.

**Styling**: Tailwind CSS v3 with custom design tokens implementing a cohesive brand identity. Custom color palette includes primary (#8a1f4a), secondary (#cfa3b3), accent shades, and glass-morphism effects. The design system supports dark mode through a class-based toggle.

**State Management**: Client-side state is managed through React Context API with three primary providers:
- SessionProvider (NextAuth) for authentication state
- ThemeProvider for dark/light mode toggling
- AuthProvider for legacy user state (parallel to NextAuth)

**Component Structure**: Features a modular component architecture with domain-specific folders (home, quiz, results, collaboration, explore). Common UI patterns are extracted into reusable components with consistent prop interfaces.

**Client-Side Rendering**: Most interactive pages use "use client" directive for client-side interactivity, particularly for forms, modals, and real-time updates. Server components are used selectively for static content.

### Backend Architecture

**API Routes**: RESTful API design using Next.js App Router API routes located in `src/app/api/`. Key endpoints include:
- `/api/auth/*` - Authentication flows
- `/api/collaborations/*` - Collaboration CRUD and status updates
- `/api/collaborators/*` - Service provider profiles
- `/api/roadmaps/*` - Business roadmap management
- `/api/generate` - AI business idea generation
- `/api/user/*` - User-specific data (progress, roadmaps)

**Authentication Strategy**: NextAuth v4 with multiple providers:
- Credentials provider for email/password authentication with bcrypt hashing
- Google OAuth provider
- Facebook OAuth provider
- JWT session strategy with 24-hour expiration
- Custom session callbacks extend user object with `id` and `provider` fields

**Business Logic**: Server-side logic is concentrated in API routes with proper error handling, authentication checks via `getServerSession()`, and Prisma queries. The AI generation endpoint uses OpenAI's GPT-4.1-mini with function calling to generate structured business recommendations.

**File Upload**: Cloudinary integration for avatar/image uploads via stream-based upload API in `/api/upload-avatar/route.ts`.

### Database Architecture

**ORM**: Prisma Client is used for type-safe database access with a centralized singleton instance in `src/lib/prisma.ts` to prevent connection pooling issues in development.

**Schema Design** (inferred from usage patterns):
- **User**: Core user model with email, password (nullable for OAuth), name, bio, location, image
- **Account/Session**: NextAuth adapter tables for OAuth integration
- **Roadmap**: Business idea roadmaps with title, description, tags, and related steps
- **RoadmapStep**: Individual steps within roadmaps including stepNumber, title, description, duration, and resources (JSON field)
- **UserRoadmap**: Join table tracking which roadmaps users have started with timestamp
- **UserProgress**: Tracks completion status of individual roadmap steps per user
- **CollaboratorProfile**: Extended profile for service providers including skills (array), portfolio (JSON), pricing, rating, location
- **Collaboration**: Project requests between users with status workflow (pending → accepted → in_progress → completed/declined/cancelled), budget, deadline, and contact method

**Relationships**:
- User ↔ Roadmap (many-to-many via UserRoadmap)
- User ↔ RoadmapStep (many-to-many via UserProgress)
- User ↔ CollaboratorProfile (one-to-one)
- User ↔ Collaboration (one-to-many as requester, one-to-many as receiver)

**Unique Constraints**: Compound unique index on `userId_stepId` for UserProgress to prevent duplicate progress entries.

### External Dependencies

**AI Service**: OpenAI API (GPT-4.1-mini) for generating personalized business recommendations. The system uses function calling with a structured schema to return business ideas with roadmaps, timelines, investment requirements, and platform recommendations. The AI prompt is designed specifically for the Pakistani market context.

**Image Hosting**: Cloudinary for user-generated image storage (avatars, portfolio items). Configuration uses environment variables for cloud_name, api_key, and api_secret. Images are uploaded via Node.js streams with folder-based organization.

**Authentication Providers**:
- Google OAuth (requires GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
- Facebook OAuth (requires FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET)
- NextAuth session management with PrismaAdapter

**UI Libraries**: Lucide React for consistent iconography throughout the application (200+ icon usage). No heavy UI framework; custom components built on Tailwind.

**Form Handling**: Formidable library for multipart form data parsing (file uploads). No form validation library detected; validation is implemented manually.

**Environment Variables Required**:
- `DATABASE_URL` - Postgres connection string
- `NEXTAUTH_SECRET` - Session encryption key
- `NEXTAUTH_URL` - Application base URL
- `OPENAI_API_KEY` - OpenAI API access
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` - Image storage
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` - Google OAuth
- `FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET` - Facebook OAuth

**Deployment Configuration**: Configured for Vercel deployment with custom port (5000) and host binding (0.0.0.0) for containerized environments. Next.js image optimization configured for lh3.googleusercontent.com, res.cloudinary.com, and via.placeholder.com domains.