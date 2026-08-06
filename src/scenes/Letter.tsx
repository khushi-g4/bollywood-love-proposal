import { SceneShell } from "../components/SceneShell";
import { letterParagraphs } from "../content/story";

export function Letter() {
  return (
    <SceneShell eyebrow="Chapter Three" title="A Letter For You">
      <div className="space-y-4 text-left font-serif text-lg leading-relaxed text-[#eef1fb]">
        {letterParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </SceneShell>
  );
}
