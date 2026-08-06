import { SceneShell } from "../components/SceneShell";
import { timeline } from "../content/story";

export function OurStory() {
  return (
    <SceneShell eyebrow="Chapter One" title="Our Story">
      <ol className="space-y-6 text-left">
        {timeline.map((item) => (
          <li key={item.date} className="border-l-2 border-rose-300/40 pl-5">
            <p className="text-glow-sm text-rose-200 text-xs tracking-widest uppercase mb-1">
              {item.date}
            </p>
            <p className="font-serif text-lg text-white mb-1">{item.title}</p>
            <p className="text-sm text-[#d7dbf7]">{item.description}</p>
          </li>
        ))}
      </ol>
    </SceneShell>
  );
}
