# Skills Conversion Plan

> **Purpose**: Document which markdown files in `docs/` can be converted to Claude Skills and what new skills should be created  
> **Reference**: https://github.com/anthropics/skills  
> **Date**: December 10, 2024

---

## 📋 Executive Summary

After analyzing all 8 markdown files in the `docs/` directory, I've identified:
- **6 documents** that can be converted to skills (with varying levels of adaptation)
- **2 documents** that are too project-specific but can provide patterns for meta-skills
- **6 new skills** that should be created based on project patterns not yet documented

**Quick Stats**:
- ✅ **Convertible to Skills**: 6 documents
- 🔄 **Pattern Extraction Needed**: 2 documents
- 🆕 **New Skills to Create**: 6 skills
- 📊 **Total Potential Skills**: 12 skills

---

## 🗂️ Document Analysis Summary

| Document | Lines | Skill Potential | Proposed Skill Name | Priority |
|----------|-------|----------------|-------------------|----------|
| **SETUP_GUIDE.md** | 309 | ⭐⭐⭐⭐⭐ Excellent | `full-stack-project-setup` | HIGH |
| **Spacing System & Design Tokens Guide.md** | 337 | ⭐⭐⭐⭐⭐ Excellent | `design-system-spacing` | HIGH |
| **orm_to_sql_migration_analysis.md** | 737 | ⭐⭐⭐⭐⭐ Excellent | `orm-vs-sql-decision-framework` | HIGH |
| **Pedagogy & Mastery Learning Review.md** | 152 | ⭐⭐⭐⭐ Good | `educational-app-ux-review` | HIGH |
| **OCR_Implementation_Plan.md** | 107 | ⭐⭐⭐⭐ Good | `ocr-pipeline-setup` | MEDIUM |
| **TanStack_Implementation_Plan.md** | 110 | ⭐⭐⭐ Moderate | `react-library-migration-strategy` | MEDIUM |
| **PRD – Math Deliberate Practice MVP.md** | 1433 | ⭐⭐ Low (extract patterns) | `pedagogical-prd-writing` | MEDIUM |
| **Project Overview & Status.md** | 809 | ⭐ Very Low (too dynamic) | *(status tracking, not skill)* | - |

---

## ✅ Part 1: Documents That CAN Be Converted to Skills

### 1. **SETUP_GUIDE.md** → `full-stack-project-setup` ⭐ HIGH PRIORITY

**Current Content**: 309 lines
- Complete setup guide for React+Vite+FastAPI+PostgreSQL stack
- Prerequisites, environment configuration, troubleshooting
- Step-by-step instructions with multiple approaches (Option A/B/C)

**Skill Description**:
```yaml
name: full-stack-project-setup
description: Set up full-stack web applications with React+Vite frontend, FastAPI backend, and PostgreSQL database. Includes dependency management with uv, environment configuration, database migrations, and troubleshooting common issues.
```

**Adaptation Required**:
- ✅ **Keep**: Technology stack patterns (React, Vite, FastAPI, uv, PostgreSQL)
- ✅ **Keep**: Troubleshooting section (generic issues)
- ✅ **Keep**: Step-by-step structure
- 🔄 **Modify**: Remove mikir-kids specific database schema details
- 🔄 **Modify**: Generalize migration examples
- ➕ **Add**: Examples for other database providers (not just Supabase)

**Why It's a Good Skill**:
- Highly reusable across full-stack projects
- Complete workflow from setup to verification
- Includes troubleshooting (makes it actionable)
- Well-structured and easy to follow

---

### 2. **Spacing System & Design Tokens Guide.md** → `design-system-spacing` ⭐ HIGH PRIORITY

**Current Content**: 337 lines
- Comprehensive spacing system based on 4px base unit
- Design token mapping (Figma → Tailwind CSS)
- Component spacing reference
- Implementation guidelines and best practices

**Skill Description**:
```yaml
name: design-system-spacing
description: Implement consistent spacing systems using a 4px base unit, design tokens, and Tailwind CSS. Includes responsive patterns, component spacing reference, and verification checklist for maintaining design consistency.
```

