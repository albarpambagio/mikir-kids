Perfect! Let me create a **complete, production-ready setup** optimized for Cloudflare Pages.

---

## **Final Tech Stack**

```
Frontend:     React 18 + Vite + TypeScript
UI Library:   shadcn/ui + Tailwind CSS + Lucide Icons
State:        TanStack Query (React Query) + Zustand
Routing:      React Router v6
Backend:      FastAPI + Python 3.11+
Database:     Supabase (PostgreSQL only, no Auth)
FSRS:         fsrs (Python package)
Auth:         User ID system (8-digit numeric IDs, no passwords)
Deployment:
  Frontend:   Cloudflare Pages (unlimited bandwidth)
  Backend:    Railway (free tier)
  Database:   Supabase (managed PostgreSQL)
```

---

## **Complete Project Setup**

### **Step 1: Initialize Frontend**

```bash
# Create project
npm create vite@latest math-practice-frontend -- --template react-ts
cd math-practice-frontend

# Install core dependencies
npm install

# Install UI & styling
npm install tailwindcss postcss autoprefixer
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge
npm install lucide-react

# Initialize Tailwind
npx tailwindcss init -p

# Install routing & state management
npm install react-router-dom
npm install @tanstack/react-query
npm install zustand

# Install HTTP client & utilities
npm install axios
npm install date-fns

# Install dev dependencies
npm install -D @types/node

# Install shadcn CLI (optional, for adding components)
npm install -D shadcn-ui

# Add shadcn/ui components (run these after initial setup)
# npx shadcn-ui@latest add select
# npx shadcn-ui@latest add alert
```

---

### **Step 2: Project Structure**

```
math-practice-frontend/
├── public/
│   ├── _redirects              # Cloudflare SPA routing
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── input.tsx
│   │   │   ├── separator.tsx
│   │   │   └── select.tsx      # For UserIdDisplay page
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   │
│   │   ├── TopicCard.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── SessionProgress.tsx
│   │   ├── SessionSummary.tsx
│   │   └── LoadingSpinner.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useSession.ts
│   │   ├── useTopics.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── lib/
│   │   ├── api.ts              # Axios instance + API methods
│   │   ├── utils.ts            # cn() + helpers
│   │   └── constants.ts        # App constants
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Session.tsx
│   │   ├── Summary.tsx
│   │   ├── UserIdEntry.tsx    # Enter User ID to access account
│   │   ├── UserIdDisplay.tsx   # Show new User ID after creation
│   │   └── NotFound.tsx
│   │
│   ├── stores/
│   │   ├── authStore.ts        # Zustand auth state
│   │   └── sessionStore.ts     # Zustand session state
│   │
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env.example
├── .env.local                   # Gitignored
├── .gitignore
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── postcss.config.js
├── package.json
├── README.md
└── wrangler.toml                # Cloudflare config (optional)
```

---

## **Configuration Files**

### **`vite.config.ts`**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-slot', 'lucide-react'],
          'query-vendor': ['@tanstack/react-query', 'axios'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4173,
  },
})
```

---

### **`tailwind.config.js`**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
```

---

### **`tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Paths */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

### **`tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

---

### **`postcss.config.js`**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

### **`package.json`**

```json
{
  "name": "math-practice-frontend",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.0.2",
    "@tanstack/react-query": "^5.17.9",
    "axios": "^1.6.5",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "date-fns": "^3.0.6",
    "lucide-react": "^0.307.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.1",
    "tailwind-merge": "^2.2.0",
    "zustand": "^4.4.7"
  },
  "devDependencies": {
    "@types/node": "^20.10.6",
    "@types/react": "^18.2.46",
    "@types/react-dom": "^18.2.18",
    "@typescript-eslint/eslint-plugin": "^6.17.0",
    "@typescript-eslint/parser": "^6.17.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.56.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.33",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.3",
    "vite": "^5.0.10"
  }
}
```

