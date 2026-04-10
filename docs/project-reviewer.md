# Project Reviewer

This document reviews what was implemented in the project, why each part was added, and how each topic works in the current codebase.

## 1. Git + Intro to Next.js

### What was added
- A Next.js project structure generated from `create-next-app`
- App Router folders and route files under `src/app`
- Shared root layout in `src/app/layout.tsx`
- Static routes such as `/`, `/about`, `/login`, `/register`, `/dashboard`, and `/posts`
- A dynamic route in `src/app/blog/[slug]/page.tsx`
- API routes in `src/app/api/dashboard/route.ts` and `src/app/api/posts/route.ts`

### Why it was added
- Next.js gives the project a clear full-stack structure for pages, layouts, and API endpoints.
- File-based routing removes the need to manually configure route tables.
- The layout file keeps shared providers and navigation in one place.
- Dynamic routes show how URL parameters can be handled.
- API routes let the project simulate backend behavior inside the same app.

### How it works here
- `src/app/layout.tsx` wraps all pages with the MUI cache provider, React Query provider, theme provider, and navbar.
- Each folder inside `src/app` becomes a route.
- `src/app/blog/[slug]/page.tsx` reads the `slug` value from the URL and renders it.
- `src/app/api/dashboard/route.ts` returns dashboard stats and users.
- `src/app/api/posts/route.ts` handles posts CRUD-style actions for the feed.

