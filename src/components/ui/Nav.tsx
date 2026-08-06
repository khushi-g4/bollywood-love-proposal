import { motion } from "framer-motion";

const LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Our Story", href: "#story" },
  { label: "Memories", href: "#gallery" },
  { label: "Letter", href: "#letter" },
  { label: "Reasons", href: "#reasons" },
  { label: "Dreams", href: "#dreams" },
  { label: "Proposal", href: "#proposal" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 2.4 }}
      className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 md:px-10 py-5"
    >
      <div className="flex items-center gap-2 text-[#f2f0fb]">
        <span className="text-rose-300 text-base leading-none">♥</span>
        <span className="font-serif text-sm tracking-wide">Our Story</span>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.18em] uppercase">
        {LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            className={
              i === 0
                ? "text-rose-300"
                : "text-[#c3c9e8]/70 hover:text-[#f2f0fb] transition-colors"
            }
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4 text-[#c3c9e8]">
        <button
          aria-label="Account"
          className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center hover:border-rose-300/50 transition-colors"
        >
          <span className="text-xs">☺</span>
        </button>
        <button aria-label="Menu" className="flex flex-col gap-[3px] md:hidden">
          <span className="w-5 h-px bg-current" />
          <span className="w-5 h-px bg-current" />
        </button>
      </div>
    </motion.header>
  );
}
