# Dashboard Missing States & Edge Cases

> **Purpose**: Comprehensive list of missing UI states from the Figma design that need to be implemented  
> **Related**: [Project Overview & Status](./Project%20Overview%20&%20Status.md), [Dashboard Missing Features Analysis](./Dashboard%20Missing%20Features%20Analysis.md)  
> **Status**: 📋 Planning Document

---

## 📋 Overview

The Figma design shows the **"happy path"** - the ideal state when all data is loaded and everything works correctly. However, a production-ready dashboard needs to handle many additional states that aren't shown in the design.

This document identifies all missing states that must be implemented for a complete, robust dashboard experience.

---

## 🎯 State Categories

### **1. Loading States** ⏳
### **2. Empty States** 📭
### **3. Error States** ❌
### **4. Interactive States** 🖱️
### **5. Edge Cases** 🔀
### **6. Accessibility States** ♿

---

## 1. ⏳ Loading States

### **1.1 Initial Page Load**

**Missing from Design**: What shows while dashboard data is being fetched?

**Components Affected**:
- KPI Cards (3 cards)
- Question List Items
- Filter Dropdowns (may need data to populate)

**Implementation**:
```tsx
// Use shadcn Skeleton component
<Skeleton className="h-[193px] w-[213px] rounded-[20px]" /> // KPI Card
<Skeleton className="h-[109px] w-full rounded-[20px]" />    // Question List Item
```

**Design Specs**:
- Match card dimensions exactly
- Use subtle gray color (`#f5f5f5` background)
- Animate with pulse effect (shadcn Skeleton default)
- Show 3 skeleton KPI cards
- Show 3-5 skeleton question list items

**User Experience**:
- Show skeletons immediately (no blank screen)
- Replace with real data when loaded
- No flash of content (smooth transition)

---

### **1.2 Partial Loading States**

**Missing from Design**: What if some data loads faster than others?

**Scenarios**:
- KPI stats load, but question list still loading
- Question list loads, but filters still loading
- User profile loads, but stats don't

**Implementation**:
- Show loaded data immediately
- Keep skeletons for missing data
- No blocking - progressive loading

---

### **1.3 Filter Loading State**

**Missing from Design**: What shows when filters are being populated?

**Scenarios**:
- Filter options are being fetched from API
- Filter is disabled while loading
- Show spinner or skeleton in dropdown

**Implementation**:
```tsx
<Select disabled={isLoadingFilters}>
  {isLoadingFilters ? (
    <SelectItem disabled>Memuat...</SelectItem>
  ) : (
    // Filter options
  )}
</Select>
```

---

## 2. 📭 Empty States

### **2.1 No Questions State**

**Missing from Design**: What shows when user has no questions yet?

**Scenarios**:
- New user (never practiced)
- All filters applied, no matches
- User completed all questions

**Design Requirements**:
- Empty state illustration or icon
- Helpful message: "Belum ada soal yang dikerjakan"
- CTA button: "Mulai Latihan Sekarang"
- Match design system colors

**Implementation**:
```tsx
<div className="flex flex-col items-center justify-center py-16">
  <EmptyIcon className="w-24 h-24 text-muted-foreground mb-4" />
  <h3 className="text-xl font-semibold mb-2">
    Belum ada soal yang dikerjakan
  </h3>
  <p className="text-muted-foreground mb-6 text-center max-w-md">
    Mulai latihan sekarang untuk melihat progress kamu di sini.
  </p>
  <Button onClick={handleStartPractice}>
    Mulai Latihan Sekarang
  </Button>
</div>
```

**Design Specs**:
- Icon: 96px × 96px, gray (`#737373`)
- Heading: Inter Bold, 20px
- Description: Inter Light, 15px, centered, max-width 400px
- Button: Primary orange style

---

### **2.2 No KPI Data State**

**Missing from Design**: What if user has no stats yet?

**Scenarios**:
- New user (all zeros)
- API returns null/undefined

**Implementation**:
- Show "0" or "-" for values
- Keep card structure
- Maybe show "Belum ada data" message

**Design Specs**:
- Display "0" for numeric values
- Display "-" or "N/A" for percentages
- Keep same card styling
- Don't hide cards (maintain layout)

---

### **2.3 Empty Filter Results**

**Missing from Design**: What if filters return no results?

**Scenarios**:
- Selected "Kelas 7" but no questions for that grade
- Selected "Topik: Aljabar" but no questions in that topic

**Implementation**:
```tsx
<div className="text-center py-12">
  <p className="text-muted-foreground mb-4">
    Tidak ada soal yang sesuai dengan filter yang dipilih.
  </p>
  <Button variant="outline" onClick={handleClearFilters}>
    Hapus Filter
  </Button>
</div>
```

