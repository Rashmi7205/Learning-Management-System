# Loader Integration Guide

## Overview

Two loader components have been successfully integrated into the CourseLoop Next.js dashboard:

### 1. **ClassicLoader** (`/components/ui/loader.tsx`)

A simple spinning border loader with minimal styling.

- **Usage**: Form submissions, quick operations
- **Features**:
  - Smooth rotation animation via Tailwind's `animate-spin`
  - Primary color theme
  - Small, compact design (h-10 w-10)

### 2. **SpiralLoader** (`/components/ui/spiral-loader.tsx`)

A sophisticated animated spiral with 8 orbiting dots using Framer Motion.

- **Usage**: Full page loading, dashboard initialization
- **Features**:
  - 8 animated dots with scale and opacity transitions
  - Spring physics animations
  - Staggered animation delays
  - Circular orbit pattern using trigonometry
  - Responsive sizing (h-16 w-16)

## Implementation Details

### Files Created

```
/components/ui/loader.tsx              - ClassicLoader component
/components/ui/spiral-loader.tsx       - SpiralLoader component
```

### Files Modified

```
/app/(learner)/dashboard/page.tsx      - Added SpiralLoader for loading state
/app/(auth)/layout.tsx                 - Added ClassicLoader to form buttons
```

## Usage Examples

### 1. Full Page Loading Screen (Dashboard)

```tsx
import SpiralLoader from "@/components/ui/spiral-loader";

if (isLoading) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <SpiralLoader />
        <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
      </div>
    </div>
  );
}
```

### 2. Button Loading State (Forms)

```tsx
import ClassicLoader from "@/components/ui/loader";

<button disabled={isLoading} className="flex items-center justify-center gap-2">
  {isLoading ? (
    <>
      <ClassicLoader />
      <span>Signing In...</span>
    </>
  ) : (
    "Sign In"
  )}
</button>;
```

## Integration Points

### Dashboard (`/app/(learner)/dashboard/page.tsx`)

- Shows **SpiralLoader** while fetching dashboard data
- Displays on initial page load (500ms simulated API delay)
- Centered with text "Loading your dashboard..."

### Authentication (`/app/(auth)/layout.tsx`)

- **Sign In Form**: ClassicLoader on submit button
- **Sign Up Form**: ClassicLoader on submit button
- Loader displays inline with "Signing In..." / "Creating Account..." text
- Disabled state prevents form submission while loading

## Styling & Customization

### ClassicLoader Colors

- Uses `border-primary` class from theme
- Customize via Tailwind config theme colors

### SpiralLoader Colors

- Uses `bg-primary` for dots (changed from `bg-red-500` for theme consistency)
- Customize by changing the `className` on the `motion.div`

### Animation Speed

**SpiralLoader:**

- `duration: 1.5` - Time for each dot animation cycle
- `delay: (index / dots) * 1.5` - Staggered timing between dots

## Current Application Flow

1. **Page Load** → Dashboard loading screen with SpiralLoader
2. **Fetch Data** → 500ms simulated API call
3. **Render Content** → Dashboard displays with all components
4. **User Authentication** → Sign In/Up forms show ClassicLoader on submit

## Future Enhancement Opportunities

- [ ] Add loader variants (size: sm, md, lg)
- [ ] Create LoadingOverlay component for async operations
- [ ] Add skeleton loading screens for content areas
- [ ] Implement custom loader for API requests
- [ ] Add progress indication for long operations

## Dependencies

- **Framer Motion**: ^14.2.0+ (required for SpiralLoader animations)
- **Tailwind CSS**: Built-in, no additional setup needed
- **Lucide React**: Not required for loaders

## Theme Integration

Both loaders respect your existing theme system:

- Primary color: `bg-primary` / `border-primary`
- Works with dark/light mode toggle
- Inherits from CSS custom properties defined in `globals.css`
