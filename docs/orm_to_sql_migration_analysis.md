# ORM to Vanilla SQL Migration Assessment

**Project:** Mikir Kids Backend  
**Date:** 2025-12-08  
**Current Stack:** FastAPI + SQLAlchemy ORM + PostgreSQL (Supabase)

---

## Executive Summary

**Feasibility Rating:** ⭐⭐⭐⭐ (4/5) - **Highly Feasible**

The migration from SQLAlchemy ORM to vanilla SQL is **practical and straightforward** for this project due to:

- ✅ Simple database interactions (mostly basic CRUD operations)
- ✅ Small codebase (only 4 ORM query locations identified)
- ✅ No complex ORM features being utilized (no lazy loading, complex relationships, or query optimization)
- ✅ SQL migrations already exist and are well-structured

**Recommendation:** If performance or vendor lock-in concerns exist, migration is feasible. However, **the current ORM implementation is not problematic** and provides value for this stage of development.

---

## Current State Analysis

### ORM Usage Overview

**Technology Stack:**

- **ORM:** SQLAlchemy 2.0.36
- **Database:** PostgreSQL (via Supabase)
- **Migration Tool:** Alembic 1.13.2 + Custom SQL migrations

### Database Models (6 Tables)

1. **`users`** - User profiles with grade/class information
2. **`topics`** - Math topics with metadata
3. **questions** - MCQ questions with options and explanations
4. **`user_question_state`** - FSRS spaced repetition state tracking
5. **`sessions`** - Practice session records
6. **`session_items`** - Individual question attempts within sessions

### ORM Query Locations (Analyzed)

The codebase has **minimal ORM complexity**. All database interactions occur in:

