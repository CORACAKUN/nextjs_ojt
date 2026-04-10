import { NextRequest, NextResponse } from "next/server";

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

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Mia Santos",
    location: "La Union",
    image: "/beaches/Slide6.PNG",
    caption:
      "Sunset check before heading back to shore. The water was calm, the sky looked unreal, and the whole place felt slower in the best way.",
    reactions: 18,
    shares: 4,
    comments: [
      { id: 11, author: "Paolo", text: "That light is perfect." },
      { id: 12, author: "Rina", text: "Need this trip soon." },
    ],
  },
  {
    id: 2,
    author: "Jared Cruz",
    location: "Siargao",
    image: "/beaches/Slide2.PNG",
    caption:
      "Quick stop after a client call. Posting this here because the clouds lined up exactly when the waves started breaking.",
    reactions: 26,
    shares: 7,
    comments: [{ id: 21, author: "Ava", text: "This should be the cover photo." }],
  },
  {
    id: 3,
    author: "Leah Ramos",
    location: "Baler",
    image: "/beaches/Slide5.PNG",
    caption:
      "Collected a few frames from this morning walk. The beach was almost empty and the wind finally dropped after lunch.",
    reactions: 11,
    shares: 2,
    comments: [],
  },
];

let posts: Post[] = structuredClone(initialPosts);
let nextPostId = 1000;
let nextCommentId = 5000;

function listPosts() {
  return structuredClone(posts);
}

function createPost(caption: string) {
  const post: Post = {
    id: nextPostId++,
    author: "You",
    location: "Temporary post",
    image: "/beaches/Slide7.PNG",
    caption,
    reactions: 0,
    shares: 0,
    comments: [],
    reacted: false,
  };

  posts = [post, ...posts];
  return structuredClone(post);
}

function updatePost(postId: number, caption: string) {
  let updatedPost: Post | null = null;

  posts = posts.map((post) => {
    if (post.id !== postId) {
      return post;
    }

    updatedPost = { ...post, caption };
    return updatedPost;
  });

  return updatedPost ? structuredClone(updatedPost) : null;
}

function deletePost(postId: number) {
  const existing = posts.some((post) => post.id === postId);
  if (!existing) {
    return false;
  }

  posts = posts.filter((post) => post.id !== postId);
  return true;
}

function toggleReaction(postId: number, reacted: boolean) {
  let updatedPost: Post | null = null;

  posts = posts.map((post) => {
    if (post.id !== postId) {
      return post;
    }

    updatedPost = {
      ...post,
      reacted,
      reactions: post.reactions + (reacted ? 1 : -1),
    };

    return updatedPost;
  });

  return updatedPost ? structuredClone(updatedPost) : null;
}

function addComment(postId: number, text: string) {
  let updatedPost: Post | null = null;

  posts = posts.map((post) => {
    if (post.id !== postId) {
      return post;
    }

    updatedPost = {
      ...post,
      comments: [
        ...post.comments,
        {
          id: nextCommentId++,
          author: "You",
          text,
        },
      ],
    };

    return updatedPost;
  });

  return updatedPost ? structuredClone(updatedPost) : null;
}

function incrementShares(postId: number) {
  let updatedPost: Post | null = null;

  posts = posts.map((post) => {
    if (post.id !== postId) {
      return post;
    }

    updatedPost = {
      ...post,
      shares: post.shares + 1,
    };

    return updatedPost;
  });

  return updatedPost ? structuredClone(updatedPost) : null;
}

function notFound() {
  return NextResponse.json({ message: "Post not found" }, { status: 404 });
}

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return NextResponse.json(listPosts());
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const caption = typeof body.caption === "string" ? body.caption.trim() : "";

  if (!caption) {
    return NextResponse.json({ message: "Caption is required" }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 500));
  return NextResponse.json(createPost(caption), { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const postId = Number(body.postId);
  const action = body.action;

  if (!Number.isFinite(postId) || typeof action !== "string") {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 350));

  if (action === "edit") {
    const caption = typeof body.caption === "string" ? body.caption.trim() : "";
    if (!caption) {
      return NextResponse.json({ message: "Caption is required" }, { status: 400 });
    }

    const updated = updatePost(postId, caption);
    return updated ? NextResponse.json(updated) : notFound();
  }

  if (action === "react") {
    if (typeof body.reacted !== "boolean") {
      return NextResponse.json({ message: "Reacted is required" }, { status: 400 });
    }

    const updated = toggleReaction(postId, body.reacted);
    return updated ? NextResponse.json(updated) : notFound();
  }

  if (action === "comment") {
    const text = typeof body.text === "string" ? body.text.trim() : "";
    if (!text) {
      return NextResponse.json({ message: "Comment text is required" }, { status: 400 });
    }

    const updated = addComment(postId, text);
    return updated ? NextResponse.json(updated) : notFound();
  }

  if (action === "share") {
    const updated = incrementShares(postId);
    return updated ? NextResponse.json(updated) : notFound();
  }

  return NextResponse.json({ message: "Unsupported action" }, { status: 400 });
}

export async function DELETE(request: NextRequest) {
  const postId = Number(request.nextUrl.searchParams.get("postId"));

  if (!Number.isFinite(postId)) {
    return NextResponse.json({ message: "Invalid post id" }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 300));
  return deletePost(postId)
    ? new NextResponse(null, { status: 204 })
    : notFound();
}
