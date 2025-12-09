from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(
    title="Math Practice API",
    description="Backend API for Math Deliberate Practice MVP",
    version="0.1.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Update with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Math Practice API", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

# Import and include routers
# Import and include routers
from app.api import users, dashboard, sessions
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])
app.include_router(sessions.router, prefix="/api/sessions", tags=["sessions"])
# TODO: Add topics router if needed in later phases
# from app.api import topics
# app.include_router(topics.router, prefix="/api/topics", tags=["topics"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