| File                                                                                                                                     | Queries   | Complexity      |
| ---------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------------- |
| [`app/api/users.py`](file:///c:/Users/albar/Documents/01%20Projects/mikir%20kids/backend/app/api/users.py)                               | 5 queries | Simple CRUD     |
| [`app/services/user_id_service.py`](file:///c:/Users/albar/Documents/01%20Projects/mikir%20kids/backend/app/services/user_id_service.py) | 1 query   | Existence check |

**Query Types Found:**

```python
# Basic SELECT queries
db.query(User).filter(User.id == user_id).first()

# INSERT operations
user = User(id=user_id, grade_level='SMP', class_level=7)
db.add(user)
db.commit()

# UPDATE operations
user.grade_level = request.grade_level
db.commit()
```

> [!NOTE]
> **No complex ORM features detected:**
> 
> - No joins or eager loading (`joinedload`, `selectinload`)
> - No relationship traversal (`user.sessions.all()`)
> - No ORM-specific query optimization
> - No polymorphic queries or inheritance

---

## Migration Complexity Assessment

### Effort Estimation

| Component         | Current Lines | Estimated SQL Lines | Complexity |
| ----------------- | ------------- | ------------------- | ---------- |
| Model definitions | 100 lines     | 0 (use SQL schema)  | Low        |
| Database config   | 27 lines      | ~40 lines           | Low        |
| User API          | 164 lines     | ~180 lines          | Low        |
| User ID service   | ~20 lines     | ~25 lines           | Very Low   |
| **Total**         | ~311 lines    | ~245 lines          | **Low**    |

**Time Estimate:** 4-6 hours for full migration + testing

### Migration Steps Required

1. **Replace model definitions** → Use SQL schema directly (already exists in `001_initial_schema.sql`)
2. **Rewrite database layer** → Create query builder or raw SQL executor
3. **Update API endpoints** → Replace ORM queries with SQL
4. **Remove dependencies** → Uninstall SQLAlchemy, Alembic
5. **Testing** → Validate all endpoints work correctly

---

## Pros & Cons Analysis

### ✅ Advantages of Vanilla SQL

#### 1. **Performance**

- **Direct SQL execution** - No ORM translation overhead
- **Query optimization** - Full control over SQL execution plans
- **Reduced memory footprint** - No object mapping layer

**Impact for this project:** ⚠️ **Minimal** - Current queries are simple; ORM overhead is negligible for CRUD operations.

#### 2. **Transparency & Control**

- **Explicit queries** - Know exactly what SQL runs
- **Database features** - Full access to PostgreSQL-specific features (JSONB operators, CTEs, window functions)
- **Easier debugging** - Direct SQL logging

**Impact for this project:** ✅ **Moderate** - Beneficial if you plan to use advanced PostgreSQL features.

#### 3. **Reduced Dependencies**

- **Smaller footprint** - Remove SQLAlchemy (~20 dependencies)
- **Less complexity** - No ORM configuration or session management
- **Easier audits** - Simpler dependency tree

**Impact for this project:** ✅ **High** - Cleaner, more maintainable dependency tree.

#### 4. **No ORM Lock-in**

- **Portability** - Easier to switch frameworks (e.g., FastAPI → Go/Rust)
- **Database-first approach** - SQL migrations remain source of truth

**Impact for this project:** ✅ **Moderate** - Already using SQL migrations; partial independence achieved.

### ❌ Disadvantages of Vanilla SQL

#### 1. **More Boilerplate Code**

```python
# ORM (SQLAlchemy)
user = db.query(User).filter(User.id == user_id).first()

# Vanilla SQL
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
row = cursor.fetchone()
user = {
    "id": row[0],
    "grade_level": row[1],
    "class_level": row[2],
    "created_at": row[3]
}
```

**Impact:** ⚠️ **Low-Moderate** - Need to write manual mapping logic for each query.

#### 2. **Type Safety Loss**

- ORM provides **Pydantic model integration** for validation
- Vanilla SQL requires **manual type conversion** and validation

**Mitigation:** Use **Pydantic models** for request/response validation (already in place).

#### 3. **SQL Injection Risk**

- Manual query building can introduce vulnerabilities
- Requires disciplined use of **parameterized queries**

**Mitigation:** Use `psycopg2` parameter binding (`cursor.execute(query, params)`) or query builders.

#### 4. **Migration Management**

- Alembic auto-generates migrations from model changes
- Vanilla SQL requires **manual migration creation**

**Impact:** ⚠️ **Low** - Project already uses manual SQL migrations (`001_initial_schema.sql` etc.).

#### 5. **Less Developer Ergonomics**

- No autocomplete for query building
- More verbose code
- Harder onboarding for new developers

**Impact:** ⚠️ **Moderate** - Trade-off between simplicity and developer experience.

---

## Detailed Comparison

### Code Example: Get User by ID

```carousel
**Current Implementation (SQLAlchemy ORM)**

```python
# app/api/users.py
@router.get("/{user_id}")
async def get_user(
    user_id: str,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": user.id,
        "grade_level": user.grade_level,
        "class_level": user.class_level,
        "created_at": user.created_at.isoformat() if user.created_at else None
    }
```

**Lines:** 14  
**Dependencies:** SQLAlchemy Session, User model

<!-- slide -->

**Vanilla SQL Implementation (Option 1: psycopg2)**

```python
# app/database/connection.py
import psycopg2
from psycopg2.extras import RealDictCursor
import os

def get_db_connection():
    return psycopg2.connect(
        os.getenv("DATABASE_URL"),
        cursor_factory=RealDictCursor
    )

# app/api/users.py
@router.get("/{user_id}")
async def get_user(user_id: str):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "SELECT id, grade_level, class_level, created_at FROM users WHERE id = %s",
                (user_id,)
            )
            user = cursor.fetchone()

            if not user:
                raise HTTPException(status_code=404, detail="User not found")

            return {
                "id": user["id"],
                "grade_level": user["grade_level"],
                "class_level": user["class_level"],
                "created_at": user["created_at"].isoformat() if user["created_at"] else None
            }
    finally:
        conn.close()
```

**Lines:** 22 (+57% more code)  
**Dependencies:** psycopg2 only

<!-- slide -->

**Vanilla SQL Implementation (Option 2: Query Helper)**

```python
# app/database/query_helper.py
from psycopg2.extras import RealDictCursor
import psycopg2
import os

class Database:
    def __init__(self):
        self.conn = psycopg2.connect(
            os.getenv("DATABASE_URL"),
            cursor_factory=RealDictCursor
        )

    def fetch_one(self, query: str, params: tuple = None):
        with self.conn.cursor() as cursor:
            cursor.execute(query, params)
            return cursor.fetchone()

    def execute(self, query: str, params: tuple = None):
        with self.conn.cursor() as cursor:
            cursor.execute(query, params)
            self.conn.commit()
            return cursor.rowcount

def get_db():
    db = Database()
    try:
        yield db
    finally:
        db.conn.close()

# app/api/users.py
@router.get("/{user_id}")
async def get_user(
    user_id: str,
    db: Database = Depends(get_db)
):
    user = db.fetch_one(
        "SELECT id, grade_level, class_level, created_at FROM users WHERE id = %s",
        (user_id,)
    )

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": user["id"],
        "grade_level": user["grade_level"],
        "class_level": user["class_level"],
        "created_at": user["created_at"].isoformat() if user["created_at"] else None
    }
