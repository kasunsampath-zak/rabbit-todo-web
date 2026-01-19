# rabbit-todo-web

A modern Next.js 15 task management application with Jira-style time tracking, gamification, and Rust backend integration.

## 🚀 Features

- **Authentication**: Basic Auth integration with secure credential storage
- **Kanban Board**: Three-column board (Active, In Progress, Closed) with drag-and-drop status changes
- **Gamification**: Point system (+2 for completing tasks, -2 for reopening)
- **Dashboard**: Real-time statistics for users and groups
- **Group Management**: Collaborate with teams, manage members, and track group progress
- **User Profile**: View your points, achievements, and activity statistics
- **Jira-style Duration**: Parse and format durations like "2h 30m" or "1d 4h"
- **Real-time Updates**: Automatic cache invalidation and refetching with TanStack Query
- **Error Handling**: Global error boundary and toast notifications
- **Responsive Design**: Mobile-first design that works on all devices

## 🛠️ Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** (Full type safety)
- **TailwindCSS v4** (Styling)
- **Shadcn UI** (Component library)
- **TanStack Query** (Data fetching & caching)
- **Axios** (HTTP client with Basic Auth)
- **Sonner** (Toast notifications)
- **Lucide React** (Icons)

## 📂 Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx             # Root layout with providers
│   ├── page.tsx               # Dashboard page
│   ├── todos/                 # Todos page
│   ├── groups/                # Groups page
│   └── profile/               # Profile page
│
├── components/                 # Feature-based components
│   ├── auth/                  # Authentication
│   │   ├── auth-provider.tsx  # Auth context provider
│   │   ├── auth-guard.tsx     # Route protection
│   │   └── login-form.tsx     # Login UI
│   ├── board/                 # Todo board
│   │   ├── todo-board.tsx     # Kanban board
│   │   └── todo-form.tsx      # Todo creation form
│   ├── dashboard/             # Dashboard
│   │   └── dashboard.tsx      # Stats display
│   ├── groups/                # Group management
│   │   └── groups-list.tsx    # Groups with members
│   ├── profile/               # User profile
│   │   └── user-profile.tsx   # Profile & achievements
│   ├── layout/                # Layout components
│   │   └── navigation.tsx     # Main navigation
│   ├── ui/                    # Shadcn UI components
│   └── error-boundary.tsx     # Global error handler
│
├── hooks/                      # Custom React hooks
│   ├── use-todos.ts           # Todo CRUD with TanStack Query
│   ├── use-groups.ts          # Group CRUD
│   ├── use-dashboard.ts       # Dashboard stats
│   ├── use-jira-duration.ts   # Duration utilities
│   └── use-toast.ts           # Toast notifications
│
├── lib/                        # Utilities
│   ├── api-client.ts          # Axios with Basic Auth
│   ├── duration-parser.ts     # Jira duration parser
│   ├── query-provider.tsx     # TanStack Query provider
│   └── utils.ts               # Utility functions
│
├── services/                   # API service layer
│   ├── todo.service.ts        # Todo API operations
│   ├── group.service.ts       # Group API operations
│   ├── points.service.ts      # Points API operations
│   └── dashboard.service.ts   # Dashboard API operations
│
└── types/                      # TypeScript definitions
    └── api.ts                 # API types & enums