**Adaptation Required**:
- ✅ **Keep**: Base unit system (4px)
- ✅ **Keep**: Design token mapping approach
- ✅ **Keep**: Implementation guidelines
- ✅ **Keep**: Spacing audit checklist
- 🔄 **Modify**: Minimal - already well-structured
- ➕ **Add**: Optional examples for other CSS frameworks (CSS-in-JS, Vanilla CSS)

**Why It's a Good Skill**:
- Universal design system principle
- Already structured as reference documentation
- Includes verification checklist
- Applicable to any frontend framework

---

### 3. **orm_to_sql_migration_analysis.md** → `orm-vs-sql-decision-framework` ⭐ HIGH PRIORITY

**Current Content**: 737 lines
- Comprehensive comparison framework (ORM vs Vanilla SQL)
- Code examples using carousel format
- Risk assessment with mitigation strategies
- Complete migration implementation guide

**Skill Description**:
```yaml
name: orm-vs-sql-decision-framework
description: Evaluate whether to use an ORM or vanilla SQL for your project using a systematic framework. Includes code comparisons, risk assessment, migration strategies, and decision criteria based on project complexity and team skills.
```

**Adaptation Required**:
- ✅ **Keep**: Decision framework structure
- ✅ **Keep**: Pros/cons analysis
- ✅ **Keep**: Carousel code comparison format (excellent!)
- ✅ **Keep**: Risk assessment matrix
- 🔄 **Modify**: Generalize from SQLAlchemy to ORMs in general
- ➕ **Add**: Examples for other ORMs (Django ORM, Prisma, TypeORM)
- ➕ **Add**: Language-specific considerations (TypeScript, Go, Rust)

**Why It's a Good Skill**:
- Common technical decision across many projects
- Excellent structured analysis already present
- Code examples make it concrete
- Risk assessment adds real-world value

---

### 4. **Pedagogy & Mastery Learning Review.md** → `educational-app-ux-review` ⭐ HIGH PRIORITY

**Current Content**: 152 lines
- Learning science principles reference (Bloom, Ericsson, Bjork, etc.)
- Critical issues identification with evidence-based recommendations
- Roadmap prioritization (Critical/Important/Future)
- Research citations

**Skill Description**:
```yaml
name: educational-app-ux-review
description: Review educational applications using learning science principles from cognitive psychology and pedagogy research. Identify pedagogical gaps, provide evidence-based recommendations, and prioritize improvements using a research-backed framework.
```

**Adaptation Required**:
- ✅ **Keep**: Learning science principles table
- ✅ **Keep**: Issue categorization framework (Critical/Important/Future)
- ✅ **Keep**: Evidence-based recommendation structure
- 🔄 **Modify**: Extract generic review checklist from mikir-kids specific critique
- ➕ **Add**: Templates for different app types:
  - Language learning apps
  - Coding practice platforms
  - Skill acquisition tools
  - Knowledge retention systems
- ➕ **Add**: Research citation best practices

**Why It's a Good Skill**:
- Unique perspective (learning science + UX)
- Evidence-based approach is rare and valuable
- Applicable to entire edtech category
- Structured framework makes it repeatable

---

### 5. **OCR_Implementation_Plan.md** → `ocr-pipeline-setup` ⭐ MEDIUM PRIORITY

**Current Content**: 107 lines
- OCR tool selection (MinerU/Magic-PDF)
- Infrastructure recommendations (Google Colab vs Local)
- Implementation steps (OCR Engine, Parser)
- Risk mitigation strategies

**Skill Description**:
```yaml
name: ocr-pipeline-setup
description: Set up OCR pipelines for document processing using MinerU and Python. Includes tool selection criteria, infrastructure recommendations (Colab vs local vs cloud), parser implementation patterns, and handling of complex layouts.
```

**Adaptation Required**:
- ✅ **Keep**: Infrastructure comparison (Colab vs Local)
- ✅ **Keep**: Implementation phases structure
- ✅ **Keep**: Risk mitigation matrix
- 🔄 **Modify**: Generalize from Indonesian UN exams to any document types
- ➕ **Add**: Alternative tools comparison:
  - Tesseract OCR
  - Google Cloud Vision API
  - AWS Textract
  - Azure Computer Vision
