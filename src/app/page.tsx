import Link from "next/link";
import Card from "@/components/Card";

export default function Home() {
  const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque. lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.";

  return (
    <main className="">
      {/* <h1 className="text-xl font-bold mb-4">Posts</h1> */}
      {/* <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul> */}

      <div className="hero h-screen flex flex-col items-center justify-center gap-4 shadow-md">
        <div className="md:p-4 flex flex-col items-center border-t border-b text-white text-center gap-2">
          <h1 className="text-6xl md:text-8xl font-bold">Landing Page</h1>
          <h2 className="text-4xl md:text-6xl">Welcome to our awesome website!</h2>
          {/* <p className="text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos consequuntur sequi quo placeat quia nobis asperiores excepturi, harum beatae, similique impedit minima quibusdam non corporis eum amet. Nostrum, doloribus dicta?
          </p> */}
          <Link href="/" className="p-2 px-8 md:w-1/4 rounded-xl bg-blue-500 font-bold cursor-pointer">More Info</Link>
        </div>
      </div>
      <div className="cards p-4 flex flex-col items-center justify-center gap-4 md:flex-row m-0 p-0 md:h-screen">
        <Card title="Card 1" description={description} image="/beaches/Slide4.png"/>
        <Card title="Card 2" description={description} image="/beaches/Slide2.png"/>
        <Card title="Card 3" description={description} image="/beaches/Slide3.png"/>
      </div>
      <div className="about flex items-center justify-center p-4 md:h-screen">
        <div className="flex flex-col items-center gap-4 text-center text-white">
          <h2 className="text-4xl font-bold">About Us</h2>
          <div className="">
            <img src="https://i.pinimg.com/736x/bb/cf/f4/bbcff45882151bdaa8bd012c43041f06.jpg" alt="" />
          </div>
          <p className="text-justify backdrop-blur-sm bg-black/30 p-4 rounded-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque. lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.
          </p>
        </div>
      </div>
      <div className="contact h-screen flex items-center justify-center">
        <form action="" className="flex flex-col items-center gap-4 shadow-2xl rounded-lg p-8 bg-black/60 border border-white/50 text-white md:w-1/3">
            <h2 className="text-4xl font-bold">Contact Us</h2>
            <input type="text" placeholder="Name" className="border-b h-10 w-60" />
            <input type="email" placeholder="Email" className="border-b h-10 w-60" />
            <textarea placeholder="Message" className="border-b h-20 w-60" />
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Send</button>
        </form>
      </div>
    </main>
  );
}