---

### **`.env.example`**

```bash
# Backend API
VITE_API_URL=https://your-backend.railway.app

# App Configuration
VITE_APP_NAME=Math Practice
VITE_DEFAULT_SESSION_SIZE=15

# Environment
VITE_ENV=development
```

---

### **`.gitignore`**

```gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.production
.env.*.local

# OS
Thumbs.db
```

---

### **`public/_redirects`** (CRITICAL for Cloudflare!)

```
/*    /index.html   200
```

This enables client-side routing in React Router.

---

### **`wrangler.toml`** (Optional - for Wrangler CLI)

```toml
name = "math-practice"
compatibility_date = "2024-01-01"
pages_build_output_dir = "dist"

[build]
command = "npm run build"

[env.production]
vars = { ENVIRONMENT = "production" }

[env.preview]
vars = { ENVIRONMENT = "preview" }
```

---

## **Core Application Files**

### **`src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

---

### **`src/lib/userId.ts`**

```typescript
// User ID management utilities
const USER_ID_KEY = 'math_practice_user_id'

export const userIdStorage = {
  get: (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(USER_ID_KEY)
  },

  set: (userId: string): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(USER_ID_KEY, userId)
  },

  remove: (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(USER_ID_KEY)
  },

  exists: (): boolean => {
    return userIdStorage.get() !== null
  },
}

export function formatUserId(userId: string): string {
  // Format: 12345678 -> "12 345 678" for better readability
  return userId.replace(/(\d{2})(\d{3})(\d{3})/, '$1 $2 $3')
}

export function validateUserId(userId: string): boolean {
  // Must be exactly 8 digits
  return /^\d{8}$/.test(userId)
}
```

---

### **`src/lib/api.ts`**

```typescript
import axios, { AxiosError, AxiosInstance } from 'axios'
import { userIdStorage } from './userId'

const API_URL = import.meta.env.VITE_API_URL

if (!API_URL) {
  console.warn('API_URL not configured. Using mock data mode.')
}

// Create axios instance
export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// Request interceptor - add user_id to requests
api.interceptors.request.use(
  (config) => {
    const userId = userIdStorage.get()
    if (userId && config.data) {
      // Add user_id to request body if it's a POST/PUT/PATCH
      config.data = { ...config.data, user_id: userId }
    } else if (userId && config.params) {
      // Add user_id to query params for GET requests
      config.params = { ...config.params, user_id: userId }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401 || error.response?.status === 404) {
      // User ID invalid or user not found - clear storage and redirect
      userIdStorage.remove()
      window.location.href = '/user-id-entry'
    }

    return Promise.reject(error)
  }
)

// API methods
export const userAPI = {
  create: async (gradeLevel: 'SMP' | 'SMA', classLevel: number) => {
    const { data } = await api.post('/api/users', {
      grade_level: gradeLevel,
      class_level: classLevel,
    })
    return data
  },

  getById: async (userId: string) => {
    const { data } = await api.get(`/api/users/${userId}`)
    return data
  },

  validate: async (userId: string) => {
    const { data } = await api.get(`/api/users/${userId}/validate`)
    return data
  },
}

export const sessionAPI = {
  create: async (topicId: string, sessionSize: number = 15) => {
    const { data } = await api.post('/api/sessions', { 
      topic_id: topicId, 
      session_size: sessionSize 
    })
    return data
  },

  getById: async (sessionId: string) => {
    const { data } = await api.get(`/api/sessions/${sessionId}`)
    return data
  },

  submitAnswer: async (sessionId: string, questionId: string, answer: string) => {
    const { data } = await api.post(`/api/sessions/${sessionId}/answer`, {
      question_id: questionId,
      answer,
    })
    return data
  },

  complete: async (sessionId: string) => {
    const { data } = await api.post(`/api/sessions/${sessionId}/complete`)
    return data
  },

  getSummary: async (sessionId: string) => {
    const { data } = await api.get(`/api/sessions/${sessionId}/summary`)
    return data
  },

  getHistory: async (limit: number = 10) => {
    const { data } = await api.get('/api/sessions/history', {
      params: { limit },
    })
    return data
  },
}

export const topicsAPI = {
  getAll: async (gradeLevel?: string) => {
    const { data } = await api.get('/api/topics', {
      params: { grade_level: gradeLevel },
    })
    return data
  },

  getById: async (topicId: string) => {
    const { data } = await api.get(`/api/topics/${topicId}`)
    return data
  },
}
```

