import Link from "next/link";

export default function Home() {
  const time = Date();
  return (
    <div className="h-screen flex items-center justify-center  w-screen">
      <div className="text-center space-y-4">
        <p>
          this page generated at{" "}
          <strong className="bg-white px-2 py-1 text-black rounded-2xl">
            {time}
          </strong>{" "}
          so its SSG !!
        </p>
        <Link href="/ssr">
          <button className="hover:bg-sky-400 focus:scale-150 bg-white text-black hover:text-white transition-all duration-300 cursor-pointer font-bold px-3 py-2 rounded-xl">
            go to SSR !
          </button>
        </Link>
      </div>
    </div>
  );
}
