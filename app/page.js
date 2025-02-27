export default function Home() {
  const time = Date();
  return (
    <div className="h-screen flex items-center justify-center  w-screen">
      <div className="text-center">
        <p>this page generated at {time}</p>
      </div>
    </div>
  );
}