**Design Specs**:
- Message: Inter Light, 15px, gray
- Button: Outline variant
- Show between filters and question list area

---

## 3. ❌ Error States

### **3.1 API Error - KPI Stats**

**Missing from Design**: What if API fails to load stats?

**Scenarios**:
- Network error
- Server error (500)
- Timeout
- Invalid response

**Implementation**:
```tsx
<div className="bg-red-50 border border-red-200 rounded-[20px] p-4">
  <div className="flex items-center gap-2 mb-2">
    <AlertCircle className="w-5 h-5 text-red-600" />
    <p className="text-sm font-medium text-red-800">
      Gagal memuat statistik
    </p>
  </div>
  <Button 
    variant="outline" 
    size="sm"
    onClick={handleRetry}
    className="mt-2"
  >
    Coba Lagi
  </Button>
</div>
```

**Design Specs**:
- Error card: Red background (`#fef2f2`), red border (`#fecaca`)
- Icon: AlertCircle from Lucide, red (`#dc2626`)
- Message: Inter Medium, 14px, red (`#991b1b`)
- Retry button: Outline variant, small size

---

### **3.2 API Error - Question List**

**Missing from Design**: What if question list fails to load?

**Implementation**:
- Similar to KPI error, but in question list area
- Show error message
- Retry button
- Maybe show cached data if available

---

### **3.3 Network Error**

**Missing from Design**: What if user is offline?

**Scenarios**:
- No internet connection
- Slow/unstable connection
- API endpoint unreachable

**Implementation**:
```tsx
<div className="bg-yellow-50 border border-yellow-200 rounded-[20px] p-4">
  <div className="flex items-center gap-2">
    <WifiOff className="w-5 h-5 text-yellow-600" />
    <p className="text-sm text-yellow-800">
      Tidak ada koneksi internet. Periksa koneksi kamu.
    </p>
  </div>
</div>
```

**Design Specs**:
- Warning card: Yellow background (`#fefce8`), yellow border (`#fef08a`)
- Icon: WifiOff from Lucide
- Message: Inter Light, 14px, yellow (`#854d0e`)

---

### **3.4 Validation Errors**

**Missing from Design**: What if filter selection is invalid?

**Scenarios**:
- Invalid grade/topic combination
- Filter value doesn't exist

**Implementation**:
- Show inline error below filter
- Disable filter or show error state
- Clear error when filter changes

---

## 4. 🖱️ Interactive States

### **4.1 Hover States**

**Missing from Design**: What happens when user hovers over interactive elements?

**Components Needing Hover States**:

#### **4.1.1 CTA Card Hover**
```tsx
className="hover:bg-[#f8b350] hover:shadow-lg transition-all cursor-pointer"
```
- Slightly darker orange (`#f8b350`)
- Increased shadow
- Smooth transition (200ms)
- Cursor pointer

#### **4.1.2 Question List Item Hover**
```tsx
className="hover:border-[#94a3b8] hover:shadow-md transition-all cursor-pointer"
```
- Darker border (`#94a3b8`)
- Subtle shadow
- Smooth transition
- Cursor pointer

#### **4.1.3 KPI Card Hover** (if clickable)
```tsx
className="hover:shadow-lg transition-shadow"
```
- Increased shadow
- Smooth transition

#### **4.1.4 Filter Dropdown Hover**
- Handled by shadcn Select component
- Default hover states included

#### **4.1.5 User Profile Dropdown Hover**
- Handled by shadcn DropdownMenu component
- Default hover states included

**Design Specs**:
- All hover transitions: 200ms ease-in-out
- Shadow increase: `shadow-sm` → `shadow-md` or `shadow-lg`
- Color changes: 5-10% darker/lighter
- Cursor: `pointer` for clickable elements

---

### **4.2 Active/Pressed States**

**Missing from Design**: What happens when user clicks/presses?

**Components**:
- CTA Card: Active state (pressed down)
- Question List Item: Active state
- Buttons: Handled by shadcn

**Implementation**:
```tsx
className="active:scale-[0.98] active:shadow-sm transition-transform"
```
- Slight scale down (98%)
- Reduced shadow
- Smooth transition

---

### **4.3 Focus States**

**Missing from Design**: Keyboard navigation focus indicators

**Components**:
- CTA Card (if keyboard accessible)
- Question List Items
- Filter Dropdowns
- User Profile Dropdown

**Implementation**:
```tsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9bc60] focus-visible:ring-offset-2"
```
- Ring: 2px, orange (`#f9bc60`)
- Offset: 2px
- Only visible on keyboard focus (not mouse)

**Accessibility**:
- All interactive elements must be keyboard accessible
- Tab order: Logo → Filters → Question Items → User Profile
- Enter/Space to activate

---

### **4.4 Selected/Active Filter State**