- ➕ **Add**: Document type specific guidance (receipts, forms, academic papers)

**Why It's a Good Skill**:
- OCR is common but complex task
- Infrastructure decision framework is valuable
- Well-structured implementation guide
- Risk awareness makes it production-ready

---

### 6. **TanStack_Implementation_Plan.md** → `react-library-migration-strategy` ⭐ MEDIUM PRIORITY

**Current Content**: 110 lines
- Strategic comparison (Current vs Target tech)
- Business impact analysis
- Phased implementation roadmap
- Priority matrix

**Skill Description**:
```yaml
name: react-library-migration-strategy
description: Evaluate and plan migrations to modern React libraries using a cost-benefit framework. Includes comparison tables, phased implementation roadmaps, risk assessment, and migration priority matrices for systematic library adoption.
```

**Adaptation Required**:
- ✅ **Keep**: Comparison table structure
- ✅ **Keep**: Business impact framework
- ✅ **Keep**: Phased implementation approach
- 🔄 **Modify**: Generalize from TanStack to any React library migration
- ➕ **Add**: Examples for other common migrations:
  - Redux → Zustand/Jotai
  - React Router → TanStack Router/Remix
  - axios → TanStack Query
  - Formik → React Hook Form/TanStack Form
- ➕ **Add**: Team skill assessment criteria

**Why It's a Good Skill**:
- React ecosystem evolves rapidly
- Framework helps with decision paralysis
- Phased approach reduces risk
- Applicable to many frontend migrations

---

## 🔄 Part 2: Documents Requiring Pattern Extraction

### 7. **PRD – Math Deliberate Practice MVP.md** → Extract Pattern for `pedagogical-prd-writing`

**Current Content**: 1433 lines (too project-specific)

**Why Not Direct Conversion**:
- Entirely focused on mikir-kids product specifications
- User stories, API contracts, data schemas are project-specific
- Would not be useful as a skill without complete rewrite

**Pattern to Extract**: "Pedagogically-Informed PRD Writing"

**New Skill Description**:
```yaml
name: pedagogical-prd-writing
description: Write product requirement documents for educational products that incorporate learning science principles. Includes how to structure user flows with cognitive science rationale, cite research, define evidence-based success criteria, and document pedagogical decisions.
```

**What to Extract**:
- ✅ Structure: How learning science rationale is integrated into user flows
- ✅ Research citations format (Ericsson, Bjork, Hattie & Timperley, Dweck)
- ✅ Evidence-based parameter selection (FSRS retention rate, max intervals)
- ✅ Pedagogical acceptance criteria
- ✅ Success metrics that align with learning outcomes

**Example Sections to Adapt**:
- Section 6.3: "Pedagogical Rationale" for immediate feedback
- Section 7.5: FSRS parameters with evidence-based justification
- Section 6.4: "Pedagogical Rationale" for error-focused feedback

---

### 8. **Project Overview & Status.md** → NOT SUITABLE

**Current Content**: 809 lines (status tracking)

**Why Not Suitable**:
- Dynamic document that changes with project progress
- Highly project-specific (phase tracking, current blockers)
- Status information becomes outdated
- Not a repeatable process

**Alternative**: Could extract as a *template* (not skill):
- Template: `project-overview-template.md`
- Shows structure for documenting project architecture, phases, decisions
- But templates ≠ skills (skills teach HOW to do something)

---

## 🆕 Part 3: New Skills to Create

These skills represent patterns used in the project but not yet documented.

### 9. **fastapi-project-structure** 🆕 HIGH PRIORITY

**Why Needed**: Project has excellent FastAPI organization but it's not documented

**Skill Description**:
```yaml
name: fastapi-project-structure
description: Organize FastAPI applications using a scalable directory structure with separation of concerns. Includes API endpoint patterns, database connection management, dependency injection, service layer design, and error handling patterns.
```

**Content to Create**:
```
## Directory Structure
backend/
├── app/
│   ├── api/           # API endpoints (routers)
│   ├── models/        # Database models and schemas
│   ├── services/      # Business logic layer
│   ├── core/          # Configuration, dependencies
│   └── main.py        # Application entry point

## API Endpoint Patterns
- RESTful resource naming
- Router organization by domain
- Dependency injection for database sessions
- Pydantic models for request/response validation

## Database Connection Management
- Connection pooling strategies
- Session lifecycle management
- get_db() dependency pattern

## Error Handling
- HTTPException patterns
- Custom exception handlers
- Validation error responses
```

