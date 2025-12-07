# AuthLanding Page - Implementation Plan

> **Design Reference**: [Figma Design](https://www.figma.com/design/j2KPRM6TeK8sDuxMQL33Gg/Mikir-Kids-UI?node-id=2005-3&m=dev)  
> **Phase**: Phase 2 - Authentication & Onboarding  
> **Status**: 📋 Planning (Updated with Critical Fixes)

---

## ⚠️ **Critical Updates Applied**

This plan has been updated based on review against PRD and Project Overview. Key fixes:

1. ✅ **Fixed shadcn/ui Installation Commands**: Corrected to `npx shadcn@latest add button tabs input` (removed `@shadcn/` prefix)
2. ✅ **Added Grade Selection Flow**: Navigation to GradeSelection page after User ID creation (PRD Section 6.1)
3. ✅ **Added Error Handling**: Error states, validation, and standardized error messages
4. ✅ **Added Loading States**: Loading indicators during API calls
5. ✅ **Added localStorage Implementation**: User ID persistence (PRD Section 7.1)
6. ✅ **Fixed CSS Variables**: Corrected HSL format (without `hsl()` wrapper)
7. ✅ **Added API Integration Examples**: Complete API functions with error handling
8. ✅ **Added Type Definitions**: User and AuthResponse interfaces
9. ✅ **Added Validation**: User ID format validation (8 digits)

**Navigation Flow**: Create User ID → Display ID → Grade Selection → Dashboard

---

## 📐 Design Analysis

### **Layout Structure**

The design is a **split-screen landing page** with two main sections:

```
┌─────────────────────────────────────────────────────────┐
│                    Desktop Layout                        │
├──────────────────────────┬──────────────────────────────┤
│   Left Column (Hero)     │   Right Column (Auth UI)     │
│   ~50% width             │   ~50% width                 │
│                          │                              │
│  ┌────────────────────┐  │  ┌────────────────────────┐  │
│  │ Background Image   │  │  │ Logo + "Mikir Kids"    │  │
│  │ (Locker Grid)      │  │  └────────────────────────┘  │
│  │                    │  │                              │
│  │                    │  │  "Mulai Belajar" (H1)       │
│  │                    │  │                              │
│  │                    │  │  Description text            │
│  │                    │  │                              │
│  │                    │  │  ┌──────────────────────┐   │
│  │                    │  │  │ Tab: Buat User ID    │   │
│  │                    │  │  │ Tab: Gunakan User ID │   │
│  │                    │  │  └──────────────────────┘   │
│  │                    │  │                              │
│  │                    │  │  Info text                  │
│  │                    │  │                              │
│  │ Text Overlay:      │  │  [Buat User ID Button]      │
│  │ - Heading          │  │                              │
│  │ - Description      │  │                              │
│  └────────────────────┘  │                              │
│                          └──────────────────────────────┘
└─────────────────────────────────────────────────────────┘
```

### **Component Breakdown**

#### **1. Left Column - Hero Section**
- **Background Image**: Grid of 6 locker doors (2x3 layout)
  - Image URL: `imgMorenHsuVLaKsTkmVhkUnsplash1`
  - Overlay: Orange/yellow gradient with 20% opacity pattern
- **Text Overlay** (positioned bottom-left):
  - **Heading**: "Latihan Matematika dengan pendekatan bertahap"
    - Font: Inter Semibold, 24px
    - Color: White
    - Line height: 28.8px
    - Letter spacing: -1px
  - **Description**: "Pilih topik yang ingin dipelajari, kerjakan soal, dan sistem akan menjadwalkan kapan soal perlu diulang untuk memperkuat pemahamanmu."
    - Font: Inter Regular, 12px
    - Color: White
    - Line height: 16px
    - Letter spacing: 0.18px

#### **2. Right Column - Auth Interface**
- **Logo Section**:
  - Orange square icon + "Mikir Kids" text
  - Dark green text color (#001e1d)
- **Main Heading**: "Mulai Belajar"
  - Font: Inter Semibold, 48px
  - Color: #001e1d
  - Line height: 48px
  - Letter spacing: -1.5px
- **Sub-heading**: "Progres belajarmu akan tersimpan otomatis menggunakan User ID."
  - Font: Inter Semibold, 20px
  - Color: #004643
  - Line height: 24px
- **Tab Switcher**:
  - Background: #f1f5f9 (accent color)
  - Border radius: 10px
  - Padding: 3px
  - Two tabs:
    - **Active Tab**: "Buat User ID Baru"
      - Background: #abd1c6 (secondary)
      - Text: White
      - Icon: user-round-plus (16.67px)
      - Shadow: Multiple shadows for depth
    - **Inactive Tab**: "Gunakan User ID"
      - Background: Transparent
      - Text: #020617 (foreground)
      - Icon: user (16.67px)
- **Info Text**: "Kami bakal bikin User ID 8 digit khusus buat kamu. Simpan ya, biar progres belajarmu tetap aman."
  - Font: Inter Regular, 14px
  - Color: #525252 (neutral-600)
  - Line height: 21px
- **Primary Button**: "Buat User ID"
  - Background: #f9bc60 (primary/accent)
  - Text: #001e1d (primary-foreground)
  - Border radius: 9999px (full rounded)
  - Icon: Plus icon (13.25px)
  - Padding: 7.5px vertical, 16px horizontal
  - Min height: 36px
  - Width: 390px

#### **3. Decorative Elements**
- **Right Column Image**: "ChatGPT Image" (340x340px)
  - Positioned at top-right of right column
  - Object fit: cover

---

## 🎨 Design Tokens & Colors

Based on the Figma design and project setup:

### **Colors**
```css
/* Primary Colors */
--primary: #f9bc60 (orange/yellow)
--primary-foreground: #001e1d (dark green)

/* Secondary Colors */
--secondary: #abd1c6 (light green)
--secondary-foreground: #ffffff

/* Accent Colors */
--accent: #f1f5f9 (light gray)
--accent-foreground: #020617

/* Text Colors */
--foreground: #020617 (dark)
--neutral-600: #525252 (gray)

/* Brand Colors */
--brand-green: #004643
--brand-dark: #001e1d
```

### **Typography**
```css
/* Headings */
--font-headings: 'Inter', sans-serif
--heading-1-size: 48px
--heading-1-weight: 600 (Semibold)
--heading-1-line-height: 48px
--heading-1-letter-spacing: -1.5px

--heading-3-size: 24px
--heading-3-weight: 600
--heading-3-line-height: 28.8px
--heading-3-letter-spacing: -1px

--heading-4-size: 20px
--heading-4-weight: 600
--heading-4-line-height: 24px

/* Body Text */
--font-body: 'Inter', sans-serif
--paragraph-small-size: 14px
--paragraph-small-weight: 400
--paragraph-small-line-height: 21px

--paragraph-mini-size: 12px
--paragraph-mini-weight: 400
--paragraph-mini-line-height: 16px
--paragraph-mini-letter-spacing: 0.18px
```

### **Spacing & Layout**
```css
/* Border Radius */
--radius-lg-xl: 10px
--radius-full: 9999px

/* Shadows */
--shadow-sm: 0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)

/* Padding */
--padding-xs: 8px
--padding-2xs: 4px
--padding-md: 16px
```

---

## 🏗️ Implementation Plan

### **Phase 1: Project Setup & Prerequisites** ✅

**Status**: Verify dependencies are installed

- [x] React + Vite + TypeScript setup
- [x] Tailwind CSS configured
- [x] React Router installed
- [x] shadcn/ui configured (components.json exists)
- [ ] Install shadcn/ui Button component
- [ ] Install shadcn/ui Tabs component
- [ ] Install @radix-ui/react-tabs dependency
- [ ] Verify Inter font is loaded
- [ ] Set up image asset handling

**Action Items**:
1. **Install shadcn/ui components** (CORRECTED):
   ```bash
   cd frontend
   npx shadcn@latest add button
   npx shadcn@latest add tabs
   npx shadcn@latest add input
   ```
   This will:
   - Add `button.tsx` to `src/components/ui/`
   - Add `tabs.tsx` to `src/components/ui/`
   - Add `input.tsx` to `src/components/ui/` (for existing User ID input)
   - Install required dependencies (@radix-ui/react-tabs, @radix-ui/react-slot)

2. **Verify dependencies** in `package.json`:
   - `@radix-ui/react-slot` ✅ (already installed)
   - `@radix-ui/react-tabs` (will be added)
   - `class-variance-authority` ✅ (already installed)
   - `clsx` ✅ (already installed)
   - `tailwind-merge` ✅ (already installed)
   - `lucide-react` ✅ (already installed)

3. Check if Inter font is in `index.html` or CSS
4. Set up image asset directory structure
5. Download/configure background images

---

### **Phase 2: Component Structure**

#### **2.1 Create Base Components**

**File Structure**:
```
frontend/src/
├── components/
│   ├── ui/
│   │   ├── button.tsx          (shadcn/ui - installed via CLI)
│   │   ├── tabs.tsx            (shadcn/ui - installed via CLI)
│   │   ├── input.tsx           (shadcn/ui - installed via CLI)
│   │   └── ...
│   └── auth/
│       ├── AuthShell.tsx       (Layout wrapper)
│       ├── HeroSection.tsx     (Left column)
│       ├── AuthForm.tsx        (Right column)
│       └── UserIDTabs.tsx      (Tab switcher using shadcn/ui Tabs)
├── pages/
│   ├── AuthLanding.tsx         (Main page)
│   └── GradeSelection.tsx      (Grade selection page - after User ID creation)
├── types/
│   └── user.ts                 (User and AuthResponse type definitions)
├── lib/
│   ├── utils.ts                (cn() utility for shadcn/ui)
│   └── api.ts                  (API integration functions)
└── assets/
    └── images/
        └── hero-background.jpg
```

**Note**: The `lib/utils.ts` file should already exist from shadcn/ui setup. If not, create it:
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Type Definitions** (`src/types/user.ts`):
```typescript
export interface User {
  id: string; // 8-digit numeric
  grade_level: "SMP" | "SMA";
  class_level: 7 | 8 | 9 | 10 | 11 | 12;
}

export interface AuthResponse {
  userId: string;
  isNew: boolean;
}
```

**Validation Utility** (`src/lib/validation.ts`):
```typescript
/**
 * Validates User ID format (must be exactly 8 digits)
 * @param id - User ID string to validate
 * @returns true if valid, false otherwise
 */
export function validateUserId(id: string): boolean {
  return /^\d{8}$/.test(id);
}
```

**Components to Create**:

1. **`AuthShell.tsx`** - Layout wrapper
   - Handles responsive layout
   - Manages two-column structure
   - Mobile: Stack vertically
   - Desktop: Side-by-side

2. **`HeroSection.tsx`** - Left column
   - Background image container
   - Overlay gradient
   - Text overlay positioning
   - Responsive image handling

3. **`AuthForm.tsx`** - Right column
   - Logo display
   - Heading and description
   - Tab switcher
   - Info text
   - Primary button
   - Form state management

4. **`UserIDTabs.tsx`** - Tab switcher component
   - Uses shadcn/ui `Tabs` component
   - Two tabs: "Buat User ID Baru" / "Gunakan User ID"
   - Active/inactive states with custom styling
   - Icon integration (lucide-react: `UserRoundPlus`, `User`)
   - Custom styling to match Figma design (green background for active tab)

---

### **Phase 3: Styling & Design Implementation**

#### **3.1 Tailwind Configuration**

**Update `tailwind.config.js`** to include custom colors:

```javascript
theme: {
  extend: {
    colors: {
      // Add brand colors
      'brand-green': '#004643',
      'brand-dark': '#001e1d',
      'brand-orange': '#f9bc60',
      'brand-light-green': '#abd1c6',
      'neutral-600': '#525252',
    },
    fontFamily: {
      headings: ['Inter', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
    },
  },
}
```

#### **3.2 CSS Variables**

**Create `src/styles/globals.css`** (if not exists):

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

:root {
  /* Colors from design */
  --primary: #f9bc60;
  --primary-foreground: #001e1d;
  --secondary: #abd1c6;
  --accent: #f1f5f9;
  --foreground: #020617;
  --neutral-600: #525252;
  
  /* Typography */
  --font-headings: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Spacing */
  --radius-lg-xl: 10px;
  --radius-full: 9999px;
}
```

---

### **Phase 3.5: shadcn/ui Integration & Customization**

#### **3.5.1 Component Installation**

**Install Required Components** (CORRECTED):
```bash
cd frontend
npx shadcn@latest add button
npx shadcn@latest add tabs
npx shadcn@latest add input
```

This will:
- Create `src/components/ui/button.tsx`
- Create `src/components/ui/tabs.tsx`
- Create `src/components/ui/input.tsx` (for existing User ID input)
- Install `@radix-ui/react-tabs` dependency
- Update `components.json` if it exists

**Note**: Input component is needed for the "Gunakan User ID" tab where users enter their existing User ID.

#### **3.5.2 Verify Utils Setup**

**Check `src/lib/utils.ts` exists**:
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

If missing, create it. This utility is essential for merging Tailwind classes with shadcn/ui components.

#### **3.5.3 Customizing shadcn/ui Components**

**Button Component Customization**:
- shadcn/ui Button is already flexible via `variant` and `size` props
- For this design, use default variant with custom className:
  ```tsx
  <Button className="bg-[#f9bc60] text-[#001e1d] hover:bg-[#f9bc60]/90">
    Button Text
  </Button>
  ```

**Tabs Component Customization**:
- The Tabs component uses Radix UI primitives
- Customize via className props on `TabsList` and `TabsTrigger`
- Use `data-[state=active]` and `data-[state=inactive]` for state-based styling
- Example in `UserIDTabs.tsx` implementation above

#### **3.5.4 Design Token Integration**

**Update CSS Variables** to match shadcn/ui pattern:
```css
:root {
  /* shadcn/ui compatible colors (HSL format without hsl() wrapper) */
  --primary: 40 95% 68%; /* #f9bc60 in HSL */
  --primary-foreground: 180 100% 6%; /* #001e1d */
  --secondary: 160 30% 75%; /* #abd1c6 */
  --secondary-foreground: 0 0% 100%;
  --accent: 210 20% 96%; /* #f1f5f9 */
  --accent-foreground: 222 47% 5%; /* #020617 */
  --foreground: 222 47% 5%; /* #020617 */
  
  /* Additional brand colors */
  --brand-green: 178 100% 14%; /* #004643 */
  --brand-dark: 180 100% 6%; /* #001e1d */
  --neutral-600: 0 0% 32%; /* #525252 */
  
  /* Border radius */
  --radius: 10px;
}
```

**Note**: shadcn/ui uses HSL color format without `hsl()` wrapper in CSS variables. The format is `H S% L%` (e.g., `40 95% 68%` not `hsl(40, 95%, 68%)`).

#### **3.5.5 Component Usage Patterns**

**Best Practices**:
1. **Always use `cn()` utility** for conditional classes:
   ```tsx
   className={cn("base-classes", condition && "conditional-classes")}
   ```

2. **Extend, don't override**: Use className prop to add custom styles rather than modifying component files directly

3. **Leverage variants**: Use built-in variants when possible, add custom ones if needed

4. **Accessibility**: shadcn/ui components include ARIA attributes by default - maintain them

5. **Icons**: Use `lucide-react` (already installed) for consistent iconography

---

### **Phase 4: Component Implementation Details**

#### **4.1 AuthShell Component**

**Responsibilities**:
- Two-column layout (desktop) / stacked (mobile)
- Full viewport height
- Background color management

**Props**:
```typescript
interface AuthShellProps {
  children: React.ReactNode;
  heroContent: React.ReactNode;
}
```

**Implementation Notes**:
- Use CSS Grid or Flexbox for layout
- Breakpoint: `md:` (768px) for desktop layout
- Left column: `md:w-1/2`
- Right column: `md:w-1/2`

#### **4.2 HeroSection Component**

**Responsibilities**:
- Display background image
- Apply overlay gradient
- Position text overlay
- Handle image loading states

**Props**:
```typescript
interface HeroSectionProps {
  backgroundImage: string;
  heading: string;
  description: string;
}
```

**Implementation Notes**:
- Use `background-image` with `object-cover`
- Overlay: `bg-[#f9bc60] opacity-20` with pattern
- Text: Absolute positioning bottom-left
- Padding: `48px` from edges

#### **4.3 AuthForm Component**

**Responsibilities**:
- Display logo
- Show heading and description
- Render tab switcher
- Display info text
- Handle button click
- Manage form state (new vs existing user)

**Props**:
```typescript
interface AuthFormProps {
  onCreateUserID: () => void;
  onUseExistingID: (userId: string) => void;
}
```

**State Management**:
```typescript
const [activeTab, setActiveTab] = useState<'new' | 'existing'>('new');
const [userId, setUserId] = useState('');
const [error, setError] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(false);
```

**User ID Validation**:
```typescript
const validateUserId = (id: string): boolean => {
  return /^\d{8}$/.test(id);
};
```

**Implementation Example** (`src/components/auth/AuthForm.tsx`):
```typescript
import { useState, useEffect } from "react"
import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserIDTabs } from "./UserIDTabs"
import { Input } from "@/components/ui/input"
import { validateUserId } from "@/lib/validation"

interface AuthFormProps {
  onCreateUserID: () => Promise<void>;
  onUseExistingID: (userId: string) => Promise<void>;
  savedUserId?: string | null; // Optional: pre-fill with saved User ID
}

export function AuthForm({ onCreateUserID, onUseExistingID, savedUserId }: AuthFormProps) {
  const [activeTab, setActiveTab] = useState<'new' | 'existing'>('new');
  const [userId, setUserId] = useState(savedUserId || '');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill User ID if saved and switch to existing tab
  useEffect(() => {
    if (savedUserId && validateUserId(savedUserId)) {
      setUserId(savedUserId);
      setActiveTab('existing');
    }
  }, [savedUserId]);

  const handleSubmit = async () => {
    setError(null);
    
    if (activeTab === 'existing') {
      // Validate User ID format
      if (!userId.trim()) {
        setError('User ID harus diisi.');
        return;
      }
      
      if (!validateUserId(userId.trim())) {
        setError('User ID harus 8 angka.');
        return;
      }
    }

    setIsLoading(true);
    try {
      if (activeTab === 'new') {
        await onCreateUserID();
      } else {
        await onUseExistingID(userId.trim());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-12">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#f9bc60] rounded" />
        <span className="text-xl font-semibold text-[#001e1d]">Mikir Kids</span>
      </div>

      {/* Heading */}
      <h1 className="text-[48px] font-semibold text-[#001e1d] leading-[48px] tracking-[-1.5px]">
        Mulai Belajar
      </h1>

      {/* Sub-heading */}
      <p className="text-[20px] font-semibold text-[#004643] leading-[24px]">
        Progres belajarmu akan tersimpan otomatis menggunakan User ID.
      </p>

      {/* Tab Switcher */}
      <UserIDTabs value={activeTab} onValueChange={(value) => {
        setActiveTab(value);
        setError(null); // Clear error when switching tabs
      }} />

      {/* Info Text */}
      <p className="text-sm text-[#525252] leading-[21px]">
        Kami bakal bikin User ID 8 digit khusus buat kamu. Simpan ya, biar progres belajarmu tetap aman.
      </p>

      {/* Existing User ID Input (shown when "Gunakan User ID" tab is active) */}
      {activeTab === 'existing' && (
        <Input
          type="text"
          placeholder="Masukkan User ID"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
            setError(null); // Clear error on input change
          }}
          className="w-full"
          disabled={isLoading}
        />
      )}

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      {/* Primary Button */}
      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-[#f9bc60] text-[#001e1d] hover:bg-[#f9bc60]/90 rounded-full h-9 px-4 w-full md:w-[390px] disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
            Memproses...
          </>
        ) : (
          <>
            <Plus className="w-3.5 h-3.5 mr-2" />
            {activeTab === 'new' ? 'Buat User ID' : 'Gunakan User ID'}
          </>
        )}
      </Button>
    </div>
  );
}
```

**Implementation Notes**:
- Uses shadcn/ui `Button` component with custom styling
- Logo: Orange square + "Mikir Kids" text
- Tab switcher: Uses `UserIDTabs` component (shadcn/ui based)
- Button: Primary action with orange background, matches Figma design
- Form validation: Validate User ID format (8 digits) for existing users
- Conditional rendering: Show input field only when "existing" tab is active
- Error handling: Display error messages for validation and API errors
- Loading states: Show loading spinner and disable button during API calls
- Error clearing: Clear errors when user switches tabs or modifies input

#### **4.4 UserIDTabs Component**

**Responsibilities**:
- Display two tabs using shadcn/ui `Tabs` component
- Handle tab switching
- Show active/inactive states with custom styling
- Display icons from lucide-react

**Props**:
```typescript
interface UserIDTabsProps {
  value: 'new' | 'existing';
  onValueChange: (value: 'new' | 'existing') => void;
}
```

**Implementation Example** (`src/components/auth/UserIDTabs.tsx`):
```typescript
import { User, UserRoundPlus } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface UserIDTabsProps {
  value: 'new' | 'existing';
  onValueChange: (value: 'new' | 'existing') => void;
}

export function UserIDTabs({ value, onValueChange }: UserIDTabsProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList className="bg-accent p-[3px] rounded-[10px]">
        <TabsTrigger
          value="new"
          className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-[10px] min-h-[29px]",
            "data-[state=active]:bg-secondary data-[state=active]:text-white",
            "data-[state=active]:shadow-sm",
            "data-[state=inactive]:bg-transparent data-[state=inactive]:text-foreground"
          )}
        >
          <UserRoundPlus className="w-4 h-4" />
          <span className="text-sm font-semibold">Buat User ID Baru</span>
        </TabsTrigger>
        <TabsTrigger
          value="existing"
          className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-[10px] min-h-[29px]",
            "data-[state=active]:bg-secondary data-[state=active]:text-white",
            "data-[state=active]:shadow-sm",
            "data-[state=inactive]:bg-transparent data-[state=inactive]:text-foreground"
          )}
        >
          <User className="w-4 h-4" />
          <span className="text-sm font-semibold">Gunakan User ID</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
```

**Implementation Notes**:
- Uses shadcn/ui `Tabs`, `TabsList`, and `TabsTrigger` components
- Icons: `UserRoundPlus` and `User` from lucide-react
- Active tab: `bg-secondary` (#abd1c6), white text, shadow
- Inactive tab: Transparent background, dark text
- Custom styling matches Figma design exactly
- Uses `cn()` utility for conditional classes

---

### **Phase 5: Integration & Routing**

#### **5.1 Create AuthLanding Page**

**File**: `src/pages/AuthLanding.tsx`

**Responsibilities**:
- Compose AuthShell, HeroSection, and AuthForm
- Handle navigation to next step (GradeSelection)
- Integrate with backend API
- Manage loading/error states
- Handle localStorage for User ID persistence

**Navigation Flow**:
```typescript
// After User ID creation/validation
// Flow: Create User ID → Display ID → Grade Selection → Dashboard
navigate('/grade-selection', { 
  state: { userId: newUserId, isNew: true } 
});

// For existing users
navigate('/grade-selection', { 
  state: { userId: existingUserId, isNew: false } 
});
```

#### **5.2 API Integration**

**Backend Endpoints** (from project docs):
- `POST /api/users` - Create new user
- `GET /api/users/{userId}` - Validate existing user

**API Implementation** (`src/lib/api.ts`):
```typescript
import { AuthResponse, User } from "@/types/user"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export async function createUser(): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Network error' }));
    throw new Error(error.detail || 'Gagal membuat User ID. Silakan coba lagi.');
  }
  
  const data = await response.json();
  return { userId: data.user_id, isNew: true };
}

export async function validateUser(userId: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('User ID tidak ditemukan. Coba lagi atau buat baru.');
    }
    const error = await response.json().catch(() => ({ detail: 'Network error' }));
    throw new Error(error.detail || 'Koneksi bermasalah. Silakan coba lagi.');
  }
  
  return await response.json();
}
```

**Error Message Standards**:
- **User ID not found**: "User ID tidak ditemukan. Coba lagi atau buat baru."
- **Invalid format**: "User ID harus 8 angka."
- **Network error**: "Koneksi bermasalah. Silakan coba lagi."
- **Generic error**: "Terjadi kesalahan. Silakan coba lagi."

#### **5.3 localStorage Implementation**

**Save User ID** (for convenience, as mentioned in PRD Section 7.1):
```typescript
// After successful User ID creation/validation
localStorage.setItem('mikir_kids_user_id', userId);
```

**Retrieve User ID**:
```typescript
// On page load, check for saved User ID
const savedUserId = localStorage.getItem('mikir_kids_user_id');
if (savedUserId && validateUserId(savedUserId)) {
  // Pre-fill input or auto-validate
  setUserId(savedUserId);
}
```

**Clear User ID** (optional, for logout):
```typescript
localStorage.removeItem('mikir_kids_user_id');
```

**Complete AuthLanding Implementation** (`src/pages/AuthLanding.tsx`):
```typescript
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { AuthShell } from "@/components/auth/AuthShell"
import { HeroSection } from "@/components/auth/HeroSection"
import { AuthForm } from "@/components/auth/AuthForm"
import { createUser, validateUser } from "@/lib/api"
import { validateUserId } from "@/lib/validation"

export function AuthLanding() {
  const navigate = useNavigate();
  const [savedUserId, setSavedUserId] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved User ID on mount
    const saved = localStorage.getItem('mikir_kids_user_id');
    if (saved && validateUserId(saved)) {
      setSavedUserId(saved);
    }
  }, []);

  const handleCreateUserID = async () => {
    try {
      const response = await createUser();
      // Save to localStorage
      localStorage.setItem('mikir_kids_user_id', response.userId);
      // Navigate to grade selection
      navigate('/grade-selection', { 
        state: { userId: response.userId, isNew: true } 
      });
    } catch (error) {
      throw error; // Let AuthForm handle error display
    }
  };

  const handleUseExistingID = async (userId: string) => {
    try {
      const user = await validateUser(userId);
      // Save to localStorage
      localStorage.setItem('mikir_kids_user_id', userId);
      // Navigate to grade selection
      navigate('/grade-selection', { 
        state: { userId: userId, isNew: false, user } 
      });
    } catch (error) {
      throw error; // Let AuthForm handle error display
    }
  };

  return (
    <AuthShell
      heroContent={
        <HeroSection
          backgroundImage="/assets/images/hero-background.jpg"
          heading="Latihan Matematika dengan pendekatan bertahap"
          description="Pilih topik yang ingin dipelajari, kerjakan soal, dan sistem akan menjadwalkan kapan soal perlu diulang untuk memperkuat pemahamanmu."
        />
      }
    >
      <AuthForm
        onCreateUserID={handleCreateUserID}
        onUseExistingID={handleUseExistingID}
        savedUserId={savedUserId}
      />
    </AuthShell>
  );
}
```

---

### **Phase 6: Responsive Design**

#### **6.1 Mobile Breakpoints**

**Mobile (< 768px)**:
- Stack columns vertically
- Hero section: Full width, reduced height
- Text overlay: Adjust positioning
- Button: Full width
- Tabs: Full width container

**Tablet (768px - 1024px)**:
- Maintain two-column layout
- Adjust font sizes slightly
- Optimize image sizes

**Desktop (> 1024px)**:
- Full design as specified
- Max width constraints
- Centered layout

#### **6.2 Image Optimization**

- Use `srcset` for responsive images
- Lazy load background image
- Provide fallback colors
- Optimize image formats (WebP with fallback)

---

### **Phase 7: Polish & Testing**

#### **7.1 Accessibility**

- [ ] Semantic HTML structure
- [ ] ARIA labels for tabs
- [ ] Keyboard navigation support
- [ ] Focus states for interactive elements
- [ ] Alt text for images
- [ ] Color contrast verification

#### **7.2 Performance**

- [ ] Image lazy loading
- [ ] Font loading optimization
- [ ] Code splitting
- [ ] Bundle size check

#### **7.3 Testing Checklist**

- [ ] Desktop layout matches design
- [ ] Mobile layout is usable
- [ ] Tab switching works
- [ ] Button click triggers correct action
- [ ] Form validation works
- [ ] API integration (when ready)
- [ ] Error handling
- [ ] Loading states

---

## 📋 Implementation Checklist

### **Setup & Prerequisites**
- [ ] **Install shadcn/ui components** (CORRECTED):
  ```bash
  cd frontend
  npx shadcn@latest add button
  npx shadcn@latest add tabs
  npx shadcn@latest add input
  ```
- [ ] Verify `lib/utils.ts` exists with `cn()` function
- [ ] Verify Inter font is loaded
- [ ] Set up image asset directory
- [ ] Download/configure background images
- [ ] Update Tailwind config with brand colors
- [ ] Update CSS variables to match design tokens

### **Component Creation**
- [ ] Verify shadcn/ui `button.tsx` exists in `src/components/ui/`
- [ ] Verify shadcn/ui `tabs.tsx` exists in `src/components/ui/`
- [ ] Verify shadcn/ui `input.tsx` exists in `src/components/ui/`
- [ ] Create `lib/utils.ts` with `cn()` function (if not exists)
- [ ] Create `types/user.ts` with User and AuthResponse types
- [ ] Create `lib/validation.ts` with validateUserId function
- [ ] Create `lib/api.ts` with createUser and validateUser functions
- [ ] Create `AuthShell.tsx`
- [ ] Create `HeroSection.tsx`
- [ ] Create `UserIDTabs.tsx` (using shadcn/ui Tabs)
- [ ] Create `AuthForm.tsx` (using shadcn/ui Button) with error/loading states
- [ ] Create `AuthLanding.tsx` page with API integration
- [ ] Create `GradeSelection.tsx` page (for navigation after User ID creation)

### **Styling**
- [ ] Implement left column hero section
- [ ] Implement right column auth form
- [ ] Style tab switcher
- [ ] Style primary button
- [ ] Add responsive breakpoints

### **Functionality**
- [ ] Tab switching logic
- [ ] Form state management
- [ ] User ID validation (8 digits)
- [ ] Error handling and display
- [ ] Loading states during API calls
- [ ] Button click handlers
- [ ] API integration (create/validate user)
- [ ] localStorage implementation (save/retrieve User ID)
- [ ] Navigation to GradeSelection page after User ID creation
- [ ] Complete flow: Create ID → Grade Selection → Dashboard

### **Polish**
- [ ] Responsive design testing
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Error handling (all error scenarios covered)
- [ ] Loading state UX (spinners, disabled states)
- [ ] localStorage persistence testing
- [ ] Full user flow testing (Create ID → Grade Selection → Dashboard)

---

## 🎯 Success Criteria

The implementation is complete when:

1. ✅ **Visual Match**: Layout matches Figma design (desktop)
2. ✅ **Responsive**: Works on mobile devices
3. ✅ **Functional**: Tab switching and button clicks work
4. ✅ **Validation**: User ID format validation (8 digits) works correctly
5. ✅ **Error Handling**: All error scenarios display appropriate messages
6. ✅ **Loading States**: Loading indicators show during API calls
7. ✅ **API Integration**: Connects to backend API and handles responses
8. ✅ **localStorage**: User ID persistence works (save/retrieve)
9. ✅ **Navigation Flow**: Complete flow works: Create ID → Grade Selection → Dashboard
10. ✅ **Accessible**: Meets basic accessibility standards
11. ✅ **Performant**: Loads quickly, smooth interactions

---

## 🔗 Related Documentation

- [Project Overview](./Project%20Overview%20&%20Status.md) - Overall project status
- [PRD](./PRD%20–%20Math%20Deliberate%20Practice%20MVP.md) - Product requirements
- [Tech Stack](./tech%20stack%20and%20project%20setup.md) - Technical setup

---

## 📝 Notes

- **shadcn/ui Components**: 
  - Components are copied into your project (not npm packages), so you can customize them directly
  - Always use `cn()` utility for class merging
  - Components follow Radix UI patterns for accessibility
  - Customize via className props rather than modifying component files when possible

- **Image Assets**: Background images are available via Figma API URLs (valid for 7 days). Download and store locally.

- **Icons**: Use `lucide-react` for icons (already installed)

- **State Management**: Consider using Zustand for global auth state

- **API Mocking**: Can mock API responses during development if backend isn't ready

- **User ID Flow**: After User ID creation, user must navigate to GradeSelection page (PRD Section 6.1). The flow is:
  - Create User ID → Display ID → Grade Selection → Dashboard
  - This navigation is handled in `AuthLanding.tsx` after successful API call

- **Error Messages**: Standardized error messages are defined in Phase 5.2. Always use these exact messages for consistency.

- **localStorage**: User ID is saved to localStorage for convenience (PRD Section 7.1). This is optional but improves UX by pre-filling the User ID input on return visits.

- **Component Customization**: 
  - shadcn/ui components are designed to be customized
  - Use Tailwind classes via className prop
  - For design-specific styling, use direct color values (e.g., `bg-[#f9bc60]`)
  - Consider creating component variants if patterns repeat

---

**Last Updated**: December 2024  
**Next Steps**: Begin Phase 2 - Component Creation