### Files to review
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/about/page.tsx`
- `src/app/login/page.tsx`
- `src/app/register/page.tsx`
- `src/app/dashboard/page.tsx`
- `src/app/posts/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/api/dashboard/route.ts`
- `src/app/api/posts/route.ts`

### Important note
- Git setup, branching, and PR workflow are not visible just by reading source files. Those are process topics, not only code topics.

## 2. Tailwind CSS + Responsive Design

### What was added
- Tailwind CSS is installed and imported in `src/app/globals.css`
- Utility classes are used throughout the landing page
- Responsive classes are used for mobile and desktop layouts
- Full-screen sections, flex layouts, spacing, typography, and button styles were added with Tailwind

### Why it was added
- Tailwind speeds up UI building by using small reusable utility classes.
- Responsive classes make the same page adapt to different screen sizes.
- It fits well for quickly building a landing page and simple reusable sections.

### How it works here
- `@import "tailwindcss";` enables Tailwind usage globally.
- The landing page in `src/app/page.tsx` uses classes like `flex`, `items-center`, `gap-4`, `md:flex-row`, and `md:text-8xl`.
- `src/components/Navbar.tsx` switches between desktop nav and mobile menu with `hidden md:flex` and `md:hidden`.
- `src/components/Card.tsx` uses utility classes for spacing, rounded corners, shadow, and hover behavior.
- `src/app/globals.css` also combines Tailwind with custom global background-image classes.

### Files to review
- `src/app/globals.css`
- `src/app/page.tsx`
- `src/components/Navbar.tsx`
- `src/components/Card.tsx`
- `package.json`

## 3. Components, State, Forms

### What was added
- Reusable components: `Navbar`, `Card`, `Counter`, `Button`, `LoginForm`, `RegisterForm`
- Local component state using `useState`
- Basic landing page form
- Structured forms for authentication

### Why it was added
- Components make the UI reusable and easier to maintain.
- State allows the UI to react to user actions like menu toggling, counters, and feedback messages.
- Forms are required to collect user input and practice controlled submission flows.

### How it works here
- `Navbar` uses `useState` to open and close the mobile menu.
- `Counter` uses `useState` to increment a number in the UI.
- `Button.tsx` demonstrates conditional rendering using local state, even though its exported function is named `ToggleText`.
- `LoginForm` and `RegisterForm` use React Hook Form to collect and validate input.
- `Card.tsx` receives `title`, `description`, and `image` as props, which shows how components can be reused with different data.

### Files to review
- `src/components/Navbar.tsx`
- `src/components/Card.tsx`
- `src/components/Counter.tsx`
- `src/components/Button.tsx`
- `src/components/LoginForm.tsx`
- `src/components/RegisterForm.tsx`
- `src/app/page.tsx`

## 4. Mini Project 1

### What was added
- A landing page with multiple sections
- A hero banner
- A cards section
- An about section
- A contact form section
- Responsive navigation
- Themed image backgrounds

### Why it was added
- This works as the first complete mini project that combines layout, styling, components, and responsiveness.
- It demonstrates how a simple marketing or landing page can be built from basic tools learned earlier.

### How it works here
- `src/app/page.tsx` defines the full page structure.
- The hero section introduces the page.
- The cards section renders three repeated card components.
- The about section and contact section demonstrate content blocks and form layout.
- `src/app/globals.css` adds section background images.
- `src/components/Navbar.tsx` keeps the top navigation available on all screen sizes.

### Files to review
- `src/app/page.tsx`
- `src/components/Navbar.tsx`
- `src/components/Card.tsx`
- `src/app/globals.css`
- `public/beaches`

## 5. Material UI Basics

### What was added
- MUI core packages and Emotion packages
- App Router cache provider for MUI
- A custom theme client
- Light and dark mode state logic
- MUI-based login form
- MUI-based register form
- MUI dashboard layout

### Why it was added
- MUI introduces a component library approach instead of building every UI piece from scratch.
- It helps practice ready-made components like AppBar, Drawer, Grid, Card, and TextField.
- Theming teaches how to control the app?s visual system centrally.

### How it works here
- `src/app/layout.tsx` uses `AppRouterCacheProvider` so MUI works properly with the Next.js app router.
- `src/components/MuiThemeClient.tsx` creates a theme with `createTheme`.
- The same file stores `mode` state and exposes a `toggleColorMode` function through context.
- `LoginForm` and `RegisterForm` use MUI components like `Paper`, `Stack`, `TextField`, `Button`, `Alert`, and `Typography`.
- `src/app/dashboard/page.tsx` uses MUI layout components for a more app-like interface.

### Files to review
- `src/app/layout.tsx`
- `src/components/MuiThemeClient.tsx`
- `src/components/LoginForm.tsx`
- `src/components/RegisterForm.tsx`
- `src/app/dashboard/page.tsx`
- `package.json`

## 6. React Query - Data Fetching

### What was added
- Global React Query setup
- A shared `QueryClient`
- `useQuery` in the dashboard
- `useQuery` in the posts feed
- Loading, error, retry, and refresh handling
- In-app API endpoints with simulated delay

### Why it was added
- React Query makes server-state handling easier than manual `useEffect` and `useState` for fetch logic.
- It provides caching, retries, refetching, and status tracking in a standard pattern.
- It is a strong foundation before learning mutations and optimistic UI.

### How it works here
- `src/components/ReactQueryProvider.tsx` creates a `QueryClient` and wraps the app with `QueryClientProvider`.
- Default settings include `staleTime`, `gcTime`, `retry`, and `refetchOnWindowFocus`.
- `src/app/dashboard/page.tsx` calls `useQuery` to fetch dashboard data from `/api/dashboard`.
- `src/components/PostsQuerySection.tsx` calls `useQuery` to fetch post data from `/api/posts`.
- The UI checks `isLoading`, `isError`, `isFetching`, and `error` to render the correct state.

### Files to review
- `src/components/ReactQueryProvider.tsx`
- `src/app/dashboard/page.tsx`
- `src/components/PostsQuerySection.tsx`
- `src/app/api/dashboard/route.ts`
- `src/app/api/posts/route.ts`

## 7. Authentication + Form Handling

### What was added
- Login page
- Register page
- Cookie-based token storage
- Middleware protection for private routes
- Redirect logic for logged-in and logged-out users
- Logout behavior

### Why it was added
- Authentication is needed to practice protected pages and user flow.
- Form handling is a core frontend skill.
- Middleware is an important Next.js feature for access control.

### How it works here
- `src/components/LoginForm.tsx` validates login input and performs a mutation.
- On successful login, it stores `auth_token` using `cookies-next`.
- `src/middleware.ts` checks whether the auth cookie exists.
- If the user tries to open `/dashboard` or `/posts` without a cookie, middleware redirects to `/login`.
- If the user is already logged in and visits `/login` or `/register`, middleware redirects to `/dashboard`.
- `src/app/dashboard/page.tsx` includes a logout button that deletes the cookie and returns the user to login.

### Files to review
- `src/components/LoginForm.tsx`
- `src/components/RegisterForm.tsx`
- `src/middleware.ts`
- `src/app/login/page.tsx`
- `src/app/register/page.tsx`
- `src/app/dashboard/page.tsx`

## 8. Mutations + Zod Validation

### What was added
- Zod schema definitions for login and register
- A custom resolver that connects Zod to React Hook Form
- React Query mutations for auth forms
- React Query mutations for post actions

### Why it was added
- Validation prevents invalid data from being submitted.
- Zod gives a schema-first way to define validation rules.
- Mutations are needed for write actions, not only read actions.
- This topic connects form handling with data submission and feedback states.

### How it works here
- `src/lib/auth-schemas.ts` defines `loginSchema` and `registerSchema`.
- `registerSchema` uses `.refine()` to make sure the password and confirm password fields match.
- `src/lib/form-zod-resolver.ts` adapts Zod results into the error shape expected by React Hook Form.
- `LoginForm` and `RegisterForm` pass the custom resolver into `useForm`.
- `useMutation` is used for login and register submission handling.
- `src/components/PostsQuerySection.tsx` uses multiple mutations for create, edit, delete, react, comment, and share actions.

### Files to review
- `src/lib/auth-schemas.ts`
- `src/lib/form-zod-resolver.ts`
- `src/components/LoginForm.tsx`
- `src/components/RegisterForm.tsx`
- `src/components/PostsQuerySection.tsx`
- `src/app/api/posts/route.ts`

## 9. Optimistic UI + DevTools

### What was added
- React Query DevTools in development
- Optimistic updates for multiple post actions
- Cache rollback on failed mutations
- Supporting documentation in `docs`

### Why it was added
- Optimistic UI improves perceived speed by updating the interface before the server confirms the result.
- It teaches how client cache and server data interact.
- DevTools helps inspect queries and mutations during development.

### How it works here
- `src/components/ReactQueryProvider.tsx` renders `ReactQueryDevtools` only in development mode.
- `src/components/PostsQuerySection.tsx` updates cached post data immediately inside `onMutate`.
- Before changing the cache, it stores `previousPosts`.
- If the mutation fails, `onError` restores the previous cached data.
- `onSettled` invalidates the query so the cache can sync with the API result.
- This pattern is used across create, edit, delete, react, comment, and share actions.
- Extra supporting explanation already exists in:
  - `docs/optimistic-ui-proof.md`
  - `docs/optimistic-ui-presentation.md`
  - `docs/optimistic-ui-script.md`

### Files to review
- `src/components/ReactQueryProvider.tsx`
- `src/components/PostsQuerySection.tsx`
- `src/app/api/posts/route.ts`
- `docs/optimistic-ui-proof.md`
- `docs/optimistic-ui-presentation.md`
- `docs/optimistic-ui-script.md`

## Overall Summary

The project progression is visible in the repo:

- It starts with Next.js structure and routing.
- It moves into Tailwind, responsive design, and reusable components.
- It expands into a complete landing page mini project.
- It then introduces MUI for component-library-based UI.
- After that, it adds React Query for server-state management.
- Then it combines authentication, forms, and middleware.
- Finally, it adds validation, mutations, optimistic UI, and DevTools.

The strongest fully implemented topics in this repo are:

- Next.js App Router structure
- Tailwind landing page and responsiveness
- Reusable components and local state
- MUI forms and dashboard
- Authentication with cookies and middleware
- React Query fetching and mutations
- Zod validation
- Optimistic UI with DevTools