**Source Material**: Extract from `backend/app/` structure

**Why It's Valuable**:
- FastAPI is growing in popularity
- Project structure is often most confusing for beginners
- Good patterns already exist in codebase

---

### 10. **react-tanstack-query-integration** 🆕 HIGH PRIORITY

**Why Needed**: Project uses TanStack Query but integration patterns aren't fully documented

**Skill Description**:
```yaml
name: react-tanstack-query-integration
description: Integrate TanStack Query (React Query) into React applications for efficient server state management. Includes QueryClient setup, custom query hooks, mutation patterns, error handling, loading states, and cache invalidation strategies.
```

**Content to Create**:
```
## QueryClient Setup
- Provider configuration
- Default options (retry, staleTime, cacheTime)
- DevTools integration

## Custom Query Hooks
- useQuery patterns
- Query key organization
- Dependent queries
- Infinite queries

## Mutation Patterns
- useMutation with optimistic updates
- Invalidation after mutations
- Error rollback strategies

## Loading and Error States
- Skeleton UI patterns
- Error boundary integration
- Retry logic
```

**Source Material**: Combine TanStack_Implementation_Plan.md + frontend query usage patterns

**Why It's Valuable**:
- TanStack Query is becoming React standard
- State management is a common pain point
- Good patterns reduce boilerplate

---

### 11. **pedagogical-prd-writing** 🆕 MEDIUM PRIORITY

**Why Needed**: PRD excellently incorporates learning science - pattern should be reusable

**Skill Description**:
```yaml
name: pedagogical-prd-writing
description: Write product requirement documents for educational products that incorporate learning science principles. Includes research citation practices, evidence-based design decisions, cognitive science integration, and pedagogical success criteria.
```

**Content to Create**:
```
## Structuring User Flows with Cognitive Science
- How to add "Pedagogical Rationale" sections
- Citing research to justify UX decisions
- Balancing user needs with learning science

## Research Citation Practices
- How to find relevant research (Google Scholar, ResearchGate)
- Citation format in PRDs
- Key researchers by topic (Ericsson for practice, Bjork for retention, etc.)

## Evidence-Based Parameters
- How to select parameters based on research (not guesswork)
- Example: FSRS retention rate 0.85 (optimal learning efficiency)
- Example: Immediate feedback (deliberate practice principle)

## Pedagogical Success Criteria
- How to define success beyond engagement metrics
- Learning outcome measurement
- Formative vs summative assessment
```

**Source Material**: Extract patterns from PRD – Math Deliberate Practice MVP.md

**Why It's Valuable**:
- Unique intersection of product management + learning science
- Most PRDs don't incorporate research
- Educational product space is growing

---

### 12. **postgres-migration-workflow** 🆕 MEDIUM PRIORITY

**Why Needed**: Project has migrations but workflow isn't documented

**Skill Description**:
```yaml
name: postgres-migration-workflow
description: Manage PostgreSQL schema changes using SQL migrations with version control. Includes writing migrations, testing strategies, rollback procedures, naming conventions, and team collaboration workflows.
```

**Content to Create**:
```
## Migration File Structure
- Naming convention: 001_descriptive_name.sql
- Schema changes vs data migrations
- Idempotency patterns (IF NOT EXISTS)

## Writing Schema Migrations
- CREATE TABLE patterns
- ALTER TABLE best practices
- Index creation strategies
- Constraint management

## Writing Data Migrations
- Backfilling data safely
- Handling large tables
- Avoiding downtime

## Testing Migrations
- Local testing workflow
- Staging environment validation
- Rollback testing

## Team Collaboration
- Migration numbering conflicts
- Review checklist
- Deployment coordination
```

**Source Material**: Extract from `database/migrations/` practices

**Why It's Valuable**:
- Migrations are critical but often poorly documented
- Many teams struggle with migration workflows
- Good patterns prevent production disasters

---

