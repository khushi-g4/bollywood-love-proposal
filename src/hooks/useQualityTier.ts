import { useEffect, useState } from "react";

export type QualityTier = "high" | "medium" | "low";

function getQualityTier(): QualityTier {
  if (typeof window === "undefined") return "high";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const compact = window.matchMedia("(max-width: 767px)").matches;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;

  if (reducedMotion || memory <= 4) return "low";
  return compact || memory <= 6 ? "medium" : "high";
}

export function useQualityTier() {
  const [tier, setTier] = useState<QualityTier>(getQualityTier);

  useEffect(() => {
    const updateTier = () => setTier(getQualityTier());
    window.addEventListener("resize", updateTier);
    return () => window.removeEventListener("resize", updateTier);
  }, []);

  return tier;
}
