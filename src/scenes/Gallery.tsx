import { SceneShell } from "../components/SceneShell";
import { galleryPlaceholders } from "../content/story";

export function Gallery() {
  return (
    <SceneShell eyebrow="Chapter Two" title="Our Memories" maxWidth="max-w-2xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {galleryPlaceholders.map((g, i) =>
          g.src ? (
            <div key={i} className="aspect-square rounded-xl overflow-hidden border border-white/10">
              <img src={g.src} alt={g.caption} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div
              key={i}
              className="aspect-square rounded-xl border border-dashed border-white/25 bg-white/5 flex flex-col items-center justify-center gap-2 text-center px-3"
            >
              <span className="text-2xl opacity-70" aria-hidden>
                🖼️
              </span>
              <span className="text-xs text-[#d7dbf7]">{g.caption}</span>
            </div>
          )
        )}
      </div>
      <p className="mt-6 text-xs text-[#c9cfef]/80">
        Swap these for your real photos in <code className="text-rose-200">src/content/story.ts</code>.
      </p>
    </SceneShell>
  );
}