### 13. **shadcn-ui-component-patterns** 🆕 LOW PRIORITY

**Why Needed**: Project uses shadcn/ui extensively with custom patterns

**Skill Description**:
```yaml
name: shadcn-ui-component-patterns
description: Use shadcn/ui components effectively with customization, composition, theming, and accessibility best practices. Includes component variant patterns, custom styling approaches, and integration with Tailwind CSS.
```

**Content to Create**:
- Component customization patterns
- Composition strategies
- Theming with CSS variables
- Accessibility considerations
- Integration with form libraries

**Source Material**: Extract from `frontend/src/components/ui/` patterns

---

### 14. **responsive-mobile-first-design** 🆕 LOW PRIORITY

**Why Needed**: App is mobile-focused but design patterns aren't extracted

**Skill Description**:
```yaml
name: responsive-mobile-first-design
description: Design responsive web interfaces with mobile-first approach. Includes breakpoint strategies, touch-friendly interaction patterns, progressive enhancement, and mobile-specific UX considerations.
```

**Content to Create**:
- Mobile-first CSS patterns
- Tailwind breakpoint strategies
- Touch target sizing
- Navigation patterns (mobile vs desktop)
- Performance considerations

**Source Material**: Extract from frontend responsive patterns

---

## 📊 Priority Matrix

### **High Value + Low Effort** (Start Here)

1. ✅ **design-system-spacing** (minimal adaptation needed)
   - Effort: 1-2 hours
   - Value: Universal applicability
   - Conversion: 95% ready

2. ✅ **orm-vs-sql-decision-framework** (excellent structure already)
   - Effort: 2-3 hours
   - Value: Common technical decision
   - Conversion: 90% ready

### **High Value + Medium Effort**

3. ✅ **educational-app-ux-review** (needs framework extraction)
   - Effort: 3-4 hours
   - Value: Unique perspective
   - Conversion: 70% ready

4. ✅ **full-stack-project-setup** (needs generalization)
   - Effort: 3-4 hours
   - Value: Highly reusable
   - Conversion: 80% ready

5. 🆕 **fastapi-project-structure** (create from code)
   - Effort: 4-5 hours
   - Value: Growing demand
   - Conversion: Extract from codebase

6. 🆕 **react-tanstack-query-integration** (pattern extraction)
   - Effort: 4-5 hours
   - Value: React standard
   - Conversion: Combine docs + code

### **Medium Value + Medium Effort**

7. ✅ **ocr-pipeline-setup**
   - Effort: 3-4 hours
   - Value: Specialized but useful

8. ✅ **react-library-migration-strategy**
   - Effort: 3-4 hours
   - Value: Frontend ecosystems

9. 🆕 **pedagogical-prd-writing**
   - Effort: 4-6 hours
   - Value: Niche but unique

10. 🆕 **postgres-migration-workflow**
    - Effort: 3-4 hours
    - Value: Backend fundamentals

### **Low Priority**

11. 🆕 **shadcn-ui-component-patterns**
    - Effort: 3-4 hours
    - Value: Framework-specific

12. 🆕 **responsive-mobile-first-design**
    - Effort: 4-5 hours
    - Value: General but saturated topic

---

## 🏗️ Skill Structure Template

Based on Anthropic's skills repository format:

```markdown
---
name: skill-name-here
description: Clear, complete description of what this skill does and when to use it. Should be self-contained and explain the value proposition.
---

# Skill Name

[1-2 paragraph introduction explaining the skill's purpose and context]

## When to Use This Skill

- ✅ Specific scenario 1 where this skill applies
- ✅ Specific scenario 2 where this skill applies
- ✅ Specific scenario 3 where this skill applies
- ❌ When NOT to use this skill (important!)

## Instructions

### Step 1: [Action Name]

[Detailed, actionable instructions]

**Example**:
```language
[Code or command example]
```

### Step 2: [Action Name]

[Continue with clear steps]

### Step 3: [Action Name]

[Each step should be concrete and testable]

## Examples

### Example 1: [Scenario Name]

**Context**: [When/why you'd use this]

**Implementation**:
```language
[Complete, runnable example]
```

**Result**: [What the outcome should be]

---

### Example 2: [Different Scenario]

[Provide 2-3 diverse examples showing different use cases]

## Guidelines

### Best Practices
- ✅ Recommendation 1 with rationale
- ✅ Recommendation 2 with rationale
- ✅ Recommendation 3 with rationale

### Common Pitfalls
- ❌ Mistake 1 to avoid (and why)
- ❌ Mistake 2 to avoid (and why)
- ❌ Mistake 3 to avoid (and why)

### Edge Cases
- Special consideration 1
- Special consideration 2

## Verification Checklist

- [ ] Verification step 1
- [ ] Verification step 2
- [ ] Verification step 3

## Additional Resources

- [Official Documentation](url)
- [Related Skill](link-to-skill)
- [Research Paper](if applicable)
```

