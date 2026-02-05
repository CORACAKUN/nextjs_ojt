import Counter from "@/components/Counter";

async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts");
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-4">Posts</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}
