function Loading({ mode = "dark" }) {
  return (
    <div
      className={` relative bg-transparent rounded-full flex  items-center justify-center overflow-hidden`}
    >
      <div
        className={`size-9 border-3 border-r-0  border-b-0 border-${
          mode === "light" ? "black" : "white "
        } animate-spin rounded-full`}
      ></div>
    </div>
  );
}

export default Loading;