---

## 🎯 Implementation Roadmap

### **Phase 1: Quick Wins** (Week 1)

Convert the 2 highest value, lowest effort skills:

1. **design-system-spacing** 
   - Time: 1-2 hours
   - Action: Minimal adaptation of existing doc

2. **orm-vs-sql-decision-framework**
   - Time: 2-3 hours
   - Action: Generalize code examples, add other ORMs

**Deliverable**: 2 production-ready skills

---

### **Phase 2: High-Value Conversions** (Week 2)

Convert the next 4 high-value skills:

3. **educational-app-ux-review**
   - Time: 3-4 hours
   - Action: Extract framework, create templates

4. **full-stack-project-setup**
   - Time: 3-4 hours
   - Action: Generalize database setup

5. **fastapi-project-structure** (new)
   - Time: 4-5 hours
   - Action: Extract from codebase, document patterns

6. **react-tanstack-query-integration** (new)
   - Time: 4-5 hours
   - Action: Combine docs + code patterns

**Deliverable**: 4 additional skills (6 total)

---

### **Phase 3: Specialized Skills** (Week 3)

Complete medium-value skills:

7. **ocr-pipeline-setup**
8. **react-library-migration-strategy**
9. **pedagogical-prd-writing** (new)
10. **postgres-migration-workflow** (new)

**Deliverable**: 4 additional skills (10 total)

---

### **Phase 4: Optional Enhancements** (Week 4+)

11. **shadcn-ui-component-patterns** (new)
12. **responsive-mobile-first-design** (new)

**Deliverable**: 2 additional skills (12 total)

---

## 📝 Quality Checklist for Each Skill

Before considering a skill "complete", verify:

### Content Quality
- [ ] Description is clear and self-contained
- [ ] Instructions are step-by-step and actionable
- [ ] At least 2-3 concrete examples provided
- [ ] Examples are runnable/testable
- [ ] Guidelines include both dos and don'ts

### Completeness
- [ ] "When to Use" section defines scope
- [ ] "When NOT to Use" prevents misapplication
- [ ] Common pitfalls are documented
- [ ] Edge cases are addressed
- [ ] Verification checklist provided

### Usability
- [ ] Can be understood without external context
- [ ] Code examples use generic naming (not project-specific)
- [ ] Works for readers at intended skill level
- [ ] Links to additional resources provided
- [ ] Related skills are referenced

### Format
- [ ] YAML frontmatter is valid
- [ ] Markdown formatting is correct
- [ ] Code blocks have language specified
- [ ] Headings are properly nested
- [ ] Length is appropriate (not too verbose, not too terse)

---

## 🚀 Getting Started

### Option A: Start with Easiest First
1. Convert **design-system-spacing** (1-2 hours)
2. Convert **orm-vs-sql-decision-framework** (2-3 hours)
3. Build confidence, then tackle harder ones

### Option B: Start with Highest Impact
1. Convert **educational-app-ux-review** (unique value)
2. Create **fastapi-project-structure** (high demand)
3. Create **react-tanstack-query-integration** (modern standard)

### Option C: Balanced Approach
1. Convert 1 easy skill (**design-system-spacing**)
2. Create 1 new skill (**fastapi-project-structure**)
3. Convert 1 complex skill (**educational-app-ux-review**)
4. Alternate between conversion and creation

---

## 📚 Skills Repository Structure

Recommended organization:

