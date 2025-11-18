# ChatGPT-Style Application

## Overview

This is a modern conversational AI interface built to emulate ChatGPT-style interactions. The application features a clean, conversation-first design with session management, message history, and support for tabular data display within chat responses. Users can create multiple chat sessions, send messages, receive AI-generated responses (currently mocked), and provide feedback on assistant responses through like/dislike actions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 18+ with TypeScript for type safety and modern component development
- Vite as the build tool and development server for fast refresh and optimized builds
- Wouter for lightweight client-side routing (replacing heavier solutions like React Router)

**UI Component System**
- shadcn/ui component library (New York style variant) using Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Design follows ChatGPT-inspired principles: conversation-first layout, clean typography (Inter font family), generous whitespace
- Responsive layout with collapsible sidebar (260px desktop, full-width mobile)

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management, caching, and automatic refetching
- No global state library needed - component state and query cache handle all state needs
- Query invalidation pattern ensures UI updates after mutations

**Key Frontend Patterns**
- Component composition with shadcn/ui base components
- Custom hooks for shared logic (use-toast, use-mobile)
- Theme provider context for light/dark mode switching with localStorage persistence
- Form handling with React Hook Form and Zod validation

### Backend Architecture

**Runtime & Framework**
- Node.js with Express.js for the REST API server
- TypeScript throughout with ES modules
- Development uses tsx for hot-reloading, production uses esbuild for bundling

**API Design**
- RESTful endpoints under `/api` prefix
- Session-based architecture: `/api/sessions` for session management
- Message operations nested under sessions: `/api/sessions/:id/messages`
- Feedback updates: `/api/messages/:id/feedback`

**Data Layer**
- In-memory storage implementation (`MemStorage`) for development/demo purposes
- Interface-based storage abstraction (`IStorage`) allows easy swapping to persistent storage
- Mock data generation for AI responses and sample tables
- UUIDs for entity identification

**Request/Response Flow**
1. User sends message → Creates new session if needed → Stores user message
2. Backend generates mock AI response with optional table data
3. Both messages returned and cached by frontend
4. Feedback updates modify message state and trigger cache invalidation

### Data Models

**Core Entities**
- `Session`: Represents a conversation thread with id, title, and creation timestamp
- `Message`: Individual chat messages with role (user/assistant), content, optional table data, feedback state
- `TableData`: Structured data with headers and rows for displaying tables in chat

**Validation**
- Zod schemas for runtime validation and type inference
- Shared schema definitions between client and server ensure type consistency
- Separate insert schemas strip out auto-generated fields (id, timestamps)

### External Dependencies

**UI & Styling**
- Radix UI primitives: Headless accessible components (dialogs, dropdowns, tooltips, etc.)
- Tailwind CSS: Utility-first CSS framework with custom configuration
- class-variance-authority & clsx: Dynamic className composition
- Lucide React: Icon library
- Google Fonts: Inter (primary) and Fira Code (monospace) fonts

**Development & Build**
- Vite with React plugin for development and production builds
- Replit-specific plugins: runtime error overlay, cartographer, dev banner (dev only)
- tsx: TypeScript execution for development server
- esbuild: Fast JavaScript bundler for production backend

**Database & ORM (Configured but not actively used)**
- Drizzle ORM with PostgreSQL dialect configuration
- Neon Database serverless driver for PostgreSQL connections
- Note: Currently using in-memory storage, but infrastructure is ready for PostgreSQL integration

**Form & Validation**
- React Hook Form: Form state management
- Zod: Schema validation and TypeScript type inference
- @hookform/resolvers: Bridges Zod with React Hook Form

**Utilities**
- date-fns: Date formatting and manipulation
- nanoid: Compact unique ID generation
- wouter: Minimal routing library (~1.2KB)

**Session Management (Available but not actively used)**
- express-session compatible infrastructure
- connect-pg-simple: PostgreSQL session store (configured for future use)

### Design System

**Color System**
- CSS custom properties with HSL values for easy theme switching
- Semantic color tokens (primary, secondary, muted, destructive, etc.)
- Separate light/dark mode definitions
- Border and background elevation system using opacity overlays

**Spacing & Layout**
- Consistent Tailwind spacing units (2, 3, 4, 6, 8)
- Fixed sidebar width with CSS custom properties
- Max-width constraints on chat messages (3xl) for optimal reading
- Sticky input area at bottom of viewport

**Typography**
- Base size: 16px for messages and inputs
- Hierarchy through font-weight (normal for AI, medium for users)
- Monospace code support with Fira Code
- 12px timestamps, 14px sidebar text, 18px headers