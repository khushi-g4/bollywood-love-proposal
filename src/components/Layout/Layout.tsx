import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="min-h-screen w-full bg-slate-950 text-white overflow-hidden">
      {children}
    </main>
  );
}