---

### **`src/lib/utils.ts`**

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)}, ${formatTime(date)}`
}

export function calculatePercentage(correct: number, total: number): number {
  if (total === 0) return 0
  return Math.round((correct / total) * 100)
}

export function getGradeText(gradeLevel: 'SMP' | 'SMA', classLevel: number): string {
  return `${gradeLevel} Kelas ${classLevel}`
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
```

---

### **`src/lib/constants.ts`**

```typescript
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Math Practice'
export const DEFAULT_SESSION_SIZE = Number(import.meta.env.VITE_DEFAULT_SESSION_SIZE) || 15

export const GRADE_LEVELS = ['SMP', 'SMA'] as const
export const CLASS_LEVELS = {
  SMP: [7, 8, 9],
  SMA: [10, 11, 12],
} as const

export const ROUTES = {
  HOME: '/',
  USER_ID_ENTRY: '/user-id-entry',
  USER_ID_DISPLAY: '/user-id-display',
  DASHBOARD: '/dashboard',
  SESSION: (id: string) => `/session/${id}`,
  SUMMARY: (id: string) => `/session/${id}/summary`,
} as const

export const QUERY_KEYS = {
  TOPICS: 'topics',
  SESSION: 'session',
  SESSION_SUMMARY: 'session-summary',
  USER_PROFILE: 'user-profile',
  SESSION_HISTORY: 'session-history',
} as const
```

---

### **`src/types/index.ts`**

```typescript
export interface User {
  id: string  // 8-digit numeric ID (e.g., "12345678")
  grade_level: 'SMP' | 'SMA'
  class_level: number
  created_at: string
}

export interface Topic {
  id: string
  name: string
  short_code: string
  grade_level: 'SMP' | 'SMA'
  class_levels: number[]
}

export interface Question {
  id: string
  sequence: number
  type: 'mcq' | 'numeric'
  prompt_text: string
  prompt_image_url?: string
  options?: string[]
}

export interface Session {
  session_id: string
  topic: Topic
  questions: Question[]
  status: 'in_progress' | 'completed' | 'abandoned'
  started_at: string
}

export interface SessionAnswer {
  question_id: string
  user_answer: string
  is_correct: boolean
  answered_at: string
}

export interface SessionSummary {
  session_id: string
  topic: Topic
  stats: {
    total: number
    correct: number
    incorrect: number
    percentage: number
  }
  weak_questions: Array<{
    id: string
    sequence: number
    prompt_text: string
    prompt_image_url?: string
    user_answer: string
    correct_answer: string
    type: 'mcq' | 'numeric'
  }>
  all_questions: Array<{
    id: string
    sequence: number
    is_correct: boolean
    user_answer: string
    correct_answer: string
  }>
  completed_at: string
}

export interface SessionHistoryItem {
  session_id: string
  topic_name: string
  score: number
  total: number
  percentage: number
  completed_at: string
}

export interface ApiError {
  message: string
  code?: string
  details?: any
}
```

---

### **`src/stores/authStore.ts`**

