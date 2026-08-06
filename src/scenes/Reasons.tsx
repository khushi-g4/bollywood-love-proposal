import { SceneShell } from "../components/SceneShell";
import { reasons } from "../content/story";

export function Reasons() {
  return (
    <SceneShell eyebrow="Chapter Four" title="Reasons I Love You">
      <ul className="space-y-3 text-left">
        {reasons.map((r, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className="text-rose-300 mt-0.5" aria-hidden>
              ♥
            </span>
            <span className="text-[#e7eaff]">{r}</span>
          </li>
        ))}
      </ul>
    </SceneShell>
  );
}
