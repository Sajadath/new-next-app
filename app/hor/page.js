"use client";

import { useEffect } from "react";

function Page() {
  useEffect(() => {
    const handleWheel = (event) => {
      if (event.deltaY !== 0) {
        event.preventDefault();
        window.scrollBy({
          left: event.deltaY,
          behavior: "smooth",
        });
      }
    };

    document.body.classList.add("overflow-y-hidden");
    window.addEventListener("wheel", handleWheel);

    return () => {
      document.body.classList.remove("overflow-y-hidden");
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="flex w-fit h-dvh overflow-x-auto overflow-y-hidden">
      <div className="bg-white text-black w-dvw h-dvh flex-shrink-0 flex items-center justify-center">
        data
      </div>
      <div className="bg-pink-200 text-black w-dvw h-dvh flex-shrink-0 flex items-center justify-center">
        data
      </div>
      <div className="bg-sky-300 text-black w-dvw h-dvh flex-shrink-0 flex items-center justify-center">
        data
      </div>
    </div>
  );
}

export default Page;
