# Mikir Kids - Math Deliberate Practice MVP

A focused web app for Indonesian students to practice UN-style math questions using FSRS scheduling.

## 🚀 Quick Start

1. **Read the Setup Guide**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete setup instructions
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
    ├── tech stack and project setup.md
    ├── ui plan.md
    └── UI Execution Plan.md
```

## 📚 Documentation

- **[Project Overview & Status](./Project Overview & Status.md)** - Current status and progress
- **[PRD](./PRD – Math Deliberate Practice MVP.md)** - Product requirements
- **[Tech Stack](./tech stack and project setup.md)** - Technical architecture
- **[UI Plan](./ui plan.md)** - UI/UX designs
- **[UI Execution Plan](./UI Execution Plan.md)** - Implementation guide
- **[Setup Guide](./SETUP_GUIDE.md)** - Complete setup instructions

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

## 📊 Current Status

**Phase 1: Foundation** ✅ Complete
- Frontend project initialized
- Backend project initialized
- Database schema created
- User ID generation endpoint working

**Next: Phase 2** - Authentication & Onboarding UI

See [Project Overview & Status](./Project Overview & Status.md) for detailed progress.

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

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for common issues and solutions.

## 📄 License

Personal/fun project - no license needed.

---

**"Dua tiga mie tektek, ayo kita praktek"** 🚀

