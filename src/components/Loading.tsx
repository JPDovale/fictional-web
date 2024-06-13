
export function Loading() {
  return (
    <main
      className="w-screen h-screen top-0 fixed bg-violet-600 text-white flex items-center gap-8 justify-center"
    >
      <span className="text-7xl font-title">Fictional</span>
      <div className="w-[50px] h-[50px] bg-purple-300 animate-square-spin shadow-purpleShadow shadow-purple-300 rounded-[10px]" />
    </main>
  );
}
