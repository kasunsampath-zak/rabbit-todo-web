# rabbit-todo-web

A modern Next.js 15 task management application with Jira-style time tracking and Rust backend integration.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS** for styling
- **Shadcn UI** components
- **TanStack Query** for data fetching
- **Axios** for HTTP client with Basic Auth

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
├── components/            # React components (feature-based)
│   ├── auth/             # Authentication components
│   │   ├── auth-provider.tsx
│   │   ├── auth-guard.tsx
│   │   └── login-form.tsx
│   ├── board/            # Todo board components
│   │   └── todo-board.tsx
│   ├── groups/           # Group management components
│   │   └── groups-list.tsx
│   └── ui/               # Shadcn UI components (when added)
├── hooks/                # Custom React hooks
│   ├── use-todos.ts      # TanStack Query hooks for Todos
│   ├── use-groups.ts     # TanStack Query hooks for Groups
│   └── use-points.ts     # TanStack Query hooks for Points
├── lib/                  # Utility functions
│   ├── api-client.ts     # Axios client with Basic Auth interceptor
│   ├── duration-parser.ts # Jira duration parser (2h 30m, 1d 4h, etc.)
│   ├── query-provider.tsx # TanStack Query client provider
│   └── utils.ts          # General utilities (cn function for Shadcn)
├── services/             # API service layer (DI-ready)
│   ├── todo.service.ts   # Todo CRUD operations
│   ├── group.service.ts  # Group CRUD operations
│   └── points.service.ts # Points CRUD operations
└── types/                # TypeScript type definitions
    └── api.ts            # Rust API response interfaces

```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Rust backend API running (default: http://localhost:8080)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kasunsampath-zak/rabbit-todo-web.git
cd rabbit-todo-web
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Configure your API endpoint in `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### Authentication
- Basic Auth integration with Rust backend
- Login form with credential storage
- Protected routes with AuthGuard

### Data Management
- **Todos**: Create, read, update, delete tasks
- **Groups**: Organize todos into groups
- **Points**: Track story points and time estimates

### TanStack Query Integration
- Optimized caching and refetching
- Automatic invalidation on mutations
- Query key management

### Jira-style Duration Parser
Parse and format durations like:
- `2h 30m` - 2 hours 30 minutes
- `1d 4h` - 1 day 4 hours
- `30m` - 30 minutes

## Development

### Building
```bash
npm run build
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

## Architecture Highlights

### Dependency Injection Ready Services
All API services are designed as classes with singleton instances, making them easy to replace with DI containers or mock implementations for testing.

### Feature-based Component Organization
Components are organized by feature (auth, groups, board) rather than by type, improving maintainability and scalability.

### Type Safety
Full TypeScript coverage with interfaces matching Rust backend API responses.

### Query Management
Structured query keys and hooks for consistent data fetching and caching patterns.

## License

Licensed under the MIT License. See LICENSE file for details.