```

**Lines:** 16 (similar to ORM, reusable helper)  
**Dependencies:** psycopg2 + custom wrapper
```

---

## Risk Assessment

| Risk                    | Likelihood | Impact   | Mitigation                                           |
| ----------------------- | ---------- | -------- | ---------------------------------------------------- |
| **SQL Injection**       | Low        | Critical | Use parameterized queries exclusively                |
| **Regression Bugs**     | Medium     | High     | Write comprehensive tests before migration           |
| **Performance Issues**  | Very Low   | Low      | Both approaches perform similarly for simple queries |
| **Migration Time**      | Low        | Medium   | Small codebase = quick migration                     |
| **Developer Confusion** | Medium     | Medium   | Document query patterns, create helper utilities     |

> [!CAUTION]
> **Critical Security Requirement:** All vanilla SQL implementations MUST use parameterized queries (e.g., `cursor.execute(query, (param,))`) to prevent SQL injection. Never use f-strings or string concatenation for user input.

---

## Recommendations

### Option 1: Keep SQLAlchemy ORM ✅ **Recommended for Now**

**Best if:**

- ✅ Team is comfortable with SQLAlchemy
- ✅ No immediate performance bottlenecks
- ✅ Focus is on feature development, not optimization
- ✅ You value developer productivity over micro-optimizations

**Action items:**

- Continue using ORM for CRUD operations
- Consider vanilla SQL for **future complex analytics queries** (if needed)
- Monitor query performance as data grows

### Option 2: Hybrid Approach ⚡ **Best of Both Worlds**

**Implementation:**

1. Keep SQLAlchemy for **simple CRUD** (create, read, update, delete)
2. Use **raw SQL** for:
   - Complex analytics queries
   - Bulk operations
   - Performance-critical paths
   - PostgreSQL-specific features (JSONB queries, full-text search)

**Example:**

```python
# Simple CRUD - Use ORM
user = db.query(User).filter(User.id == user_id).first()

# Complex analytics - Use raw SQL
results = db.execute("""
    SELECT u.grade_level, COUNT(*) as question_count, AVG(uqs.stability) as avg_stability
    FROM users u
    JOIN user_question_state uqs ON u.id = uqs.user_id
    WHERE uqs.next_due_at <= NOW()
    GROUP BY u.grade_level
""").fetchall()
```

### Option 3: Full Vanilla SQL Migration 🔧 **If Optimization is Priority**

**Best if:**

- ✅ You need maximum performance control
- ✅ You want minimal dependencies
- ✅ Team has strong SQL skills
- ✅ You plan to use advanced PostgreSQL features extensively

**Implementation path:**

1. Create migration branch
2. Build query helper library (see Option 2 example above)
3. Migrate endpoints one-by-one
4. Write integration tests for each endpoint
5. Performance benchmark before/after
6. Deploy with monitoring

**Estimated timeline:** 1-2 days for implementation + 1 day for testing

---

## Technical Implementation Guide (If Migrating)

### Step 1: Create Database Connection Layer

```python
# app/database/connection.py
import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
import os

DATABASE_URL = os.getenv("DATABASE_URL")

class DatabaseConnection:
    def __init__(self):
        self.conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)

    def execute(self, query: str, params: tuple = None):
        """Execute INSERT/UPDATE/DELETE queries"""
        with self.conn.cursor() as cursor:
            cursor.execute(query, params or ())
            self.conn.commit()
            return cursor.rowcount

    def fetch_one(self, query: str, params: tuple = None):
        """Fetch single row as dictionary"""
        with self.conn.cursor() as cursor:
            cursor.execute(query, params or ())
            return cursor.fetchone()

    def fetch_all(self, query: str, params: tuple = None):
        """Fetch all rows as list of dictionaries"""
        with self.conn.cursor() as cursor:
            cursor.execute(query, params or ())
            return cursor.fetchall()

    def close(self):
        self.conn.close()

@contextmanager
def get_db():
    db = DatabaseConnection()
    try:
        yield db
    finally:
        db.close()
```

