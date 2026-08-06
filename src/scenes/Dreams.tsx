import { SceneShell } from "../components/SceneShell";
import { dreams } from "../content/story";

export function Dreams() {
  return (
    <SceneShell eyebrow="Chapter Five" title="Our Future Dreams">
      <ul className="space-y-3 text-left">
        {dreams.map((d, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className="text-rose-300 mt-0.5" aria-hidden>
              ✦
            </span>
            <span className="text-[#e7eaff]">{d}</span>
          </li>
        ))}
      </ul>
    </SceneShell>
  );
}
