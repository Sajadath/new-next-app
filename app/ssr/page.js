import Link from "next/link";
export const metadata = {
  title: "SSR Page",
};

export default async function Page() {
  const time = Date();
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store", // Force fetch at request time (SSR)
  });
  const data = await res.json();
  console.log(data);

  return (
    <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
      <p>
        this is ssr component so it was created at{" "}
        <strong className="bg-white px-2 py-1 text-black rounded-2xl">
          {time}
        </strong>{" "}
        so its SSR !!
      </p>
      <p>total fetched items : {data.length}</p>
      <Link href="/">
        <button className="hover:bg-sky-400 focus:scale-150 bg-white text-black hover:text-white transition-all duration-300 cursor-pointer font-bold px-3 py-2 rounded-xl">
          go to SSG !
        </button>
      </Link>
    </div>
  );
}
