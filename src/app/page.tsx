import Counter from "@/components/Counter";
import Link from "next/link";
import Card from "@/components/Card";

async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts");
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();
  const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque. lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.";

  return (
    <main className="">
      {/* <h1 className="text-xl font-bold mb-4">Posts</h1> */}
      {/* <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul> */}

      <div className="h-screen mt-10 flex flex-col items-center justify-center gap-4 shadow-md">
        <h1 className="text-4xl font-bold">Landing Page</h1>
        <p className="text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos consequuntur sequi quo placeat quia nobis asperiores excepturi, harum beatae, similique impedit minima quibusdam non corporis eum amet. Nostrum, doloribus dicta?
        </p>
        <Link href="/" className="p-2 px-8 rounded-xl bg-blue-500 font-bold cursor-pointer">More Info</Link>
      </div>
      <div className="flex flex-col justify-center gap-4 m-4 md:flex-row">
        <Card title="Card 1" description={description}/>
        <Card title="Card 2" description={description}/>
        <Card title="Card 3" description={description}/>
      </div>
    </main>
  );
}
