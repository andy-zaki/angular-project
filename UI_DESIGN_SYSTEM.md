# UI Design System & Consistency Guide

## Overview

This document outlines the design system implemented across the Angular application to ensure visual consistency and maintainability. All components should follow these guidelines.

## Design Principles

1. **Consistency**: Use design system variables for all styling
2. **Accessibility**: Ensure all interactive elements are keyboard accessible and have proper ARIA labels
3. **Responsiveness**: All components should work seamlessly across different screen sizes
4. **Performance**: Use CSS transitions and transforms for smooth animations
5. **RTL Support**: Application supports right-to-left (Arabic) text direction

## CSS Variables Reference

All CSS variables are defined in `src/styles.css`. Use these variables instead of hardcoded values.

### Color Palette

#### Primary Colors
- `--primary-500`: #667eea
- `--primary-600`: #5a67d8
- `--primary-700`: #4c51bf
- `--primary-gradient`: linear-gradient(135deg, #667eea 0%, #764ba2 100%)

#### Secondary Colors
- `--secondary-500`: #8b5cf6
- `--secondary-600`: #7c3aed
- `--secondary-700`: #6d28d9

#### Accent Colors
- `--accent-emerald`: #10b981
- `--accent-emerald-dark`: #059669
- `--accent-blue`: #3b82f6
- `--accent-blue-dark`: #2563eb
- `--accent-red`: #ef4444
- `--accent-red-dark`: #dc2626

#### Neutral Colors (Gray Scale)
- `--gray-50` through `--gray-900`: Complete gray scale palette
- Use `--gray-800` for primary text
- Use `--gray-600` for secondary text
- Use `--gray-300` for borders

### Typography

#### Font Sizes
```css
--font-size-xs: 0.75rem;     /* 12px - Small labels */
--font-size-sm: 0.875rem;    /* 14px - Secondary text */
--font-size-base: 0.95rem;   /* 15.2px - Body text */
--font-size-md: 1rem;        /* 16px - Standard */
--font-size-lg: 1.1rem;      /* 17.6px - Large text */
--font-size-xl: 1.25rem;     /* 20px - Subheadings */
--font-size-2xl: 1.5rem;     /* 24px - Section titles */
--font-size-3xl: 1.875rem;   /* 30px - Page titles */
--font-size-4xl: 2rem;       /* 32px - Main headings */
```

#### Font Weights
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

### Spacing System

Use consistent spacing throughout the application:

```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 0.75rem;   /* 12px */
--spacing-base: 1rem;    /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 2.5rem;   /* 40px */
--spacing-3xl: 3rem;     /* 48px */
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 20px;
--radius-full: 9999px;
```

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-base: 0 2px 8px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
--shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.15);
--shadow-2xl: 0 16px 48px rgba(0, 0, 0, 0.18);
```

### Transitions

```css
--transition-fast: 0.15s ease;
--transition-base: 0.2s ease;
--transition-smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
```

## Component Patterns

### Buttons

Use predefined button classes from `styles.css`:

```html
<!-- Primary Button -->
<button class="btn btn-primary">حفظ</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">تحديث</button>

<!-- Outline Button -->
<button class="btn btn-outline">إلغاء</button>

<!-- Ghost Button -->
<button class="btn btn-ghost">رجوع</button>

<!-- Danger Button -->
<button class="btn btn-danger">حذف</button>

<!-- Button Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large</button>
```

### Forms

Use consistent form styling:

```html
<div class="form-group">
  <label class="form-label" for="input-id">
    اسم الحقل
    <span class="required">*</span>
  </label>
  <input 
    type="text" 
    id="input-id" 
    class="form-input"
    placeholder="أدخل النص"
  />
  <div class="error-message">رسالة الخطأ هنا</div>
</div>

<div class="form-actions">
  <button class="btn btn-primary">حفظ</button>
  <button class="btn btn-ghost">إلغاء</button>
</div>
```

### Cards

Use consistent card patterns:

```html
<!-- Basic Card -->
<div class="card">
  <h3>عنوان البطاقة</h3>
  <p>محتوى البطاقة</p>
