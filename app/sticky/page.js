"use client";
import { useEffect, useRef, useState } from "react";

function Page() {
  const [inView, setInView] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, []);

  return (
    <div>
      <div className="bg-[#000441] relative w-full h-screen text-7xl content-center text-white text-center">
        <p>Hi</p>
      </div>
      <div
        ref={targetRef}
        className={`sticky -z-1 top-0 w-full h-screen bg-[url(/testbg.jpg)] bg-cover bg-no-repeat bg-center object-cover bg-fixed aspect-auto will-change-transform text-center text-3xl content-center transition-opacity duration-700 ${
          inView ? "opacity-100" : "opacity-20 blur-lg"
        }`}
      >
        <div className="bg-white/10 rounded-2xl backdrop-blur-xs p-4 w-[50%] mx-auto">
          <p>design something here</p>
        </div>
      </div>
      <div className="bg-[#ff7103] w-full h-screen text-5xl content-center text-black text-center">
        <p>Bye</p>
      </div>
    </div>
  );
}

export default Page;
