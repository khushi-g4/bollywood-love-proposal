export default function Moon() {
  return (
    <div className="absolute right-24 top-16">

      {/* Outer Glow */}
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/20 blur-[90px]" />

      {/* Inner Glow */}
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-3xl" />

      {/* Moon */}
      <div className="relative h-36 w-36 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-300 shadow-[0_0_60px_rgba(255,255,255,0.45)]" />
    </div>
  );
}