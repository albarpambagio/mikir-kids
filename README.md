# Mikir Kids - Math Deliberate Practice MVP

A focused web app for Indonesian students to practice UN-style math questions using FSRS scheduling.

## 🚀 Quick Start

1. **Read the Setup Guide**: See [docs/SETUP_GUIDE.md](./docs/SETUP_GUIDE.md) for complete setup instructions
2. **Set up Supabase**: Create project and run migrations (see `database/SETUP_INSTRUCTIONS.md`)
3. **Configure Environment**: Copy `.env.example` files and fill in your credentials
4. **Install Dependencies**: 
   - Frontend: `npm install` (from `frontend/` directory)
   - Backend: `uv sync` (from `backend/` directory) - requires [uv](https://github.com/astral-sh/uv)
5. **Start Servers**: 
   - Backend: `uv run uvicorn app.main:app --reload` (from `backend/` directory)
   - Frontend: `npm run dev` (from `frontend/` directory)

## 📁 Project Structure

```
mikir kids/
├── frontend/          # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # React hooks
│   │   ├── lib/         # Utilities & API client
│   │   ├── stores/      # Zustand state management
│   │   └── types/       # TypeScript types
│   └── package.json
│
├── backend/           # FastAPI + Python
│   ├── app/
│   │   ├── api/        # API routes
│   │   ├── models/     # Database models
│   │   ├── services/   # Business logic
│   │   └── main.py     # FastAPI app
│   └── pyproject.toml  # Python dependencies (uv)
│
├── database/          # SQL migrations
│   └── migrations/
│
└── docs/             # Documentation
    ├── PRD – Math Deliberate Practice MVP.md
    ├── Project Overview & Status.md
    ├── SETUP_GUIDE.md
    ├── tech stack and project setup.md
    ├── ui plan.md
    └── UI Execution Plan.md
```

## 📚 Documentation

- **[Project Overview & Status](./docs/Project%20Overview%20&%20Status.md)** - Current status and progress
- **[PRD](./docs/PRD%20–%20Math%20Deliberate%20Practice%20MVP.md)** - Product requirements
- **[Tech Stack](./docs/tech%20stack%20and%20project%20setup.md)** - Technical architecture
- **[UI Plan](./docs/ui%20plan.md)** - UI/UX designs
- **[UI Execution Plan](./docs/UI%20Execution%20Plan.md)** - Implementation guide
- **[Setup Guide](./docs/SETUP_GUIDE.md)** - Complete setup instructions

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Vite + TypeScript
- Tailwind CSS + shadcn/ui
- React Router v6
- TanStack Query + Zustand
- Axios

**Backend:**
- FastAPI + Python 3.11+
- uv (Python package manager)
- SQLAlchemy (ORM)
- PostgreSQL (Supabase)
- FSRS (spaced repetition)

**Deployment:**
- Frontend: Cloudflare Pages
- Backend: Railway
- Database: Supabase

## 📊 Current Status (December 2024)

**Overall Progress**: ~60% Complete

**Phase 1: Foundation** ✅ Complete
- Frontend and backend projects initialized
- Database schema created and migrations applied
- Row-Level Security (RLS) configured

**Phase 2: Authentication & Onboarding** ✅ Complete
- User ID creation/validation flow
- Grade selection interface
- Full routing and localStorage integration

**Phase 3: Dashboard & Topics** ✅ Complete (Pixel-Perfect)
- Dashboard with KPI cards, recommendations section
- Topics page with mastery map visualization
- **Recent Updates (Dec 15, 2024)**:
  - Pixel-perfect redesign matching Figma specifications
  - Added emoji headings (🧭 Rekomendasi, 🗺️ Peta penguasaan)
  - Implemented 7×4 dot grid for mastery tracking
  - Half-filled dots for "in progress" state
  - Orange card layouts, refined typography
  - Updated progress bar colors (#E2E8F0 bg, #FFBF8E indicator)

**Phase 4: Practice Session** 🟡 In Progress
- UI complete (needs backend integration)
- Question display, MCQ selection
- Confidence rating system
- Result feedback cards

**Phase 5-7**: FSRS Integration, Session Summary, Polish & Launch - Pending

See [Project Overview & Status](./docs/Project%20Overview%20&%20Status.md) and [Pixel-Perfect Redesign - December 15 2024](./docs/Pixel-Perfect%20Redesign%20-%20December%2015%202024.md) for detailed progress.

## 🧪 Testing

### Test Backend API

```bash
cd backend
uv run python test_user_api.py
```

### Manual Testing

- Backend API Docs: http://localhost:8000/docs
- Frontend: http://localhost:5173

## 🔧 Development

### Backend

```bash
cd backend
uv run uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm run dev
```

## 📝 Environment Variables

### Backend (`backend/.env`)
```
DATABASE_URL=postgresql://...
ENVIRONMENT=development
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Math Practice
VITE_DEFAULT_SESSION_SIZE=15
```

## 🐛 Troubleshooting

See [docs/SETUP_GUIDE.md](./docs/SETUP_GUIDE.md) for common issues and solutions.

---

**"Dua tiga mie tektek, ayo kita praktek"** 🚀