**Missing from Design**: How to show which filters are active?

**Implementation**:
- Highlight selected filter value
- Maybe show "X" to clear filter
- Visual indicator (checkmark, different color)

**Design Specs**:
- Selected: Orange border or background tint
- Clear button: Small "X" icon on right
- Show active filter count badge

---

## 5. 🔀 Edge Cases

### **5.1 Zero Values**

**Missing from Design**: How to display zero stats?

**Scenarios**:
- Total Skor: 0
- Jumlah Soal: 0
- Tingkat Retensi: 0%
- Due: 0 Soal

**Implementation**:
- Show "0" (not hide)
- For percentages: Show "0%" (not "-")
- For "Due": Show "Due: 0 Soal" or "Tidak ada soal due"

**Design Specs**:
- Keep same styling
- Don't use gray/muted (still important info)
- Maybe add tooltip: "Mulai latihan untuk melihat progress"

---

### **5.2 Very Large Numbers**

**Missing from Design**: What if numbers exceed card width?

**Scenarios**:
- Total Skor: 999,999
- Jumlah Soal: 10,000
- Percentage: 100% (should fit, but verify)

**Implementation**:
- Use number formatting (commas: 1,000)
- Truncate with ellipsis if needed
- Responsive font sizing
- Tooltip to show full number

---

### **5.3 Long Topic Names**

**Missing from Design**: What if topic name is very long?

**Scenarios**:
- "Persamaan Linear Satu Variabel dengan Koefisien Pecahan"
- Topic name wraps or truncates?

**Implementation**:
```tsx
<p className="truncate" title={fullTopicName}>
  {topicName}
</p>
```
- Truncate with ellipsis
- Show full name on hover (tooltip)
- Max 2 lines with `line-clamp-2`

---

### **5.4 Many Question Items**

**Missing from Design**: What if there are 50+ questions?

**Scenarios**:
- Scrollable list
- Pagination
- Infinite scroll
- "Load more" button

**Implementation**:
- Scrollable container (max-height)
- Show scrollbar when needed
- Maybe pagination (10-15 items per page)
- Or infinite scroll (load more on scroll)

**Design Specs**:
- Max height: ~600px (viewport dependent)
- Smooth scrolling
- Show scroll indicator
- Maybe "Show more" button at bottom

---

### **5.5 No User Name**

**Missing from Design**: CTA says "Halo, [name]" - what if no name?

**Scenarios**:
- User hasn't set name
- API doesn't return name
- Name is null/undefined

**Implementation**:
```tsx
<p>Halo, {userName || 'Pengguna'}</p>
```
- Fallback: "Halo, Pengguna" or "Halo!"
- Or: "Halo, mulai latihan sekarang" (combine lines)

---

### **5.6 Circular Progress Edge Cases**

**Missing from Design**: Edge cases for circular progress

