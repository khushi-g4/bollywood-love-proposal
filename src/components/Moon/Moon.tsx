export default function Moon() {
  return (
    <div className="absolute top-20 right-20">
      {/* Glow */}
      <div className="absolute h-52 w-52 rounded-full bg-blue-200 opacity-20 blur-3xl" />

      {/* Moon */}
      <div className="relative h-36 w-36 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-300 shadow-[0_0_100px_rgba(255,255,255,0.45)]" />
    </div>
  );
}