### Step 2: Migrate User API Endpoints

```python
# app/api/users.py (vanilla SQL version)
from fastapi import APIRouter, HTTPException, Depends
from app.database.connection import get_db, DatabaseConnection
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class UserCreateRequest(BaseModel):
    grade_level: Optional[str] = None
    class_level: Optional[int] = None

@router.post("")
async def create_user(
    request: UserCreateRequest,
    db: DatabaseConnection = Depends(get_db)
):
    from app.services.user_id_service import generate_user_id

    # Generate unique ID
    user_id = generate_user_id(db)

    # Validate inputs
    if request.grade_level and request.grade_level not in ['SMP', 'SMA']:
        raise HTTPException(status_code=400, detail="grade_level must be 'SMP' or 'SMA'")
    if request.class_level and request.class_level not in range(7, 13):
        raise HTTPException(status_code=400, detail="class_level must be between 7 and 12")

    # Insert user
    grade = request.grade_level or 'SMP'
    class_lvl = request.class_level or 7

    db.execute(
        """
        INSERT INTO users (id, grade_level, class_level)
        VALUES (%s, %s, %s)
        """,
        (user_id, grade, class_lvl)
    )

    # Fetch created user
    user = db.fetch_one(
        "SELECT id, grade_level, class_level, created_at FROM users WHERE id = %s",
        (user_id,)
    )

    return {
        "user_id": user_id,
        "user": {
            "id": user["id"],
            "grade_level": user["grade_level"],
            "class_level": user["class_level"],
            "created_at": user["created_at"].isoformat() if user["created_at"] else None
        }
    }

@router.get("/{user_id}")
async def get_user(
    user_id: str,
    db: DatabaseConnection = Depends(get_db)
):
    user = db.fetch_one(
        "SELECT id, grade_level, class_level, created_at FROM users WHERE id = %s",
        (user_id,)
    )

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": user["id"],
        "grade_level": user["grade_level"],
        "class_level": user["class_level"],
        "created_at": user["created_at"].isoformat() if user["created_at"] else None
    }

@router.patch("/{user_id}")
async def update_user(
    user_id: str,
    request: UserCreateRequest,
    db: DatabaseConnection = Depends(get_db)
):
    # Check user exists
    existing = db.fetch_one("SELECT id FROM users WHERE id = %s", (user_id,))
    if not existing:
        raise HTTPException(status_code=404, detail="User not found")

    # Build dynamic update query
    updates = []
    params = []

    if request.grade_level:
        if request.grade_level not in ['SMP', 'SMA']:
            raise HTTPException(status_code=400, detail="grade_level must be 'SMP' or 'SMA'")
        updates.append("grade_level = %s")
        params.append(request.grade_level)

    if request.class_level:
        if request.class_level not in range(7, 13):
            raise HTTPException(status_code=400, detail="class_level must be between 7 and 12")
        updates.append("class_level = %s")
        params.append(request.class_level)

    if updates:
        params.append(user_id)
        query = f"UPDATE users SET {', '.join(updates)} WHERE id = %s"
        db.execute(query, tuple(params))

    # Fetch updated user
    user = db.fetch_one(
        "SELECT id, grade_level, class_level, created_at FROM users WHERE id = %s",
        (user_id,)
    )

    return {
        "id": user["id"],
        "grade_level": user["grade_level"],
        "class_level": user["class_level"],
        "created_at": user["created_at"].isoformat() if user["created_at"] else None
    }
```

### Step 3: Update Service Layer

```python
# app/services/user_id_service.py (vanilla SQL version)
import random
from app.database.connection import DatabaseConnection

def generate_user_id(db: DatabaseConnection) -> str:
    """Generate a unique 8-digit numeric user ID"""
    max_attempts = 100

    for _ in range(max_attempts):
        # Generate random 8-digit number
        user_id = str(random.randint(10000000, 99999999))

        # Check if ID already exists
        existing = db.fetch_one(
            "SELECT id FROM users WHERE id = %s",
            (user_id,)
        )

        if not existing:
            return user_id

    raise Exception("Failed to generate unique user ID after maximum attempts")
```

### Step 4: Update Dependencies

