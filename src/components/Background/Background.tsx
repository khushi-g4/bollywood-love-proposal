import Moon from "../Moon/Moon";
import Stars from "../Stars/Stars";

export default function Background() {
  return (
<div className="fixed inset-0 z-0 overflow-hidden bg-slate-950">

      <Stars />

      <Moon />

    </div>
  );
}