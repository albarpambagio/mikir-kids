# Spacing System & Design Tokens Guide

> **Purpose**: Long-term documentation for spacing system and design token integration  
> **Status**: 📚 Reference Documentation  
> **Last Updated**: Current

---

## 🎯 Overview

This document defines the spacing system used throughout the Mikir Kids application, based on Figma design tokens and verified measurements. It serves as a reference for maintaining consistent spacing across all components.

---

## 📐 Spacing System Architecture

### **Base Unit: 4px**

All spacing values are multiples of 4px, creating a consistent visual rhythm:

```
Base Unit: 4px
├── 2xs: 4px (1× base)
├── xs: 8px (2× base)
├── sm: 12px (3× base)
├── md: 16px (4× base)
├── lg: 24px (6× base)
├── xl: 32px (8× base)
├── 2xl: 48px (12× base)
└── Custom: 40px, 64px (major section breaks)
```

---

## 🎨 Design Token Mapping

### **Figma Design Tokens**

| Figma Token | Value | Tailwind Class | Usage |
|------------|-------|----------------|-------|
| `--semantic/2xs` | 4px | `p-1`, `gap-1` | Tab vertical padding, minimal spacing |
| `--semantic/xs` | 8px | `p-2`, `gap-2` | Tab horizontal padding, icon-text gap |
| `--semantic/md` | 16px | `p-4`, `px-4` | Button horizontal padding |
| `--absolute/1,5` | 6px | `gap-1.5` | Tab icon-text gap |
| Custom | 7.5px | - | Button vertical padding (handled by h-9) |

### **Standard Spacing Scale**

| Size | Value | Tailwind | Use Case |
|------|-------|-----------|----------|
| 2xs | 4px | `p-1`, `gap-1`, `mb-1` | Minimal spacing, tight layouts |
| xs | 8px | `p-2`, `gap-2`, `mb-2` | Small gaps, compact components |
| sm | 12px | `p-3`, `gap-3`, `mb-3` | Medium-small spacing |
| md | 16px | `p-4`, `gap-4`, `mb-4` | Standard component padding |
| lg | 24px | `p-6`, `gap-6`, `mb-6` | Standard element spacing |
| xl | 32px | `p-8`, `gap-8`, `mb-8` | Major section spacing |
| 2xl | 48px | `p-12`, `gap-12`, `mb-12` | Container padding (desktop) |

### **Custom Spacing Values**

These values are used for specific design requirements:

| Value | Tailwind | Use Case |
|-------|----------|----------|
| 40px | `mb-10` | Logo → Heading spacing |
| 64px | `mb-16` | Sub-heading → Tabs spacing (major break) |

---

## 📋 Component Spacing Reference

### **AuthForm Component Spacing**

Based on verified Figma measurements:

```
Container: p-6 md:p-12 (24px mobile / 48px desktop)
│
├── Logo
│   └── mb-10 (40px) → Heading
│
├── Heading "Mulai Belajar"
│   └── mb-2 (8px) → Sub-heading
│
├── Sub-heading
│   └── mb-16 (64px) → Tabs
│
├── Tabs Component
│   └── mb-6 (24px) → Info Text
│
├── Info Text
│   └── mb-6 (24px) → Input/Button
│
└── Button
    └── (no margin - last element)
```

### **Component Internal Spacing**

#### **UserIDTabs Component**
- Container padding: `p-[3px]` (3px gap between tabs)
- Tab padding: `px-2 py-1` (8px horizontal, 4px vertical)
- Icon-text gap: `gap-1.5` (6px)
- Min height: `min-h-[29px]`

#### **Button Component**
- Height: `h-9` (36px)
- Horizontal padding: `px-4` (16px)
- Icon-text gap: `gap-2` (8px) or `mr-2` (8px)
- Border radius: `rounded-full`

---

## 🔧 Implementation Guidelines

### **When to Use Each Spacing Size**

