# Screenshot / Code Proof

## 1. React Query DevTools Added
File:
- `src/components/ReactQueryProvider.tsx`

Code proof:
```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

{process.env.NODE_ENV === "development" ? (
  <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
) : null}
```

What this proves:
- React Query DevTools is installed and rendered only during development.

## 2. Optimistic Mutation Pattern Added
File:
- `src/components/PostsQuerySection.tsx`

Code proof:
```tsx
onMutate: async (variables) => {
  setMutationError("");
  await queryClient.cancelQueries({ queryKey: postsQueryKey });

  const previousPosts = queryClient.getQueryData<Post[]>(postsQueryKey);
  queryClient.setQueryData<Post[]>(
    postsQueryKey,
    optimisticUpdater(previousPosts, variables)
  );

  return { previousPosts };
},
onError: (mutationErrorValue, _variables, context) => {
  if (context && context.previousPosts !== undefined) {
    queryClient.setQueryData(postsQueryKey, context.previousPosts);
  }
  setMutationError(mutationErrorValue.message);
},
```

What this proves:
- The cache is updated immediately.
- Previous state is stored.
- Failed mutations roll back safely.

## 3. Create Post Optimistic Write
File:
- `src/components/PostsQuerySection.tsx`

Code proof:
```tsx
const optimisticPost: Post = {
  id: -Date.now(),
  author: "You",
  location: "Temporary post",
  image: "/beaches/Slide7.PNG",
  caption: value,
  reactions: 0,
  shares: 0,
  comments: [],
  reacted: false,
};

createPostMutation.mutate({ caption: value, optimisticPost });
```

What this proves:
- A post appears in the UI immediately before the API confirms it.

## 4. API Route Expanded
File:
- `src/app/api/posts/route.ts`

Code proof:
```ts
export async function POST(request: NextRequest) { ... }
export async function PATCH(request: NextRequest) { ... }
export async function DELETE(request: NextRequest) { ... }
```

What this proves:
- The UI mutations now target actual API operations.

## 5. Suggested Screenshots For Your PPT
- Screenshot 1: Posts page with the beach feed open
- Screenshot 2: React Query DevTools button visible at bottom-left
- Screenshot 3: DevTools panel opened while creating or reacting to a post
- Screenshot 4: Code screenshot of `onMutate` and `onError`
- Screenshot 5: Code screenshot of DevTools import and render

## 6. How To Capture The Screenshots
1. Run `npm run dev`
2. Open the posts page in the browser
3. Open React Query DevTools from the bottom-left button
4. Trigger a post action like create, react, or delete
5. Capture the UI and DevTools panel together
6. Capture the referenced code sections from the files above
