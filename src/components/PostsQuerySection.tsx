"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";

type Comment = {
  id: number;
  author: string;
  text: string;
};

type Post = {
  id: number;
  author: string;
  location: string;
  image: string;
  caption: string;
  reactions: number;
  shares: number;
  comments: Comment[];
  reacted?: boolean;
};

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("/api/posts");

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}

function ReactIcon({ active }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-5 w-5 ${active ? "fill-rose-500" : "fill-current"}`}
    >
      <path d="M12 21s-7-4.35-7-10.07C5 7.42 7.24 5 10.18 5c1.69 0 2.91.86 3.82 2.06C14.91 5.86 16.13 5 17.82 5 20.76 5 23 7.42 23 10.93 23 16.65 16 21 16 21h-4Z" />
      <path d="M8.31 6.61A4.14 4.14 0 0 0 6 10.5c0 4.06 4.51 7.43 6 8.43 1.49-1 6-4.37 6-8.43a4.14 4.14 0 0 0-2.31-3.89 4.47 4.47 0 0 0-3.69.47 4.47 4.47 0 0 0-3.69-.47Z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M4 4h16v11H7l-3 3V4Zm2 2v7.17L6.17 13H18V6H6Z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M15 5.63 9.84 8.2a3 3 0 1 0 0 7.6L15 18.37a3 3 0 1 0 .89-1.79l-5.17-2.57a2.9 2.9 0 0 0 0-4.02l5.17-2.57A3 3 0 1 0 15 5.63Z" />
    </svg>
  );
}

export default function PostsQuerySection() {
  const [composerValue, setComposerValue] = useState("");
  const [localPosts, setLocalPosts] = useState<Post[] | null>(null);
  const [menuPostId, setMenuPostId] = useState<number | null>(null);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>({});
  const [shareMessage, setShareMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const nextPostId = useRef(1000);
  const nextCommentId = useRef(5000);

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 2,
  });

  const seededPosts =
    data?.map((post) => ({
      ...post,
      reacted: false,
    })) ?? [];

  const posts = localPosts ?? seededPosts;

  useEffect(() => {
    if (!shareMessage) {
      return;
    }

    const timer = window.setTimeout(() => setShareMessage(""), 2200);
    return () => window.clearTimeout(timer);
  }, [shareMessage]);

  function handleCreatePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = composerValue.trim();
    if (!value) {
      return;
    }

    startTransition(() => {
      setLocalPosts((current) => [
        {
          id: nextPostId.current++,
          author: "You",
          location: "Temporary post",
          image: "/beaches/Slide7.PNG",
          caption: value,
          reactions: 0,
          shares: 0,
          comments: [],
          reacted: false,
        },
        ...(current ?? seededPosts),
      ]);
      setComposerValue("");
    });
  }

  function handleDelete(postId: number) {
    setLocalPosts((current) =>
      (current ?? seededPosts).filter((post) => post.id !== postId)
    );
    setMenuPostId(null);
    if (editingPostId === postId) {
      setEditingPostId(null);
      setEditingValue("");
    }
  }

  function handleStartEdit(post: Post) {
    setEditingPostId(post.id);
    setEditingValue(post.caption);
    setMenuPostId(null);
  }

  function handleSaveEdit(postId: number) {
    const value = editingValue.trim();
    if (!value) {
      return;
    }

    setLocalPosts((current) =>
      (current ?? seededPosts).map((post) =>
        post.id === postId ? { ...post, caption: value } : post
      )
    );
    setEditingPostId(null);
    setEditingValue("");
  }

  function handleToggleReaction(postId: number) {
    setLocalPosts((current) =>
      (current ?? seededPosts).map((post) => {
        if (post.id !== postId) {
          return post;
        }

        const reacted = !post.reacted;
        return {
          ...post,
          reacted,
          reactions: post.reactions + (reacted ? 1 : -1),
        };
      })
    );
  }

  function handleComment(postId: number) {
    const value = (commentDrafts[postId] || "").trim();
    if (!value) {
      return;
    }

    setLocalPosts((current) =>
      (current ?? seededPosts).map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: nextCommentId.current++,
                  author: "You",
                  text: value,
                },
              ],
            }
          : post
      )
    );

    setCommentDrafts((current) => ({
      ...current,
      [postId]: "",
    }));
  }

  async function handleShare(post: Post) {
    const shareText = `${post.author}: ${post.caption}`;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareText);
      } catch {
        // Fall through to local share feedback.
      }
    }

    setLocalPosts((current) =>
      (current ?? seededPosts).map((item) =>
        item.id === post.id ? { ...item, shares: item.shares + 1 } : item
      )
    );
    setShareMessage(`Copied "${post.author}" post for sharing.`);
  }

  return (
    <section className="min-h-screen bg-slate-950 text-white">
      <div
        className="border-b border-white/10 bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(rgba(2,6,23,0.45), rgba(2,6,23,0.75)), url('/beaches/Slide1.PNG')" }}
      >
        <div className="mx-auto flex min-h-[26rem] max-w-6xl flex-col justify-end gap-5 px-4 py-16 pt-28 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">
            Private Posts
          </p>
          <div className="max-w-3xl border-y border-white/30 py-5">
            <h1 className="text-5xl font-bold md:text-7xl">Beach Feed</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-100 md:text-lg">
              Protected posts page with React Query loading cached starter data
              and local temporary actions for create, edit, delete, react,
              comment, and share.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="rounded-full border border-white/25 bg-black/25 px-4 py-2 backdrop-blur-sm">
              Login required
            </span>
            <span className="rounded-full border border-white/25 bg-black/25 px-4 py-2 backdrop-blur-sm">
              Cache window: 2 minutes
            </span>
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-full border border-cyan-300/70 bg-cyan-300/10 px-4 py-2 font-semibold text-cyan-100 transition hover:bg-cyan-300 hover:text-slate-950"
            >
              {isFetching && !isLoading ? "Refreshing feed..." : "Refresh feed"}
            </button>
          </div>
        </div>
      </div>

      <div
        className="bg-cover bg-fixed bg-center px-4 py-12 md:px-8"
        style={{ backgroundImage: "linear-gradient(rgba(15,23,42,0.82), rgba(15,23,42,0.9)), url('/beaches/Slide4.PNG')" }}
      >
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <form
              onSubmit={handleCreatePost}
              className="rounded-[2rem] border border-white/20 bg-black/35 p-5 shadow-2xl backdrop-blur-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                    Create post
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">Share something temporary</h2>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                  Saved in UI only
                </span>
              </div>

              <textarea
                value={composerValue}
                onChange={(event) => setComposerValue(event.target.value)}
                placeholder="What happened at the beach today?"
                className="min-h-36 w-full rounded-[1.5rem] border border-white/15 bg-slate-950/60 p-4 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300"
              />

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-slate-300">
                  Draft posts, edits, and comments reset on page reload.
                </p>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-full bg-cyan-300 px-5 py-2 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:opacity-60"
                >
                  {isPending ? "Posting..." : "Post now"}
                </button>
              </div>
            </form>

            {isLoading && (
              <div className="rounded-[2rem] border border-white/20 bg-black/35 p-6 backdrop-blur-md">
                Loading posts from the dummy API...
              </div>
            )}

            {isError && (
              <div className="rounded-[2rem] border border-rose-400/40 bg-rose-950/40 p-6">
                <p className="font-semibold">Unable to load posts.</p>
                <p className="text-sm text-rose-100">
                  {(error as Error).message}
                </p>
              </div>
            )}

            {!isLoading &&
              !isError &&
              posts.map((post) => (
                <article
                  key={post.id}
                  className="overflow-hidden rounded-[2rem] border border-white/20 bg-black/35 shadow-2xl backdrop-blur-md"
                >
                  <div className="flex items-start justify-between gap-4 p-5">
                    <div>
                      <p className="text-lg font-semibold">{post.author}</p>
                      <p className="text-sm text-slate-300">{post.location}</p>
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        aria-label={`Open actions for ${post.author}`}
                        onClick={() =>
                          setMenuPostId((current) =>
                            current === post.id ? null : post.id
                          )
                        }
                        className="rounded-full border border-white/15 bg-white/10 p-2 text-slate-100 transition hover:bg-white/20"
                      >
                        <MoreIcon />
                      </button>

                      {menuPostId === post.id && (
                        <div className="absolute right-0 top-12 z-10 w-40 rounded-2xl border border-white/15 bg-slate-950/95 p-2 shadow-xl">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(post)}
                            className="w-full rounded-xl px-3 py-2 text-left text-sm transition hover:bg-white/10"
                          >
                            Edit post
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(post.id)}
                            className="w-full rounded-xl px-3 py-2 text-left text-sm text-rose-300 transition hover:bg-white/10"
                          >
                            Delete post
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative h-80 w-full">
                    <Image
                      src={post.image}
                      alt={post.caption}
                      fill
                      sizes="(max-width: 768px) 100vw, 900px"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5">
                    {editingPostId === post.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={editingValue}
                          onChange={(event) => setEditingValue(event.target.value)}
                          className="min-h-28 w-full rounded-[1.25rem] border border-white/15 bg-slate-950/60 p-4 text-sm text-white outline-none focus:border-cyan-300"
                        />
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(post.id)}
                            className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingPostId(null);
                              setEditingValue("");
                            }}
                            className="rounded-full border border-white/15 px-4 py-2 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm leading-7 text-slate-100">{post.caption}</p>
                    )}

                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-slate-300">
                      <span>{post.reactions} reacts</span>
                      <span>{post.comments.length} comments</span>
                      <span>{post.shares} shares</span>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => handleToggleReaction(post.id)}
                        className={`flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          post.reacted
                            ? "border-rose-400 bg-rose-500/15 text-rose-200"
                            : "border-white/15 bg-white/5 text-slate-100 hover:bg-white/10"
                        }`}
                      >
                        <ReactIcon active={post.reacted} />
                        React
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const element = document.getElementById(`comment-${post.id}`);
                          element?.focus();
                        }}
                        className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                      >
                        <CommentIcon />
                        Comment
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShare(post)}
                        className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                      >
                        <ShareIcon />
                        Share
                      </button>
                    </div>

                    <div className="mt-5 space-y-3">
                      {post.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="rounded-[1.25rem] bg-white/8 px-4 py-3"
                        >
                          <p className="text-sm font-semibold text-cyan-200">
                            {comment.author}
                          </p>
                          <p className="mt-1 text-sm text-slate-100">{comment.text}</p>
                        </div>
                      ))}

                      <div className="flex gap-3">
                        <input
                          id={`comment-${post.id}`}
                          type="text"
                          value={commentDrafts[post.id] || ""}
                          onChange={(event) =>
                            setCommentDrafts((current) => ({
                              ...current,
                              [post.id]: event.target.value,
                            }))
                          }
                          placeholder="Write a comment"
                          className="flex-1 rounded-full border border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-cyan-300"
                        />
                        <button
                          type="button"
                          onClick={() => handleComment(post.id)}
                          className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
          </div>

          <aside className="space-y-6">
            <div
              className="rounded-[2rem] border border-white/20 bg-black/35 p-6 backdrop-blur-md"
              style={{ backgroundImage: "linear-gradient(rgba(15,23,42,0.65), rgba(15,23,42,0.65)), url('/beaches/Slide3.PNG')", backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                Feed behavior
              </p>
              <h2 className="mt-3 text-2xl font-bold">What this page does</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-100">
                <li>Loads starter posts from the dummy API with React Query caching.</li>
                <li>Lets authenticated users add temporary posts in the browser.</li>
                <li>Supports edit and delete actions from the 3-dot menu.</li>
                <li>Tracks react, comment, and share interactions locally.</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-white/20 bg-black/35 p-6 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                Status
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-200">
                <p>Loaded posts: {posts.length}</p>
                <p>{isFetching ? "React Query is syncing the feed." : "Feed is using cached data."}</p>
                <p>{shareMessage || "Use Share to copy post text and bump the share count."}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