```toml
# pyproject.toml - Remove SQLAlchemy dependencies
[project]
dependencies = [
    "fastapi==0.115.0",
    "uvicorn[standard]==0.32.0",
    "python-dotenv==1.0.1",
    "pydantic==2.9.2",
    "pydantic-settings==2.5.2",
    "psycopg2-binary==2.9.10",  # Keep this
    # "sqlalchemy==2.0.36",  # Remove
    # "alembic==1.13.2",      # Remove
    "fsrs==0.1.0",
    "python-multipart==0.0.12",
]
```

### Step 5: Testing Checklist

- [ ] All user endpoints return correct data
- [ ] User creation generates unique IDs
- [ ] Validation errors are properly raised
- [ ] Database connections are properly closed
- [ ] No SQL injection vulnerabilities
- [ ] Performance benchmarks show acceptable latency
- [ ] Error handling works for database failures

---

## Performance Comparison (Estimated)

| Operation                      | SQLAlchemy ORM | Vanilla SQL | Improvement |
| ------------------------------ | -------------- | ----------- | ----------- |
| Simple SELECT                  | ~1.2ms         | ~0.8ms      | 33% faster  |
| Simple INSERT                  | ~1.5ms         | ~1.0ms      | 33% faster  |
| Simple UPDATE                  | ~1.4ms         | ~0.9ms      | 36% faster  |
| Complex JOIN (not in codebase) | ~3.5ms         | ~2.0ms      | 43% faster  |

> [!NOTE]
> These are **theoretical estimates** for simple queries. Real-world performance depends on:
> 
> - Network latency to Supabase
> - Database load
> - Query complexity
> - Connection pooling configuration
> 
> For your current CRUD operations, **the difference is negligible** (< 1ms per query).

---

## Migration Checklist (If Proceeding)

### Pre-Migration

- [ ] Create feature branch for migration
- [ ] Document all current API endpoints and behaviors
- [ ] Write integration tests for existing functionality
- [ ] Benchmark current performance

### During Migration

- [ ] Implement database connection layer
- [ ] Migrate endpoints one module at a time
- [ ] Test each migrated endpoint
- [ ] Update service layers (e.g., user_id_service)
- [ ] Remove SQLAlchemy model definitions
- [ ] Update error handling for raw SQL exceptions

### Post-Migration

- [ ] Run full test suite
- [ ] Performance benchmark comparison
- [ ] Update documentation (README, API docs)
- [ ] Code review with team
- [ ] Deploy to staging environment
- [ ] Monitor for errors in production
- [ ] Remove SQLAlchemy dependencies

---

## Conclusion

### Final Recommendation: **Defer Migration** ✅

**Reasoning:**

1. **Current ORM usage is minimal** - Only 6 query locations with simple CRUD operations
2. **No performance bottlenecks** - Simple queries perform well with ORM
3. **Migration offers limited ROI** - Time spent could be used for feature development
4. **Risk vs. Reward** - Migration introduces testing burden for marginal gains

### When to Reconsider:

✅ **Migrate to vanilla SQL if:**

- You add complex analytics queries with multiple joins
- Performance profiling shows ORM overhead as a bottleneck
- You need PostgreSQL-specific features (JSONB operators, CTEs, window functions)
- Team develops internal query builder preferences
- You're refactoring the entire backend architecture

✅ **Use hybrid approach if:**

- Specific endpoints become performance-critical
- You need advanced SQL features for new features
- Team wants to experiment with vanilla SQL gradually

---

## Additional Resources

### Tools for Vanilla SQL Development

- **Query Builder:** [pypika](https://github.com/kayak/pypika) - Programmatic SQL construction
- **Connection Pooling:** [psycopg2 pool](https://www.psycopg.org/docs/pool.html) - Reuse connections
- **Migration Tool:** [yoyo-migrations](https://ollycope.com/software/yoyo/) - SQL-based migrations without ORM
- **Type Safety:** [SQLAlchemy Core](https://docs.sqlalchemy.org/en/20/core/) - SQL expression language without ORM

### Testing Recommendations

- Use **pytest** with database fixtures
- Create test database with schema from SQL migrations
- Test SQL injection resistance with [sqlmap](http://sqlmap.org/) or manual tests
- Load testing with [Locust](https://locust.io/) or [k6](https://k6.io/)

---

**Assessment Completed:** 2025-12-08  
**Next Review:** When adding complex query requirements or after 6 months of growth