**Scenarios**:
- 0% progress (show red circle? empty circle?)
- 100% progress (full circle, green)
- Negative values (shouldn't happen, but handle)
- >100% values (shouldn't happen, but cap at 100%)

**Implementation**:
```tsx
const clampedValue = Math.max(0, Math.min(100, value));
const color = clampedValue === 0 
  ? '#e11d48' // Red for 0%
  : clampedValue >= 80 
    ? '#84cc16' // Green
    : clampedValue >= 50 
      ? '#facc15' // Yellow
      : '#e11d48'; // Red
```

---

### **5.7 Responsive Edge Cases**

**Missing from Design**: Mobile/tablet specific states

**Scenarios**:
- Very small screen (< 375px)
- Landscape mobile
- Tablet (768px - 1024px)
- Very large screen (> 1920px)

**Implementation**:
- Stack KPI cards vertically on mobile
- Full-width CTA card on mobile
- Adjust question list item layout
- Maybe hide some elements on very small screens

---

## 6. ♿ Accessibility States

### **6.1 Screen Reader States**

**Missing from Design**: ARIA labels and descriptions

**Required**:
- `aria-label` for CTA card: "Mulai latihan sekarang"
- `aria-label` for KPI cards: "Total Skor: 75"
- `aria-label` for question items: "Persamaan Linear, 80% progress, 5 soal due"
- `aria-label` for filters: "Filter berdasarkan kelas"
- `aria-live` region for loading/error messages

**Implementation**:
```tsx
<div 
  role="button"
  aria-label="Mulai latihan sekarang"
  tabIndex={0}
  onClick={handleStartPractice}
>
  {/* CTA Card content */}
</div>
```

---

### **6.2 Keyboard Navigation**

**Missing from Design**: Full keyboard support

**Required**:
- Tab through all interactive elements
- Enter/Space to activate
- Escape to close dropdowns
- Arrow keys for filter navigation (if applicable)

**Implementation**:
- All clickable elements must be keyboard accessible
- Use semantic HTML (`<button>`, `<a>`)
- Or add `tabIndex={0}` and keyboard handlers

---

### **6.3 Color Contrast**

**Missing from Design**: Verify contrast ratios

**Required Checks**:
- White text on orange CTA: Must meet WCAG AA (4.5:1)
- Green text on white: Must meet WCAG AA
- Gray text on white: Must meet WCAG AA
- All interactive elements: Must meet contrast requirements

**Implementation**:
- Use design system colors (already verified)
- Test with contrast checker tools
- Provide high contrast mode option (future)

---

### **6.4 Focus Indicators**

**Missing from Design**: Visible focus rings

**Required**:
- All interactive elements must have visible focus indicator
- 2px ring, orange color (`#f9bc60`)
- 2px offset from element

**Implementation**:
- shadcn components include focus states
- Custom components need `focus-visible:ring-2`

---

## 📊 State Priority Matrix

### **🔴 Critical (Must Have)**
1. Loading states (skeletons)
2. Empty state (no questions)
3. Error states (API failures)
4. Hover states (all interactive elements)
5. Focus states (accessibility)

### **🟡 Important (Should Have)**
1. Empty filter results
2. Zero value handling
3. Long text truncation
4. Selected filter indicators
5. Network error state

### **🟢 Nice to Have (Can Add Later)**
1. Partial loading states
2. Very large number formatting
3. Pagination/infinite scroll
4. High contrast mode
5. Loading progress indicators

---

## 🎨 Design Specifications for Missing States

### **Loading Skeletons**
- Background: `#f5f5f5`
- Border radius: Match target component
- Animation: Pulse (shadcn default)
- Dimensions: Match target component exactly

### **Error States**
- Background: `#fef2f2` (red) or `#fefce8` (yellow)
- Border: `#fecaca` (red) or `#fef08a` (yellow)
- Text: `#991b1b` (red) or `#854d0e` (yellow)
- Icon: 20px, matching text color
- Border radius: `20px` (match cards)

### **Empty States**
- Icon: 96px × 96px, gray (`#737373`)
- Heading: Inter Bold, 20px, dark (`#020617`)
- Description: Inter Light, 15px, gray (`#737373`)
- Button: Primary orange style
- Padding: `py-16` (64px vertical)

### **Hover States**
- Transition: `200ms ease-in-out`
- Shadow: Increase by one level (`sm` → `md` → `lg`)
- Color: 5-10% darker/lighter
- Cursor: `pointer`

### **Focus States**
- Ring: 2px solid, orange (`#f9bc60`)
- Offset: 2px
- Only on keyboard focus (`focus-visible`)

---

## 📝 Implementation Checklist

### **Loading States**
- [ ] Install shadcn `skeleton` component
- [ ] Create skeleton for KPI cards (3 instances)
- [ ] Create skeleton for question list items (3-5 instances)
- [ ] Add loading state to Dashboard page
- [ ] Test progressive loading (some data loads faster)

### **Empty States**
- [ ] Create EmptyState component
- [ ] Add empty state for no questions
- [ ] Add empty state for no filter results
- [ ] Handle zero values in KPI cards
- [ ] Test with new user (no data)

### **Error States**
- [ ] Create ErrorCard component
- [ ] Add error state for KPI stats
- [ ] Add error state for question list
- [ ] Add network error state
- [ ] Add retry functionality
- [ ] Test error scenarios

### **Interactive States**
- [ ] Add hover states to CTA card
- [ ] Add hover states to question list items
- [ ] Add active/pressed states
- [ ] Add focus states (keyboard navigation)
- [ ] Add selected filter indicators
- [ ] Test all interactive elements

### **Edge Cases**
- [ ] Handle zero values
- [ ] Handle very large numbers
- [ ] Handle long topic names (truncate)
- [ ] Handle many question items (scroll/pagination)
- [ ] Handle missing user name
- [ ] Handle circular progress edge cases (0%, 100%)
- [ ] Test responsive edge cases

### **Accessibility**
- [ ] Add ARIA labels to all interactive elements
- [ ] Add `aria-live` regions for dynamic content
- [ ] Test keyboard navigation
- [ ] Verify color contrast ratios
- [ ] Test with screen reader
- [ ] Add focus indicators

---

## 🔗 Related Documentation

- [Project Overview & Status](./Project%20Overview%20&%20Status.md)
- [Dashboard Missing Features Analysis](./Dashboard%20Missing%20Features%20Analysis.md)
- [Spacing System & Design Tokens Guide](./Spacing%20System%20%26%20Design%20Tokens%20Guide.md)

---

**Last Updated**: December 2024  
**Status**: 📋 Planning Document  
**Next Action**: Begin implementing critical states (loading, empty, error)

