import SSR from "./components/SSR";

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
        <SSR />
      </div>
    </div>
  );
}