```

## 🎯 Key Features Explained

### Authentication Flow
- Users log in with username/password
- Credentials stored in localStorage (client-side)
- API client automatically adds Basic Auth header to all requests
- AuthGuard redirects unauthenticated users to login

### Kanban Board
- **Active Column**: Tasks not yet started
- **In Progress Column**: Currently working on
- **Closed Column**: Completed tasks

Click the "Move to..." button to transition tasks between columns.

### Gamification System
- **+2 Points**: Awarded when closing a task
- **-2 Points**: Deducted when reopening a closed task
- Toast notifications provide instant feedback
- Points are displayed in the dashboard and profile

### Jira-style Duration
Supports formats like:
- `2h 30m` - 2 hours 30 minutes
- `1d 4h` - 1 day 4 hours (configurable: default 8h/day)
- `30m` - 30 minutes
- `1w 2d` - 1 week 2 days

### Dashboard Statistics
- **User Stats**: Total points, active/in-progress/closed task counts
- **Group Stats**: Per-group task counts and member counts
- **Performance**: Completion rate and task distribution

## 🚦 Getting Started

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

## 🚦 Getting Started

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

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Pages & Routes

- **/** - Dashboard with user and group statistics
- **/todos** - Kanban board for managing tasks
- **/groups** - Group management with member lists
- **/profile** - User profile with points and achievements

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

### TanStack Query Settings
- **Stale Time**: 1 minute
- **GC Time**: 5 minutes
- **Retry**: 1 attempt
- **Refetch on Focus**: Disabled

### Duration Parser
- Default hours per day: 8 (configurable in `duration-parser.ts`)

## 🏗️ Architecture Highlights

### Service Layer Pattern
All API services are designed as classes with singleton instances, making them easy to test and replace:

```typescript
// Example usage
import { todoService } from '@/services/todo.service';

const todos = await todoService.getTodos();
```

### Query Key Management
Structured query keys for consistent caching:

```typescript
todoKeys = {
  all: ['todos'],
  lists: () => [...todoKeys.all, 'list'],
  detail: (id) => [...todoKeys.all, 'detail', id],
  byGroup: (groupId) => [...todoKeys.all, 'group', groupId]
}
```

### Type Safety
Full TypeScript coverage with interfaces matching Rust backend API responses.

## 🔒 Security Considerations

✅ No credentials in environment variables  
✅ Credentials stored client-side only (localStorage)  
✅ Proper UTF-8 encoding with TextEncoder  
✅ Global error boundary for error handling  
✅ Input validation on forms  
✅ ARIA labels for accessibility  

**⚠️ Important**: Use HTTPS in production for secure Basic Auth transmission.

## 📄 API Integration

This app expects a Rust backend with the following endpoints:

### Authentication
- All requests require Basic Auth header

### Todos
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get todo by ID
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Groups
- `GET /api/groups` - Get all groups
- `GET /api/groups/:id` - Get group by ID
- `POST /api/groups` - Create group
- `PUT /api/groups/:id` - Update group
- `DELETE /api/groups/:id` - Delete group

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/user-stats` - Get user statistics
- `GET /api/dashboard/group-stats` - Get group statistics

All responses follow the `ApiResponse<T>` format:
```typescript
{
  data: T,
  message?: string
}
```

## 🎯 Future Enhancements

- [ ] Drag-and-drop for Kanban board
- [ ] Real-time updates with WebSockets
- [ ] Task comments and attachments
- [ ] Advanced filtering and search
- [ ] Task dependencies
- [ ] Calendar view
- [ ] Export to CSV/PDF
- [ ] Dark mode toggle
- [ ] Email notifications
- [ ] Mobile app (React Native)

## 📦 Dependencies

### Production
- `next` - React framework
- `react` & `react-dom` - UI library
- `@tanstack/react-query` - Server state management
- `axios` - HTTP client
- `sonner` - Toast notifications
- `lucide-react` - Icons
- `tailwindcss` - Styling
- `class-variance-authority` - Component variants
- `clsx` & `tailwind-merge` - Class utilities

### Development
- `typescript` - Type checking
- `eslint` - Code linting
- `@types/*` - TypeScript definitions

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Run `npm run lint` and `npm run build`
5. Submit a pull request

## 📜 License

Licensed under the MIT License. See LICENSE file for details.

## 👨‍💻 Author

**Kasun Sampath**

- GitHub: [@kasunsampath-zak](https://github.com/kasunsampath-zak)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Shadcn UI](https://ui.shadcn.com/) - Component library
- [TanStack Query](https://tanstack.com/query) - Data fetching
- [Lucide](https://lucide.dev/) - Icon library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS