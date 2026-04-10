# Optimistic UI + React Query DevTools

## Slide 1: Title
- Topic: Optimistic UI + React Query DevTools
- Project: Next.js beach feed posts page
- Goal: Make user actions feel instant while keeping server data in sync

Speaker cue:
Today I’ll present the Optimistic UI and React Query DevTools improvement added to our Next.js posts page. The main goal was to make user actions feel immediate, while still syncing with the API and preserving correct data.

## Slide 2: Problem Before
- Posts loaded with React Query
- Actions were mostly local component state only
- DevTools was not available
- Temporary changes were harder to inspect and reason about

Speaker cue:
Before the update, the page already used React Query for fetching posts, but create, edit, delete, react, comment, and share mostly relied on local UI state. That meant the behavior looked interactive, but it was not fully modeled as real query mutations, and there was no React Query DevTools to inspect cache or mutation flow.

## Slide 3: What I Implemented
- Added React Query DevTools in development mode
- Refactored actions to use `useMutation`
- Added optimistic cache updates with rollback on error
- Extended `/api/posts` to support create, edit, react, comment, share, and delete

Speaker cue:
I added React Query DevTools so we can inspect the query cache and mutation state during development. Then I converted the posts actions into actual React Query mutations. Each mutation updates the cache immediately, then calls the API, and rolls back if the request fails. I also expanded the posts API so these actions hit real endpoints instead of staying only in local component state.

## Slide 4: How Optimistic UI Works
- User clicks an action like Post, React, or Delete
- `onMutate` updates the cache immediately
- UI changes before the server responds
- If the request fails, previous cache data is restored
- If it succeeds, cache stays aligned with server data

Speaker cue:
This is the optimistic UI flow. When the user performs an action, React Query runs `onMutate`, which updates the cache right away. The UI responds instantly, so the app feels faster. If the server request fails, we restore the previous cache snapshot. If it succeeds, the UI remains in sync and we invalidate the query to confirm the latest server state.

## Slide 5: Proof In Code
- DevTools added in `ReactQueryProvider`
- Mutations and optimistic updates added in `PostsQuerySection`
- API route expanded in `src/app/api/posts/route.ts`
- Lint passed with no new errors

Speaker cue:
The proof is directly in the code. The DevTools integration is in the shared query provider. The optimistic mutations are in the posts component. The API route now supports all CRUD-style actions used by the UI. I also ran lint to verify the implementation, and there were no new errors from this feature.

## Slide 6: Result
- Faster-feeling interactions
- Better debugging during development
- Clearer data flow between UI, cache, and API
- Stronger foundation for future real backend integration

Speaker cue:
The result is a better user experience and a better developer experience. Users see instant feedback, developers can inspect query and mutation state in DevTools, and the feature is now structured in a way that can scale more cleanly when connected to a persistent backend later.
