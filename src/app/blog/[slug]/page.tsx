type PageProps = {
  params: {
    slug: string;
  };
};

export default async function BlogPostPage({ params }: PageProps) {
const { slug } = await params;

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold">Blog Post</h1>
      <p>Slug: {slug}</p>
    </main>
  );
}
