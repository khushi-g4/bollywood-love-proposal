import Moon from "../Moon/Moon";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-slate-950">
      <Moon />
    </div>
  );
}