```
.agent/
└── skills/
    ├── fullstack/
    │   ├── full-stack-project-setup/
    │   │   └── SKILL.md
    │   └── fastapi-project-structure/
    │       └── SKILL.md
    ├── frontend/
    │   ├── design-system-spacing/
    │   │   └── SKILL.md
    │   ├── react-tanstack-query-integration/
    │   │   └── SKILL.md
    │   └── react-library-migration-strategy/
    │       └── SKILL.md
    ├── backend/
    │   ├── orm-vs-sql-decision-framework/
    │   │   └── SKILL.md
    │   └── postgres-migration-workflow/
    │       └── SKILL.md
    ├── specialized/
    │   └── ocr-pipeline-setup/
    │       └── SKILL.md
    └── education/
        ├── educational-app-ux-review/
        │   └── SKILL.md
        └── pedagogical-prd-writing/
            └── SKILL.md
```

---

## 🎓 Learning from Anthropic's Skills

**Key Observations from https://github.com/anthropics/skills**:

1. **Skills are focused**: Each skill does ONE thing well
2. **Skills are self-contained**: No external dependencies in instructions
3. **Skills use concrete examples**: Not just theory, but runnable code
4. **Skills include metadata**: YAML frontmatter powers discoverability
5. **Skills are opinionated**: They recommend specific approaches, not just options

**Apply to Our Skills**:
- Focus each skill on solving ONE specific problem
- Make examples copy-pasteable
- Document the "why" behind recommendations
- Use comparison tables when presenting alternatives
- Include verification steps so users know they succeeded

---

## 📊 Success Metrics

Track these to evaluate skill quality:

### During Development
- [ ] Time to create skill (should decrease as you build more)
- [ ] Number of revisions needed
- [ ] Completeness checklist score

### After Deployment
- [ ] Can Claude use the skill effectively?
- [ ] Does the skill reduce back-and-forth questions?
- [ ] Would you personally use this skill for a new project?
- [ ] Does the skill save time compared to searching documentation?

**Goal**: Each skill should save at least 30 minutes on first use, and 1+ hours on repeated use.

---

## 🔗 Related Resources

- [Anthropic Skills Repository](https://github.com/anthropics/skills)
- [Creating Custom Skills](https://support.claude.com/en/articles/12512198-creating-custom-skills)
- [Using Skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude)
- [What are Skills?](https://support.claude.com/en/articles/12512176-what-are-skills)

---

**Last Updated**: December 10, 2024  
**Status**: Planning Phase Complete ✅  
**Next Action**: Start with Phase 1 (Quick Wins) - Convert design-system-spacing

---

## Appendix: Visual Summary

```
📁 docs/ (8 files analyzed)
│
├─ ✅ CONVERTIBLE TO SKILLS (6 files)
│  ├─ SETUP_GUIDE.md                          → full-stack-project-setup
│  ├─ Spacing System & Design Tokens Guide.md → design-system-spacing
│  ├─ orm_to_sql_migration_analysis.md        → orm-vs-sql-decision-framework
│  ├─ Pedagogy & Mastery Learning Review.md   → educational-app-ux-review
│  ├─ OCR_Implementation_Plan.md              → ocr-pipeline-setup
│  └─ TanStack_Implementation_Plan.md         → react-library-migration-strategy
│
├─ 🔄 PATTERN EXTRACTION (1 file)
│  └─ PRD – Math Deliberate Practice MVP.md   → pedagogical-prd-writing (new)
│
├─ ❌ NOT SUITABLE (1 file)
│  └─ Project Overview & Status.md            → (status tracking, too dynamic)
│
└─ 🆕 NEW SKILLS TO CREATE (5 skills)
   ├─ fastapi-project-structure              (extract from codebase)
   ├─ react-tanstack-query-integration       (extract from code + docs)
   ├─ postgres-migration-workflow            (extract from migrations/)
   ├─ shadcn-ui-component-patterns           (extract from components/ui/)
   └─ responsive-mobile-first-design          (extract from frontend patterns)

───────────────────────────────────────────────────────────
TOTAL POTENTIAL SKILLS: 12
  ├─ From Docs: 6
  ├─ Pattern Extraction: 1
  └─ New Creation: 5
```
