# 2-3 Minute Script

Good day. This presentation is about the Optimistic UI and React Query DevTools enhancement added to the Next.js beach feed posts page.

Before this update, the page already fetched posts using React Query, but user actions like creating, editing, deleting, reacting, commenting, and sharing were handled mostly with local component state. That made the page interactive, but those changes were not fully represented as real React Query mutations. We also had no DevTools support to inspect query cache behavior.

To improve that, I added React Query DevTools in development mode and refactored the posts page to use `useMutation` for all major actions. I implemented optimistic updates so the React Query cache changes immediately when the user performs an action. This makes the interface feel faster because the UI updates before the server finishes responding.

The flow is straightforward. When the user clicks an action, React Query runs `onMutate`, which saves the previous cache state and updates the posts data immediately. Then the API request is sent. If the request succeeds, the cache stays aligned with the returned server data. If the request fails, the previous cache snapshot is restored, which gives us safe rollback behavior.

I also updated the `/api/posts` route to support create, edit, react, comment, share, and delete operations. This means the UI is no longer simulating everything only inside the component. Instead, the optimistic UI is backed by actual API mutations, even though the current data store is still in-memory for development.

For debugging, React Query DevTools is now available in development. It helps us inspect queries, mutations, cache contents, and status changes in real time. This is useful when demonstrating how optimistic UI works and when verifying that invalidation and rollback behave correctly.

Overall, this update improved both user experience and developer experience. The page feels more responsive, the state flow is more consistent, and the feature is better prepared for future backend integration.