#### **Use `mb-1` to `mb-2` (4px-8px)**
- Tight spacing between related elements
- Heading → Sub-heading (when they're closely related)
- Inline elements with minimal separation

#### **Use `mb-4` to `mb-6` (16px-24px)**
- Standard spacing between form elements
- Spacing between sections within a component
- Most common spacing value

#### **Use `mb-8` to `mb-10` (32px-40px)**
- Major section breaks
- Logo → Heading
- Between distinct content blocks

#### **Use `mb-12` to `mb-16` (48px-64px)**
- Very large section breaks
- Sub-heading → Tabs (major visual break)
- Between completely separate content areas

### **Responsive Spacing**

Always consider mobile vs desktop spacing:

```tsx
// Example: Container padding
<div className="p-6 md:p-12">
  {/* 24px on mobile, 48px on desktop */}
</div>

// Example: Responsive margin
<div className="mb-6 md:mb-8">
  {/* 24px on mobile, 32px on desktop */}
</div>
```

### **Spacing Best Practices**

1. **Consistency First**: Use standard spacing values (multiples of 4px)
2. **Visual Hierarchy**: Larger spacing = more important separation
3. **Mobile First**: Start with mobile spacing, enhance for desktop
4. **Design Token Priority**: Use design tokens when available
5. **Document Exceptions**: Document any custom spacing values

---

## 🚀 Future Enhancements

### **Phase 1: Tailwind Config Extension** (Recommended)

Extend Tailwind config to include custom spacing values:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '2xs': '4px',   // --semantic/2xs
        'xs': '8px',    // --semantic/xs
        'sm': '12px',   // 3× base
        'md': '16px',   // --semantic/md
        'lg': '24px',   // 6× base (common)
        'xl': '32px',   // 8× base
        '2xl': '48px',  // 12× base (container)
        'section': '40px',  // Logo → Heading
        'break': '64px',    // Sub-heading → Tabs
      }
    }
  }
}
```

**Usage:**
```tsx
<div className="mb-section"> {/* 40px */}
<div className="mb-break">   {/* 64px */}
```

### **Phase 2: CSS Variables Integration**

Create CSS variables for design tokens:

```css
/* frontend/src/index.css or globals.css */
:root {
  /* Spacing Tokens */
  --spacing-2xs: 4px;
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  
  /* Custom Spacing */
  --spacing-section: 40px;
  --spacing-break: 64px;
}
```

**Usage:**
```tsx
<div style={{ marginBottom: 'var(--spacing-section)' }}>
```

### **Phase 3: Spacing Utility Functions**

Create TypeScript utilities for spacing:

```typescript
// frontend/src/lib/spacing.ts
export const spacing = {
  '2xs': '4px',
  'xs': '8px',
  'sm': '12px',
  'md': '16px',
  'lg': '24px',
  'xl': '32px',
  '2xl': '48px',
  'section': '40px',
  'break': '64px',
} as const;

export type SpacingSize = keyof typeof spacing;

export function getSpacing(size: SpacingSize): string {
  return spacing[size];
}
```

---

## 📊 Spacing Audit Checklist

When reviewing components for spacing consistency:

- [ ] All spacing uses 4px base unit multiples
- [ ] Standard spacing values (mb-2, mb-4, mb-6, mb-8) are used where appropriate
- [ ] Custom spacing values (mb-10, mb-16) are documented
- [ ] Responsive spacing is considered (mobile vs desktop)
- [ ] Design tokens are used when available
- [ ] Visual hierarchy is maintained through spacing
- [ ] Spacing matches Figma design specifications

---

## 🔍 Verification Process

### **How to Verify Spacing**

1. **Figma Comparison**: Compare implementation with Figma design
2. **Visual Inspection**: Check spacing feels balanced and consistent
3. **Responsive Testing**: Verify spacing on mobile, tablet, desktop
4. **Code Review**: Ensure spacing uses standard values
5. **Design Token Check**: Verify design tokens are used correctly

### **Common Spacing Issues**

1. **Inconsistent Values**: Using random spacing values instead of standard scale
2. **Missing Responsive**: Not adjusting spacing for mobile/desktop
3. **Over-spacing**: Using too large spacing values unnecessarily
4. **Under-spacing**: Elements feel cramped, need more breathing room
5. **Token Mismatch**: Not using design tokens when available

---

## 📚 Related Documentation

- [Project Overview & Status](./Project%20Overview%20&%20Status.md)
- [PRD – Math Deliberate Practice MVP](./PRD%20–%20Math%20Deliberate%20Practice%20MVP.md)

---

## 🎯 Quick Reference

### **Standard Spacing Values**

```tsx
// Minimal spacing
mb-1  // 4px
mb-2  // 8px

// Standard spacing
mb-4  // 16px
mb-6  // 24px (most common)

// Major spacing
mb-8  // 32px
mb-10 // 40px (custom)
mb-12 // 48px
mb-16 // 64px (custom - major break)
```

### **Container Padding**

```tsx
// Mobile first, desktop enhanced
p-6 md:p-12  // 24px mobile, 48px desktop
```

### **Component Gaps**

```tsx
// Icon-text gap
gap-1.5  // 6px (tabs)
gap-2    // 8px (buttons)

// Component spacing
gap-4    // 16px
gap-6    // 24px
```

---

**Last Updated**: Current  
**Maintained By**: Development Team  
**Review Frequency**: Quarterly or when design system updates

