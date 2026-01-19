# Rabbit Todo Web - Architecture Overview

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: Shadcn UI
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios with Basic Auth
- **State Management**: React Context (Auth)

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout with providers
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
│
├── components/                 # Feature-based components
│   ├── auth/                  # Authentication
│   │   ├── auth-provider.tsx  # Auth context provider
│   │   ├── auth-guard.tsx     # Route protection wrapper
│   │   └── login-form.tsx     # Login UI
│   ├── board/                 # Todo board
│   │   └── todo-board.tsx     # Main board component
│   ├── groups/                # Group management
│   │   └── groups-list.tsx    # Groups display
│   └── ui/                    # Shadcn UI components
│
├── hooks/                      # Custom React hooks
│   ├── use-todos.ts           # Todo CRUD with TanStack Query
│   ├── use-groups.ts          # Group CRUD with TanStack Query
│   └── use-points.ts          # Points CRUD with TanStack Query
│
├── lib/                        # Utilities and configuration
│   ├── api-client.ts          # Axios instance with interceptors
│   ├── duration-parser.ts     # Jira-style duration utilities
│   ├── query-provider.tsx     # TanStack Query provider
│   └── utils.ts               # General utilities (cn function)
│
├── services/                   # API service layer (DI-ready)
│   ├── todo.service.ts        # Todo API operations
│   ├── group.service.ts       # Group API operations
│   └── points.service.ts      # Points API operations
│
└── types/                      # TypeScript definitions
    └── api.ts                 # API request/response types
```

## Key Design Patterns

### 1. Feature-Based Component Organization
Components are organized by feature rather than type, improving maintainability:
- `auth/` - All authentication-related components
- `board/` - Todo board functionality
- `groups/` - Group management

### 2. Service Layer Pattern
Services are implemented as classes with singleton instances, enabling:
- Easy testing with mock implementations
- Dependency injection when needed
- Clear separation between UI and API logic

### 3. Query Key Management
TanStack Query keys are structured hierarchically:
```typescript
todoKeys = {
  all: ['todos'],
  lists: () => [...todoKeys.all, 'list'],
  detail: (id) => [...todoKeys.all, 'detail', id],
  byGroup: (groupId) => [...todoKeys.all, 'group', groupId]
}
```

### 4. Type Safety
Full TypeScript coverage with interfaces matching Rust backend:
- Request types for API calls
- Response types from backend
- Proper error typing

## Data Flow

```
Component -> Hook -> Service -> API Client -> Rust Backend
    ↑                                              ↓
    └──────── TanStack Query Cache ←──────────────┘
```

1. **Component** uses custom hook (e.g., `useTodos()`)
2. **Hook** wraps TanStack Query with service call
3. **Service** uses axios client for HTTP request
4. **API Client** adds Basic Auth and handles errors
5. **Response** flows back through cache to component

## Authentication Flow

```
User Login -> Auth Provider -> localStorage -> API Client Interceptor
                  ↓
             Auth Guard -> Protected Routes
```

- Credentials stored in localStorage (client-side only)
- Auth context provides login/logout methods
- AuthGuard wrapper protects routes
- API Client interceptor adds Basic Auth header

## Jira-Style Duration Parser

Supports duration strings like:
- `2h 30m` - 2 hours 30 minutes
- `1d 4h` - 1 day 4 hours (configurable hours per day)
- `30m` - 30 minutes

Configurable `HOURS_PER_DAY` constant (default: 8)

## Configuration

### Environment Variables
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

### Query Client Settings
- **Stale Time**: 1 minute
- **GC Time**: 5 minutes
- **Retry**: 1 attempt
- **Refetch on Focus**: Disabled

## Security Considerations

✅ No credentials in environment variables
✅ Credentials stored client-side only (localStorage)
✅ Proper UTF-8 encoding with TextEncoder
✅ ARIA labels for accessibility
✅ Basic Auth over HTTPS (recommended)

## Getting Started

1. Install dependencies: `npm install`
2. Configure API endpoint in `.env.local`
3. Run development: `npm run dev`
4. Build production: `npm run build`

## Testing

- **Lint**: `npm run lint`
- **Build**: `npm run build`
- **Dev Server**: `npm run dev`
- **Production**: `npm start`
