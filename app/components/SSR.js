export default async function SSR() {
  const time = Date();
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store", // Force fetch at request time (SSR)
  });
  const data = await res.json();
  console.log(data);

  return (
    <>
      <p>
        this is ssr component so it was created at{" "}
        <strong className="bg-white px-2 py-1 text-black rounded-2xl">
          {time}
        </strong>{" "}
        so its SSR !!
      </p>
      <p>total fetched items : {data.length}</p>
    </>
  );
}