```typescript
import { create } from 'zustand'
import { User } from '@/types'
import { userIdStorage } from '@/lib/userId'
import { userAPI } from '@/lib/api'

interface AuthState {
  user: User | null
  userId: string | null
  loading: boolean
  initialized: boolean
  setUser: (user: User | null) => void
  setUserId: (userId: string | null) => void
  setLoading: (loading: boolean) => void
  initialize: () => Promise<void>
  loadUser: (userId: string) => Promise<boolean>
  signOut: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userId: null,
  loading: true,
  initialized: false,

  setUser: (user) => set({ user }),
  setUserId: (userId) => {
    set({ userId })
    if (userId) {
      userIdStorage.set(userId)
    } else {
      userIdStorage.remove()
    }
  },
  setLoading: (loading) => set({ loading }),

  initialize: async () => {
    try {
      const savedUserId = userIdStorage.get()
      if (savedUserId) {
        // Try to load user profile
        const user = await userAPI.getById(savedUserId)
        set({ 
          user,
          userId: savedUserId,
          loading: false,
          initialized: true,
        })
      } else {
        set({ 
          user: null,
          userId: null,
          loading: false,
          initialized: true,
        })
      }
    } catch (error) {
      console.error('Auth initialization error:', error)
      // Clear invalid user ID
      userIdStorage.remove()
      set({ 
        user: null,
        userId: null,
        loading: false,
        initialized: true,
      })
    }
  },

  loadUser: async (userId: string) => {
    try {
      set({ loading: true })
      const user = await userAPI.getById(userId)
      userIdStorage.set(userId)
      set({ 
        user,
        userId,
        loading: false,
      })
      return true
    } catch (error) {
      console.error('Load user error:', error)
      set({ 
        user: null,
        userId: null,
        loading: false,
      })
      return false
    }
  },

  signOut: () => {
    userIdStorage.remove()
    set({ 
      user: null,
      userId: null,
    })
  },
}))
```

---

### **`src/stores/sessionStore.ts`**

```typescript
import { create } from 'zustand'
import { Question } from '@/types'

interface SessionState {
  sessionId: string | null
  questions: Question[]
  currentIndex: number
  answers: Record<string, string>

  setSession: (sessionId: string, questions: Question[]) => void
  nextQuestion: () => void
  previousQuestion: () => void
  setAnswer: (questionId: string, answer: string) => void
  reset: () => void
}

export const useSessionStore = create<SessionState>((set) => ({
  sessionId: null,
  questions: [],
  currentIndex: 0,
  answers: {},

  setSession: (sessionId, questions) => set({ 
    sessionId, 
    questions, 
    currentIndex: 0,
    answers: {},
  }),

  nextQuestion: () => set((state) => ({
    currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1),
  })),

  previousQuestion: () => set((state) => ({
    currentIndex: Math.max(state.currentIndex - 1, 0),
  })),

  setAnswer: (questionId, answer) => set((state) => ({
    answers: { ...state.answers, [questionId]: answer },
  })),

  reset: () => set({
    sessionId: null,
    questions: [],
    currentIndex: 0,
    answers: {},
  }),
}))
```

---

### **`src/main.tsx`**

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
```

---

### **`src/App.tsx`**

```typescript
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

// Pages
import { Dashboard } from '@/pages/Dashboard'
import { Session } from '@/pages/Session'
import { Summary } from '@/pages/Summary'
import { UserIdEntry } from '@/pages/UserIdEntry'
import { UserIdDisplay } from '@/pages/UserIdDisplay'
import { NotFound } from '@/pages/NotFound'

// Components
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import { Layout } from '@/components/layout/Layout'
import { LoadingSpinner } from '@/components/LoadingSpinner'

