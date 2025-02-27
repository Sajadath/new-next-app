function Loading() {
  return (
    <div className="size-11  relative  bg-white rounded-full flex items-center justify-center overflow-hidden">
      <div className="size-9 bg-black rounded-full"></div>
      <div className="h-10 absolute top-[50%] left-[50%] translate-y-[-50%]  w-full bg-black animate-spin origin-left"></div>
    </div>
  );
}

export default Loading;
