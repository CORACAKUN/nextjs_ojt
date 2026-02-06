import Counter from "@/components/Counter";
import Link from "next/link";

async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts");
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="p-8 flex flex-col justify-center h-screen">
      {/* <h1 className="text-xl font-bold mb-4">Posts</h1> */}
      {/* <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul> */}

      <div className="flex flex-col items-center md:items-start gap-2 md:w-1/2 ">
        <h1 className="text-4xl font-bold">Landing Page</h1>
        <p className="text-center md:text-start">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos consequuntur sequi quo placeat quia nobis asperiores excepturi, harum beatae, similique impedit minima quibusdam non corporis eum amet. Nostrum, doloribus dicta?
        </p>
        <Link href="/" className="p-2 px-8 rounded-xl bg-blue-500 font-bold cursor-pointer">More Info</Link>
      </div>
    </main>
  );
}
