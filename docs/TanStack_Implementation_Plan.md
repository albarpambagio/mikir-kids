# TanStack Ecosystem Implementation Strategy

This document outlines the comparative analysis and implementation plan for adopting the TanStack ecosystem into the Mikir Kids project. The goal is to achieve "Premium Engineering" standards through improved Type Safety, User Experience (DX), and Performance, while balancing the immediate needs of the MVP.

## Part 1: Strategic Comparison

This section evaluates the trade-offs between continuing with the current technology stack vs. fully migrating to the TanStack ecosystem.

### 1. Routing Strategy

**Current: React Router DOM (v6/v7)** vs. **Target: TanStack Router**

| Feature                  | Current Implementation (React Router)                                                      | TanStack Ecosystem (TanStack Router)                                                            |
|:------------------------ |:------------------------------------------------------------------------------------------ |:----------------------------------------------------------------------------------------------- |
| **Type Safety**          | **Weak**. You navigate with strings: `navigate('/dashboard')`. Typos cause runtime errors. | **Strict**. 100% Type-safe. You cannot link to a non-existent route. Autocomplete enabled.      |
| **State Management**     | URL State is manual (`useSearchParams`).                                                   | **URL-as-State**. First-class support for storing component state in the URL (shareable links). |
| **Developer Experience** | Familiar standard. Easy to hire for.                                                       | Steeper learning curve, but high productivity due to TypeScript integration.                    |
| **Migration Cost**       | N/A (Already implemented).                                                                 | **High**. Requires rewriting `main.tsx` and all routing logic.                                  |

**Verdict**: Stick with React Router for MVP. Migrate later for long-term maintainability.

### 2. Data Fetching

**Current: Hybrid (Query + Local/Mock)** vs. **Target: TanStack Query (Standardized)**

| Feature          | Current Implementation                                               | TanStack Ecosystem                                                               |
|:---------------- |:-------------------------------------------------------------------- |:-------------------------------------------------------------------------------- |
| **Consistency**  | **Low**. Mixed usage of Query, `useEffect`, and hardcoded Mock Data. | **High**. Single source of truth. Centralized state management.                  |
| **UX**           | Variable. Mock data hides real-world latency/error states.           | **Premium**. built-in loading states, background refetching, optimistic updates. |
| **Code Quality** | Mixed boilerplate.                                                   | Declarative, clean, and maintainable.                                            |

**Verdict**: **Immediate Adoption Required**. Connect the existing library to the new UI components immediately.

### 3. Form Handling

**Current: React `useState`** vs. **Target: TanStack Form**

| Feature         | Current Implementation (`useState`) | TanStack Ecosystem (TanStack Form)                                      |
|:--------------- |:----------------------------------- |:----------------------------------------------------------------------- |
| **Performance** | Renders on every keystroke.         | **Fine-grained**. Only re-renders the specific field being edited.      |
| **Validation**  | Manual implementation.              | built-in Zod/Yup integration.                                           |
| **Complexity**  | Simple for basic inputs.            | Excellent for complex, nested data structures (e.g., Question Editors). |

**Verdict**: Use `useState` for simple forms. Adopt TanStack Form for complex Admin/Teacher interfaces.

### 4. Overall Business Impact

* **Staying with Current Stack**: Maximizes speed to MVP by minimizing rewrites.
* **Migrating to TanStack**: Ensures "Premium Engineering," robustness, and easier future refactoring.

---

## Part 2: Implementation Plan

Based on the comparison above, here is the roadmap for adoption.

### 1. TanStack Query (React Query) - **CRITICAL / IMMEDIATE**

Currently installed (`@tanstack/react-query` v5) but underutilized in the new "Premium" UI.

**Action Plan:**

1. **Refactor Dashboard**: Replace static `stats` in `EnhancedDashboard.tsx` with `useQuery`.
   
   ```tsx
   // Goal
   const { data: stats } = useQuery({
     queryKey: ['dashboard-stats', userId],
     queryFn: () => dashboardParams.fetchStats(userId),
   })
   ```
2. **Refactor Practice Session**: Create a `useSession` hook to fetch questions from the Python backend, replacing hardcoded JSON.

### 2. TanStack Router - **POST-MVP**

Deferred to avoid destabilizing the MVP launch.

**Migration Strategy:**

1. **Install**: `npm install @tanstack/react-router`
2. **Setup**: Replace `<Route>` tree with a file-based or code-based route definition.
3. **Refactor**: Replace `useNavigate` and `<Link>` components to use type-safe equivalents.

### 3. TanStack Form - **AS NEEDED**

 planned for complex features only.

**Use Cases:**

* **Student Profile Edit**: Validating multiple fields (grade, email, name).
* **Question CMS**: Complex nested JSON editors for math problems.

### 4. TanStack Table - **AS NEEDED**

Planned for dense data displays.

**Use Cases:**

* **Practice History**: Sortable/filterable logs of student activity.
* **Design**: Use "Headless" mode to maintain full control over the specific CSS/Tailwind styling of the table.

## Summary Roadmap

| Component  | Status  | Priority     | Action Item                                                        |
|:---------- |:------- |:------------ |:------------------------------------------------------------------ |
| **Query**  | Active  | **Critical** | Remove mock data, connect `EnhancedDashboard` & `Practice` to API. |
| **Router** | Pending | Medium       | Schedule migration post-MVP.                                       |
| **Form**   | Planned | Low          | Use for Profile Settings/CMS.                                      |
| **Table**  | Planned | Low          | Use for History Logs.                                              |