</div>

<!-- Interactive Card -->
<div class="card card-interactive">
  <h3>بطاقة تفاعلية</h3>
  <p>قابلة للنقر</p>
</div>
```

### Menu/Grid Cards

For menu items with icons:

```css
.menu-card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  transition: all var(--transition-smooth);
}

.menu-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-2xl);
}
```

### Layout Containers

```html
<!-- Standard Container (1200px max) -->
<div class="container">
  <!-- Content -->
</div>

<!-- Small Container (700px max) -->
<div class="container-sm">
  <!-- Content -->
</div>

<!-- Medium Container (900px max) -->
<div class="container-md">
  <!-- Content -->
</div>

<!-- Page Content Card -->
<div class="page-content">
  <!-- Main content -->
</div>
```

## Best Practices

### 1. Use Design System Variables

❌ **Don't:**
```css
.my-component {
  color: #374151;
  padding: 16px;
  border-radius: 8px;
}
```

✅ **Do:**
```css
.my-component {
  color: var(--gray-700);
  padding: var(--spacing-base);
  border-radius: var(--radius-md);
}
```

### 2. Consistent Hover States

All interactive elements should have hover states:

```css
.interactive-element {
  transition: all var(--transition-smooth);
}

.interactive-element:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

### 3. Accessibility

- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works
- Maintain sufficient color contrast

```html
<button 
  class="btn btn-primary"
  aria-label="حفظ البيانات"
  type="button"
>
  حفظ
</button>
```

### 4. Responsive Design

Always consider mobile-first approach:

```css
/* Mobile first */
.component {
  padding: var(--spacing-base);
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    padding: var(--spacing-xl);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    padding: var(--spacing-2xl);
  }
}
```

### 5. RTL Support

The application uses RTL by default. Ensure proper text alignment:

```css
.text-content {
  direction: rtl;
  text-align: right;
}
```

## Component Checklist

When creating or updating a component, ensure:

- [ ] Uses CSS variables for colors, spacing, typography
- [ ] Has proper hover/focus states
- [ ] Is responsive (mobile, tablet, desktop)
- [ ] Includes proper accessibility attributes
- [ ] Follows RTL text direction
- [ ] Has smooth transitions
- [ ] Uses consistent border radius and shadows
- [ ] Follows spacing system

## Header Component

Use the shared header component for consistency:

```typescript
import { HeaderComponent } from './components/shared/header/header';

// In component
<app-header
  [pageTitle]="'عنوان الصفحة'"
  [pageSubtitle]="'وصف الصفحة'"
  [showBackButton]="true"
  [backButtonLabel]="'العودة'"
  (backClicked)="onBackClick()"
  (logoutClicked)="onLogoutClick()"
/>
```

## Common Utility Classes

```css
/* Flex utilities */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }

/* Gap utilities */
.gap-sm { gap: var(--spacing-sm); }
.gap-md { gap: var(--spacing-md); }
.gap-lg { gap: var(--spacing-lg); }

/* Text utilities */
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-left { text-align: left; }

/* Grid utilities */
.grid { display: grid; }
.grid-2 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.grid-3 { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
```

## Migration Guide

When updating existing components:

1. Replace hardcoded colors with CSS variables
2. Replace hardcoded spacing with spacing variables
3. Replace hardcoded font sizes with typography variables
4. Use predefined button and form classes
5. Ensure consistent hover states
6. Test responsive behavior
7. Verify accessibility

## Resources

- Design System: `src/styles.css`
- Shared Components: `src/app/components/shared/`
- Example Components:
  - Dashboard: `src/app/components/dashboard/`
  - Applications Menu: `src/app/components/applications-menu/`
  - Building Basic Data: `src/app/components/building-basic-data/`

## Maintenance

This design system should be the single source of truth for all UI decisions. When adding new colors, spacing values, or other design tokens:

1. Add them to `src/styles.css` CSS variables
2. Update this documentation
3. Use the new variables in components
4. Never use hardcoded values

---

**Last Updated:** October 2025
**Maintained By:** Development Team
