import { NextResponse } from "next/server";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 900));

  return NextResponse.json([
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
  ]);
}