function App() {
  const { loading, initialized, initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/user-id-entry" element={<UserIdEntry />} />
        <Route path="/user-id-display" element={<UserIdDisplay />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/
```

```typescript
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/session/:id" element={<Session />} />
            <Route path="/session/:id/summary" element={<Summary />} />
          </Route>
        </Route>

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

---

### **`src/pages/UserIdEntry.tsx`**

```typescript
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuthStore } from '@/stores/authStore'
import { validateUserId } from '@/lib/userId'
import { AlertCircle, Loader2 } from 'lucide-react'

export function UserIdEntry() {
  const [userId, setUserId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loadUser } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateUserId(userId)) {
      setError('User ID harus berupa 8 digit angka')
      return
    }

    setLoading(true)
    const success = await loadUser(userId)
    setLoading(false)

    if (success) {
      navigate('/dashboard')
    } else {
      setError('User ID tidak ditemukan. Pastikan Anda memasukkan ID yang benar.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Masukkan User ID</CardTitle>
          <CardDescription>
            Masukkan User ID Anda untuk melanjutkan latihan
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label htmlFor="userId" className="text-sm font-medium">
                User ID
              </label>
              <Input
                id="userId"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="12345678"
                value={userId}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 8)
                  setUserId(value)
                  setError('')
                }}
                disabled={loading}
                className="text-center text-lg font-mono tracking-wider"
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                Masukkan 8 digit User ID Anda
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!userId || userId.length !== 8 || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Memuat...
                </>
              ) : (
                'Masuk'
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/user-id-display')}
              className="w-full"
            >
              Belum punya User ID? Buat baru
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
```

---

### **`src/pages/UserIdDisplay.tsx`**

```typescript
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuthStore } from '@/stores/authStore'
import { userAPI } from '@/lib/api'
import { formatUserId } from '@/lib/userId'
import { CheckCircle2, Copy, Loader2, AlertCircle } from 'lucide-react'
import { CLASS_LEVELS, GRADE_LEVELS } from '@/lib/constants'

export function UserIdDisplay() {
  const [gradeLevel, setGradeLevel] = useState<'SMP' | 'SMA'>('SMP')
  const [classLevel, setClassLevel] = useState<number>(7)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const { setUserId: setAuthUserId, setUser } = useAuthStore()
  const navigate = useNavigate()

  const handleCreate = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await userAPI.create(gradeLevel, classLevel)
      setUserId(response.user_id)
      setAuthUserId(response.user_id)
      setUser(response.user)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal membuat User ID. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!userId) return
    try {
      await navigator.clipboard.writeText(userId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleContinue = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {userId ? 'User ID Anda' : 'Buat User ID Baru'}
          </CardTitle>
          <CardDescription>
            {userId 
              ? 'Simpan User ID ini dengan baik! Anda akan membutuhkannya untuk mengakses progress Anda.'
              : 'Pilih tingkat pendidikan Anda untuk membuat User ID baru'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {userId ? (
            <div className="space-y-4">
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  User ID berhasil dibuat! Pastikan Anda menyimpannya dengan baik.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <label className="text-sm font-medium">User ID Anda</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-4 bg-muted rounded-lg text-center">
                    <span className="text-2xl font-mono font-bold tracking-wider">
                      {formatUserId(userId)}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleCopy}
                    className="h-12 w-12"
                  >
                    {copied ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  {copied ? 'User ID disalin!' : 'Klik ikon untuk menyalin'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tingkat Pendidikan</label>
                <Select
                  value={gradeLevel}
                  onValueChange={(value) => {
                    setGradeLevel(value as 'SMP' | 'SMA')
                    setClassLevel(CLASS_LEVELS[value as 'SMP' | 'SMA'][0])
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADE_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Kelas</label>
                <Select
                  value={classLevel.toString()}
                  onValueChange={(value) => setClassLevel(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CLASS_LEVELS[gradeLevel].map((level) => (
                      <SelectItem key={level} value={level.toString()}>
                        Kelas {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {userId ? (
            <Button onClick={handleContinue} className="w-full">
              Lanjutkan ke Dashboard
            </Button>
          ) : (
            <Button 
              onClick={handleCreate} 
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Membuat User ID...
                </>
              ) : (
                'Buat User ID'
              )}
            </Button>
          )}
          {userId && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/user-id-entry')}
              className="w-full"
            >
              Masuk dengan User ID lain
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
```

---

## **Components**

### **`src/components/layout/Layout.tsx`**

```typescript
import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
```

---

### **`src/components/layout/Header.tsx`**

```typescript
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { BookOpen, LogOut } from 'lucide-react'
import { APP_NAME } from '@/lib/constants'
import { formatUserId } from '@/lib/userId'

export function Header() {
  const { userId, signOut } = useAuthStore()

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <BookOpen className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold">{APP_NAME}</span>
        </Link>

        {userId && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline font-mono">
              ID: {formatUserId(userId)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
```

---

### **`src/components/layout/ProtectedRoute.tsx`**

```typescript
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { LoadingSpinner } from '@/components/LoadingSpinner'

export function ProtectedRoute() {
  const { userId, loading } = useAuthStore()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!userId) {
    return <Navigate to="/user-id-entry" replace />
  }

  return <Outlet />
}
```

---

### **`src/components/LoadingSpinner.tsx`**

```typescript
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <Loader2 
      className={cn('animate-spin text-primary', sizeClasses[size], className)} 
    />
  )
}
```

---

### **`src/components/TopicCard.tsx`**

```typescript
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, ChevronRight } from 'lucide-react'
import { Topic } from '@/types'

interface TopicCardProps {
  topic: Topic
  onStartSession: (topicId: string) => void
  loading?: boolean
}

export function TopicCard({ topic, onStartSession, loading }: TopicCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2.5 bg-primary/10 rounded-lg">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg leading-tight mb-1">
                {topic.name}
              </CardTitle>
              <CardDescription className="text-sm">
                {topic.grade_level} - Kelas {topic.class_levels.join(', ')}
              </CardDescription>
            </div>
          </div>

          <Button 
            onClick={() => onStartSession(topic.id)}
            disabled={loading}
            className="flex-shrink-0"
            size="sm"
          >
            Latihan
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}
```

---

### **`src/components/QuestionCard.tsx`**

```typescript
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Question } from '@/types'
import { cn } from '@/lib/utils'

interface QuestionCardProps {
  question: Question
  onSubmit: (answer: string) => void
  currentIndex: number
  totalQuestions: number
  disabled?: boolean
}

export function QuestionCard({ 
  question, 
  onSubmit, 
  currentIndex, 
  totalQuestions,
  disabled = false,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')

  const handleSubmit = () => {
    if (selectedAnswer && !disabled) {
      onSubmit(selectedAnswer)
      setSelectedAnswer('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedAnswer && !disabled) {
      handleSubmit()
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Soal {currentIndex + 1} dari {totalQuestions}</span>
          <span className="font-medium">{question.type === 'mcq' ? 'Pilihan Ganda' : 'Isian'}</span>
        </div>

        <CardTitle className="text-xl leading-relaxed whitespace-pre-wrap">
          {question.prompt_text}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {question.prompt_image_url && (
          <div className="flex justify-center">
            <img 
              src={question.prompt_image_url} 
              alt="Soal" 
              className="max-w-full max-h-96 rounded-lg border"
            />
          </div>
        )}

        {question.type === 'mcq' && question.options ? (
          <div className="space-y-2">
            {question.options.map((option, idx) => {
              const optionKey = String.fromCharCode(65 + idx) // A, B, C, D, E
              const isSelected = selectedAnswer === optionKey

              return (
                <Button
                  key={optionKey}
                  variant={isSelected ? 'default' : 'outline'}
                  className={cn(
                    'w-full justify-start text-left h-auto py-4 px-4',
                    'hover:bg-accent hover:text-accent-foreground',
                    isSelected && 'ring-2 ring-primary'
                  )}
                  onClick={() => setSelectedAnswer(optionKey)}
                  disabled={disabled}
                >
                  <span className="font-semibold mr-3 text-base">{optionKey}.</span>
                  <span className="text-base">{option}</span>
                </Button>
              )
            })}
          </div>
        ) : (
          <Input
            type="number"
            step="0.01"
            placeholder="Masukkan jawaban..."
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            className="text-lg py-6"
            autoFocus
          />
        )}
      </CardContent>

      <CardFooter>
        <Button 
          onClick={handleSubmit}
          disabled={!selectedAnswer || disabled}
          className="w-full"
          size="lg"
        >
          {disabled ? 'Menyimpan...' : 'Submit Jawaban'}
        </Button>
      </CardFooter>
    </Card>
  )
}
```

---

### **`src/components/SessionProgress.tsx`**

```typescript
import { Progress } from '@/components/ui/progress'

interface SessionProgressProps {
  current: number
  total: number
  className?: string
}

export function SessionProgress({ current, total, className }: SessionProgressProps) {
  const percentage = (current / total) * 100

  return (
    <div className={className}>
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
        <span>Progress</span>
        <span className="font-medium">{current} / {total}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}
```

---

## **Hooks**

### **`src/hooks/useAuth.ts`**

```typescript
import { useAuthStore } from '@/stores/authStore'

export function useAuth() {
  const { user, userId, loading } = useAuthStore()

  return {
    user,
    userId,
    loading,
    isAuthenticated: !!userId,
  }
}
```

---

### **`src/hooks/useTopics.ts`**

```typescript
import { useQuery } from '@tanstack/react-query'
import { topicsAPI } from '@/lib/api'
import { QUERY_KEYS } from '@/lib/constants'
import { Topic } from '@/types'

export function useTopics(gradeLevel?: string) {
  return useQuery<Topic[]>({
    queryKey: [QUERY_KEYS.TOPICS, gradeLevel],
    queryFn: () => topicsAPI.getAll(gradeLevel),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}
```

---

### **`src/hooks/useSession.ts`**

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { sessionAPI } from '@/lib/api'
import { QUERY_KEYS } from '@/lib/constants'
import { useSessionStore } from '@/stores/sessionStore'
import { Session, SessionSummary } from '@/types'

export function useSession(sessionId?: string) {
  const queryClient = useQueryClient()
  const { setSession } = useSessionStore()

  const sessionQuery = useQuery<Session>({
    queryKey: [QUERY_KEYS.SESSION, sessionId],
    queryFn: () => sessionAPI.getById(sessionId!),
    enabled: !!sessionId,
    onSuccess: (data) => {
      setSession(data.session_id, data.questions)
    },
  })

  const createMutation = useMutation({
    mutationFn: (topicId: string) => sessionAPI.create(topicId),
    onSuccess: (data) => {
      setSession(data.session_id, data.questions)
      queryClient.setQueryData([QUERY_KEYS.SESSION, data.session_id], data)
    },
  })

  const submitAnswerMutation = useMutation({
    mutationFn: ({ 
      sessionId, 
      questionId, 
      answer 
    }: { 
      sessionId: string
      questionId: string
      answer: string 
    }) => sessionAPI.submitAnswer(sessionId, questionId, answer),
  })

  const completeMutation = useMutation({
    mutationFn: (sessionId: string) => sessionAPI.complete(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.SESSION_HISTORY])
    },
  })

  return {
    session: sessionQuery.data,
    loading: sessionQuery.isLoading,
    error: sessionQuery.error,
    createSession: createMutation.mutateAsync,
    submitAnswer: submitAnswerMutation.mutateAsync,
    completeSession: completeMutation.mutateAsync,
    isSubmitting: submitAnswerMutation.isPending,
  }
}

export function useSessionSummary(sessionId?: string) {
  return useQuery<SessionSummary>({
    queryKey: [QUERY_KEYS.SESSION_SUMMARY, sessionId],
    queryFn: () => sessionAPI.getSummary(sessionId!),
    enabled: !!sessionId,
  })
}
```

---

## **Cloudflare Pages Deployment**

### **Step 1: Build Test Locally**

```bash
# Install dependencies
npm install

# Test build
npm run build

# Preview production build
npm run preview
```

---

### **Step 2: Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit: React + Vite + shadcn/ui setup"
git branch -M main
git remote add origin https://github.com/yourusername/math-practice-frontend.git
git push -u origin main
```

---

### **Step 3: Deploy to Cloudflare Pages**

#### **Via Dashboard (Recommended)**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Pages** → **Create a project**
3. Click **Connect to Git**
4. Select your GitHub repository
5. Configure build settings:

```
Framework preset: React
Build command: npm run build
Build output directory: dist
Root directory: /
Node version: 18
```

6. **Environment variables** (click "Add variable"):

```
VITE_API_URL = https://your-backend.railway.app
VITE_APP_NAME = Math Practice
VITE_DEFAULT_SESSION_SIZE = 15
VITE_ENV = production
```

7. Click **Save and Deploy**
8. Wait ~2 minutes for build to complete ✅

---

#### **Via Wrangler CLI (Alternative)**

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run build
wrangler pages publish dist --project-name=math-practice

# Set environment variables
wrangler pages secret put VITE_API_URL
```

---

### **Step 4: Configure Custom Domain (Optional)**

1. In Cloudflare Pages dashboard → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `mathpractice.com`)
4. Follow DNS instructions
5. SSL certificate auto-provisioned ✅

---

## **Environment-Specific Builds**

### **Preview Deployments**

Cloudflare automatically creates preview deployments for every PR:

```
Production: https://math-practice.pages.dev
Preview:    https://abc123.math-practice.pages.dev
```

### **Environment Variables per Branch**

```bash
# Production (main branch)
VITE_API_URL=https://api.mathpractice.com

# Preview (all other branches)
VITE_API_URL=https://api-preview.mathpractice.com
```

Configure in: **Cloudflare Dashboard → Pages → Settings → Environment Variables**

---

## **Performance Optimizations**

### **Already Included:**

✅ Code splitting (React vendor, UI vendor, Query vendor)  
✅ Tree shaking (Vite automatic)  
✅ Minification (esbuild)  
✅ Compression (Cloudflare auto gzip/brotli)  
✅ HTTP/2 & HTTP/3 (Cloudflare edge)  
✅ Global CDN (200+ locations)

### **Optional Enhancements:**

```typescript
// vite.config.ts - Add image optimization
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [
    react(),
    imagetools(), // Auto-optimize images
  ],
  // ... rest of config
})
```

---

## **Monitoring & Analytics**

### **Cloudflare Web Analytics (Free)**

1. Go to **Cloudflare Dashboard → Web Analytics**
2. Add your site
3. Copy analytics snippet (or skip, Cloudflare auto-tracks on Pages)
4. View metrics:
   - Page views
   - Unique visitors
   - Core Web Vitals
   - Geographic distribution

---

## **Troubleshooting**

### **Build Fails**

```bash
# Check Node version
node --version  # Should be 18+

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### **Environment Variables Not Working**

- Environment variables must start with `VITE_`
- Rebuild required after adding new variables
- Check: **Cloudflare Dashboard → Pages → Settings → Environment Variables**

### **404 on Refresh**

Make sure `public/_redirects` exists:

```
/*    /index.html   200
```

### **CORS Errors**

Backend (FastAPI) needs CORS configuration:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://math-practice.pages.dev", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## **Next Steps**

```bash
✅ Frontend setup complete
✅ Cloudflare Pages configured
✅ shadcn/ui components ready
✅ User ID system implemented

🔜 Next: Backend (FastAPI) setup
🔜 Then: Supabase database schema (PostgreSQL only)
🔜 Finally: FSRS integration
```

---

**Want me to create the Backend (FastAPI) setup next?** 🚀
